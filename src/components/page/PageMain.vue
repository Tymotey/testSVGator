<script lang="ts">
import { ref, computed, reactive } from 'vue'
import type * as types from '../../types';
import Step1Component from '../steps/Step1Component.vue'
import Step2Component from '../steps/Step2Component.vue'
import Step3Component from '../steps/Step3Component.vue'
import Step4Component from '../steps/Step4Component.vue'

const activeStep = ref<any>(1)
const stepsData = reactive({
    originalFile: '',
    animationData: '',
    newFile: '',
    result: ''
} as types.StepsData)

export default {
    components: {
        Step1Component,
        Step2Component,
        Step3Component,
        Step4Component,
    },
    data: () => ({
        activeStep: activeStep.value,
        stepsData: stepsData,
    }),
    methods: {
        changeStep(newStep: Number) { // I can add them in "context"(provide) but for learning sake I left them as parameters to components
            let changeStep = true as boolean
            if (this.activeStep !== 1 && newStep == 1) {
                changeStep = confirm('Do you want to start over?')
            }

            if (changeStep) {
                if (newStep == 1) {
                    this.stepsData = {
                        originalFile: '',
                        animationData: '',
                        newFile: '',
                        result: ''
                    }
                    // TODO: remove file upload field value
                }

                this.activeStep = newStep
            }
        }
    },
    provide() {
        return {
            stepsData: computed(() => this.stepsData as types.StepsData)
        }
    }
}
</script>

<template>
    <main>
        <Step1Component :activeStep="activeStep" @changeStep="changeStep" />
        <Step2Component :activeStep="activeStep" @changeStep="changeStep" />
        <Step3Component :activeStep="activeStep" @changeStep="changeStep" />
        <Step4Component :activeStep="activeStep" @changeStep="changeStep" />
    </main>
</template>

<style scoped lang="scss">
main {
    @include wrapper-grid(1fr 1fr);
}

#result-wrapper {}
</style>
