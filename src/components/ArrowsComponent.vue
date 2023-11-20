
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
        prevFunction(e: Event) {
            let step: number = this.activeStep
            if (step == 4) step = 3

            this.$emit('changeStep', step - 1)
        },
        canShowPrevFunction() {
            let activeStep: number = this.activeStep
            let canShow: boolean = true

            // MESSY! but it works
            if (activeStep === 1) canShow = false

            return canShow
        },
        nextFunction(e: Event) {
            let step: number = this.activeStep

            this.$emit('changeStep', step + 1)
        },
        canShowNextFunction() {
            let activeStep: number = this.activeStep
            let canShow: boolean = true

            // MESSY logic! but it works
            if (this.browserInfo.isMobile) {
                if (activeStep === 4) canShow = false
                else if ((activeStep === 1 && this.stepsData.originalFile === '') || activeStep === 3) canShow = false
            }
            else {
                if (activeStep !== 1 || (this.stepsData.newFile === '' || this.stepsData.originalFile === '')) canShow = false
            }

            return canShow
        },
        resetFunction(e: Event) {
            if (confirm('Do you want to restart?')) {
                this.$emit('changeStep', 1, true)
            }
        },
        canShowRestartFunction() {
            let activeStep: number = this.activeStep
            let canShow: boolean = true

            // MESSY logic! but it works
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
        <div v-show="canShowPrevFunction()" class="arrow-wrapper prev" @click="(e: Event) => { prevFunction(e) }">
            &lt;
        </div>
        <div v-show="canShowNextFunction()" class="arrow-wrapper next" @click="(e: Event) => { nextFunction(e) }">
            &gt;
        </div>
        <div v-show="canShowRestartFunction()" class="restart-wrapper" @click="(e: Event) => { resetFunction(e) }">
            Restart
        </div>
    </div>
</template>

<style scoped lang="scss">
.arrow-wrapper {
    position: fixed;
    top: calc(50% - 25px);
    height: 50px;
    width: 50px;
    font-size: 50px;
    line-height: 50px;
    text-align: center;
    color: $theme-pallete-main;
    cursor: pointer;
    text-shadow: 1px 3px $theme-pallete-secondary;
    z-index: 1091;

    &.next {
        right: 0px;
    }
}

.restart-wrapper {
    position: fixed;
    left: calc(50% - 30px);
    bottom: 0px;
    width: 60px;
    line-height: 20px;
    padding: 5px;
    text-align: center;
    color: $theme-pallete-main;
    cursor: pointer;
    border: 1px solid $theme-pallete-main;
    border-bottom: 0px;
    box-shadow: 2px 1px $theme-pallete-secondary;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    background-color: $theme-pallete-main;
    color: #FFFFFF;
    z-index: 1090;

    &:hover {
        background-color: transparent;
        color: $theme-pallete-main;
    }
}
</style>
