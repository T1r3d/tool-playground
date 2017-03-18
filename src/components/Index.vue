<template>
<div>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
            <config></config>
            <el-form ref="form">
                <el-form-item>
                    <el-input type="textarea" v-model="text.input" :rows="10" resize="none" @change="convert"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="urlencode">URL编码</el-button>
                        <el-button type="primary" size="small" @click="urlallencode">URL全编码</el-button>
                        <el-button type="primary" size="small" @click="urldecode">URL解码</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="b64encode">Base64编码</el-button>
                        <el-button type="primary" size="small" @click="b64decode">Base64解码</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="hexencode">Hex编码</el-button>
                        <el-button type="primary" size="small" @click="hexdecode">Hex解码</el-button>
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
import base64 from "crypto-js/enc-base64"
import utf8 from "crypto-js/enc-utf8"
import latin1 from "crypto-js/enc-latin1"
import hex from "crypto-js/enc-hex"
import Config from "./Config.vue"

function urlencode(a,b){
    return++b?'%'+([10]+a.charCodeAt().toString(16)).slice(-2):unescape(encodeURIComponent(a)).replace(/[^]/g, urlencode);
}

export default {
  name: 'index',
  components:{Config},
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
    output (value) {
        if(this.$store.state.shape === 'lower') {
            value = value.toLowerCase()
        }
        if(this.$store.state.shape === 'upper') {
            value = value.toUpperCase()
        }
        this.text.output = value
    },
    convert () {
        if(this.lastAction && this.lastAction instanceof Function) {
            this.lastAction()
        }
    },
    b64encode () {
        this.lastAction = this.b64encode
        this.output(base64.stringify(utf8.parse(this.text.input)))
    },
    b64decode () {
        let result
        this.lastAction = this.b64decode
        let bytes = base64.parse(this.text.input)
        try {
            result = utf8.stringify(bytes)
        } catch (e) {
            result = latin1.stringify(bytes)
        }
        this.output(result)
    },
    hexencode () {
        this.lastAction = this.hexencode
        let result = (this.$store.state.hexAdd0x ? '0x':'') + hex.stringify(utf8.parse(this.text.input))
        this.output(result)
    },
    hexdecode () {
        let result
        this.lastAction = this.hexdecode
        let enc = this.text.input
        if (enc.startsWith('0x') || enc.startsWith('0X')) {
            enc = enc.substr(2)
        }
        let bytes = hex.parse(enc)
        try {
            result = utf8.stringify(bytes)
        } catch (e) {
            result = latin1.stringify(bytes)
        }
        this.output(result)
    },
    urlencode () {
        this.lastAction = this.urlencode
        this.output(encodeURIComponent(this.text.input))
    },
    urldecode () {
        this.lastAction = this.urldecode
        this.output(decodeURIComponent(this.text.input))
    },
    urlallencode () {
        this.lastAction = this.urlallencode
        this.output(urlencode(this.text.input))
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
