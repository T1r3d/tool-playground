<template>
<div>
    <el-menu id="header" :default-active="$route.path" mode="horizontal" :router="true">
        <li class="menu-header"><strong>LEAVESONG工具架</strong></li>
        <el-menu-item index="/">前端工具</el-menu-item>
        <el-menu-item index="/misc">开发必备</el-menu-item>
        <el-menu-item index="/hashed">哈希工具</el-menu-item>
        <el-menu-item index="/json">Json格式化</el-menu-item>
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
    name: 'menu',
    components:{Config},
    data() {
        return {
            showConfig: false,
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
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
    margin-left: 20px;
    position: relative;
    top: 10px;
}
.menu-header {
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
}
</style>
