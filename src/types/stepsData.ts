import type { SVGNodeData } from './svgNodeData'

export type StepsData = {
  originalFile?: string
  animationData?: Array<SVGNodeData> | undefined
  newFile?: string
  result?: string
}
