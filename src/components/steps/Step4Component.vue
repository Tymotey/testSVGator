
<script lang="ts">
import { returnStepClasses, downloadOnTheFly } from '../functions'
import NumberComponent from '../NumberComponent.vue'

export default {
    name: 'FinalPreviewComponent',
    components: {
        NumberComponent
    },
    data() {
        return {
            thisStep: 4,
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
    inject: ['stepsData', 'browserInfo']
}
</script>

<template>
    <div class="step" :class="returnStepClasses(thisStep, activeStep, this.browserInfo.isMobile)">
        <div class="step-title">
            <NumberComponent :number="'4'" :textUnder="'Results'" />
        </div>
        <div class="step-content">
            <div id="result-wrapper">
                <div class="svg-preview">
                    <div class="preview" v-show="this.stepsData.result !== ''" v-html="this.stepsData.result"
                        @click="() => { downloadOnTheFly(this.stepsData.result, 'new-file.svg', 'image/svg+xml') }"
                        title="Download animated SVG">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
