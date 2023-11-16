
<script lang="ts">
import { returnStepClasses } from '../functions'
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
        };
    },
    props: {
        activeStep: {
            type: Number,
            default: 1
        }
    }
}
</script>

<template>
    <div class="step" :class="returnStepClasses(currentStep, activeStep)">
        <NumberComponent :number="'4'" :textUnder="'Results'" />
        <div id="result-wrapper">
            Ffffff
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
