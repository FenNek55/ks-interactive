import { computed, onScopeDispose, ref } from 'vue'

export type DotWaveMode = 'repel' | 'swirl'

const swirlHolds = ref(0)

const mode = computed<DotWaveMode>(() => (swirlHolds.value > 0 ? 'swirl' : 'repel'))

export function useDotWaveInteraction() {
  let holding = false

  function setMode(next: DotWaveMode) {
    const nextHolding = next === 'swirl'
    if (nextHolding === holding) return
    holding = nextHolding
    swirlHolds.value += nextHolding ? 1 : -1
  }

  onScopeDispose(() => {
    setMode('repel')
  })

  return {
    mode,
    setMode,
  }
}
