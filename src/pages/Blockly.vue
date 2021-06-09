<template>
  <div class="wholeWrap">
        <div class="container-fluid topBar " style="height: 6%;"><!-- //顶部返回，状态和急停的开始 -->
          <div class="row h-100">
             <el-button class="col-2 " style="font-size: 20px;" @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
             <div class="col-8 text-center align-item-middle" style="padding-top: 11px;">
               <el-badge :value="12" class="item">
                 <el-button size="medium" style="font-size: 1.3rem;"
                 @click="showInformationTable = true"
                 type="text">{{theRunInformation}}</el-button>
               </el-badge>
             </div>
             <el-drawer
               title="运行日志信息"
               :visible.sync="showInformationTable"
               direction="rtl"
               size="50%">
                <el-table :data="runInformationDataBuff">
                   <el-table-column property="number" label="编号" ></el-table-column>
                   <el-table-column property="type" label="错误类型"></el-table-column>
                   <el-table-column property="content" label="内容"></el-table-column>
                    <el-table-column property="time" label="时间"></el-table-column>
                 </el-table>
             </el-drawer>
             <el-button class="col-2" style="font-size: 20px;" @click="scramButtonClicked" type="danger" icon="el-icon-refresh">急停</el-button>
          </div><!-- //顶部的结束 -->
        </div>
        <div class="container-fluid" style="height: 92%;"><!-- 中间区域的开始 -->
          <div class="row h-100  border">
            <div class="col-3"><!-- 侧边状态显示区域的开始 -->
              <div class="row border" style="height: 40%;"><!-- 仿真机械臂显示区域 -->
                <div class="col text-center h-100"
                id="container" ref="piuuu"
                style="width: 500px;height: 350px;padding: 0px;"></div>
              </div>
              <div class="row jsCodeContain" style="height: 60%;">
                <div class="controlButtonGroup ">
                    <!-- 按照模式运行按钮 -->
                    <el-tooltip class="item"  effect="dark" content="启动" placement="bottom">
                        <el-button type="primary" :disabled="startDisabled"
                        @click="startMultipleRunSimulate"
                        icon="el-icon-timer" circle class="robotControlButtonInBlockly">
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item"  effect="dark" content="开始运行" placement="bottom">
                        <el-button type="primary" :disabled="rePlayDisabled"
                        @click="rePlayMultipleRunSimulate"
                        icon="el-icon-video-play" circle class="robotControlButtonInBlockly" >
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item"  effect="dark" content="暂停运行" placement="bottom">
                        <el-button type="primary" :disabled="pauseDisabled"
                        @click="pauseMultipleRunSimulate"
                        icon="el-icon-video-pause" circle class="robotControlButtonInBlockly">
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item"  effect="dark" content="停止运行" placement="bottom">
                        <el-button type="primary" :disabled="stopDisabled"
                        @click="stopMultipleRunSimulate"
                        icon="el-icon-circle-close" circle class="robotControlButtonInBlockly">
                        </el-button>
                    </el-tooltip>
                </div>
                <el-tabs class="col-12" type="border-card">
                  <el-tab-pane  label="生成JS代码" style="font-size: 20px;">
                    <span slot="label"><i class="bi bi-code-slash"></i> 生成JS代码</span>
                    <pre v-html="code"></pre>
                  </el-tab-pane>
                  <el-tab-pane  label="位置预览" style="font-size: 20px;">
                    <span slot="label"><i class="bi bi-eye-fill"></i> 位置预览</span>
                    <!-- 控制滑块和计数器组 -->
                    <div class=" row text-center align-items-center"
                      style="height: 45px;"
                      v-for="(item,index) in controlAxisButtonText" :key=index>
                      <el-tag class="col-2 controlButtonTag" style="font-size: 20px;">{{item.name}}</el-tag>
                      <el-slider @input="controlAxisRotateInBlockly(index)"
                      class=" col-10 positionSlider"
                      :min="-180" :max="180" v-model="positionOfAxisInBlockly[index]"></el-slider>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="col-9"><!-- 控制按钮区域的开始 -->
                <div class="row h-100 blocklyPage">
                  <div class="buttonGroup">
                    <!-- 回到原点 -->
                    <el-tooltip class="item" effect="dark" content="清空工作区" placement="bottom">
                        <el-button type="primary"
                        @click="discard()"
                        title="清空工作区" id="trashButton"
                        icon="el-icon-delete" circle class="blocklyControlButton notext" alet="12">
                        </el-button>
                    </el-tooltip>
                     <el-tooltip class="item" effect="dark" content="运行" placement="bottom">
                         <el-button type="primary"
                         @click="runJS()"
                         title="运行" id="runButton"
                         icon="el-icon-video-play" circle class="blocklyControlButton notext" alet="12">
                         </el-button>
                     </el-tooltip>
                     <el-tooltip class="item" effect="dark" content="保存文件" placement="bottom">
                         <el-button type="primary"
                         @click="saveFile()"
                         title="保存" id="runButton"
                         icon="el-icon-folder-add" circle class="blocklyControlButton notext" alet="12">
                         </el-button>
                     </el-tooltip>
                     <el-tooltip class="item" effect="dark" content="打开文件" placement="bottom">
                         <el-button type="primary"
                         @click="runJS()"
                         title="保存" id="runButton"
                         icon="el-icon-folder-opened" circle class="blocklyControlButton notext" alet="12">
                         </el-button>
                     </el-tooltip>
                  </div>
                  <div class="col-12 h-100">
                    <BlocklyComponent id="blockly2" :options="options" ref="foo"></BlocklyComponent>
                  </div>
                </div>
            </div>
          </div><!-- 侧边状态显示区域的结束 -->

          </div>
        </div>
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
//按照map的方法使用vuex的state数据
import {mapState,mapGetters,mapMutations} from 'vuex';
import * as Three from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
Vue.config.ignoredElements.push('xml');
  export default {
      name:'blockly',
      components: {
        BlocklyComponent
      },
      data(){
    return {
      showInformationTable:false,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      JointOneMesh:null,
      JointTwoMesh:null,
      JointThreeMesh:null,
      JointFourMesh:null,
      JointFiveMesh:null,
      JointSixMesh:null,
      JointSenveMesh:null,
      JointEightMesh:null,
      oneRotateGroup:null,
      twoRotateGroup:null,
      threeRotateGroup:null,
      fourRotateGroup:null,
      fiveRotateGroup:null,
      sixRotateGroup:null,
      senveRotateGroup:null,
      theOldPos:{
       		"type":'',
       		"oneAxis":0.0,
       		"twoAxis":0.0,
       		"threeAxis":0.0,
       		"fourAxis":0.0,
       		"fiveAxis":0.0,
       		"sixAxis":0.0,
       		"senveAxis":0.0,
       		"remarks":''
       	},
      oneAxisChangeStep:0.0,
      twoAxisChangeStep:0.0,
      threeAxisChangeStep:0.0,
      fourAxisChangeStep:0.0,
      fiveAxisChangeStep:0.0,
      sixAxisChangeStep:0.0,
      senveAxisChangeStep:0.0,
      TrackCountNum:0,
      runRowNum:0,
      showRunRowNum:0,
      pauseRunRowNum:0,
      multipleRunData:[],
      stopMultipleRunSimulateBool:false,
      pauseMultipleRunSimulateBool:false,
      runModeRadio:2,
      runCountSet:0,
      runCountSetHandMode:0,
      haveRunConut:0,
      showHaveRunConut:0,
      dataSimulateFromExeclFile:[],
      rePlayDisabled:true,
      pauseDisabled:true,
      stopDisabled:true,
      startDisabled:true,
      startDisabledHandMode:true,
      rePlayDisabledHandMode:true,
      pauseDisabledHandMode:true,
      stopDisabledHandMode:true,
      controlAxisButtonText:[
        {name:'1轴'},
        {name:'2轴'},
        {name:'3轴'},
        {name:'4轴'},
        {name:'5轴'},
        {name:'6轴'},
        {name:'7轴'}
      ],

      code: '拖拽模块后自动生成代码.....',
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
    this.showCode()},1000);
    this.threeViewWidth=this.$refs.piuuu.offsetWidth;
    this.threeVieHeight=this.$refs.piuuu.offsetHeight;
    // this.beforeInitClearPosition();
    this.init();
    this.setWindown();
    console.log(99999999999);
  },
  beforeDestroy() {
      clearInterval(this.timer);
  },
  computed:{
    //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
    //引入的各个轴的位置数据positionOfAxis
    ...mapState(['positionOfAxisInSimulate','positionOfAxisInBlockly','positionOfAxisInReal','positionOfXYZRPYInReal',
    'enableRobot','moveVecReal','kindOfEndTool','stateOfEndSuck','posOfEndJaw','realRobotControlMode',
    'outExeclDataSimulate','outExeclDataBlockly','outExeclDataHandMode','theRunInformation','runInformationDataBuff']),
    },
  methods:{
    //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
    ...mapMutations(['mutationOutExeclDataSimulate','mutationOutExeclDataBlockly','mutationEnableRobot','mutationMoveVecReal',
    'mutationKindOfEndTool','mutationStateOfEndSuck','mutationPosOfEndJaw','mutationRealRobotControlMode'
    ]),
    backToHome(){
      this.$router.push('/home');
    },
    scramButtonClicked(){
      console.log(12235555);
    },
    saveFile(){
      console.log(12222222);
      this.positionOfAxisInBlockly[0]=50;
      this.oneRotateGroup.rotation.y=this.positionOfAxisInBlockly[0]*Math.PI/180;
    },
    controlAxisRotateInBlockly(index){
      // console.log(index)
      // console.log(this.positionOfAxisInSimulate[index])
      if((index+1)==1){
        this.oneRotateGroup.rotation.y=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8;
      }
      if((index+1)==2){
        this.twoRotateGroup.rotation.x=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8;
      }
      if((index+1)==3){
       this.threeRotateGroup.rotation.y=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8;
      }
      if((index+1)==4){
        this.fourRotateGroup.rotation.x=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8;
      }
      if((index+1)==5){
        this.fiveRotateGroup.rotation.y=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8;
      }
      if((index+1)==6){
        this.sixRotateGroup.rotation.x=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8
      }
      if((index+1)==7){
        this.senveRotateGroup.rotation.y=this.positionOfAxisInBlockly[index]*Math.PI/180;//绕axis轴旋转π/8;
      }
    },
    // / 渲染函数
      renderFrame() {
          this.renderer.render(this.scene, this.camera); //执行渲染操作
          requestAnimationFrame(this.renderFrame);//请求再次执行渲染函数render，渲染下一帧
        },
        // //定义窗口的设置
      setWindown(){
           var that=this;
            //加入事件监听器,窗口自适应
            // this.$refs.piuuu.addEventListener('resize', function(){
            //   console.log(that.$refs)
            //   that.threeViewWidth = that.$refs.piuuu.offsetWidth; //窗口宽度
            //   // console.log(this.$refs.piuuu.offsetWidth);
            //   that.threeVieHeight = that.$refs.piuuu.offsetHeight; //窗口高度
            //   // console.log(that.threeViewWidth);
            //   that.renderer.setSize(that.threeViewWidth,that.threeVieHeight);
            //   that.camera.aspect = that.threeViewWidth/that.threeVieHeight;
            //   that.camera.updateProjectionMatrix();
            // });
            window.addEventListener('resize', function(){
              console.log(that.$refs)
              that.threeViewWidth = that.$refs.piuuu.offsetWidth; //窗口宽度
              // console.log(this.$refs.piuuu.offsetWidth);
              that.threeVieHeight = that.$refs.piuuu.offsetHeight; //窗口高度
              // console.log(that.threeViewWidth);
              that.renderer.setSize(that.threeViewWidth,that.threeVieHeight);
              that.camera.aspect = that.threeViewWidth/that.threeVieHeight;
              that.camera.updateProjectionMatrix();
            });
          },
      init: function() {
        // this.setWindown();
        let container = document.getElementById("container");
              /**
             * 创建场景对象Scene
             */
           this.scene = new Three.Scene();
           //创建平面几何体
           var planeGeometry = new Three.PlaneGeometry( 500, 500, 32 );
           var planeMaterial = new Three.MeshBasicMaterial( {color: 0xffffff,
           side: Three.DoubleSide,
           wireframe:true
           } );
           var plane = new Three.Mesh( planeGeometry, planeMaterial );
           plane.rotateX(Math.PI/2);
           plane.translateZ(620);
           this.scene.add(plane);
           ///////////////////////////////////
           this.oneRotateGroup=new Three.Group();
           this.twoRotateGroup=new Three.Group();
           this.threeRotateGroup=new Three.Group();
           this.fourRotateGroup=new Three.Group();
           this.fiveRotateGroup=new Three.Group();
           this.sixRotateGroup=new Three.Group();
           this.senveRotateGroup=new Three.Group();
            /**
             * stl数据加载
             */
            // var robotGroup=new Three.Group();
            var loader = new STLLoader();
            var that=this;
            //加载关节1
            loader.load('../../static/robotStl/Joint-1.stl',function (JointOneGeometry) {
              // console.log(JointOneGeometry.boundingBox);
              // geometry.position.set(0,80,0);
              // // 缩放几何体
              // geometry.scale(0.5,0.5,0.5);
              // // 几何体居中
              JointOneGeometry.center();
              // // 平移立方体
              JointOneGeometry.translate(13,-140,0);
              JointOneGeometry.rotateY(Math.PI/3);
              //关节2材质对象Material
              var JointOneMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointOneMesh = new Three.Mesh(JointOneGeometry, JointOneMaterial); //网格模型对象Mesh
              that.JointOneMesh.translateY(-400);
              that.oneRotateGroup.translateY(-400);
              that.scene.add(that.JointOneMesh); //网格模型添加到场景中
              that.scene.add(that.oneRotateGroup); //网格模型添加到场景中
            })
            //加载关节2
            loader.load('../../static/robotStl/Joint-2.stl',function (JointTwoGeometry) {
              JointTwoGeometry.center();
              // // 旋转和平移立方体
              JointTwoGeometry.rotateY(Math.PI/3);
              JointTwoGeometry.translate(19,79.5,-1.6);
              //关节2材质对象Material
              var JointTwoMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointTwoMesh = new Three.Mesh(JointTwoGeometry, JointTwoMaterial); //网格模型对象Mesh

              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 46, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateX(Math.PI/2);
              // // plane.translateZ(220);
              // that.oneRotateGroup.add(plane);

              that.oneRotateGroup.add(that.JointTwoMesh);
              that.oneRotateGroup.add(that.twoRotateGroup);
              //平移第一轴子坐标系
              that.oneRotateGroup.translateX(-0.2);
              that.oneRotateGroup.translateY(-62.5);
              that.oneRotateGroup.translateZ(0.3);
            })
            //加载关节3
            loader.load('../../static/robotStl/Joint-3.stl',function (JointThreeGeometry) {
              // // 几何体居中
              JointThreeGeometry.center();
              // // 旋转和平移立方体
              JointThreeGeometry.rotateY(Math.PI/3);
              JointThreeGeometry.translate(-32,72.3,-2.6);
              //关节3材质对象Material
              var JointThreeMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointThreeMesh = new Three.Mesh(JointThreeGeometry, JointThreeMaterial); //网格模型对象Mesh
              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 45, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateY(Math.PI/2);
              // // plane.translateZ(220);
              // that.twoRotateGroup.add(plane);
              that.twoRotateGroup.add(that.JointThreeMesh);
              that.twoRotateGroup.add(that.threeRotateGroup);
              //平移第二轴子坐标系
              that.twoRotateGroup.translateX(75.5);
              that.twoRotateGroup.translateY(111.3);
              that.twoRotateGroup.translateZ(0.2);
            })
            //加载关节4
            loader.load('../../static/robotStl/Joint-4.stl',function (JointFourGeometry) {
              // // 几何体居中
              JointFourGeometry.center();
              // // 旋转和平移立方体
              JointFourGeometry.translate(-35.6,70,17.58);
              JointFourGeometry.rotateY(Math.PI/3);
              //关节4材质对象Material
              var JointFourMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointFourMesh = new Three.Mesh(JointFourGeometry, JointFourMaterial); //网格模型对象Mesh

              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 43, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateX(Math.PI/2);
              // // plane.translateZ(220);
              // that.threeRotateGroup.add(plane);

              that.threeRotateGroup.add(that.JointFourMesh);
              that.threeRotateGroup.add(that.fourRotateGroup);
              //平移第三轴的子坐标系
              that.threeRotateGroup.translateX(-75.4);
              that.threeRotateGroup.translateY(193);
              that.threeRotateGroup.translateZ(0.45);
            })
            //加载关节5
            loader.load('../../static/robotStl/Joint-5.stl',function (JointFiveGeometry) {
              // // 几何体居中
              JointFiveGeometry.center();
              // // 旋转和平移立方体
              JointFiveGeometry.rotateY(Math.PI/3);
              JointFiveGeometry.translate(24,-63.6,55.2);
              //关节2材质对象Material
              var JointFiveMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointFiveMesh = new Three.Mesh(JointFiveGeometry, JointFiveMaterial); //网格模型对象Mesh

              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 43, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateY(Math.PI/2);
              // // plane.translateZ(220);
              // that.fourRotateGroup.add(plane);

              that.fourRotateGroup.add(that.JointFiveMesh);
              that.fourRotateGroup.add(that.fiveRotateGroup);
              //平移第四轴子坐标系
              that.fourRotateGroup.translateX(-68);
              that.fourRotateGroup.translateY(99.2);
              that.fourRotateGroup.translateZ(52.2);
            })
            //加载关节6
            loader.load('../../static/robotStl/Joint-6.stl',function (JointSixGeometry) {
              // // 几何体居中
              JointSixGeometry.center();
              // // 旋转和平移立方体
              JointSixGeometry.rotateY(Math.PI/3);
              JointSixGeometry.translate(-24.7,-105,0.65);
              //关节2材质对象Material
              var JointSixMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointSixMesh = new Three.Mesh(JointSixGeometry, JointSixMaterial); //网格模型对象Mesh
              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 43, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateX(Math.PI/2);
              // // plane.translateZ(220);
              // that.fiveRotateGroup.add(plane);
             that.fiveRotateGroup.add(that.JointSixMesh);
             that.fiveRotateGroup.add(that.sixRotateGroup);
              // // 平移第五轴子坐标系
             that.fiveRotateGroup.translateX(68.7);
             that.fiveRotateGroup.translateY(-169.6);
             that.fiveRotateGroup.translateZ(77.5);
            })
            //加载关节7
            loader.load('../../static/robotStl/Joint-7.stl',function (JointSenveGeometry) {
              // // 几何体居中
              JointSenveGeometry.center();
              // // 旋转和平移立方体
              JointSenveGeometry.rotateY(Math.PI/3);
              JointSenveGeometry.translate(0.5,-15.5,35);
              //关节2材质对象Material
              var JointSenveMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointSenveMesh = new Three.Mesh(JointSenveGeometry, JointSenveMaterial); //网格模型对象Mesh
              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 38, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateY(Math.PI/2);
              // // plane.translateZ(220);
              // that.sixRotateGroup.add(plane);
              that.sixRotateGroup.add(that.JointSenveMesh);
              that.sixRotateGroup.add(that.senveRotateGroup);
               // // 平移第六轴子坐标系
              that.sixRotateGroup.translateX(10);
              that.sixRotateGroup.translateY(-172.8);
              that.sixRotateGroup.translateZ(-0.15);
            })
            //加载关节8
            loader.load('../../static/robotStl/Joint-8.stl',function (JointEightGeometry) {

              // // 几何体居中
              JointEightGeometry.center();
              // // 旋转和平移立方体
              JointEightGeometry.rotateY(Math.PI/3);
              JointEightGeometry.translate(4.5,-13,2.5);
              //关节2材质对象Material
              var JointEightMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointEightMesh = new Three.Mesh(JointEightGeometry, JointEightMaterial); //网格模型对象Mesh
             // //创建平面几何体 用于辅助定位
             // var planeGeometry = new Three.CircleGeometry( 38, 32 );
             // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
             // side: Three.DoubleSide,
             // wireframe:true
             // } );
             // var plane = new Three.Mesh( planeGeometry, planeMaterial );
             // plane.rotateX(Math.PI/2);
             // // plane.translateZ(220);
             // that.senveRotateGroup.add(plane);
             that.senveRotateGroup.add(that.JointEightMesh);
              // // 平移第七轴子坐标系
             that.senveRotateGroup.translateX(-9.94);
             that.senveRotateGroup.translateY(-69);
             that.senveRotateGroup.translateZ(76.12);
            })
            //三维坐标系辅助显示
            var AxesHelper = new Three.AxesHelper(300);
            AxesHelper.translateY(-620);
            this.scene.add(AxesHelper);

            //各个旋转轴的坐标系辅助线
            // this.oneRotateGroup.add(new Three.AxesHelper(300));
             // this.twoRotateGroup.add(new Three.AxesHelper(300));
            // this.threeRotateGroup.add(new Three.AxesHelper(300));
            // this.fourRotateGroup.add(new Three.AxesHelper(300));
            // this.fiveRotateGroup.add(new Three.AxesHelper(300));
            // this.sixRotateGroup.add(new Three.AxesHelper(300));
            // this.senveRotateGroup.add(new Three.AxesHelper(300));
            // this.eightRotateGroup.add(new Three.AxesHelper(300));
            /**
             * 光源设置
             */
            //点光源
            var pointL = new Three.PointLight(0xEAEAEA);
            pointL.position.set(400, 600, 400); //点光源位置
            this.scene.add(pointL); //点光源添加到场景中
            //点光源
            var pointB = new Three.PointLight(0xEAEAEA);
            pointB.position.set(-400, 500, 400); //点光源位置
            this.scene.add(pointB); //点光源添加到场景中
            //点光源
            var pointA = new Three.PointLight(0xEAEAEA);
            pointA.position.set(400, 600, -400); //点光源位置
            this.scene.add(pointA); //点光源添加到场景中
            //点光源
            var pointR = new Three.PointLight(0xEAEAEA);
            pointR.position.set(-400, 500, -400); //点光源位置
            this.scene.add(pointR); //点光源添加到场景中
            //环境光
            var ambient = new Three.AmbientLight(0x444444);
            this.scene.add(ambient);
            // console.log(this.scene)
            // console.log(this.scene.children)
            /**
             * 相机设置
             */
            var width = this.threeViewWidth; //窗口宽度
            // console.log(this.threeViewWidth);
            var height = this.threeVieHeight; //窗口高度
            var k = width / height; //窗口宽高比
            var s =700; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            this.camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1800);
            this.camera.position.set(300, 0, 600); //设置相机位置
            this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
            /**
             * 创建渲染器对象
             */
            this.renderer = new Three.WebGLRenderer();
            this.renderer.setSize(width, height);//设置渲染区域尺寸
            this.renderer.setClearColor(0xD4D4D4, 1); //设置背景颜色
            container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
            this.renderFrame();

             this.controls=new OrbitControls(this.camera,this.renderer.domElement);
             // this.controls.addEventListener('changer',renderFrame)
             console.log('initfin')
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
      var clearData=[];
      this.mutationOutExeclDataBlockly(clearData);
    },
    addExeclDataBlockly(jog1,jog2,jog3,jog4,jog5,jog6,jog7){
      console.log("enterAddExeclData");
      let obj={
       		"type":'',
       		"oneAxis":jog1,
       		"twoAxis":jog2,
       		"threeAxis":jog3,
       		"fourAxis":jog4,
       		"fiveAxis":jog5,
       		"sixAxis":jog6,
       		"senveAxis":jog7,
       		"remarks":'blobklyJointData'
       	}
      // this.theCountOfDataSimulate+=1;
      this.outExeclDataBlockly.push(obj);

      // this.theOldPos.oneAxis=jog1;
      // this.theOldPos.twoAxis=jog2;
      // this.theOldPos.threeAxis=jog3;
      // this.theOldPos.fourAxis=jog4;
      // this.theOldPos.fiveAxis=jog5;
      // this.theOldPos.sixAxis=jog6;
      // this.theOldPos.senveAxis=jog7;

      for(let i in this.outExeclDataBlockly){
          this.outExeclDataBlockly[i].type=parseInt(i)+1
       }
    },
    jogMove(jog1,jog2,jog3,jog4,jog5,jog6,jog7){
      this.addExeclDataBlockly(jog1,jog2,jog3,jog4,jog5,jog6,jog7);
      console.log(this.outExeclDataBlockly);
      this.startDisabled=false;
      this.multipleRunData=this.outExeclDataBlockly;
      if(this.multipleRunData.length==0){
        this.startDisabled=true;
      }
      console.log('run01')
    },
    cartMove(x,y,z,a,b,c,pos){
      console.log(x);
    },
    startMultipleRunSimulate(){
      this.pauseDisabled=false;
      this.stopDisabled=false;
      this.startDisabled=true;
      // this.theOldPos=this.multipleRunData[0];
      this.TrackCountNum=0;
      this.runRowNum=0;
      this.haveRunConut=0;
      this.showRunRowNum=0;
      this.showHaveRunConut=0;
      this.pauseMultipleRunSimulateBool=false;
      this.stopMultipleRunSimulateBool=false;
      let  multipleRunPosToPosTimer = setInterval(() => {
              this.multiplePosToPosFun(multipleRunPosToPosTimer)
               }, 2500)
    },
    rePlayMultipleRunSimulate(){
      this.rePlayDisabled=true;
      this.pauseMultipleRunSimulateBool=false;
      this.stopMultipleRunSimulateBool=false;
      this.runRowNum=this.pauseRunRowNum;
      let  multipleRunPosToPosTimer = setInterval(() => {
              this.multiplePosToPosFun(multipleRunPosToPosTimer)
               }, 2500)
    },
    stopMultipleRunSimulate(){
      this.startDisabled=false;
      this.stopDisabled=true;
      this.rePlayDisabled=true;
      this.pauseDisabled=true;
      this.startDisabled=false;
      this.stopMultipleRunSimulateBool=true;
      this.TrackCountNum=0;
      this.runRowNum=0;
      this.haveRunConut=0;
      this.showRunRowNum=0;
      this.showHaveRunConut=0;
      console.log(this.stopMultipleRunSimulateBool);
      // this.theOldPos=this.multipleRunData[0];
    },
    pauseMultipleRunSimulate(){
      this.rePlayDisabled=false;
      this.pauseDisabled=true;
      this.pauseMultipleRunSimulateBool=true;
    },
    multiplePosToPosFun(timer){
      var that=this;
      setTimeout(()=>{
          if(that.stopMultipleRunSimulateBool==true){
            clearInterval(timer);
          }else{

              if(this.pauseMultipleRunSimulateBool==false){
                this.pauseRunRowNum=that.runRowNum;
                this.showRunRowNum=that.runRowNum;
                this.robotRunPosToPos(this.theOldPos,this.multipleRunData[that.runRowNum]);
                that.runRowNum=that.runRowNum+1;
                // if(this.showRunRowNum==this.multipleRunData.length-1){
                //   console.log(this.showHaveRunConut);
                //   this.showHaveRunConut=this.showHaveRunConut+1;
                //   console.log(this.showHaveRunConut);
                // }
                // 如需要停止定时器，只需加入以下：
                if(that.runRowNum==this.multipleRunData.length){
                  that.runRowNum=0;
                  that.haveRunConut=that.haveRunConut+1;
                  if(that.runModeRadio==1){
                    if(that.stopMultipleRunSimulateBool==true){
                      clearInterval(timer);
                      this.showHaveRunConut=0;
                      this.startDisabled=false;
                      // that.stopleMultipleRunSimulateBool=false;
                    }
                  }
                  if(that.runModeRadio==2){
                    console.log(that.stopMultipleRunSimulateBool)
                    clearInterval(timer);
                    this.startDisabled=false;
                  }
                  if(that.runModeRadio==3){
                    // that.haveRunConut=that.haveRunConut+1;
                    console.log(that.stopMultipleRunSimulateBool)
                    if(that.stopMultipleRunSimulateBool==false){
                      if(that.runCountSet==that.haveRunConut){
                        clearInterval(timer);
                        that.haveRunConut=0;
                        this.startDisabled=false;
                      }
                    }else{
                      clearInterval(timer);
                    }
                  }
              }
            }
            else{
              clearInterval(timer);
            }
          }

        }, 0)
    },
    robotRunPosToPos(theOldPos,theTargetPos){

      this.oneAxisChangeStep=(theTargetPos.oneAxis-theOldPos.oneAxis)/20;
      this.twoAxisChangeStep=(theTargetPos.twoAxis-theOldPos.twoAxis)/20;
      this.threeAxisChangeStep=(theTargetPos.threeAxis-theOldPos.threeAxis)/20;
      this.fourAxisChangeStep=(theTargetPos.fourAxis-theOldPos.fourAxis)/20;
      this.fiveAxisChangeStep=(theTargetPos.fiveAxis-theOldPos.fiveAxis)/20;
      this.sixAxisChangeStep=(theTargetPos.sixAxis-theOldPos.sixAxis)/20;
      this.senveAxisChangeStep=(theTargetPos.senveAxis-theOldPos.senveAxis)/20;

      let  runPosToPosTimer = setInterval(() => {
              this.posToPosFun(runPosToPosTimer,theOldPos,theTargetPos)
               }, 100)
    },
    posToPosFun(PosToPosTimer,theOldPos,theTargetPos) {
       var that=this;
       setTimeout(()=>{
         console.log('enter the PosToPostimer');
         console.log("that.stopMultipleRunSimulateBool:"+that.stopMultipleRunSimulateBool);
         console.log("that.pauseMultipleRunSimulateBool:"+that.pauseMultipleRunSimulateBool);
         console.log("that.TrackCountNum:"+that.TrackCountNum);
         if(that.stopMultipleRunSimulateBool==true){
           this.theOldPos.oneAxis=this.positionOfAxisInBlockly[0];
           this.theOldPos.twoAxis=this.positionOfAxisInBlockly[1];
           this.theOldPos.threeAxis=this.positionOfAxisInBlockly[2];
           this.theOldPos.fourAxis=this.positionOfAxisInBlockly[3];
           this.theOldPos.fiveAxis=this.positionOfAxisInBlockly[4];
           this.theOldPos.sixAxis=this.positionOfAxisInBlockly[5];
           this.theOldPos.senveAxis=this.positionOfAxisInBlockly[6];
           clearInterval(PosToPosTimer);
           console.log("have cleared");
         }
         else{
           if(that.pauseMultipleRunSimulateBool==false){
             // 这里ajax 请求的代码片段和判断是否停止定时器
             if(that.TrackCountNum<=19){
               this.positionOfAxisInBlockly[0]=(theOldPos.oneAxis + that.TrackCountNum*that.oneAxisChangeStep);//绕axis轴旋转π/8;
               this.positionOfAxisInBlockly[1]=(theOldPos.twoAxis + that.TrackCountNum*that.twoAxisChangeStep);//绕axis轴旋转π/8;
               this.positionOfAxisInBlockly[2]=(theOldPos.threeAxis+that.TrackCountNum*that.threeAxisChangeStep);//绕axis轴旋转π/8;
               this.positionOfAxisInBlockly[3]=(theOldPos.fourAxis+that.TrackCountNum*that.fourAxisChangeStep);//绕axis轴旋转π/8;
               this.positionOfAxisInBlockly[4]=(theOldPos.fiveAxis+that.TrackCountNum*that.fiveAxisChangeStep);//绕axis轴旋转π/8;
               this.positionOfAxisInBlockly[5]=(theOldPos.sixAxis+that.TrackCountNum*that.sixAxisChangeStep);//绕axis轴旋转π/8
               this.positionOfAxisInBlockly[6]=(theOldPos.senveAxis+that.TrackCountNum*that.senveAxisChangeStep);//绕axis轴旋转π/8;
             }
             that.TrackCountNum=that.TrackCountNum+1;
             // 如需要停止定时器，只需加入以下：
               if(that.TrackCountNum==20){
                 this.positionOfAxisInBlockly[0]=theTargetPos.oneAxis;//绕axis轴旋转π/8;
                 this.positionOfAxisInBlockly[1]=theTargetPos.twoAxis;//绕axis轴旋转π/8;
                 this.positionOfAxisInBlockly[2]=theTargetPos.threeAxis;//绕axis轴旋转π/8;
                 this.positionOfAxisInBlockly[3]=theTargetPos.fourAxis;//绕axis轴旋转π/8;
                 this.positionOfAxisInBlockly[4]=theTargetPos.fiveAxis;//绕axis轴旋转π/8;
                 this.positionOfAxisInBlockly[5]=theTargetPos.sixAxis;//绕axis轴旋转π/8
                 this.positionOfAxisInBlockly[6]=theTargetPos.senveAxis;//绕axis轴旋转π/8;

                 that.TrackCountNum=0;
                 clearInterval(PosToPosTimer);
                 this.theOldPos.oneAxis=this.positionOfAxisInBlockly[0];
                 this.theOldPos.twoAxis=this.positionOfAxisInBlockly[1];
                 this.theOldPos.threeAxis=this.positionOfAxisInBlockly[2];
                 this.theOldPos.fourAxis=this.positionOfAxisInBlockly[3];
                 this.theOldPos.fiveAxis=this.positionOfAxisInBlockly[4];
                 this.theOldPos.sixAxis=this.positionOfAxisInBlockly[5];
                 this.theOldPos.senveAxis=this.positionOfAxisInBlockly[6];
                 if(this.showRunRowNum==this.multipleRunData.length-1){
                   console.log(this.showHaveRunConut);
                   this.showHaveRunConut=this.showHaveRunConut+1;
                   console.log(this.showHaveRunConut);
                 }
               }
           }
           else{
             this.theOldPos.oneAxis=this.positionOfAxisInBlockly[0];
             this.theOldPos.twoAxis=this.positionOfAxisInBlockly[1];
             this.theOldPos.threeAxis=this.positionOfAxisInBlockly[2];
             this.theOldPos.fourAxis=this.positionOfAxisInBlockly[3];
             this.theOldPos.fiveAxis=this.positionOfAxisInBlockly[4];
             this.theOldPos.sixAxis=this.positionOfAxisInBlockly[5];
             this.theOldPos.senveAxis=this.positionOfAxisInBlockly[6];
             this.TrackCountNum=0;
             clearInterval(PosToPosTimer);
           }
         }

        }, 0)
       },
  }
  }

</script>

<style scoped>
/* button {
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
 */
/* h1 {
  font-weight: normal;
  font-size: 140%;
  margin-left: 5px;
  margin-right: 5px;
} */

/* Tabs */
/* #tabRow>td {
  border: 1px solid #ccc;
  border-bottom: none;
} */
/* td.tabon {
  border-bottom-color: #ddd !important; */
/*  background-color: #ddd;
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
} */
/* html[dir=rtl] td.tabmax {
  text-align: left;
} */
/* #tab_code {
  display: none;
} */

/* table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  border: none;
}
td {
  padding: 0;
  vertical-align: top;
} */
/* .content {
  visibility: hidden;
  margin: 0;
  padding: 1ex;
  position: absolute;
  direction: ltr;
} */
/* pre.content {
  border: 1px solid #ccc;
  overflow: scroll;
} */
/* #content_blocks {
  padding: 0;
} */
/* .blocklySvg {
  border-top: none !important;
} */
/* #content_xml {
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  font-family: monospace;
  overflow: scroll;
} */
/* #languageMenu {
  vertical-align: top;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
} */

/* Buttons */
/* button {
  padding: 1px 10px;
  margin: 1px 5px;
} */

/* Sprited icons. */
.icon21 {
  height: 21px;
  width: 21px;
  background-image: url(../assets/blockly_media/icons.png);
}
.trash {
  background-position: 0px 0px;
}
/* .link {
  background-position: -21px 0px;
} */
.run {
  background-position: -42px 0px;
}

@media (max-width: 710px) {
  /* .tab_collapse {
    display: none;
  } */
 /* #tab_code {
    display: table-cell;
  } */
}
/* Privacy link */
/* .privacyLink {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: small;
  text-decoration: none;
} */

#blockly2 {
  /* position: absolute;
  left: 0; */
  /* bottom: 0; */
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
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
  .blocklyPage{
    position: relative;
  }
  .buttonGroup{
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 10;
  }
  .jsCodeContain{
    position: relative;
  }
  .controlButtonGroup{
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 10;
  }
  .blocklyControlButton{
    font-size: 1rem;
     border: 2px solid red;
     border: 2px solid #0DB7F0;
     box-shadow: 3px 6px 8px 0 rgba(0, 0, 0, 0.5)
  }
  .blocklyControlButton:hover{
    font-size: 1.2rem;
     border: 2px solid red;
     border: 2px solid #0DB7F0;
     box-shadow: 1px 4px 6px 0 rgba(0, 0, 0, 0.5)
  }
  .robotControlButtonInBlockly{
    font-size: 0.6rem;
     box-shadow: 3px 6px 8px 0 rgba(0, 0, 0, 0.5)
  }
  .robotControlButtonInBlockly:hover{
    font-size: 0.6rem;
     box-shadow: 1px 4px 6px 0 rgba(0, 0, 0, 0.5)
  }
/* 媒体查询功能 */
/* 高度最大像素900像素 最小像素480像素 即高度在480-900之间时 */
@media only screen and (min-height:480px) and (max-height:800px){
.wholeWrap{
	  height: 650px;
	}
}
/* 高度最小像素901像素 即高度大于900时*/
@media only screen and (min-height:801px) {
	.wholeWrap{
	  height: 830px;
	}
}
</style>
