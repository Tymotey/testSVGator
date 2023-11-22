<script lang="ts">
import { downloadOnTheFly } from '../functions/index'
import NumberComponent from '../NumberComponent.vue'
import PreviewComponent from '../PreviewComponent.vue'

export default {
    name: 'Step2Component',
    components: {
        NumberComponent,
        PreviewComponent
    },
    data() {
        return {
            // not best solution to resize preview but with JS onload I had same origin cors error
            previewPreCode: '<style>svg{ width: 100%; height: auto; max-width: 300px; max-height: 300px; }</style>',
            minimizeCode: true,
            thisStep: 2,
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
        },
        canShowPreview() {
            return this.stepsData.originalFile !== '' as unknown as boolean
        }

    },
    inject: ['stepsData']
}
</script>

<template>
    <div id="step-2" class="step">
        <div class="step-title">
            <NumberComponent :number="'2'" :textUnder="'Preview of uploaded file'" />
        </div>
        <div class="step-content">
            <div class="svg-preview">
                <PreviewComponent :showCondition="canShowPreview()" />
                <div v-show="canShowPreview()">
                    <span class="label-save">
                        <span>Animation data</span>
                        <img class="save_icon" src="/src/assets/save.svg"
                            @click="() => { downloadOnTheFly(JSON.stringify(this.stepsData.animationData)) }"
                            title="Save animation to JSON" />
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
    display: block;
    text-align: center;

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
