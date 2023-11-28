<script lang="ts">
import { ref, computed, reactive } from 'vue'
import type * as types from '../../types'
import Step1Component from '../steps/Step1Component.vue'
import Step2Component from '../steps/Step2Component.vue'
import Step3Component from '../steps/Step3Component.vue'
import Step4Component from '../steps/Step4Component.vue'
import ArrowsComponent from '../ArrowsComponent.vue'

const activeStep = ref<any>(1)
let stepsData: types.StepsData = reactive({
    originalFile: '',
    animationData: undefined,
    newFile: '',
    result: '',
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
        // use activeStep value
        activeStep: activeStep.value as number,
        stepsData: stepsData as types.StepsData,
    }),
    methods: {
        // I can add method in "context"(provide) but for learning sake I left them as parameters to components
        changeStep(newStep: number, resetOnly: boolean = false) {
            if (resetOnly) {
                stepsData.originalFile = ''
                stepsData.animationData = undefined
                stepsData.newFile = ''
                stepsData.result = ''
                this.activeStep = 1
            }
            else {
                this.activeStep = newStep
            }
        },
        showStep(elementStep: number) {
            let available = [this.activeStep]
            if (this.browserInfo.isMaxTablet === false) {
                if (this.activeStep + 1 <= 4) {
                    available.push(this.activeStep + 1)
                }
                if (this.activeStep === 4) {
                    available.unshift(3)
                }
            }

            if (available.indexOf(elementStep) !== -1) return true
            return false
        }
    },
    provide() {
        return {
            stepsData: stepsData as types.StepsData
        }
    },
    inject: ['browserInfo']
}
</script>

<template>
    <ArrowsComponent :activeStep="activeStep" @changeStep="changeStep" />
    <main>
        <Step1Component :activeStep="activeStep" @changeStep="changeStep" v-if="showStep(1)" />
        <Step2Component :activeStep="activeStep" @changeStep="changeStep" v-if="showStep(2)" />
        <Step3Component :activeStep="activeStep" @changeStep="changeStep" v-if="showStep(3)" />
        <Step4Component :activeStep="activeStep" @changeStep="changeStep" v-if="showStep(4)" />
    </main>
</template>

<style scoped lang="scss"></style>
