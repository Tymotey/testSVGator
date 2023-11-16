
<script lang="ts">
import axios from 'axios'
import type * as types from '@/types'
import { fileExtensionsToMime } from '@/components/functions'

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
        onChangeEvent(e: Event) {
            let returnData = {
                error: true,
                message: '',
                files: [],
            } as types.UploadDataType


            let uploadedFiles = e?.target?.files || null as File | null
            if (uploadedFiles !== null) {
                let uploadedFilesAsArray = Array.from(uploadedFiles) as File[]
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
                    // TODO: server request
                    returnData.error = false
                    returnData.files = uploadedFilesAsArray
                }
                else {
                    returnData.message = 'Incorrect file(s) type'
                }

            }
            else {
                returnData.message = 'No files selected'
            }

            this.$emit('afterFileUpload', returnData)
        }
    },
    props: {
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
    <div class="uploader-wrapper">
        <div class="uploader">
            <input type="file" @change="onChangeEvent" :disabled="isUploading" />
            <div v-if="progress" id="progress-bar-wrapper">
                <div class="progess-bar" :style="{ 'width': progress !== true ? progress : '0px' }"> {{ progress }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.uploader-wrapper {
    text-align: center;

    .progress-bar-wrapper {
        width: 200px;
        margin: 10px auto;

        .progess-bar {
            text-align: left;
            background-color: green;
        }
    }
}
</style>
