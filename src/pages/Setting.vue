
<script>
export default {
    name:'setting',
    methods:{
      backToHome(){
        this.$router.push('/home');
      },
       // 代码生成器
    myUpdateFunction(event){
        var code = Blockly.JavaScript.workspaceToCode(this.workspace);
        document.getElementById('textarea').value = code;
    },
    // 获取blockly工作区中的code和xml结构
    getBlockData(){
      const code = Blockly.JavaScript.workspaceToCode(this.workspace);
      const xml = Blockly.Xml.workspaceToDom(this.workspace)
      const xmlText = Blockly.Xml.domToText(xml);
    },
    // 回显工作区中的xml结构
    setBlockData(xmlText){
      this.clearBlockData();
      const xml = Blockly.Xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xml, this.workspace);
    },
    // 清空工作区
    clearBlockData(){
      this.workspace.clear();
    },

    }
}

// 引入Blockly
import Blockly from'blockly'
// 引入想要转换的语言，语言有php python dart lua javascript
import 'blockly/javascript'
// 引入语言包并使用
import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);
//引入媒体文件：我是在github上下载的blockly源码，将源码中的media文件放入我项目中的public文件夹下
 
//忽略被vue错认为组件的blockly中的标签，不止以下这些，请发现一个忽略一个
import Vue from'vue'
Vue.config.ignoredElements.push('xml')
Vue.config.ignoredElements.push('block')
Vue.config.ignoredElements.push('field')
Vue.config.ignoredElements.push('category')
Vue.config.ignoredElements.push('sep')
Vue.config.ignoredElements.push('value')
Vue.config.ignoredElements.push('statement')
Vue.config.ignoredElements.push('mutation')

this.workspace = Blockly.inject('blocklyDiv',
  {
    //工具栏
    toolbox: document.getElementById('toolbox'),
    //网格效果
    grid:{spacing: 20,length: 3,colour: '#ccc',snap: true},
    //媒体资源
    media: './media/',
    //垃圾桶
    trashcan: true
  }
);




</script>
<template>
  <div>
    <!-- blockly工作区 -->
    <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
    <!-- blockly工具栏 -->
    </xml id="toolbox" style="display: none">
      <category name="逻辑" colour="%{BKY_LOGIC_HUE}">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_negate"></block>
          <block type="logic_boolean"></block>
      </category>
      <sep></sep>
      <category name="数学" colour="%{BKY_MATH_HUE}">
        <block type="math_number">
            <field name="NUM">123</field>
        </block>
        <block type="math_arithmetic"></block>
        <block type="math_single"></block>
      </category>
    </xml>
    <!-- blockly代码区 -->
    <textarea name="" id="textarea" cols="30" rows="10"></textarea>
  </div>
</template>