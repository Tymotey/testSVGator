
<script lang="ts">
import { returnStepClasses, readText, setSVGAnimation } from '../functions'
import NumberComponent from '../NumberComponent.vue'
import UploadComponent from '../UploadComponent.vue'
import PreviewComponent from '../PreviewComponent.vue'
import type * as types from '../../types'

export default {
    name: 'Step3Component',
    components: {
        NumberComponent,
        UploadComponent,
        PreviewComponent
    },
    data() {
        return {
            // not best solution to resize preview but with JS onload I had same origin cors error
            previewPreCode: '<style>svg{ width: 100%; height: auto; max-width: 300px; max-height: 300px; }</style>',
            thisStep: 3,
            returnStepClasses: returnStepClasses,
        };
    },
    methods: {
        async afterFileUpload(returnData: types.UploadDataType) {
            if (returnData.error === true) {
                this.$toast.error('Error uploading: ' + returnData.message)
                this.stepsData.newFile = undefined
            }
            else {
                let contentFile = await readText(returnData.files[0])
                this.stepsData.newFile = contentFile

                this.$toast.success('New file uploaded')
            }
        },
        applyAnimation() {
            let result: types.ResultObject = setSVGAnimation(this.stepsData.animationData, this.stepsData.newFile)

            if (result.error === false) {
                this.stepsData.result = result.data
                if (this.stepsData.result !== undefined) {
                    this.$emit('changeStep', 4)
                    this.$toast.success('Animations applied')
                }
            } else {
                this.stepsData.result = undefined
                this.$toast.error(result.message || 'Error occured')
            }
        },
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
    <div id="step-3" class="step" :class="returnStepClasses(thisStep, activeStep, this.browserInfo.isMobile)">
        <div class="step-title">
            <NumberComponent :number="'3'" :textUnder="'Upload new SVG to apply animation'" />
        </div>
        <div class="step-content">
            <UploadComponent @afterFileUpload="afterFileUpload" :allowedExtension="'svg'" :step="'newFile'" />
            <button class="apply-button" v-show="this.stepsData.newFile !== ''" @click="() => { applyAnimation() }"
                title="Apply animation to new file">Apply animation!</button>
            <div id="result-wrapper">
                <PreviewComponent :showCondition="this.stepsData.newFile !== ''" :fileContent="'newFile'" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
