<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

const container = ref<HTMLElement | null>(null)
const canvasReady = ref(false)
const { mode } = useDotWaveInteraction()
const route = useRoute()

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let points: THREE.Points | null = null
let material: THREE.ShaderMaterial | null = null
let animationId = 0
let resizeObserver: ResizeObserver | null = null
let layoutObserver: ResizeObserver | null = null
let timer: THREE.Timer | null = null
let scrollCtx: gsap.Context | null = null
let refreshTimers: number[] = []
let layoutRefreshTimer = 0

function clearRefreshTimers() {
  for (const id of refreshTimers) window.clearTimeout(id)
  refreshTimers = []
  if (layoutRefreshTimer) {
    window.clearTimeout(layoutRefreshTimer)
    layoutRefreshTimer = 0
  }
}

/** Background stays mounted across Nuxt pages — refresh scrub range when layout/route changes. */
function scheduleScrollRefresh() {
  if (!import.meta.client || !scrollCtx) return
  clearRefreshTimers()
  nextTick(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      refreshTimers.push(
        window.setTimeout(() => ScrollTrigger.refresh(), 120),
        window.setTimeout(() => ScrollTrigger.refresh(), 450),
      )
    })
  })
}

function scheduleLayoutRefresh() {
  if (!import.meta.client || !scrollCtx) return
  if (layoutRefreshTimer) window.clearTimeout(layoutRefreshTimer)
  layoutRefreshTimer = window.setTimeout(() => {
    layoutRefreshTimer = 0
    ScrollTrigger.refresh()
  }, 80)
}

watch(() => route.fullPath, () => {
  scheduleScrollRefresh()
})

const mouse = new THREE.Vector2(-9999, -9999)
const mouseSmooth = new THREE.Vector2(-9999, -9999)
const raycaster = new THREE.Raycaster()
const projected = new THREE.Vector3()
const particleWorld = new THREE.Vector3()
const closestOnRay = new THREE.Vector3()
const rayDir = new THREE.Vector3()
const planeAxisU = new THREE.Vector3()
const planeAxisV = new THREE.Vector3()
const offset = new THREE.Vector3()
const swirlPos = new THREE.Vector3()

const PARTICLE_COUNT = 18000
const FIELD_WIDTH = 75
const FIELD_DEPTH = 80
const WAVE_AMP = 0.62
const WAVE_SPEED = 0.42
const Y_EXTENT = WAVE_AMP * 2.05
const HEIGHT_ALPHA_MIN = 0.22
const HEIGHT_ALPHA_MAX = 0.58
const INFLUENCE_RADIUS_NDC = 0.45
const SWIRL_INFLUENCE_RADIUS_NDC = 0.78
const DISPLACE_STRENGTH = 2
const SWIRL_SPEED = 1.05
const SWIRL_STRENGTH = 1.55
const SWIRL_RING_RADIUS = 2.15
const SWIRL_RING_MIX = 1.65
const SPRING = 14
const DAMPING = 7.5
const ALPHA_SPRING = 38
const ALPHA_DAMPING = 5
const MOUSE_SMOOTH = 14
const SIZE_MIN = 0.055
const SIZE_MAX = 0.34
/** Brand primary #e80759 */
const ACCENT_R = 0xe8 / 0xff
const ACCENT_G = 0x07 / 0xff
const ACCENT_B = 0x59 / 0xff
const FOG_COLOR = 0x09070c
const FOG_DENSITY = 0.019
/** Camera-space focus distance — mid field stays sharp */
const FOCUS_DISTANCE_BASE = 16.5
const FOCUS_RANGE = 5.5
const DOF_BLUR = 2.8

const camScroll = {
  x: 0,
  y: 11.5,
  z: 24,
  lookX: 0,
  lookY: -0.6,
  lookZ: -6,
  focus: FOCUS_DISTANCE_BASE,
  focusRange: FOCUS_RANGE,
  dofBlur: DOF_BLUR,
  cocFalloff: 11,
  /** 0 = subtle DOF, 1 = max scroll DOF */
  dofIntensity: 0,
}

type ParticleField = {
  baseX: Float32Array
  baseZ: Float32Array
  scatterAngle: Float32Array
  scatterBias: Float32Array
  mass: Float32Array
  accent: Float32Array
  posX: Float32Array
  posY: Float32Array
  posZ: Float32Array
  velX: Float32Array
  velY: Float32Array
  velZ: Float32Array
  alpha: Float32Array
  alphaVel: Float32Array
}

function createParticleField(): ParticleField {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)

  const baseX = new Float32Array(PARTICLE_COUNT)
  const baseZ = new Float32Array(PARTICLE_COUNT)
  const scatterAngle = new Float32Array(PARTICLE_COUNT)
  const scatterBias = new Float32Array(PARTICLE_COUNT)
  const mass = new Float32Array(PARTICLE_COUNT)
  const accent = new Float32Array(PARTICLE_COUNT)
  const posX = new Float32Array(PARTICLE_COUNT)
  const posY = new Float32Array(PARTICLE_COUNT)
  const posZ = new Float32Array(PARTICLE_COUNT)
  const velX = new Float32Array(PARTICLE_COUNT)
  const velY = new Float32Array(PARTICLE_COUNT)
  const velZ = new Float32Array(PARTICLE_COUNT)
  const alpha = new Float32Array(PARTICLE_COUNT)
  const alphaVel = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Bias a bit more density toward the mid/far field for depth lanes
    const depthBias = Math.random() ** 0.85
    const x = (Math.random() - 0.5) * FIELD_WIDTH
    const z = (depthBias - 0.5) * FIELD_DEPTH
    const y = waveY(x, z, 0)
    const depthNorm = (z + FIELD_DEPTH * 0.5) / FIELD_DEPTH
    // Near: tighter dots; far: soft bokeh-capable sizes
    const sizeRoll = Math.random() ** (depthNorm > 0.55 ? 0.9 : 1.5)
    const size = SIZE_MIN + sizeRoll * (SIZE_MAX - SIZE_MIN) * (0.75 + depthNorm * 0.55)

    baseX[i] = x
    baseZ[i] = z
    scatterAngle[i] = Math.random() * Math.PI * 2
    scatterBias[i] = 0.55 + Math.random() * 0.9
    mass[i] = 0.75 + Math.random() * 0.7
    // Sparse primary sparks + a soft ambient wash toward depth / crest
    const spark = Math.random() < 0.07 ? 0.45 + Math.random() * 0.55 : 0
    const wash = Math.pow(Math.max(depthNorm, 0), 1.4) * 0.18 + Math.random() * 0.06
    accent[i] = Math.min(spark + wash, 1)

    posX[i] = x
    posY[i] = y
    posZ[i] = z
    sizes[i] = size
    alpha[i] = heightAlpha(y)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    const a = alpha[i] ?? HEIGHT_ALPHA_MIN
    const tint = accent[i] ?? 0
    colors[i * 3] = a * ((1 - tint) + tint * ACCENT_R)
    colors[i * 3 + 1] = a * ((1 - tint) * 0.97 + tint * ACCENT_G)
    colors[i * 3 + 2] = a * ((1 - tint) * 1.05 + tint * ACCENT_B)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

  material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uFocusDistance: { value: FOCUS_DISTANCE_BASE },
        uFocusRange: { value: FOCUS_RANGE },
        uDofBlur: { value: DOF_BLUR },
        uCocFalloff: { value: 11 },
        uDofIntensity: { value: 0 },
        uAccent: { value: new THREE.Vector3(ACCENT_R, ACCENT_G, ACCENT_B) },
        uTime: { value: 0 },
      },
    ]),
    vertexShader: `
      attribute float aSize;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vCoc;
      varying float vDepth;
      uniform float uPixelRatio;
      uniform float uFocusDistance;
      uniform float uFocusRange;
      uniform float uDofBlur;
      uniform float uCocFalloff;
      uniform float uDofIntensity;

      #include <common>
      #include <fog_pars_vertex>

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float depth = max(-mvPosition.z, 0.1);
        vDepth = depth;

        float focusDelta = abs(depth - uFocusDistance);
        float coc = smoothstep(uFocusRange, uFocusRange + uCocFalloff, focusDelta);
        // Far / near soften harder as scroll intensity rises
        float farBias = smoothstep(uFocusDistance, uFocusDistance + mix(18.0, 10.0, uDofIntensity), depth);
        float nearBias = smoothstep(uFocusDistance, uFocusDistance - mix(10.0, 5.5, uDofIntensity), depth);
        nearBias = 1.0 - nearBias;
        float sidePush = mix(0.22, 0.55, uDofIntensity);
        coc = clamp(coc + (farBias + nearBias * 0.65) * sidePush, 0.0, 1.0);
        // Squash mid-tones so out-of-focus reads more clearly when scrolled
        coc = mix(coc, pow(coc, 0.72), uDofIntensity);
        vCoc = coc;

        float sizeScale = 1.0 + coc * uDofBlur * mix(1.0, 1.35, uDofIntensity);
        gl_PointSize = aSize * uPixelRatio * sizeScale * (300.0 / depth);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vCoc;
      varying float vDepth;
      uniform vec3 uAccent;
      uniform float uTime;
      uniform float uFocusDistance;
      uniform float uDofIntensity;

      #include <common>
      #include <fog_pars_fragment>

      void main() {
        vec2 centered = gl_PointCoord - vec2(0.5);
        float dist = length(centered);
        if (dist > 0.5) discard;

        // Sharp core when in focus; wide soft bokeh when defocused / scrolled
        float coreStart = mix(0.32, mix(0.08, 0.02, uDofIntensity), vCoc);
        float soft = 1.0 - smoothstep(coreStart, 0.5, dist);
        float dim = mix(0.55, 0.28, uDofIntensity);
        soft *= mix(1.0, dim, vCoc);

        float farGlow = smoothstep(uFocusDistance + 2.0, uFocusDistance + mix(28.0, 16.0, uDofIntensity), vDepth);
        float pulse = 0.5 + 0.5 * sin(uTime * 0.55 + vDepth * 0.35);
        vec3 bloom = mix(vColor, uAccent, 0.28 + 0.2 * pulse + uDofIntensity * 0.18);
        float bloomAmt = farGlow * (0.35 + vCoc * mix(0.45, 0.85, uDofIntensity));
        vec3 col = mix(vColor, bloom, bloomAmt);

        gl_FragColor = vec4(col, soft);
        #include <fog_fragment>
      }
    `,
  })

  points = new THREE.Points(geometry, material)

  return {
    baseX,
    baseZ,
    scatterAngle,
    scatterBias,
    mass,
    accent,
    posX,
    posY,
    posZ,
    velX,
    velY,
    velZ,
    alpha,
    alphaVel,
  }
}

function waveY(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.55 + t * WAVE_SPEED) * WAVE_AMP
    + Math.cos(z * 0.45 + t * WAVE_SPEED * 0.85) * WAVE_AMP * 0.7
    + Math.sin((x + z) * 0.25 + t * WAVE_SPEED * 0.4) * WAVE_AMP * 0.35
  )
}

function influenceFromDistance(dist: number, radius = INFLUENCE_RADIUS_NDC) {
  const t = 1 - Math.min(dist / radius, 1)
  return t * t * (3 - 2 * t)
}

function heightAlpha(y: number) {
  const t = (y + Y_EXTENT) / (Y_EXTENT * 2)
  const clamped = Math.min(Math.max(t, 0), 1)
  return HEIGHT_ALPHA_MIN + clamped * (HEIGHT_ALPHA_MAX - HEIGHT_ALPHA_MIN)
}

function springStep(
  current: number,
  velocity: number,
  target: number,
  mass: number,
  spring: number,
  damping: number,
  dt: number,
) {
  const force = spring * (target - current) - damping * velocity
  const nextVel = velocity + (force / mass) * dt
  const nextPos = current + nextVel * dt
  return { pos: nextPos, vel: nextVel }
}

function updateField(field: ParticleField, t: number, dt: number) {
  if (!points || !camera || !material) return

  material.uniforms.uTime!.value = t

  const pos = points.geometry.getAttribute('position') as THREE.BufferAttribute
  const colors = points.geometry.getAttribute('color') as THREE.BufferAttribute
  const mouseActive = mouse.x > -2 && mouse.x < 2 && mouse.y > -2 && mouse.y < 2

  if (mouseActive) {
    if (mouseSmooth.x < -2) mouseSmooth.copy(mouse)
    else mouseSmooth.lerp(mouse, 1 - Math.exp(-MOUSE_SMOOTH * dt))
    raycaster.setFromCamera(mouseSmooth, camera)

    rayDir.copy(raycaster.ray.direction).normalize()
    // Screen-facing basis: camera right/up projected onto the plane ⊥ to the mouse ray
    planeAxisU.setFromMatrixColumn(camera.matrixWorld, 0)
    planeAxisU.addScaledVector(rayDir, -planeAxisU.dot(rayDir)).normalize()
    if (planeAxisU.lengthSq() < 1e-6) {
      planeAxisU.setFromMatrixColumn(camera.matrixWorld, 1)
      planeAxisU.addScaledVector(rayDir, -planeAxisU.dot(rayDir)).normalize()
    }
    planeAxisV.crossVectors(rayDir, planeAxisU).normalize()
  }
  else {
    mouseSmooth.set(-9999, -9999)
  }

  const aspect = camera.aspect
  const swirl = mode.value === 'swirl'
  const influenceRadius = swirl ? SWIRL_INFLUENCE_RADIUS_NDC : INFLUENCE_RADIUS_NDC

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const bx = field.baseX[i] ?? 0
    const bz = field.baseZ[i] ?? 0
    const scatterBias = field.scatterBias[i] ?? 1
    const angle = field.scatterAngle[i] ?? 0
    const m = field.mass[i] ?? 1
    const ambientAccent = field.accent[i] ?? 0
    const wave = waveY(bx, bz, t)

    let influence = 0
    let desiredX = bx
    let desiredY = wave
    let desiredZ = bz

    if (mouseActive) {
      projected.set(bx, wave, bz).project(camera)
      const screenDist = Math.hypot(
        (projected.x - mouseSmooth.x) * aspect,
        projected.y - mouseSmooth.y,
      )
      influence = projected.z < 1 ? influenceFromDistance(screenDist, influenceRadius) : 0

      particleWorld.set(bx, wave, bz)
      raycaster.ray.closestPointToPoint(particleWorld, closestOnRay)

      if (swirl && influence > 0) {
        offset.copy(particleWorld).sub(closestOnRay)
        // Keep only the component in the camera-facing plane
        offset.addScaledVector(rayDir, -offset.dot(rayDir))

        const r0 = offset.length()
        const u = offset.dot(planeAxisU)
        const v = offset.dot(planeAxisV)
        const theta0 = r0 > 0.04 ? Math.atan2(v, u) : angle
        const spin = t * SWIRL_SPEED * (0.7 + scatterBias * 0.55)
        const theta = theta0 + spin
        // Collapse toward a thin ring radius instead of filling the disc
        const targetR = SWIRL_RING_RADIUS * (0.9 + scatterBias * 0.14)
        const radialMix = Math.min(influence * SWIRL_RING_MIX, 1)
        const orbitR = (r0 || targetR) + (targetR - (r0 || targetR)) * radialMix
        const blend = Math.min(influence * SWIRL_STRENGTH * Math.min(scatterBias, 1.25), 1)

        swirlPos
          .copy(closestOnRay)
          .addScaledVector(planeAxisU, Math.cos(theta) * orbitR)
          .addScaledVector(planeAxisV, Math.sin(theta) * orbitR)

        desiredX = bx + (swirlPos.x - bx) * blend
        desiredY = wave + (swirlPos.y - wave) * blend
        desiredZ = bz + (swirlPos.z - bz) * blend
      }
      else {
        const awayX = bx - closestOnRay.x
        const awayZ = bz - closestOnRay.z
        const awayLen = Math.hypot(awayX, awayZ) || 1
        const push = influence * DISPLACE_STRENGTH * scatterBias

        desiredX = bx + (awayX / awayLen) * push + Math.cos(angle) * push * 0.45
        desiredZ = bz + (awayZ / awayLen) * push + Math.sin(angle) * push * 0.45
        desiredY = wave + influence * 0.28 * scatterBias
      }
    }

    const xStep = springStep(field.posX[i] ?? bx, field.velX[i] ?? 0, desiredX, m, SPRING, DAMPING, dt)
    const yStep = springStep(field.posY[i] ?? wave, field.velY[i] ?? 0, desiredY, m, SPRING, DAMPING, dt)
    const zStep = springStep(field.posZ[i] ?? bz, field.velZ[i] ?? 0, desiredZ, m, SPRING, DAMPING, dt)

    field.posX[i] = xStep.pos
    field.posY[i] = yStep.pos
    field.posZ[i] = zStep.pos
    field.velX[i] = xStep.vel
    field.velY[i] = yStep.vel
    field.velZ[i] = zStep.vel

    pos.setXYZ(i, xStep.pos, yStep.pos, zStep.pos)

    const baseA = heightAlpha(wave)
    const desiredAlpha = baseA + influence * (1 - baseA)
    const aStep = springStep(
      field.alpha[i] ?? desiredAlpha,
      field.alphaVel[i] ?? 0,
      desiredAlpha,
      1,
      ALPHA_SPRING,
      ALPHA_DAMPING,
      dt,
    )
    field.alpha[i] = aStep.pos
    field.alphaVel[i] = aStep.vel

    const a = Math.min(Math.max(aStep.pos, 0), 1)
    const crest = Math.min(Math.max((wave + Y_EXTENT) / (Y_EXTENT * 2), 0), 1)
    const ambientPulse = ambientAccent * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.7 + bx * 0.12 + bz * 0.08)))
    const crestWash = crest * ambientAccent * 0.35
    const interactTint = baseA >= 1 ? influence : Math.min(Math.max((a - baseA) / (1 - baseA), 0), 1)
    const tint = Math.min(Math.max(interactTint, ambientPulse * 0.85 + crestWash), 1)
    colors.setXYZ(
      i,
      a * ((1 - tint) + tint * ACCENT_R),
      a * ((1 - tint) * 0.97 + tint * ACCENT_G),
      a * ((1 - tint) * 1.08 + tint * ACCENT_B),
    )
  }

  pos.needsUpdate = true
  colors.needsUpdate = true
}

function onPointerMove(event: PointerEvent) {
  const bounds = container.value?.getBoundingClientRect()
  if (!bounds || bounds.width === 0 || bounds.height === 0) return

  mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
  mouse.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
}

function onPointerLeave() {
  mouse.set(-9999, -9999)
}

function setSize() {
  if (!renderer || !camera || !container.value) return
  const { clientWidth: w, clientHeight: h } = container.value
  renderer.setSize(w, h, true)
  camera.aspect = w / Math.max(h, 1)
  camera.updateProjectionMatrix()
  if (material) {
    material.uniforms.uPixelRatio!.value = Math.min(window.devicePixelRatio, 2)
  }
}

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(FOG_COLOR, FOG_DENSITY)

  // Narrower FOV + pulled-back camera reads as a larger volume
  camera = new THREE.PerspectiveCamera(36, 1, 0.1, 160)
  camera.position.set(camScroll.x, camScroll.y, camScroll.z)
  camera.lookAt(camScroll.lookX, camScroll.lookY, camScroll.lookZ)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(FOG_COLOR, 0)
  container.value.appendChild(renderer.domElement)

  const field = createParticleField()
  scene.add(points!)

  setSize()
  resizeObserver = new ResizeObserver(setSize)
  resizeObserver.observe(container.value)

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) {
    gsap.registerPlugin(ScrollTrigger)
    scrollCtx = gsap.context(() => {
      gsap.to(camScroll, {
        x: 1.6,
        y: 8.2,
        z: 19.5,
        lookX: 0.55,
        lookY: -1.35,
        lookZ: -11,
        focus: 12.5,
        // Much narrower sharp band + heavy bokeh as you scroll
        focusRange: 1.05,
        dofBlur: 8.8,
        cocFalloff: 4.2,
        dofIntensity: 1,
        ease: 'none',
        scrollTrigger: {
          // Page-wide scrub (works on index + about); avoid documentElement
          // which can collapse start/end when html height !== scroll height.
          start: 0,
          end: 'max',
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      })
    })

    layoutObserver = new ResizeObserver(() => {
      scheduleLayoutRefresh()
    })
    layoutObserver.observe(document.documentElement)

    scheduleScrollRefresh()
  }

  timer = new THREE.Timer()
  timer.connect(document)

  const animate = (timestamp: number) => {
    animationId = requestAnimationFrame(animate)
    timer?.update(timestamp)
    const dt = Math.min(timer?.getDelta() ?? 0.016, 0.033)
    updateField(field, timer?.getElapsed() ?? 0, dt)

    if (camera) {
      camera.position.set(camScroll.x, camScroll.y, camScroll.z)
      camera.lookAt(camScroll.lookX, camScroll.lookY, camScroll.lookZ)
    }
    if (material) {
      material.uniforms.uFocusDistance!.value = camScroll.focus
      material.uniforms.uFocusRange!.value = camScroll.focusRange
      material.uniforms.uDofBlur!.value = camScroll.dofBlur
      material.uniforms.uCocFalloff!.value = camScroll.cocFalloff
      material.uniforms.uDofIntensity!.value = camScroll.dofIntensity
    }

    renderer?.render(scene!, camera!)
    if (!canvasReady.value) canvasReady.value = true
  }

  animate(performance.now())
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  resizeObserver?.disconnect()
  layoutObserver?.disconnect()
  layoutObserver = null
  clearRefreshTimers()
  scrollCtx?.revert()
  scrollCtx = null
  timer?.disconnect()
  timer?.dispose()
  timer = null

  points?.geometry.dispose()
  material?.dispose()
  renderer?.dispose()

  if (renderer?.domElement.parentElement) {
    renderer.domElement.parentElement.removeChild(renderer.domElement)
  }

  renderer = null
  scene = null
  camera = null
  points = null
  material = null
})
</script>

<template>
  <div class="dot-wave" aria-hidden="true">
    <div class="dot-wave__atmosphere" />
    <div class="dot-wave__glow dot-wave__glow--primary" />
    <div class="dot-wave__glow dot-wave__glow--cool" />
    <div class="dot-wave__glow dot-wave__glow--horizon" />
    <div
      ref="container"
      class="dot-wave__canvas"
      :class="{ 'dot-wave__canvas--ready': canvasReady }"
    />
    <div class="dot-wave__vignette" />
  </div>
</template>

<style scoped>
.dot-wave__canvas {
  opacity: 0;
  transition: opacity 0.45s ease;
}

.dot-wave__canvas--ready {
  opacity: 1;
}
</style>
