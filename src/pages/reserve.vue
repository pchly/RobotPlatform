<template>
    <div>
      <el-button-group>
        <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
       </el-button-group>
    <hr />
    <div class="container-fluid">
      <div class="row">
         <div class=" col border" id="container" ref="piuuu" style="width: 350px;height: 350px;"></div>
      </div>
    </div>
    <el-button type="success" class="controlAxisRotate"
    v-for="(item,index) in controlButtonText" :key=index
    @click="controlAxisRotate(index)">
      {{item.name}}</el-button>
     <img src='../assets/reserve.png' style="width:100%" alt="">
    </div>
</template>
<script>
import * as Three from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
export default {
    name:"reserve",
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
          threeViewWidth:350,
          threeVieHeight:350,
          controlButtonText:[
            {name:'1轴'},
            {name:'2轴'},
            {name:'3轴'},
            {name:'4轴'},
            {name:'5轴'},
            {name:'6轴'},
            {name:'7轴'}
          ]
          // trackClock:null,
          // trackMixer:null,
          // oneAxisTrack:null,
          // oneAxisTrackValue:[],
          // TrackTimes:[]
        }

    },
    mounted(){
      console.log('12323');
      this.init();
      // this.animate();
    },
    methods:{
      backToHome(){
        this.$router.push('/home');
      },
      controlAxisRotate(index){
        console.log(index)
        if((index+1)==1){
          this.oneRotateGroup.rotation.y+=0.1;//绕axis轴旋转π/8;
        }
        if((index+1)==2){
          this.twoRotateGroup.rotation.x+=0.1;//绕axis轴旋转π/8;
        }
        if((index+1)==3){
         this.threeRotateGroup.rotation.y+=0.1;//绕axis轴旋转π/8;
        }
        if((index+1)==4){
          this.fourRotateGroup.rotation.x+=0.1;//绕axis轴旋转π/8;
        }
        if((index+1)==5){
          this.fiveRotateGroup.rotation.y+=0.1;//绕axis轴旋转π/8;
        }
        if((index+1)==6){
          this.sixRotateGroup.rotation.x+=0.1;//绕axis轴旋转π/8
        }
        if((index+1)==7){
          this.senveRotateGroup.rotation.y+=0.1;//绕axis轴旋转π/8;
        }
      },
      // 渲染函数
        renderFrame() {
            this.renderer.render(this.scene, this.camera); //执行渲染操作
            requestAnimationFrame(this.renderFrame);//请求再次执行渲染函数render，渲染下一帧

            //clock.getDelta()方法获得两帧的时间间隔
                  // 更新混合器相关的时间
            // this.trackMixer.update(this.trackClock.getDelta());
          },
          // //定义窗口的设置
          //  setWindown(){
          //    var that=this;
          //     //加入事件监听器,窗口自适应
          //     window.addEventListener('resize', function(){
          //       console.log(that.$refs)
          //       that.threeViewWidth = that.$refs.piuuu.offsetWidth; //窗口宽度
          //       // console.log(this.$refs.piuuu.offsetWidth);
          //       that.threeVieHeight = that.$refs.piuuu.offsetHeight; //窗口高度
          //       renderer.setSize(that.threeViewWidth,that.threeVieHeight);
          //       camera.aspect = that.threeViewWidth/that.threeVieHeight;
          //       camera.updateProjectionMatrix();
          //     });
          //   },
      init: function() {
        // this.setWindown();
        let container = document.getElementById("container");
              /**
             * 创建场景对象Scene
             */
           this.scene = new Three.Scene();
            // //各轴的旋转轴向量
            // var ewew = new Three.Vector3(177,0,-114);//向量axis
            // this.oneRotateAaxis = new Three.Vector3(-177,136,114);//向量axis
            //  this.oneRotateAaxis.addScaledVector(ewew,);
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

           // this.TrackTimes=[0,10];
           // this.oneAxisTrackValue=[1,6];
           // var duration = 10;
           // // 创建一个时钟对象Clock
           // this.trackClock = new Three.Clock();
            /**
             * stl数据加载
             */
            // var robotGroup=new Three.Group();
            var loader = new STLLoader();
            var that=this;
            //加载关节1
            loader.load('../../static/robotStl/Joint-1.stl',function (JointOneGeometry) {
              console.log(JointOneGeometry.boundingBox);
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

            //  console.log('99646464');
            //  console.log(that.oneRotateGroup);
            //  console.log(that.oneRotateGroup.rotation);
            // that.oneAxisTrack=new Three.KeyframeTrack('that.oneRotateGroup.rotation.y',that.TrackTimes,that.oneAxisTrackValue);
            // // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
            //     var clip = new Three.AnimationClip("default", duration, [that.oneAxisTrack]);

            //     /**
            //      * 播放编辑好的关键帧数据
            //      */
            //     // group作为混合器的参数，可以播放group中所有子对象的帧动画
            //     that.trackMixer = new Three.AnimationMixer(that.oneRotateGroup);
            //     // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
            //     var AnimationAction = that.trackMixer.clipAction(clip);
            //     //通过操作Action设置播放方式
            //     AnimationAction.timeScale = 10;//默认1，可以调节播放速度
            //     AnimationAction.loop = Three.LoopOnce; //不循环播放
            //     AnimationAction.play();//开始播放
           
           
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
            console.log(this.scene.children)
            /**
             * 相机设置
             */
            var width = this.threeViewWidth; //窗口宽度
            console.log(this.threeViewWidth);
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
            this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
            container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
            this.renderFrame();

             this.controls=new OrbitControls(this.camera,this.renderer.domElement);
             // this.controls.addEventListener('changer',renderFrame)
          }
    }
}
</script>
