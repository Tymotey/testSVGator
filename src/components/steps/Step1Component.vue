<script lang="ts">
import { returnStepClasses, readText } from '../functions'
import NumberComponent from '../NumberComponent.vue'
import UploadComponent from '../UploadComponent.vue'
import type * as types from '../../types';

export default {
    name: 'Step1Component',
    data() {
        return {
            currentStep: 1,
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
            }
            else {
                let contentFile = await readText(returnData.files[0])
                // TODO: inject use type of object
                this.stepsData.originalFile = contentFile
                this.stepsData.animationData = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`

                this.$emit('changeStep', 2)
                this.$emit('changeStep', 3)
                this.$toast.success('File uploaded')
            }
        }
    },
    components: {
        NumberComponent,
        UploadComponent
    },
    inject: ['stepsData']
}
</script>

<template>
    <div class="step" :class="returnStepClasses(currentStep, activeStep)">
        <NumberComponent :number="'1'" :textUnder="'Upload an animated SVG'"
            @click="(event: Event) => { $emit('changeStep', currentStep) }" />
        <UploadComponent @afterFileUpload="afterFileUpload" :allowedExtension="'svg'" />
    </div>
</template>

<style scoped lang="scss"></style>
