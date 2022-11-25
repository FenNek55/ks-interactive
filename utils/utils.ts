export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getComputedProperty = (element: HTMLElement, property: string) => {
  const compStyles = window.getComputedStyle(element)
  const propertyValue = compStyles.getPropertyValue(property)

  return propertyValue
}

export const getLoopingArrayValue = (array: any[], index: number) => {
  if (index <= array.length - 1) {
    return array[index]
  }

  const finalIndex = index - (Math.floor(index / array.length)) * array.length

  return array[finalIndex]
}

export const smoothScrollToItem = (query: string) => {
  const targetEl = document.querySelector(query)
  const rect = targetEl?.getBoundingClientRect()
  const scrollTop = window.scrollY

  if (rect) {
    window.scrollTo({
      top: rect?.top + scrollTop,
      behavior: 'smooth'
    })
  }
}
