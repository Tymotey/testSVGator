
<script lang="ts">
export default {
    name: 'UploadComponent',
    data() {
        return {
            selectedFile: "",
            isUploading: false,
            progress: false
        };
    },
    props: {
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
    inject: ['stepsData'],
    created() {
        console.log(this.stepsData) // injected value
    }
}
</script>

<template>
    <div id="uploader-wrapper">
        <div id="uploader">
            <input type="file" @change="onFileChange" :disabled="isUploading" />
            <div v-if="progress" id="progress-bar-wrapper">
                <div class="progess-bar" :style="{ 'width': progress !== true ? progress : '0px' }"> {{ progress }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
