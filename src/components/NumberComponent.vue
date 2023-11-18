
<script lang="ts">
export default {
    name: 'NumberComponent',
    props: {
        number: String,
        textUnder: {
            type: String,
            default: ''
        }
    }
}
</script>

<template>
    <div class="number-wrapper">
        <div class="number">{{ number }}</div>
        <div v-if="textUnder !== ''" class="textUnder">{{ textUnder }}</div>
    </div>
</template>

<style scoped lang="scss">
.number-wrapper {
    flex-grow: 0;
    @include wrapper-grid(1fr, 0px);
    margin: 0px auto;
    padding: 10px 0px;
    text-align: center;

    .textUnder {}

    .number {
        margin: 0px auto;
        width: 30px;
        height: 30px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        line-height: 26px;
        font-size: 20px;
    }
}
</style>
