
<script lang="ts">
import { returnStepClasses, downloadOnTheFly } from '../functions'
import NumberComponent from '../NumberComponent.vue'
import PreviewComponent from '../PreviewComponent.vue'

export default {
    name: 'Step4Component',
    components: {
        NumberComponent,
        PreviewComponent
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
    <div id="step-4" class="step" :class="returnStepClasses(thisStep, activeStep, this.browserInfo.isMobile)">
        <div class="step-title">
            <NumberComponent :number="'4'" :textUnder="'Results'" />
        </div>
        <div class="step-content">
            <button class="apply-button" v-show="this.stepsData.result !== undefined"
                @click="() => { downloadOnTheFly(this.stepsData.result, 'new-animation.svg', 'image/svg+xml') }"
                title="Download animated SVG">Download animated SVG</button>
            <PreviewComponent :showCondition="this.stepsData.result !== undefined" :fileContent="'result'" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
