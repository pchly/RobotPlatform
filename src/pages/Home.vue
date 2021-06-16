<template>
    <div class="wrap">
       <!-- 顶部内容开始 -->
       <div class="container-fluid" style="height: 8%;">
         <div class="row  border-bottom align-items-center justify-content-between">
           <div class="col-3 text-left">
             <img class="img-fluid" style="height: 40px;margin-top: 10px;" src="../assets/Link-img/logo.png" />
           </div>
           <div class="col-1 text-center"><i @click="routeToLinkPage()" class="bi bi-arrow-left-right"
           style="font-size: 30px;margin-top: 10px;"></i></div>
         </div>
       </div>
          <div class="container-fluid imgContain" style="height: 92%;">
              <div class="row  justify-content-center imgRow1">
                <div class="col-6  backImgInHomeVision  visionImg">
                   <img @click="routeToVision()" src=../assets/../assets/home-img/空白占位.png />
                </div>
                <div class="col-6  backImgInHomeBasicControl basicImg">
                   <img @click="routeToBasic()" src=../assets/../assets/../assets/home-img/空白占位.png />
                </div>
                <div class=" backImgInHomeSetting settingImg">
                   <img @click="routeToSetting()" src=../assets/../assets/../assets/home-img/空白占位小.png />
                </div>
              </div>
              <div class="row  justify-content-center imgRow2">
                <div class="col-6  backImgInHomePython  pythonImg">
                   <img @click="routeToPython()" src=../assets/../assets/home-img/空白占位.png />
                </div>
                <div class="col-6  backImgInHomeBlockly blocklyImg">
                   <img @click="routeToBlockly()" src=../assets/../assets/../assets/home-img/空白占位.png />
                </div>
              </div>
          </div>
        <!-- div.wrap--end -->
    </div>
</template>

<script>
//引入WebSocke
import WSocket from '../socket.js';
//按照map的方法使用vuex的state数据
import {mapState,mapGetters,mapMutations} from 'vuex';
// 创建存储图像文本数据的变量
let imgTextData='';
// 创建存储机器人状态数据的变量
let robotStateData='';

export default {
  name:'home',
  data:function(){
    return{
      sendMessage:'',
      receivedMessage:''
    }
  },
  computed:{
    //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
    //引入了headers页面跳转按钮文本数据、serverAndLinkInfo连接服务器相关参数、positionOfAxis各个轴的位置数据
    // 徐冰洁添加autoUpdateMessage服务器自动上报数据
    ...mapState(['headers','serverAndLinkInfo','positionOfAxis','autoUpdateMessage']),
  },
  methods: {
    //页面跳转函数
    routeToVision(){
      this.$router.push('/vision');
    },
    routeToBasic(){
      this.$router.push('/basicControl');
    },
    routeToSetting(){
      this.$router.push('/setting');
    },
    routeToPython(){
       this.$router.push('/python');
    },
    routeToBlockly(){
      this.$router.push('/blockly');
    },
    // routeTo(index){

    //   this.$router.push('/'+this.headers[index].name);
    // },
    routeToLinkPage(){
      console.log("1233")
      this.$router.push('/link');
    },
    //连接到服务器函数，进行webSocket的实例初始化
    linkToServer()
    {
      if(this.serverAndLinkInfo.linkButtonText=="断开连接")
      {
        //如果是断开连接，则直接发送close关闭服务器
        // WSocket.send("close");
        //如果是断开连接，则直接关闭客户端的ws
        WSocket.close();
        // autoUpdateWSocket.close();
      }
      else
      {
        //WebSocket自定义的初始化函数
        WSocket.init(
          // {ip:this.serverAndLinkInfo.ip,port:this.serverAndLinkInfo.port,portAuto:30002},
          {ip:this.serverAndLinkInfo.ip,port:502,portAuto:30002},

          //交互通信ws的事件函数
          //服务器连接成功的生命周期函数
          openevent=>{
            //openevent为回调参数，里面包含各种连接信息
            // console.log(openevent);
            console.log('opened');
            this.serverAndLinkInfo.linkButtonType="danger";
            this.serverAndLinkInfo.linkButtonText='断开连接';
            this.serverAndLinkInfo.haveEverLink=true;
          },
          //接收到消息的回调函数，消息的具体内容在message中
          message=>{
            //此处代码有问题，条件语句括号内为赋值操作
            // if(message="{have received}"){
            //   this.positionOfAxis.XAxis='100.0',
            //   this.positionOfAxis.YAxis='200.3'
            // }
            // if(this.receivedMessage=='')
            // {
            //     this.receivedMessage+=message;
            // }else{
            //     this.receivedMessage+="\n"+message;
            // }

            //添加数据解析的代码

            console.log("enter reciver msg :");
            console.log(message);
            console.log('have reciver the above msg');
          },
          //出现错误的回调函数，具体错误信息在error参数里
          error=>{
            console.log(error);
            console.log('have error');
            this.$alert('服务器连接失败', '错误信息', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.serverAndLinkInfo.linkButtonType="success";
                            }
                });
          },
          //断开连接的回调函数，具体信息在closeevent中
          closeevent=>{
            console.log(closeevent);
            console.log('closed');
            if(this.serverAndLinkInfo.haveEverLink){
                this.$alert('断开连接', '信息提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.serverAndLinkInfo.linkButtonText='连接服务器';
                        this.serverAndLinkInfo.linkButtonType="success"
                    }
                });
            }
          },

          //自动上报数据ws的事件函数
          //服务器连接成功的生命周期函数
          openevent=>{
            //openevent为回调参数，里面包含各种连接信息
            console.log('自动上报数据ws连接成功');
          },
          //接收到消息的回调函数，消息的具体内容在message中
          message=>{
            // 解析二进制数据需要通过FileReader读取数据
            let imgReader = new FileReader();
            let robotStateReader = new FileReader();
            // FileReader读取数据后将数据传出
            imgReader.onload = function(event){
              // 多层嵌套无法识别this变量，图像数据传递给中间变量
              imgTextData = imgReader.result;
            };
            robotStateReader.onload = function(event){
              // 将ArrayBuffer对象解析为8位无符号整型数组
              robotStateData = new Uint8Array(robotStateReader.result);
            };
            // 以文本方式读取图像的二进制数据，按照utf-8解码得到base64编码的字符串
            imgReader.readAsText(message.slice(243,message.length),'utf8');
            // 读取机器人状态的二进制数据，保存为ArrayBuffer对象
            robotStateReader.readAsArrayBuffer(message.slice(0,243));
            //接收到的数据传递给全局变量，供其他页面使用
            this.autoUpdateMessage.robotStateData = robotStateData;
            this.autoUpdateMessage.imgData = imgTextData;
            // console.log("自动上报的数据：");
            // console.log(this.autoUpdateMessage.robotStateData);
          },
          //出现错误的回调函数，具体错误信息在error参数里
          error=>{
            console.log(error);
            console.log('自动上报数据WS出现错误');
          },
          //断开连接的回调函数，具体信息在closeevent中
          closeevent=>{
            console.log(closeevent);
            console.log('自动上报数据WS已关闭');
            // 通信断开重新初始化全局变量
            this.autoUpdateMessage.robotStateData = new Uint8Array(243).fill(0);
            this.autoUpdateMessage.imgData = require("../assets/vision.png");
          }
        );//webSocket初始化init函数的右括号
      }//else的结束括号
    }//linkToServer点击槽函数的结束括号

      // ,
      // //在某一个事件触发时调用sebd发送消息
      // sendMsg(){
      //     //发送消息的函数
      //      WSocket.send(this.sendMessage);
      // }
  }
}
</script>

<style>
  .imgRow1{
    position: relative;
  }
  .imgRow2{
    position: relative;
  }
  .visionImg{
    position: absolute;
    top:5px;
    left:50px;
    z-index: 10;
  }
  .basicImg{
    position: absolute;
    top: 5px;
    left:922px;
     z-index: 10;
  }
  .settingImg{
    width: 370px;
    height: 370px;
    border-radius: 50%;
    position: absolute;
    top: 250px;
    left:761px;
    z-index: 11;
  }
  .pythonImg{
    position: absolute;
    top: 437px;
    left: -8px;
     z-index: 10;
  }
  .blocklyImg{
    position: absolute;
    top: 437px;
    left:867px;
     z-index: 10;
  }
  .backImgInHomeBasicControl{
    background-image: url(../assets/home-img/实时操控.png);
    background-repeat: round;
  }
  .backImgInHomeVision{
    background-image: url(../assets/home-img/视觉识别.png);
    background-repeat: round;
  }
  .backImgInHomeSetting{
    background-image: url(../assets/home-img/设置.png);
    background-repeat: round;
  }
  .backImgInHomePython{
    background-image: url(../assets/home-img/PYYHON.png);
    background-repeat: round;
  }
  .backImgInHomeBlockly{
    background-image: url(../assets/home-img/BLOCKLY.png);
    background-repeat: round;
  }
 .backImgInHomeBasicControl:hover{
    background-image: url(../assets/home-img/实时操控大.png);
    background-repeat: round;
  }
  .backImgInHomeVision:hover{
    background-image: url(../assets/home-img/视觉识别大.png);
    background-repeat: round;
  }
  .backImgInHomeSetting:hover{
    background-image: url(../assets/home-img/设置大.png);
    background-repeat: round;
  }
  .backImgInHomePython:hover{
    background-image: url(../assets/home-img/PYYHON大.png);
    background-repeat: round;
  }
  .backImgInHomeBlockly:hover{
    background-image: url(../assets/home-img/BLOCKLY大.png);
    background-repeat: round;
  }

  /* 媒体查询功能 */
  /* 宽度最大像素1500像素 最小像素480像素 即宽度在480-1500之间时 */
  @media only screen and (min-width:480px) and (max-width:1600px){
    .imgRow1{

      position: relative;
    }
    .imgRow2{
      position: relative;
    }
    .visionImg{
      height: 325px;
      position: absolute;
      top:5px;
      left:50px;
      /* box-shadow: 1px 4px 6px 0 rgba(0, 0, 0, 0.5) */
    }
    .basicImg{
      height: 325px;
      position: absolute;
      top: 5px;
      left:747px
    }
    .settingImg{
      width: 275px;
      height: 275px;
      position: absolute;
      top: 197px;
      left:625px
    }
    .pythonImg{
      height: 325px;
      position: absolute;
      top: 335px;
      left: 5px;
    }
    .blocklyImg{
      height: 325px;
      position: absolute;
      top: 335px;
      left:701px
    }
    }
</style>
