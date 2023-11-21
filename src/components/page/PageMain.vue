<script lang="ts">
import { ref, computed, reactive } from 'vue'
import type * as types from '../../types'
import Step1Component from '../steps/Step1Component.vue'
import Step2Component from '../steps/Step2Component.vue'
import Step3Component from '../steps/Step3Component.vue'
import Step4Component from '../steps/Step4Component.vue'
import ArrowsComponent from '../ArrowsComponent.vue'

const activeStep = ref<any>(1)
const stepsData = reactive({
    originalFile: '',
    animationData: undefined,
    newFile: '',
    result: ''
} as types.StepsData)

export default {
    components: {
        Step1Component,
        Step2Component,
        Step3Component,
        Step4Component,
        ArrowsComponent
    },
    data: () => ({
        activeStep: activeStep.value as number,
        stepsData: stepsData as types.StepsData,
    }),
    methods: {
        changeStep(newStep: number, resetOnly: boolean = false) {
            // I can add method in "context"(provide) but for learning sake I left them as parameters to components
            const resetValue = {
                originalFile: '',
                animationData: undefined,
                newFile: '',
                result: ''
            }

            if (resetOnly) {
                this.stepsData = resetValue
                this.activeStep = 1
            }
            else {
                let canChangeStep = true as boolean

                if (canChangeStep) {
                    this.activeStep = newStep
                }
            }
        }
    },
    provide() {
        return {
            // TODO: type add
            stepsData: computed(() => this.stepsData)
        }
    }
}
</script>

<template>
    <ArrowsComponent :activeStep="activeStep" @changeStep="changeStep" />
    <main>
        <Step1Component :activeStep="activeStep" @changeStep="changeStep" />
        <Step2Component :activeStep="activeStep" @changeStep="changeStep" />
        <Step3Component :activeStep="activeStep" @changeStep="changeStep" />
        <Step4Component :activeStep="activeStep" @changeStep="changeStep" />
    </main>
</template>

<style scoped lang="scss"></style>
