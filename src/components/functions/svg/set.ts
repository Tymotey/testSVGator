import type * as types from '../../../types'

function setNodeData(animationData: Array<types.SVGNodeData>, file: string = '') {
  let returnData: string | undefined = undefined
  let elementApplied: boolean = false

  const parser = new DOMParser()
  const parsedSVG = parser.parseFromString(file, 'image/svg+xml')

  animationData.forEach((animation) => {
    // Create selector
    const elId: string = animation?.cssId !== null ? '#' + animation?.cssId : ''
    const elClass: string =
      animation?.cssClass !== null ? '.' + animation?.cssClass.split(' ').join('.') : ''
    const selector: string = [elId, elClass].join('')

    // Get element
    const elementSelected: Element | null = parsedSVG.querySelector(selector)

    if (elementSelected !== null && elementSelected !== undefined) {
      if (animation?.tagStyle !== undefined) {
        const styleElement = document.createElement('style')
        const cdata = parsedSVG.createCDATASection(animation?.tagStyle)
        styleElement.append(cdata)

        elementSelected.appendChild(styleElement)
      }
      if (animation?.style !== undefined) {
        elementSelected.style.cssText = animation.style
      }
      if (animation?.transform !== undefined) {
        elementSelected.setAttribute('transform', animation.transform)
      }
      if (!elementApplied) elementApplied = true
    } else {
      console.log('Not found element: ' + selector)
    }
  })

  if (elementApplied) {
    const s: XMLSerializer = new XMLSerializer()
    returnData = s.serializeToString(parsedSVG)
  } else {
    returnData = undefined
  }

  return returnData
}

export { setNodeData }
