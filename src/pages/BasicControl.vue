<template>
    <div class="wholeWrap">
      <div class="container-fluid  " style="height: 6%;"><!-- //顶部返回，状态和急停的开始 -->
        <div class="row h-100">
           <el-button class="col-2 " @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
           <el-link class="col-8" type="primary" disabled>主要链接</el-link>
           <el-button class="col-2" @click="scramButtonClicked" type="danger" icon="el-icon-refresh">急停</el-button>
        </div><!-- //顶部的结束 -->
      </div>
      <div class="container-fluid" style="height: 92%;"><!-- 中间区域的开始 -->
        <div class="row h-100  border">
          <div class="col-3"><!-- 侧边状态显示区域的开始 -->
            <div class="row" style="height: 40%;"><!-- 仿真机械臂显示区域 -->
              <div class="col text-center h-100"
              id="container" ref="piuuu"
              style="width: 500px;height: 350px;padding: 0px;"></div>
            </div>
            <div class="row justify-content-center" style="height: 60%;background-color: #D4D4D4;"><!-- 底部机械臂状态显示区域 -->
              <div class="col-5  stateCardLeft  border"><!-- 位置及姿态的显示区域 -->
                <div class="positionCard text-center"><!-- 位置卡片开始 -->
                    <div>
                      <span class="col cardTitle" >位置</span>
                    </div>
                    <div class="col xyzData">
                        <div>X:<span class="posiAndPoseData">100</span> mm</div>
                        <div>Y:<span class="posiAndPoseData">100</span> mm</div>
                        <div>Z:<span class="posiAndPoseData">100</span> mm</div>
                    </div>
                </div><!-- 位置卡片结束 -->
                <div class="postureCard text-center"><!-- 姿态卡片开始 -->
                    <div>
                      <span class="col cardTitle">姿态</span>
                    </div>
                    <div class="rpyData"><!-- 姿态角数据显示 -->
                        <div>Roll:<span class="posiAndPoseData">100</span> °</div>
                        <div>Pitch:<span class="posiAndPoseData">100</span> °</div>
                        <div>Yaw:<span class="posiAndPoseData">100</span> °</div>
                    </div><!-- 姿态角数据显示 -->
                </div><!-- 姿态卡片结束 -->
              </div>
              <div class="col-5 stateCardLeft border">
                <div class="positionCard text-center w-100 p-0 m-0 "><!-- 末端机构类型卡片开始 -->
                    <div>
                      <span class="col cardTitle ">末端机构类型</span>
                    </div>
                    <div>
                        <img src="../assets/Link-img/link-02.gif" style="width: 80%;" />
                    </div>
                </div><!-- 末端机构类型卡片结束 -->
                <div class="postureCard text-center w-100 p-0 m-0"><!-- 末端机构状态卡片开始 -->
                    <div>
                      <span class="col cardTitle">末端机构状态</span>
                    </div>
                    <div class="align-middle"><!-- 姿态角数据显示 -->
                        <el-switch
                          v-model="endMechanismValue"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          >
                        </el-switch>
                    </div><!-- 姿态角数据显示 -->
                </div><!-- 末端机构状态卡片结束 -->
              </div>
            </div>
          </div><!-- 侧边状态显示区域的结束 -->
          <div class="col-9 "><!-- 控制按钮区域的开始 -->
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-operation"></i>仿真控制</span>
                <div class=" row text-center align-items-center"
                  style="height: 60px;"
                  v-for="(item,index) in controlButtonText" :key=index>
                  <el-tag class="col-1" style="font-size: 20px;">{{item.name}}</el-tag>
                  <el-slider @input="controlAxisRotate(index)"
                  class=" col-8 positionSlider"
                  :min="-180" :max="180" v-model="positionOfAxisInSimulate[index]"></el-slider>
                  <el-input-number class="col-3" @change="controlAxisRotate(index)"
                    v-model="positionOfAxisInSimulate[index]"
                    :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                </div>
                <div class="row">
                  <div class="col text-right">
                   <el-button type="primary"
                   @click="backToZeroPosution"
                   icon="el-icon-refresh-right" circle></el-button>
                   <el-input v-model="remarksText"
                   style="display: inline-block;width: 200px;"
                   placeholder="请输入备注内容"></el-input>
                   <el-button type="primary"
                   icon="el-icon-s-order" @click="addExeclDataSimulate" circle></el-button>
                   <download-excel
                        style="display: inline-block;"
                        :data="outExeclDataSimulate"
                        :fields="outExeclFields"
                        name = "关节数据">
                       <el-button type="primary"
                       icon="el-icon-download" circle></el-button>
                   </download-excel>
                 </div>
                  <div class="row w-100" style="margin: 10px auto;">
                    <div class="col  border">
                       <el-table
                          :data="outExeclDataSimulate"
                          height="250"
                          style="width: 100%"
                          >
                          <el-table-column
                            prop="type"
                            label="序号">
                          </el-table-column>
                          <el-table-column
                            prop="oneAxis"
                            label="1轴" >
                          </el-table-column>
                          <el-table-column
                            prop="twoAxis"
                            label="2轴">
                          </el-table-column>
                          <el-table-column
                            prop="threeAxis"
                            label="3轴">
                          </el-table-column>
                          <el-table-column
                            prop="fourAxis"
                            label="4轴">
                          </el-table-column>
                          <el-table-column
                            prop="fiveAxis"
                            label="5轴">
                          </el-table-column>
                          <el-table-column
                            prop="sixAxis"
                            label="6轴">
                          </el-table-column>
                          <el-table-column
                            prop="senveAxis"
                            label="7轴">
                          </el-table-column>
                          <el-table-column
                            prop="remarks"
                            label="备注">
                          </el-table-column>
                          <el-table-column label="操作" width="180">
                                <template slot-scope="scope">
                                  <el-button
                                    size="mini"
                                    @click="handleRunSimulate(scope.$index, scope.row)">运行</el-button>
                                  <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDeleteSimulate(scope.$index, scope.row)">删除</el-button>
                                </template>
                              </el-table-column>
                        </el-table>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-check"></i>实物控制</span>
                我的行程
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-thumb"></i>拖动控制</span>
                我的行9
              </el-tab-pane>
            </el-tabs>
          </div><!-- 控制按钮区域的开始 -->
        </div><!-- 中间区域的结束 -->
        </div>
      </div>
    </div>
</template>
<script>
  import * as Three from "three";
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
  import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
  //引入WebSocke
  import WSocket from '../socket.js';
  import loadFile from '../loadFile.js';
  //引入机器人运动控制函数库文件
  import RBC from '../robotControl.js'
  //按照map的方法使用vuex的state数据
  import {mapState,mapGetters,mapMutations} from 'vuex';
  export default {
    name:'basicControl',
    data:function(){
      return{
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
        controls:null,
        controlButtonText:[
          {name:'1轴'},
          {name:'2轴'},
          {name:'3轴'},
          {name:'4轴'},
          {name:'5轴'},
          {name:'6轴'},
          {name:'7轴'}
        ],
        remarksTextSimulate:'',
        theCountOfDataSimulate:0,
        outExeclFields: {  //导出Excel表格的表头设置
                    '序号': 'type',
        	          '1轴': 'oneAxis',
        	          '2轴': 'twoAxis',
        	          '3轴': 'threeAxis',
        	          '4轴': 'fourAxis',
        	          '5轴': 'fiveAxis',
                    '6轴': 'sixAxis',
                    '7轴': 'senveAxis',
                    '备注':'remarks'
                  },
        outExeclDataSimulate:[],
        threeViewWidth:450,
        threeVieHeight:350,
        endMechanismValue:true
      }
    },
    computed:{
      //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
      //引入的各个轴的位置数据positionOfAxis
      ...mapState(['positionOfAxisInSimulate','firstRender']),
      // v-mode双向绑定VUEX中的数据的正确方法
    },
    mounted(){
      console.log('12323');
      this.threeViewWidth=this.$refs.piuuu.offsetWidth;
      this.threeVieHeight=this.$refs.piuuu.offsetHeight;
      this.init();
      this.setWindown();
      console.log(99999999999);
    },
    updated(){
      console.log('update');
    },
    methods:{
      //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
      ...mapMutations(['mutationfirstRender']),
      //返回主页
      backToHome(){
        this.$router.push('/home');
      },
      addExeclDataSimulate(){
        console.log("enterAddExeclData");
        let obj={
         		"type":'',
         		"oneAxis":this.positionOfAxisInSimulate[0],
         		"twoAxis":this.positionOfAxisInSimulate[1],
         		"threeAxis":this.positionOfAxisInSimulate[2],
         		"fourAxis":this.positionOfAxisInSimulate[3],
         		"fiveAxis":this.positionOfAxisInSimulate[4],
         		"sixAxis":this.positionOfAxisInSimulate[5],
         		"senveAxis":this.positionOfAxisInSimulate[6],
         		"remarks":this.remarksText
         	}

        // this.theCountOfDataSimulate+=1;
        this.outExeclDataSimulate.push(obj);
        for(let i in this.outExeclDataSimulate){
            this.outExeclDataSimulate[i].type=parseInt(i)+1
         }
      },
      handleRunSimulate(index, row) {
            console.log(index, row);
            this.oneRotateGroup.rotation.y=this.outExeclDataSimulate[index].oneAxis*Math.PI/180;//绕axis轴旋转π/8;
            this.twoRotateGroup.rotation.x=this.outExeclDataSimulate[index].twoAxis*Math.PI/180;//绕axis轴旋转π/8;
            this.threeRotateGroup.rotation.y=this.outExeclDataSimulate[index].threeAxis*Math.PI/180;//绕axis轴旋转π/8;
            this.fourRotateGroup.rotation.x=this.outExeclDataSimulate[index].fourAxis*Math.PI/180;//绕axis轴旋转π/8;
            this.fiveRotateGroup.rotation.y=this.outExeclDataSimulate[index].fiveAxis*Math.PI/180;//绕axis轴旋转π/8;
            this.sixRotateGroup.rotation.x=this.outExeclDataSimulate[index].sixAxis*Math.PI/180;//绕axis轴旋转π/8
            this.senveRotateGroup.rotation.y=this.outExeclDataSimulate[index].senveAxis*Math.PI/180;//绕axis轴旋转π/8;
            },
      handleDeleteSimulate(index, row) {
            console.log(index, row);
            this.outExeclDataSimulate.splice(index,1);
            for(let i in this.outExeclDataSimulate){
                this.outExeclDataSimulate[i].type=parseInt(i)+1
             }
            console.log(this.outExeclDataSimulate);
        },
      // 渲染函数
        renderFrame() {
            this.renderer.render(this.scene, this.camera); //执行渲染操作
            requestAnimationFrame(this.renderFrame);//请求再次执行渲染函数render，渲染下一帧
          },
          // //定义窗口的设置
           setWindown(){
             var that=this;
              //加入事件监听器,窗口自适应
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

      scramButtonClicked(){
        console.log(12235555);
      },
      controlAxisRotate(index){
        console.log(index)
        console.log(this.positionOfAxisInSimulate[index])
        if((index+1)==1){
          this.oneRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==2){
          this.twoRotateGroup.rotation.x=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==3){
         this.threeRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==4){
          this.fourRotateGroup.rotation.x=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==5){
          this.fiveRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==6){
          this.sixRotateGroup.rotation.x=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8
        }
        if((index+1)==7){
          this.senveRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
      },
      backToZeroPosution(){
        this.oneRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[0]=0.0;
        this.twoRotateGroup.rotation.x=0.0;
        this.positionOfAxisInSimulate[1]=0.0;
        this.threeRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[2]=0.0;
        this.fourRotateGroup.rotation.x=0.0;
        this.positionOfAxisInSimulate[3]=0.0;
        this.fiveRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[4]=0.0;
        this.sixRotateGroup.rotation.x=0.0;
        this.positionOfAxisInSimulate[5]=0.0;
        this.senveRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[6]=0.0;
      },
      beforeInitClearPosition(){
        this.oneRotateGroup.rotation.y=0.0;
        this.twoRotateGroup.rotation.x=0.0;
        this.threeRotateGroup.rotation.y=0.0;
        this.fourRotateGroup.rotation.x=0.0;
        this.fiveRotateGroup.rotation.y=0.0;
        this.sixRotateGroup.rotation.x=0.0;
        this.senveRotateGroup.rotation.y=0.0;
      },
      //基础控制页面发送数据的函数
      sendSocketMsgInBasicControl(){
            //发送消息的函数
            // WSocket.send("this.sendMessage");
            //执行运动控制函数
            RBC.xMove('200');
      }
    }
  }
</script>
<style>
  .wholeWrap{
  }
  .stateCardLeft{
    margin: 10px;
    padding:30px 10px 30px 10px;
    border-radius: 10px;
    background-color: #ECECEC;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .positionCard,.postureCard {
      font-size: 18px;
      margin: 10px;
      padding: 10px;
    }
    .cardTitle{
      font-size: 20px;
      font-family: "微软雅黑";
      font-weight: bold;
    }
    .posiAndPoseData{
      color: #00B0FF;
    }
    .positionSlider{
      display: inline-block;

      width: 450px;
    }


/* 媒体查询功能 */
/* 高度最大像素900像素 最小像素480像素 即高度在480-900之间时 */
@media only screen and (min-height:480px) and (max-height:900px){
.wholeWrap{
	  height: 710px;
	}
  .positionCard,.postureCard  {
      font-size: 14px;
      margin: 5px;
      padding: 5px;
    }
    .cardTitle{
      font-size: 16px;
      font-family: "微软雅黑";
      font-weight: bold;
    }
}
/* 高度最小像素901像素 即高度大于900时*/
@media only screen and (min-height:901px) {
	.wholeWrap{
	  height: 940px;
	}
}
</style>
