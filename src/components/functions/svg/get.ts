import type * as types from '../../../types'

function getNodeData(
  node: any,
  path: Array<number> = [0],
  data: undefined | Array<types.SVGNodeData> = undefined
) {
  // no <animation> tag processed
  const skipTags = ['script', 'style', 'foreignObject']
  if (skipTags.indexOf(node.type) === -1) {
    if (data === undefined) {
      data = [] as Array<types.SVGNodeData>
    }

    if (node?.properties?.id !== undefined || node?.properties?.class !== undefined) {
      const newData: types.SVGNodeData = {
        svgPath: path,
        cssId: node?.properties?.id || null,
        cssClass: node?.properties?.class || null
      } as types.SVGNodeData

      // getting animations(inline and tag style): https://svgwg.org/specs/animations/#ref-CSS3ANIMATIONS
      // getting style from tag
      const tagStyle = getNodeTagStyle(node)
      if (tagStyle !== undefined && newData !== undefined) {
        newData['tagStyle'] = tagStyle
      }

      // getting inline style
      const propertyStyle = getNodeProperty(node)
      if (propertyStyle !== undefined && newData !== undefined) {
        newData['style'] = propertyStyle
      }

      // getting css inline transform
      const propertyTransform = getNodeProperty(node, 'transform')
      if (propertyTransform !== undefined && newData !== undefined) {
        newData['transform'] = propertyTransform
      }

      if (
        tagStyle !== undefined ||
        propertyStyle !== undefined ||
        propertyTransform !== undefined
      ) {
        data.push(newData)
      }
    }

    if (node.children !== undefined && node.children.length > 0) {
      node.children.forEach((child: any, index: number) => {
        if (data !== undefined) {
          const newPath = [...path]
          newPath.push(index)

          getNodeData(child, newPath, data)
        }
      })
    }
  }

  return data as undefined | Array<types.SVGNodeData>
}

function getNodeTagStyle(node: any) {
  let returnData: undefined | string = undefined

  node.children.forEach((child: any) => {
    if (child.type === 'element' && child.tagName === 'style') {
      if (returnData === undefined) returnData = ''

      returnData += child.children.join()
    }
  })

  return returnData
}

function getNodeProperty(node: any, property: string = 'style') {
  let returnData: undefined | string = undefined

  if (node.properties[property] !== undefined && node.properties[property] !== '') {
    if (returnData === undefined) returnData = ''

    returnData = node.properties[property]
  }

  return returnData
}

export { getNodeData, getNodeTagStyle, getNodeProperty }
