
<script lang="ts">
import { returnStepClasses, downloadOnTheFly } from '../functions'
import NumberComponent from '../NumberComponent.vue'

export default {
    name: 'PreviewComponent',
    components: {
        NumberComponent
    },
    data() {
        return {
            // not best solution to resize preview but with JS onload I had same origin cors error
            previewPreCode: '<style>svg{ width: 100%; height: auto; max-width: 300px; max-height: 300px; }</style>',
            minimizeCode: true,
            thisStep: 2,
            returnStepClasses: returnStepClasses,
            downloadOnTheFly: downloadOnTheFly,
        };
    },
    props: {
        activeStep: {
            type: Number,
            default: 1
        }
    },
    methods: {
        copyAnimationsToClipboard(event: Event) {
            if (!navigator.clipboard) {
                this.$toast.error('Could not copy to clipboard')
            }
            else {
                const divNode = event.target as HTMLElement
                navigator.clipboard.writeText(divNode.innerHTML)
                this.$toast.success('Copied to clipboard')
            }
        }
    },
    inject: ['stepsData', 'browserInfo']
}
</script>

<template>
    <div class="step" :class="returnStepClasses(thisStep, activeStep, this.browserInfo.isMobile)">
        <div class="step-title">
            <NumberComponent :number="'2'" :textUnder="'Preview'" />
        </div>
        <div class="step-content">
            <div class="svg-preview">
                <div class="preview" v-show="this.stepsData.originalFile !== ''">
                    <!-- USE IFRAME to disable id styles from this SVG being applied to other previews -->
                    <iframe class="preview-iframe" :srcdoc="previewPreCode + this.stepsData.originalFile"
                        sandbox=""></iframe>
                </div>
                <div v-show="this.stepsData.animationData !== undefined">
                    <span class="label-save">
                        <span>Animation data</span>
                        <svg @click="() => { downloadOnTheFly(JSON.stringify(this.stepsData.animationData)) }"
                            class="save_icon" title="Save animation to JSON" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 30 30;"
                            version="1.1" viewBox="0 0 30 30" xml:space="preserve">
                            <path
                                d="M22,4h-2v6c0,0.552-0.448,1-1,1h-9c-0.552,0-1-0.448-1-1V4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18  c1.105,0,2-0.895,2-2V8L22,4z M22,24H8v-6c0-1.105,0.895-2,2-2h10c1.105,0,2,0.895,2,2V24z" />
                            <rect height="5" width="2" x="16" y="4" />
                        </svg>
                    </span>
                    <div class="json-container" id="animationData"
                        @click="(event: Event) => { copyAnimationsToClipboard(event) }">
                        {{ this.stepsData.animationData }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.label-save {
    span {
        line-height: 40px;
    }

    .save_icon {
        cursor: pointer;
        width: 30px;
        display: inline;
        vertical-align: middle;
    }
}
</style>
