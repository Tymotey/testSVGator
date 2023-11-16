
<script lang="ts">
import { returnStepClasses } from '../functions'
import NumberComponent from '../NumberComponent.vue'

export default {
    name: 'PreviewComponent',
    components: {
        NumberComponent
    },
    data() {
        return {
            currentStep: 2,
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
        <NumberComponent :number="'2'" :textUnder="'Preview and animations'" />
        <div id=" result-wrapper">
            <div id="svg-preview">
                <div id="preview">SVG</div>
                <div>JSON</div>
            </div>
            <div>
                bbbb
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
