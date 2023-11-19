export type SVGNodeData =
  | {
      svgPath: Array<number>
      cssId: string
      cssClass: string
      tagStyle?: string | undefined
      style?: string | undefined
      transform?: string | undefined
    }
  | undefined
