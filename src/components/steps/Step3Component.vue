
<script lang="ts">
import { returnStepClasses } from '../functions'
import NumberComponent from '../NumberComponent.vue'

export default {
    name: 'ApplyComponent',
    components: {
        NumberComponent
    },
    data() {
        return {
            currentStep: 3,
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
        <NumberComponent :number="'3'" :textUnder="'Upload a static SVG'" />
        <div id="result-wrapper">
            <div id="svg-preview">
                <div id="preview">SVG</div>
            </div>
            <div>
                cccc
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#svg-preview {
    text-align: center;

    &>* {
        width: 100%;
        margin-bottom: 1em;
    }
}
</style>
