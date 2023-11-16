
<script lang="ts">
import { returnStepClasses, downloadOnFly } from '../functions'
import NumberComponent from '../NumberComponent.vue'

export default {
    name: 'FinalPreviewComponent',
    components: {
        NumberComponent
    },
    data() {
        return {
            currentStep: 4,
            returnStepClasses: returnStepClasses,
            downloadOnFly: downloadOnFly,
        };
    },
    props: {
        activeStep: {
            type: Number,
            default: 1
        }
    },
    inject: ['stepsData']
}
</script>

<template>
    <div class="step" :class="returnStepClasses(currentStep, activeStep)">
        <NumberComponent :number="'4'" :textUnder="'Results'" />
        <div id="result-wrapper">
            <div class="svg-preview">
                <div class="preview" v-show="this.stepsData.result !== ''" v-html="this.stepsData.result"
                    @click="() => { downloadOnFly(this.stepsData.result, 'new-file.svg', 'image/svg+xml') }"
                    title="Download animated SVG">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
