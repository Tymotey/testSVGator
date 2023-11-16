
<script lang="ts">
import { returnStepClasses, readText } from '../functions'
import NumberComponent from '../NumberComponent.vue'
import UploadComponent from '../UploadComponent.vue'

export default {
    name: 'ApplyComponent',
    components: {
        NumberComponent,
        UploadComponent
    },
    data() {
        return {
            currentStep: 3,
            returnStepClasses: returnStepClasses,
        };
    },
    methods: {
        async afterFileUpload(returnData: types.UploadDataType) {
            if (returnData.error === true) {
                this.$toast.error('Error uploading: ' + returnData.message)
            }
            else {
                let contentFile = await readText(returnData.files[0])
                // TODO: inject use type of object
                this.stepsData.newFile = contentFile

                this.$toast.success('New file uploaded')
            }
        },
        applyAnimation() {
            this.stepsData.result = this.stepsData.newFile
            this.$emit('changeStep', 4)
            this.$toast.success('Animations applied')
        }
    },
    props: {
        activeStep: {
            type: Number,
            default: 1
        }
    },
    inject: ['stepsData']
}
</script>

<template>
    <div class="step" :class="returnStepClasses(currentStep, activeStep)">
        <NumberComponent :number="'3'" :textUnder="'Upload new SVG to apply animation'" />
        <UploadComponent @afterFileUpload="afterFileUpload" :allowedExtension="'svg'" />
        <div id="result-wrapper">
            <div class="svg-preview">
                <div class="preview" v-show="this.stepsData.newFile !== ''" v-html="this.stepsData.newFile"></div>
            </div>
        </div>
        <button class="apply-button" v-show="this.stepsData.newFile !== ''" @click="() => { applyAnimation() }"
            title="Apply animation to new file">Apply!</button>
    </div>
</template>

<style scoped lang="scss">
.apply-button {
    cursor: pointer;
    padding: 8px;
    background-color: #ddf5ff;
    color: #192034;
    margin: 10px auto;
    display: block;
    border: 1px solid #3cfffc;
    border-radius: 8px;
    animation: all 1s alternate infinite;

    &:hover {
        padding-right: 15px;
        padding-left: 15px;
    }
}
</style>
