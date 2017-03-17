<template>
<div>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
            <el-form ref="form" label-width="80px">
                <el-form-item>
                    <el-input type="textarea" v-model="text.input" :rows="10" resize="none" @change="convert"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="b64encode">Base64编码</el-button>
                        <el-button type="primary" size="small">Base64解码</el-button>
                    </el-button-group>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" v-model="text.output" :rows="10" resize="none" readonly></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      text: {
          input: "",
          output: ""
      },
      lastAction: undefined
    }
  },
  methods: {
    convert () {
        if(this.lastAction && this.lastAction instanceof Function) {
            this.lastAction()
        }
    },
    b64encode () {
        this.lastAction = this.b64encode
        this.text.output = this.text.input
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
