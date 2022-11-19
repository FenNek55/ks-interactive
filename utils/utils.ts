export function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getComputedProperty = (element: HTMLElement, property: string) => {
  const compStyles = window.getComputedStyle(element)
  const propertyValue = compStyles.getPropertyValue(property)

  return propertyValue
}
