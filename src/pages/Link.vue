<template>
  <div class="rootContain">
        <!-- 顶部内容开始 -->
        <div class="container-fluid" style="height: 10%;">
          <div class="row  border-bottom align-items-end pb-2 " >
            <div class="col-6 text-left">
              <img class="img-fluid" style="height: 40px;margin-top: 10px;" src="../assets/Link-img/logo.png" />
            </div>
            <div class="col-6 text-right ">
              <div class="row justify-content-end">
                <div class="col-2 text-center ">
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link font-weight-bolder" style="font-size: 16px;">
                      帮助<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">版本信息</el-dropdown-item>
                      <el-dropdown-item command="b">语言设置</el-dropdown-item>
                      <el-dropdown-item command="c">帮助文档</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container  " style="height: 80%;max-width: 1200px;"><!-- 中间部分的主内容开始 -->
          <!-- 连接步骤的部分 -->
          <div class="row align-items-center  " style="height: 70%;" ><!-- 连接部分的开始div -->
              <!-- 第一步 -->
              <div class="col-3 " :class="isOneStep">
                <figure class="figure" id="1" @click="clickedStepCb">
                  <img src="../assets/Link-img/link_01.gif"
                  style="border-radius: 10%;"
                  class="figure-img img-fluid " alt="1">
                  <figcaption class="figure-caption text-center font-weight-bolder">1.开机</figcaption>
                </figure>
              </div>
              <!-- 第一部和第二部之间的箭头 -->
              <div class="col-1  text-center" >
               <i v-if="currentStep==1" class="bi bi-chevron-double-right  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
               <i v-else-if="currentStep==2" class="bi bi-chevron-double-left  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
               <i v-else-if="currentStep==3" class="bi bi-chevron-double-left  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
              </div>
              <!-- 第二步 -->
              <div class="col-3 " :class="isTwoStep">
                <figure class="figure" id="2" @click="clickedStepCb">
                  <img src="../assets/Link-img/link_02.gif"
                  style="border-radius: 10%;"
                  class="figure-img img-fluid  " alt="2">
                  <figcaption class="figure-caption text-center font-weight-bolder">2.连接网线</figcaption>
                </figure>
              </div>
              <!-- 第二步与第一步之间的箭头 -->
              <div class="col-1  text-center">
                <i v-if="currentStep==1" class="bi bi-chevron-double-right  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
                <i v-else-if="currentStep==2" class="bi bi-chevron-double-right  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
                <i v-else-if="currentStep==3" class="bi bi-chevron-double-left  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
              </div>
              <!-- 第三步 -->
              <div class="col-3 " :class="isThreeStep">
                <figure class="figure" id="3" @click="clickedStepCb">
                  <img src="../assets/Link-img/link_03.gif"
                  style="border-radius: 10%;"
                  class="figure-img img-fluid  " alt="3">
                  <figcaption class="figure-caption text-center font-weight-bolder">3.输入IP地址</figcaption>
                </figure>
              </div>
          </div><!-- 连接部分的结束div -->
          <div class="row align-items-center" style=" height: 30%;"><!-- 输入IP部分的开始 -->
            <div class="col-4 offset-3  pr-0" >
                <el-input  placeholder="请输入ip地址" v-model="modeServerIp">
                    <el-select v-model="modeServerIp" slot="prepend" placeholder="请选择">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <el-option label="本地ip" value="127.0.0.1"></el-option>
                    </el-select>
                </el-input>
            </div>
            <div class="col-2  pl-0">
              <el-button  class="linkButton" @click="linkToServer"
              :type="serverAndLinkInfo.linkButtonType">{{serverAndLinkInfo.linkButtonText}}
              </el-button>
            </div>
          </div><!-- 输入ip部分的结束 -->
        </div><!-- 中间部分的主内容结束 -->
        <div class="container-fluid pt-4  align-items-end" style="height: 10%;"><!-- 底端的内容 -->
            <div class="row justify-content-between  align-items-end">
              <div class="col-6 text-left">
                <i title="进入主页"class="bi bi-box-arrow-in-right pr-1 py-0 " style="font-size: 1.6rem; color: cornflowerblue;"
                @click="openHomePage"></i>
                <i class="bi bi-grip-vertical" style="font-size: 1.6rem; color: cornflowerblue;"></i>
                <i title="联系我们" class="footEmail bi bi-envelope pl-1 py-0 "
                @click="commucationWithUs"
                style="font-size: 1.6rem; color: cornflowerblue;"></i>

              </div>
              <div class="col-6  text-right" style="color:#7B7B84; font-size: 15px;">版本v1.0.0</div>
            </div>
        </div><!-- 底部内容结束 -->
  </div><!-- 最外层div结束 -->
</template>

<script>
  //引入WebSocke
  import WSocket from '../socket.js';
  //引入日志添加函数
  import addRunInf from '../addRunInformation.js'
  //按照map的方法使用vuex的state数据
  import {mapState,mapGetters,mapMutations} from 'vuex';
 export default{
    name:"link",
   data:function(){
       return{
         currentStep:1,
         clickedStep:1,
         sendMessage:'',
         receivedMessage:''
       }
   },
   computed:{
     //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
     //引入了headers页面跳转按钮文本数据、serverAndLinkInfo连接服务器相关参数、positionOfAxis各个轴的位置数据
     ...mapState(['runErrorCount','serverAndLinkInfo','runInformationDataBuff',,'positionOfAxis']),
     // v-mode双向绑定VUEX中的数据的正确方法
     modeServerIp:{
       get(){
         return this.serverAndLinkInfo.ip
       },
       set(value){
          this.mutationServerIp(value)
       }
     },
     isOneStep:function(){
         return{
           'col-4': this.clickedStep==1
         }
     },
     isTwoStep:function(){
         return{
           'col-4': this.clickedStep==2
         }
     },
     isThreeStep:function(){
         return{
           'col-4': this.clickedStep==3
         }
     }
   },
   methods:{
     //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
     ...mapMutations(['mutationRunErrorCount','mutationServerIp','mutationPositionOfXAxis','mutationTheRunInformationfunction']),
     clickedStepCb(event){
       this.clickedStep=event.target.alt;
       this.currentStep=this.clickedStep;
     },
     // 点击link页面右上角的菜单项的槽函数
     handleCommand(command) {
       this.$message('click on item ' + command);
       if(command=='a'){
         this.$message('版本V1.0.0');
       }
       if(command=='b'){
         this.$message('目前仅支持简体中文');
       }
       if(command=='c'){
         this.$message('即将跳转到官方页面');
         window.open('https:\\www.baidu.com', '_blank')
       }
      },
      commucationWithUs(){
         this.$alert('了解更多请访问官网www.ezcobot.com', '联系我们', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // this.$message({
                    //   type: 'info',
                    //   message: `action: ${ action }`
                    // });
                  }
                });
      },
     //连接到服务器函数，进行webSocket的实例初始化
     linkToServer(){
          if(this.serverAndLinkInfo.linkButtonText=="断开连接"){
           //如果是断开连接，则直接发送close关闭服务器
           WSocket.send("close");
           //如果是断开连接，则直接关闭客户端的ws
           WSocket.close();
          }else{
               //WebSocket自定义的初始化函数
                 WSocket.wsInit({ip:this.serverAndLinkInfo.ip,port:this.serverAndLinkInfo.port,portAuto:this.serverAndLinkInfo.portAuto},
              //交互通信ws的事件函数
                    //服务器连接成功的生命周期函数
                          openevent=>{
                          //openevent为回调参数，里面包含各种连接信息
                          console.log(openevent);
                          this.mutationTheRunInformationfunction('机械臂连接成功');
                          addRunInf.addRunInformation('success','连接信息','成功连接机械臂',this.runInformationDataBuff);
                          console.log(this.runInformationDataBuff);
                          console.log('opened');
                          this.serverAndLinkInfo.linkButtonType="danger";
                          this.serverAndLinkInfo.linkButtonText='断开连接';
                          this.serverAndLinkInfo.haveEverLink=true;
                           this.$router.push('/home');
                          },
                        //接收到消息的回调函数，消息的具体内容在message中
                        message=>{
                          if(message=="{have received}"){
                           // this.mutationPositionOfXAxis(120);
                          }
                            if(this.receivedMessage=='')
                            {
                                this.receivedMessage+=message;
                            }else{
                                this.receivedMessage+="\n"+message;
                            }

                        console.log("enter reciver msg :");
                        console.log(message);
                        console.log('have reciver the above msg');
                        },
                        //出现错误的回调函数，具体错误信息在error参数里
                        error=>{
                        console.log(error);
                        console.log('have error');
                        this.mutationTheRunInformationfunction('机械臂连接出错');
                        addRunInf.addRunInformation('error','连接信息','服务器连接失败',this.runInformationDataBuff);
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
                        this.mutationTheRunInformationfunction('未连接机械臂');
                        addRunInf.addRunInformation('warning','连接信息','连接机械臂断开',this.runInformationDataBuff);
                          if(this.serverAndLinkInfo.haveEverLink){
                              this.$alert('服务器关闭', '信息提示', {
                                  confirmButtonText: '确定',
                                  callback: () => {
                                      this.serverAndLinkInfo.linkButtonText='连接服务器';
                                      this.serverAndLinkInfo.linkButtonType="success"
                                  }
                              });
                          }
                       }
               );//webSocket初始化init函数的右括号
              //WebSocket自定义的初始化函数
                 WSocket.autoUpdateWsInit({ip:this.serverAndLinkInfo.ip,port:this.serverAndLinkInfo.port,portAuto:this.serverAndLinkInfo.portAuto},
              //交互通信ws的事件函数
                  //自动上报数据ws的事件函数
                        //服务器连接成功的生命周期函数
                        openevent=>{
                          //openevent为回调参数，里面包含各种连接信息
                          addRunInf.addRunInformation('success','连接信息','自动上报成功连接',this.runInformationDataBuff);
                          console.log('自动上报数据ws连接成功');
                        },
                        //接收到消息的回调函数，消息的具体内容在message中
                        message=>{
                          // // 解析二进制数据需要通过FileReader读取数据
                          // let imgReader = new FileReader();
                          // let robotStateReader = new FileReader();
                          // // FileReader读取数据后将数据传出
                          // imgReader.onload = function(event){
                          //   // 多层嵌套无法识别this变量，图像数据传递给中间变量
                          //   imgTextData = imgReader.result;
                          // };
                          // robotStateReader.onload = function(event){
                          //   // 将ArrayBuffer对象解析为8位无符号整型数组
                          //   robotStateData = new Uint8Array(robotStateReader.result);
                          // };
                          // // 以文本方式读取图像的二进制数据，按照utf-8解码得到base64编码的字符串
                          // imgReader.readAsText(message.slice(243,message.length),'utf8');
                          // // 读取机器人状态的二进制数据，保存为ArrayBuffer对象
                          // robotStateReader.readAsArrayBuffer(message.slice(0,243));
                          // //接收到的数据传递给全局变量，供其他页面使用
                          // this.autoUpdateMessage.robotStateData = robotStateData;
                          // this.autoUpdateMessage.imgData = imgTextData;
                          console.log("自动上报的数据：");
                          console.log(message);
                        },
                        //出现错误的回调函数，具体错误信息在error参数里
                        error=>{
                          console.log(error);
                          addRunInf.addRunInformation('error','连接信息','自动上报连接错误',this.runInformationDataBuff);
                          console.log('自动上报数据WS出现错误');
                        },
                        //断开连接的回调函数，具体信息在closeevent中
                        closeevent=>{
                          addRunInf.addRunInformation('warning','连接信息','自动上报连接断开',this.runInformationDataBuff);
                          console.log(closeevent);
                          console.log('自动上报数据WS已关闭');
                        }
               );//webSocket初始化init函数的右括号
          }//else的结束括号
      },//linkToServer点击槽函数的结束括号

      openHomePage(){
        this.$router.push('/home');
      }
   }

  }
</script>
<style>
.rootContain{
  height: 720px;
  border: 2px solid  white;
  background-color: white;
}
/* 媒体查询功能 */
/* 高度最大像素900像素 最小像素480像素 即高度在480-900之间时 */
@media only screen and (min-height:480px) and (max-height:800px){
.rootContain{
	  height: 700px;
	}
}
/* 高度最小像素901像素 即高度大于900时*/
@media only screen and (min-height:801px) {
	.rootContain{
	  height: 880px;
	}
}
</style>
