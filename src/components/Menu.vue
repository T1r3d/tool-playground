<template>
<div>
    <el-menu id="header" mode="horizontal">
        <el-menu-item index="1"><strong>LEAVESONG工具架</strong></el-menu-item>
        <el-menu-item index="3">前端工具</el-menu-item>
        <div class="has-button">
            <el-button class="button" type="default" @click="showConfig = true">设置</el-button>
        </div>
    </el-menu>
    <config v-model="showConfig"></config>
</div>
</template>

<script>
import Config from "./Config.vue"

export default {
    components:{Config},
    data() {
        return {
            showConfig: false,
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    padding-left: 50px;
}
.has-button {
    height: 60px;
    vertical-align: middle;
    z-index: 9999;
}
.button {
    position: relative;
    top: 10px;
}
</style>
