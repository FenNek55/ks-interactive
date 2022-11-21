import * as THREE from 'three/build/three.cjs'

export const setupScene = (bgElement) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({
    canvas: bgElement,
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const baseRotationY = 0.5
  const baseRotationZ = 0.4

  camera.position.setZ(200)
  camera.position.setY(200)
  camera.position.setX(100)
  camera.rotateX(-0.5)

  const updateCameraRotation = (rotationY = 0, rotationZ = 0) => {
    camera.rotation.y = baseRotationY + (rotationY / 10)
    camera.rotation.z = baseRotationZ + (rotationY / 10)
    camera.rotation.x = (rotationZ / 10)
  }

  renderer.render(scene, camera)

  return {
    scene,
    camera,
    bgElement,
    renderer,
    updateCameraRotation
  }
}
