import { parse } from 'svg-parser'
import { customAlphabet } from 'nanoid'
import { getNodeData } from './svg/get'
import { setNodeData } from './svg/set'
import type * as types from '../../types'

export const svgRequestId = 'svgRequestId'
export const nanoidElement = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const returnStepClasses = (componentStep: number, activeStep: number, isMobile: boolean = true) => {
  let addPast = false
  let addDisabled = false

  if (isMobile) {
    addPast = addDisabled = componentStep !== activeStep
  } else {
    addPast = componentStep !== 3 && activeStep > componentStep
    addDisabled = activeStep + 1 < componentStep
  }

  return {
    'step-past': addPast,
    'step-disabled': addDisabled
  }
}

const fileExtensionsToMime = (extensions: string) => {
  const mimes: String[] = []

  const extensionsToArray = extensions.split(',')
  extensionsToArray.forEach((extension) => {
    switch (extension) {
      case 'svg':
        mimes.push('image/svg+xml')
        break
      case 'jpeg':
      case 'jpg':
        mimes.push('image/jpeg')
        break
      case 'png':
        mimes.push('image/png')
        break
    }
  })

  return mimes
}

async function readText(file: File) {
  const text = await file.text()

  return text
}

function downloadOnTheFly(
  fileContent: string | undefined = undefined,
  name: string = 'animation.json',
  mine: string = 'application/json'
) {
  if (fileContent !== undefined) {
    const blobContent = new Blob([fileContent], { type: mine })
    const elementA = document.createElement('a')
    elementA.download = name
    elementA.href = window.URL.createObjectURL(blobContent)
    elementA.click()
  } else {
    alert('Nothing to download')
  }
}

// SVG PROCESSING - GET
function extractSVGAnimation(contentFile: string = '') {
  const returnData: types.ResultObject = { error: true, data: {}, message: '' }

  const contentToArray = parse(contentFile)
  const rootData: any = contentToArray.children[0]
  if (rootData.type === 'element' && rootData.tagName === 'svg') {
    const nodesData = getNodeData(rootData)
    if (nodesData && nodesData?.length < 1) {
      returnData.message = 'No data extracted'
    } else {
      returnData.error = false
      returnData.data = nodesData
    }
  } else {
    returnData.message = 'No SVG root element found'
  }

  return returnData
}

// SVG PROCESSING - SET
function setSVGAnimation(animationData: Array<types.SVGNodeData>, file: string = '') {
  const returnData: types.ResultObject = { error: true, data: {}, message: '' }

  if (file !== '') {
    const nodesData = setNodeData(animationData, file)

    if (nodesData != undefined) {
      returnData.error = false
      returnData.data = nodesData
    } else {
      returnData.message = 'No animations applied'
    }
  } else {
    returnData.message = 'No file selected'
  }

  return returnData
}

export {
  returnStepClasses,
  fileExtensionsToMime,
  readText,
  downloadOnTheFly,
  extractSVGAnimation,
  setSVGAnimation
}
