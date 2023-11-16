<script lang="ts">
import { returnStepClasses } from '../functions'
import NumberComponent from '../NumberComponent.vue'
import UploadComponent from '../UploadComponent.vue'

export default {
    name: 'Step1Component',
    data() {
        return {
            currentStep: 1,
            returnStepClasses: returnStepClasses,
            selectedFile: "",
            isUploading: false,
            progress: false
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
        onFileChange(e: any) {
            const selectedFile = e.target.files[0]; // accessing file
            this.selectedFile = selectedFile;
            const formData = new FormData();
            formData.append("file", this.selectedFile);
            // TODO: SERVER!!!!
            // axios.post("http://localhost:4500/upload", formData, {
            //     onUploadProgress: ProgressEvent => {
            //     this.isUploading = true
            //     let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%"
            //     this.progress = progress
            // }
            // })
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    },
    components: {
        NumberComponent,
        UploadComponent
    },
    inject: ['stepsData'],
    created() {
        console.log(this.stepsData) // injected value
    }
}
</script>

<template>
    <div class="step" :class="returnStepClasses(currentStep, activeStep)"
        @click="(event) => { $emit('changeStep', currentStep) }">
        <NumberComponent :number="'1'" :textUnder="'Upload an animated SVG'" />
        <UploadComponent />
    </div>
</template>

<style scoped lang="scss">
#uploader-wrapper {
    text-align: center;

    #progress-bar-wrapper {
        width: 200px;
        margin: 10px auto;

        .progess-bar {
            text-align: left;
            background-color: green;
        }
    }
}
</style>
