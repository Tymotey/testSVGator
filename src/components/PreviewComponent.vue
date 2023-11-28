
<script lang="ts">
export default {
    name: 'PreviewComponent.',
    data() {
        return {
            previewCode: `<?xml version="1.0" encoding="UTF-8"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`
        };
    },
    props: {
        showCondition: {
            type: Boolean,
            default: false
        },
        filePath: {
            type: String,
            default: 'originalFilePath'
        },
        fileContent: {
            type: String,
            default: ''
        }
    },
    methods: {
        getPreviewLink() {
            return this.stepsData[this.filePath] as string
        },
        showAsLink() {
            return this.fileContent === '' && this.stepsData[this.filePath] !== '' as boolean
        },
        getPreviewData() {
            return this.fileContent !== '' ? this.stepsData[this.fileContent] : '' as string
        },
        showAsData() {
            return this.fileContent !== '' && (this.stepsData[this.filePath] === undefined || this.stepsData[this.filePath] === '')
        },
    },
    inject: ['stepsData']
}
</script>

<template>
    <div class="svg-preview">
        <div class="preview" v-show="showCondition">
            <object :data="getPreviewLink()" type="image/svg+xml" :v-show="showAsLink()"></object>
            <div class="inlineSVG" v-show="showAsData()" v-html="this.previewCode + getPreviewData()"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.svg-preview {
    text-align: center;
    margin: 10px auto 0px;
    width: 100%;

    .preview-object {
        width: 100%;
    }

    .preview-iframe {
        border: 0px;
        overflow: visible;
        width: 300px;
        height: 300px;
    }

    &>* {
        width: 100%;
        margin-bottom: 1em;
    }

    .preview {
        max-width: 300px;
        margin: 0px auto;

        .inlineSVG {
            width: 100%;

            svg {
                width: 100%;
            }
        }
    }
}
</style>
