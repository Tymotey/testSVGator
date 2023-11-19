<script lang="ts">
import { returnStepClasses, readText, extractSVGAnimation } from '../functions'
import NumberComponent from '../NumberComponent.vue'
import UploadComponent from '../UploadComponent.vue'
import type * as types from '../../types'

export default {
    name: 'Step1Component',
    data() {
        return {
            thisStep: 1,
            returnStepClasses: returnStepClasses
        };
    },
    props: {
        activeStep: {
            type: Number,
            default: 1
        },
        changeStep: {
            type: Function
        }
    },
    methods: {
        async afterFileUpload(returnData: types.UploadDataType) {
            if (returnData.error === true) {
                this.$toast.error('Error uploading: ' + returnData.message)

                this.$emit('changeStep', 1, true)
            }
            else {
                let contentFile = await readText(returnData.files[0])
                this.stepsData.originalFile = contentFile
                let result = extractSVGAnimation(contentFile)

                if (result.error === false) {
                    this.stepsData.animationData = result.data
                    this.$emit('changeStep', 2)

                    this.$toast.success('File uploaded and data extracted')
                }
                else {
                    this.$toast.error(result.message || 'Error occured')
                }
            }
        }
    },
    components: {
        NumberComponent,
        UploadComponent
    },
    inject: ['stepsData', 'browserInfo']
}
</script>

<template>
    <div id="step-1" class="step" :class="returnStepClasses(thisStep, activeStep, this.browserInfo.isMobile)">
        <div class="step-title">
            <NumberComponent :number="'1'" :textUnder="'Upload an animated SVG'"
                @click="(event: Event) => { $emit('changeStep', thisStep) }" />
        </div>
        <div class="step-content">
            <UploadComponent @afterFileUpload="afterFileUpload" :allowedExtension="'svg'" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
