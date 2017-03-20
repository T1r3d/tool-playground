<template>
<div>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
            <el-form ref="form">
                <el-form-item>
                    <el-input type="textarea" v-model="text.input" id="text-in" :rows="10" resize="none" @change="convert"></el-input>
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
                    <el-button-group>
                        <el-button type="primary" size="small" @click="html10encode">Html10编码</el-button>
                        <el-button type="primary" size="small" @click="htmlspecialchars">HtmlSpecialChars编码</el-button>
                        <el-button type="primary" size="small" @click="html10decode">Html10解码</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="html16encode">Html16编码</el-button>
                        <el-button type="primary" size="small" @click="html16decode">Html16解码</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="js8encode">JS8编码</el-button>
                        <el-button type="primary" size="small" @click="js8decode">JS8解码</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="js16encode">JS16编码</el-button>
                        <el-button type="primary" size="small" @click="js16decode">JS16解码</el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" size="small" @click="unicodeencode">Unicode编码</el-button>
                        <el-button type="primary" size="small" @click="unicodedecode">Unicode解码</el-button>
                    </el-button-group>
                    <el-button type="primary" size="small" @click="stringcharcode">String Char Code</el-button>
                    <el-button type="success" size="small" @click="execute">直接执行</el-button>
                    <el-button type="success" size="small" v-clipboard:copy="copyData()">复制</el-button>
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

function urlencode(a,b){
    return++b?'%'+([10]+a.charCodeAt().toString(16)).slice(-2):unescape(encodeURIComponent(a)).replace(/[^]/g, urlencode);
}

export default {
  name: 'index',
  data () {
    return {
      text: {
          input: "",
          output: ""
      },
      lastAction: undefined,
    }
  },
  methods: {
    copyData () {
        return this.text.output
    },
    output (value) {
        for (let shape of this.$store.state.shape) {
            if(shape === 'lower') {
                value = value.toLowerCase()
            } else if (shape === 'upper') {
                value = value.toUpperCase()
            } else if (shape === 'urlencode') {
                value = encodeURIComponent(value)
            }
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
    html10encode () {
        this.lastAction = this.html10encode
        let result = this.text.input.split('').map(m => "&#" + m.charCodeAt() + ";").join('')
        this.output(result)
    },
    html10decode () {
        this.lastAction = this.html10decode
        let result = this.text.input.replace(/&#(\d+);?/g, (match, i) => String.fromCharCode(parseInt(i)))
        this.output(result)
    },
    htmlspecialchars () {
        this.lastAction = this.htmlspecialchars
        let result = this.text.input
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        this.output(result)
    },
    html16encode () {
        this.lastAction = this.html16encode
        let result = this.text.input.split('').map(m => "&#x" + m.charCodeAt().toString(16) + ";").join('')
        this.output(result)
    },
    html16decode () {
        this.lastAction = this.html16decode
        let result = this.text.input.replace(/&#x([a-f0-9]+);?/ig, (match, i) => String.fromCharCode(parseInt(i, 16)))
        this.output(result)
    },
    js8encode () {
        this.lastAction = this.js8encode
        let result = this.text.input.split('').map(m => "\\" + m.charCodeAt().toString(8)).join('')
        this.output(result)
    },
    js8decode () {
        this.lastAction = this.js8decode
        let result = this.text.input.replace(/\\([0-7]+)/g, (match, i) => String.fromCharCode(parseInt(i, 8)))
        this.output(result)
    },
    js16encode () {
        this.lastAction = this.js16encode
        let result = this.text.input.split('').map(m => "\\x" + m.charCodeAt().toString(16)).join('')
        this.output(result)
    },
    js16decode () {
        this.lastAction = this.js16decode
        let result = this.text.input.replace(/\\x([a-f0-9]{1,4})/ig, (match, i) => String.fromCharCode(parseInt(i, 16)))
        this.output(result)
    },
    unicodeencode () {
        this.lastAction = this.unicodeencode
        let result = this.text.input.split('').map(m => {
            let pad = "0000"
            let str = m.charCodeAt().toString(16)
            return "\\u" + pad.substring(0, pad.length - str.length) + str
        }).join('')
        this.output(result)
    },
    unicodedecode () {
        this.lastAction = this.unicodedecode
        let result = this.text.input.replace(/\\u([a-fA-F0-9]{4})/g, (match, i) => String.fromCharCode(parseInt(i, 16)))
        this.output(result)
    },
    stringcharcode () {
        this.lastAction = this.stringcharcode
        let result = "String.fromCharCode(" + this.text.input.split('').map(m => m.charCodeAt()).join(',') + ")"
        this.output(result)
    },
    execute () {
        try {
            let result = eval(this.text.input)
            this.output(result)
        } catch (e) {}
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
