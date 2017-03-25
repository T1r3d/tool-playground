<template>
<el-dialog title="全局配置" v-model="showDialog">
    <el-form>
        <el-form-item label="HEX编码增加0x">
            <el-switch on-text="" off-text="" :value="$store.state.hexAdd0x" @change="cycle0x"></el-switch>
        </el-form-item>
        <el-form-item label="输出结果变形">
            <el-select @change="changeShape" :value="$store.state.shape" @input="changeShape($event.target.value)" multiple placeholder="请选择" class="select">
                <el-option
                        v-for="item in shapeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="随机串取值范围">
            <el-select @change="changeRandomRange" :value="$store.state.randomRange" @input="changeRandomRange($event.target.value)" multiple placeholder="请选择" class="select">
                <el-option
                        v-for="item in randomRange"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    name: 'index',
    props: ['value'],
    watch: {
        value(val) {
            this.showDialog = val
        },
        showDialog (val) {
            this.$emit('input', val)
        }
    },
    data () {
        return {
            form: {
                name: ""
            },
            showDialog: false,
            shapeOptions: [
                {
                    value: "lower",
                    label: "转换成小写"
                },
                {
                    value: "upper",
                    label: "转换成大写"
                },
                {
                    value: "urlencode",
                    label: "URL编码"
                }
            ],
            randomRange: [
                {
                    value: "lower",
                    label: "小写字母",
                },
                {
                    value: "upper",
                    label: "大写字母"
                },
                {
                    value: "number",
                    label: "数字"
                },
                {
                    value: "symbol",
                    label: "无害符号"
                },
                {
                    value: "danger_symbol",
                    label: "有害符号"
                }
            ]
        }
    },
    methods: {
        cycle0x () {
            this.$store.commit("cycle0x")
        },
        changeShape (value) {
            this.$store.commit("changeShape", value)
        },
        changeRandomRange (value) {
            this.$store.commit("changeRandomRange", value)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
    width: 70%;
}
</style>
