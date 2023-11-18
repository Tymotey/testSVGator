
<script lang="ts">
export default {
    name: 'ArrowsComponent',
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
        resetFunction() {
            if (confirm('Do you want to restart?')) {
                this.$emit('changeStep', 1, true)
            }
        },
        canShowPrevFunction() {
            let activeStep: number = this.activeStep
            let canShow: boolean = true

            if (activeStep === 1) canShow = false

            return canShow
        },
        canShowNextFunction() {
            let activeStep: number = this.activeStep
            let canShow: boolean = true

            if (activeStep === 1 && this.stepsData.originalFile === '') canShow = false
            // TODO: messy but is working
            if (this.browserInfo.isMobile) {
                if (activeStep === 2 && this.stepsData.animationData === '') canShow = false
            }
            else {
                if (activeStep === 2 && this.stepsData.newFile === '') canShow = false
            }

            return canShow
        },
        canShowRestartFunction() {
            let activeStep: number = this.activeStep
            let canShow: boolean = true

            // TODO: messy but is working
            if (this.browserInfo.isMobile) {
                if (activeStep === 1) canShow = false
            }
            else {
                if (activeStep === 1 && this.stepsData.originalFile === '') canShow = false
            }

            return canShow
        }
    },
    inject: ['stepsData', 'browserInfo']
}
</script>

<template>
    <div>
        <div v-show="canShowPrevFunction()" class="arrow-wrapper prev"
            @click="(event: Event) => { $emit('changeStep', activeStep - 1) }">
            &lt;
        </div>
        <div v-show="canShowNextFunction()" class="arrow-wrapper next"
            @click="(event: Event) => { $emit('changeStep', activeStep + 1) }">
            &gt;
        </div>
        <div v-show="canShowRestartFunction()" class="restart-wrapper" @click="(event: Event) => { resetFunction() }">
            Restart
        </div>
    </div>
</template>

<style scoped lang="scss">
.arrow-wrapper {
    position: absolute;
    top: calc(50% - 25px);
    height: 50px;
    width: 50px;
    font-size: 50px;
    line-height: 50px;
    text-align: center;
    color: $theme-pallete-main;
    cursor: pointer;
    text-shadow: 1px 3px $theme-pallete-secondary;
    z-index: 10;

    &.next {
        right: 0px;
    }
}

.restart-wrapper {
    position: absolute;
    left: calc(50% - 30px);
    bottom: 0px;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: $theme-pallete-main;
    cursor: pointer;
    text-shadow: 1px 3px $theme-pallete-secondary;
    z-index: 10;
}
</style>
