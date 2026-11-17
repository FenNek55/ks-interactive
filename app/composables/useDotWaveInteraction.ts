import { ref } from 'vue'

export type DotWaveMode = 'repel' | 'swirl'

const mode = ref<DotWaveMode>('repel')

export function useDotWaveInteraction() {
  function setMode(next: DotWaveMode) {
    mode.value = next
  }

  return {
    mode,
    setMode,
  }
}
