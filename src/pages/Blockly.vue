<template>
    <div>
      <table width="100%" height=4%>
        <tr id="tabRow" height="1em">
          <el-button-group>
          <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left" title="返回首页">返回</el-button>
          </el-button-group>
            <td class="tabmax">
              <button id="trashButton" class="notext" title="清空工作区" v-on:click="discard()">
                <img src='../assets/blockly_media/1x1.gif' class="trash icon21">
              </button>
              <button id="runButton" class="notext primary" title="运行" v-on:click="runJS()">
                <img src='../assets/blockly_media/1x1.gif' class="run icon21">
              </button>
            </td>
        </tr>
      </table>        
     <BlocklyComponent id="blockly2" :options="options" ref="foo"></BlocklyComponent>  
     <p id="code">
      <el-footer>生成的JS代码</el-footer>
      <pre v-html="code"></pre>
    </p>   
    </div>
</template>

<script>
import Vue from'vue'
import BlocklyComponent from './components/BlocklyComponent.vue'
import '../blocks/BlockDefinition';
import '../prompt';
import Blockly from'blockly'
import BlocklyJS from 'blockly/javascript';
import Code from '../blocks/code'
Vue.config.ignoredElements.push('xml');
  export default {
      name:'blockly',
      components: {
        BlocklyComponent
      },
      data(){
    return {
      code: '',
      options: {
        media: '../../../node_modules/blockly/media/',

        trashcan: true,
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
          zoom:
           {controls: true,
            wheel: true},
          toolbox:
        `<xml>
          <category name="参数设置" colour="#a5745b">
      <block type="jogspeed">
        <field name="jogSpeedNAME">设置关节速度</field>
        <field name="jogSpeedInputNAME">0</field>
        <field name="°/sNAME">°/s</field>
      </block>
      <block type="jogacceleration">
        <field name="jogAccelerationNAME">设置关节加速度</field>
        <field name="jogAccelerationinputNAME">0</field>
        <field name="°/s²NAME">°/s²</field>
      </block>
      <block type="cartspeed">
        <field name="cartSpeedNAME">设置空间运动速度</field>
        <field name="cartSpeedInputNAME">0</field>
        <field name="mm/sNAME">mm/s</field>
      </block>
      <block type="cartspeed">
        <field name="cartSpeedNAME">设置空间运动速度</field>
        <field name="cartSpeedInputNAME">0</field>
        <field name="mm/sNAME">mm/s</field>
      </block>
      <block type="endoffset">
        <field name="endOffsetNAME">设置末端偏移</field>
        <field name="XNAME">X</field>
        <field name="XInputNAME">0</field>
        <field name="YNAME">Y</field>
        <field name="YInputNAME">0</field>
        <field name="ZNAME">Z</field>
        <field name="ZInputNAME">0</field>
        <field name="ANAME">A</field>
        <field name="AInputNAME">0</field>
        <field name="BNAME">B</field>
        <field name="BInputNAME">0</field>
        <field name="CNAME">C</field>
        <field name="CInputNAME">0</field>
      </block>
    </category>
    <sep></sep>
    <category name="基础运动" colour="#5ba55b">
      <block type="motionstate">
        <field name="motionStateNAME">运动状态</field>
        <field name="StateNAME">suspendedState</field>
      </block>
      <block type="stay">
        <field name="stayNAME">停留</field>
        <field name="stayInputNAME">0</field>
        <field name="sNAME">秒</field>
      </block>
      <block type="zero">
        <field name="zeroNAME">零点</field>
      </block>
      <block type="jogmove">
        <field name="jogMoveName">关节运动</field>
        <field name="jog1">J1</field>
        <field name="jog1Input">0</field>
        <field name="jog2">J2</field>
        <field name="jog2Input">0</field>
        <field name="jog3">J3</field>
        <field name="jog3Input">0</field>
        <field name="jog4">J4</field>
        <field name="jog4Input">0</field>
        <field name="jog5">J5</field>
        <field name="jog5Input">0</field>
        <field name="jog6">J6</field>
        <field name="jog6Input">0</field>
        <field name="jog7">J7</field>
        <field name="jog7Input">0</field>
      </block>
      <block type="cartmove">
        <field name="cartMoveNAME">笛卡尔运动</field>
        <field name="XNAME">X</field>
        <field name="XInput">0</field>
        <field name="YNAME">Y</field>
        <field name="YInput">0</field>
        <field name="ZNAME">Z</field>
        <field name="ZInput">0</field>
        <field name="ANAME">A</field>
        <field name="AInput">0</field>
        <field name="BNAME">B</field>
        <field name="BInput">0</field>
        <field name="CNAME">C</field>
        <field name="CInput">0</field>
        <field name="PosNAME">Pos</field>
        <field name="PosInput">0</field>
      </block>
      <block type="jogincre">
        <field name="jogIncreNAME">关节增量运动</field>
        <field name="J1NAME">J1</field>
        <field name="J1InputNAME">0</field>
        <field name="J2NAME">J2</field>
        <field name="J2InputNAME">0</field>
        <field name="J3NAME">J3</field>
        <field name="J3InputNAME">0</field>
        <field name="J4NAME">J4</field>
        <field name="J4InputNAME">0</field>
        <field name="J5NAME">J5</field>
        <field name="J5InputNAME">0</field>
        <field name="J6NAME">J6</field>
        <field name="J6InputNAME">0</field>
        <field name="J7NAME">J7</field>
        <field name="J7InputNAME">0</field>
      </block>
      <block type="cartincre">
        <field name="CartIncreNAME">笛卡尔增量运动</field>
        <field name="XNAME">X</field>
        <field name="XInputNAME">0</field>
        <field name="YNAME">Y</field>
        <field name="YInputNAME">0</field>
        <field name="ZNAME">Z</field>
        <field name="ZInputNAME">0</field>
        <field name="ANAME">A</field>
        <field name="AInputNAME">0</field>
        <field name="BNAME">B</field>
        <field name="BInputNAME">0</field>
        <field name="CNAME">C</field>
        <field name="CInputNAME">0</field>
        <field name="PosNAME">Pos</field>
        <field name="PosInputNAME">0</field>
      </block>
    </category>
    <sep></sep>
    <category name="末端执行器" colour="#9fa55b"></category>
    <sep></sep>
    <category name="GPIO" colour="#5b80a5"></category>
    <sep></sep>
    <category name="视觉模块" colour="#a55b80"></category>
    <sep></sep>
    <category name="逻辑" colour="#5b67a5">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="controls_whileUntil">
        <field name="MODE">WHILE</field>
      </block>
      <block type="controls_if"></block>
    </category>
        </xml>`
      }
    }
  },
  //
  mounted() {
    this.timer = setInterval(()=>{
    this.showCode()},1000)  
  },
  beforeDestroy() {
      clearInterval(this.timer);
  },
      methods:{
        backToHome(){
          this.$router.push('/home');
        },
       get() {
        this.value ++;
        console.log(1);
      },
        showCode() {
           this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
        },
        test2(){
          console.log("test1111");
        },
         test3(){
          console.log("test2222");
        },
        discard(){
            var count = this.$refs["foo"].workspace.getAllBlocks(false).length;
            if (count < 2 ||
                window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
              this.$refs["foo"].workspace.clear();
              if (window.location.hash) {
                window.location.hash = '';
              }
            }
        },
        runJS(){
          Blockly.JavaScript.INFINITE_LOOP_TRAP = 'checkTimeout();\n';
          var timeouts = 0;
          var checkTimeout = function() {
            if (timeouts++ > 1000000) {
              throw MSG['timeout'];
            }
          };
          var tmpcode = Blockly.JavaScript.workspaceToCode(this.$refs["foo"].workspace);
          //alert(tmpcode);
          //var tmpcode = Blockly.JavaScript.workspaceToCode(this.$refs["foo"].workspace);
          //var tmpcode="this.test2()";
          Blockly.JavaScript.INFINITE_LOOTRAP = null;
          try {
           eval(tmpcode);
          } catch (e) {
            //alert(MSG['badCode'].replace('%1', e));
          }
        },
        jogMove(jog1,jog2,jog3,jog4,jog5,jog6,jog7){
          console.log(jog1);
        },
        cartMove(x,y,z,a,b,c,pos){
          console.log(x);
        }
      }
  }

</script>

<style scoped>
button {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: large;
  background-color: #eee;
  color: #000;
}
button.primary {
  border: 1px solid #dd4b39;
  background-color: #fd3243;
  color: #fff;
}
button.primary>img {
  opacity: 1;
}
button>img {
  opacity: 0.6;
  vertical-align: text-bottom;
}
button:hover>img {
  opacity: 1;
}
button:active {
  border: 1px solid #888 !important;
}
button:hover {
  box-shadow: 2px 2px 5px #888;
}
button.disabled:hover>img {
  opacity: 0.6;
}
button.disabled {
  display: none;
}
button.notext {
  font-size: 10%;
}

h1 {
  font-weight: normal;
  font-size: 140%;
  margin-left: 5px;
  margin-right: 5px;
}

/* Tabs */
#tabRow>td {
  border: 1px solid #ccc;
  border-bottom: none;
}
td.tabon {
  border-bottom-color: #ddd !important;
  background-color: #ddd;
  padding: 5px 19px;
  white-space: nowrap;
}
td.taboff {
  cursor: pointer;
  padding: 5px 19px;
}
td.taboff:hover {
  background-color: #eee;
}
td.tabmin {
  border-top-style: none !important;
  border-left-style: none !important;
  border-right-style: none !important;
}
td.tabmax {
  border-top-style: none !important;
  border-left-style: none !important;
  border-right-style: none !important;
  width: 99%;
  padding-left: 10px;
  padding-right: 10px;
  padding-top:3px;
  text-align: right;
}
html[dir=rtl] td.tabmax {
  text-align: left;
}
#tab_code {
  display: none;
}

table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  border: none;
}
td {
  padding: 0;
  vertical-align: top;
}
.content {
  visibility: hidden;
  margin: 0;
  padding: 1ex;
  position: absolute;
  direction: ltr;
}
pre.content {
  border: 1px solid #ccc;
  overflow: scroll;
}
#content_blocks {
  padding: 0;
}
.blocklySvg {
  border-top: none !important;
}
#content_xml {
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  font-family: monospace;
  overflow: scroll;
}
#languageMenu {
  vertical-align: top;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
}

/* Buttons */
button {
  padding: 1px 10px;
  margin: 1px 5px;
}

/* Sprited icons. */
.icon21 {
  height: 21px;
  width: 21px;
  background-image: url(../assets/blockly_media/icons.png);
}
.trash {
  background-position: 0px 0px;
}
.link {
  background-position: -21px 0px;
}
.run {
  background-position: -42px 0px;
}

@media (max-width: 710px) {
  .tab_collapse {
    display: none;
  }
  #tab_code {
    display: table-cell;
  }
}
/* Privacy link */
.privacyLink {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: small;
  text-decoration: none;
}

#blockly2 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80%;
  height: 96%;
}
#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20%;
  height: 96%;
  margin: 0;
  background-color: rgb(235, 235, 232);
  font-size: 120%;
}
.el-footer {
    background-color: #c2c6cc;
    color: #2f3435;
    text-align:left;
    line-height: 60px;
    font-size: 20px;
    font-style:initial;
    height:50%;
  }
</style>
