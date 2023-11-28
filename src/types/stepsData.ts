import type { SVGNodeData } from './svgNodeData'

export type StepsData = {
  originalFile?: string
  originalFilePath?: string
  animationData?: Array<SVGNodeData> | undefined
  newFile?: string
  newFilePath?: string
  result?: string
}
