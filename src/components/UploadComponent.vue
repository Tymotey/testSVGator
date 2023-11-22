
<script lang="ts">
import axios, { type AxiosProgressEvent } from 'axios';
import { fileExtensionsToMime, svgRequestId } from '../components/functions/index.js';
import type * as types from '../types';

export default {
    name: 'UploadComponent',
    data() {
        return {
            isUploading: false,
            progress: false,
            axios: axios
        };
    },
    methods: {
        clickDummyBrowse() {
            let uploaderInput = this.$refs.uploaderFileInput as HTMLInputElement
            uploaderInput.click()
        },
        onChangeEvent(uploadFiles: File[]) {
            let inputRef = this.$refs.uploaderFileInput as HTMLInputElement
            let returnData = {
                error: true,
                message: '',
                files: [],
            } as types.UploadDataType

            if (uploadFiles !== null) {
                let uploadedFilesAsArray = Array.from(uploadFiles) as File[]
                if (this.singleFile === true) {
                    uploadedFilesAsArray = uploadedFilesAsArray.slice(0)
                }

                let filesAllowed = true
                if (this.allowedExtension !== 'all') {
                    let allowedMimes = fileExtensionsToMime(this.allowedExtension)

                    uploadedFilesAsArray.forEach((file) => {
                        if (allowedMimes.includes(file.type) === false) {
                            filesAllowed = false
                        }
                    })
                }

                if (filesAllowed === true) {
                    returnData.error = false
                    returnData.files = uploadedFilesAsArray
                    inputRef.value = ''

                    uploadedFilesAsArray.forEach(async (file) => {
                        const bodyFormData = new FormData()
                        bodyFormData.append('step', this.step)
                        bodyFormData.append('file', file)
                        bodyFormData.append('clientId', sessionStorage.getItem(svgRequestId) as string)

                        axios.post("http://localhost:3000/api/v1/upload", bodyFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (ProgressEvent: AxiosProgressEvent) => {
                                this.isUploading = true
                                let progress = Math.round((ProgressEvent.loaded / (ProgressEvent.total || 0)) * 100) + "%"
                                this.progress = !!progress
                            }
                        })
                            .then(res => {
                                this.isUploading = false
                                this.progress = false
                                console.log('File uploaded. Path:', res.data.data.path);
                                console.log('Debug:', res);
                            })
                            .catch(err => {
                                this.isUploading = false
                                this.progress = false
                                console.error('File NOT uploaded. Debug:', err);
                            });
                    })
                }
                else {
                    returnData.message = 'Incorrect file(s) type'
                }

            }
            else {
                returnData.message = 'No files selected'
            }

            this.$emit('afterFileUpload', returnData)
        },
        dragEnter(e: Event) {
            let uploader = this.$refs.uploaderWrapper as HTMLElement
            e.preventDefault()
            e.stopPropagation()
            uploader.classList.add('higlighted')
        },
        dragleave(e: Event) {
            let uploader = this.$refs.uploaderWrapper as HTMLElement
            e.preventDefault()
            e.stopPropagation()
            uploader.classList.remove('higlighted')
        },
        dragover(e: Event) {
            let uploader = this.$refs.uploaderWrapper as HTMLElement
            e.preventDefault()
            e.stopPropagation()
            uploader.classList.add('higlighted')
        },
        dragdrop(e: DragEvent) {
            let uploader = this.$refs.uploaderWrapper as HTMLElement
            e.preventDefault()
            e.stopPropagation()
            uploader.classList.remove('higlighted')

            let dt = e.dataTransfer as any
            let files = dt.files

            this.onChangeEvent(files)
        }
    },
    props: {
        step: {
            type: String,
            default: 'originalFile'
        },
        allowedExtension: {
            type: String,
            default: 'all'
        },
        singleFile: {
            type: Boolean,
            default: true
        },
        afterFileUpload: {
            type: Function
        }
    },
    inject: ['stepsData']
}

</script>

<template>
    <div class="uploader-wrapper" ref="uploaderWrapper" @dragenter="(e) => { dragEnter(e) }"
        @dragleave="(e) => { dragleave(e) }" @dragover="(e) => { dragover(e) }" @drop="(e) => { dragdrop(e) }">
        <img class="upload_icon" src="/images/upload.svg" title="Upload SVG" @click="(e) => { clickDummyBrowse() }" />
        <div class="uploader">
            <input type="file" @change="(e: any) => { onChangeEvent(e?.target?.files) }" :disabled="isUploading"
                ref="uploaderFileInput" v-show="false" />
            <input type="button" class="button-browse" value="Browse..." @click="(e) => { clickDummyBrowse() }" />
            <div v-if="progress" class="progress-bar-wrapper">
                <div class="progess-bar" :style="{ 'width': progress !== true ? progress : '0px' }"> {{ progress }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@mixin filter-upload-hover-style() {
    // https://isotropic.co/tool/hex-color-to-css-filter/
    filter: invert(92%) sepia(83%) saturate(3610%) hue-rotate(137deg) brightness(102%) contrast(105%);
}

.uploader-wrapper {
    text-align: center;
    border: 2px dashed transparent;
    padding: 10px;

    .upload_icon {
        width: 100px;
        margin: 0px auto 20px;
        cursor: pointer;

        &:hover {
            @include filter-upload-hover-style();
        }
    }

    &.higlighted {
        border-color: #000000;

        .upload_icon {
            @include filter-upload-hover-style();
        }
    }

    .progress-bar-wrapper {
        width: 200px;
        margin: 10px auto;

        .progess-bar {
            color: #FFFFFF;
            text-align: left;
            background-color: green;
        }
    }

    .button-browse {
        border: 0px;
        padding: 10px;
        cursor: pointer;
        background-color: $theme-pallete-main;
        color: #FFFFFF;
        border-radius: $border-radius;

        &:hover {
            background-color: $theme-pallete-secondary;
        }
    }
}
</style>
