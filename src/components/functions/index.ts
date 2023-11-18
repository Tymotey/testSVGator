import { parse } from 'svg-parser'
import { customAlphabet } from 'nanoid'
import { getNodeData } from './svg/get'
import type * as types from '../../types'
export const nanoidElement = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const returnStepClasses = (currentStep: number, activeStep: number, isMobile: boolean = true) => {
  return {
    'step-past': activeStep > currentStep,
    'step-disabled': activeStep + (isMobile ? 0 : 1) < currentStep
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
  fileContent: string,
  name: string = 'animation.json',
  mine: string = 'application/json'
) {
  const blobContent = new Blob([fileContent], { type: mine })
  const elementA = document.createElement('a')
  elementA.download = name
  elementA.href = window.URL.createObjectURL(blobContent)
  elementA.click()
}

// SVG PROCESSING - GET
function extractSVGAnimation(contentFile: string = '{}') {
  const contentToArray = parse(contentFile)
  let returnData: { [key: string]: undefined | Array<types.SVGNodeData> } | undefined = undefined

  const rootData: any = contentToArray.children[0]
  if (contentToArray.type === 'root' && rootData.type === 'element' && rootData.tagName === 'svg') {
    returnData = {}
    const svgId: string = rootData?.properties?.id || nanoidElement()
    returnData[svgId] = getNodeData(rootData)
  }

  return returnData
}

// SVG PROCESSING - SET
function setSVGAnimation(contentFile: string = '{}') {
  let returnData: any = undefined

  return returnData
}

export {
  nanoid,
  returnStepClasses,
  fileExtensionsToMime,
  readText,
  downloadOnTheFly,
  extractSVGAnimation,
  setSVGAnimation
}
