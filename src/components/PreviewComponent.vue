
<script lang="ts">
export default {
    name: 'PreviewComponent.',
    data() {
        return {
            // not best solution to resize preview but with JS onload I had same origin cors error
            previewPreCode: '<style>svg{ width: 100%; height: auto; max-width: 300px; max-height: 300px; }</style>',
        };
    },
    props: {
        showCondition: {
            type: Boolean,
            default: false
        },
        fileContent: {
            type: String,
            default: 'originalFilePath'
        }
    },
    inject: ['stepsData']
}
</script>

<template>
    <div class="svg-preview">
        <div class="preview" v-show="showCondition">
            <object :data="this.stepsData[fileContent]" type="image/svg+xml">
            </object>
            <!-- USE IFRAME to disable id styles from this SVG being applied to other previews -->
            <!-- <iframe class="preview-iframe" :srcdoc="previewPreCode + this.stepsData[fileContent]"
                                    sandbox="allow-scripts"></iframe> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.svg-preview {
    text-align: center;
    margin: 10px auto 0px;

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
    }
}
</style>
