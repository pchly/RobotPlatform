<template>
  <div>
    <!-- 顶部内容开始 -->
    <div class="container-fluid">
      <div class="row mt-4 border-bottom align-items-end pb-2">
        <div class="col-6 text-left">
          <img class="img-fluid" style="height: 40px;" src="../assets/Link-img/logo.png" />
        </div>
        <div class="col-6 text-right ">
          <div class="row">
            <div class="col-3 offset-6 text-right">
               <span class="font-weight-bolder" style="font-size: 16px;">设置</span>
            </div>
            <div class="col-3 text-center">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link font-weight-bolder" style="font-size: 16px;">
                  帮助<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">版本信息</el-dropdown-item>
                  <el-dropdown-item command="b">语言设置</el-dropdown-item>
                  <el-dropdown-item command="c">待定..</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container"><!-- 中间部分的主内容开始 -->
      <!-- 连接步骤的部分 -->
      <div class="row  align-items-center"><!-- 连接部分的开始div -->
          <!-- 第一步 -->
          <div class="col-3 " :class="isOneStep">
            <figure class="figure" id="1" @click="clickedStepCb">
              <img src="../assets/Link-img/link-02.gif" class="figure-img img-fluid rounded-circle" alt="1">
              <figcaption class="figure-caption text-center font-weight-bolder">1.开机</figcaption>
            </figure>
          </div>
          <!-- 第一部和第二部之间的箭头 -->
          <div class="col-1  text-center" >
           <i v-if="currentStep==1" class="bi bi-chevron-double-right  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
           <i v-else-if="currentStep==2" class="bi bi-chevron-double-left  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
           <i v-else="currentStep==3" class="bi bi-chevron-double-left  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
          </div>
          <!-- 第二步 -->
          <div class="col-3 " :class="isTwoStep">
            <figure class="figure" id="2" @click="clickedStepCb">
              <img src="../assets/Link-img/link-02.gif" class="figure-img img-fluid  rounded-circle" alt="2">
              <figcaption class="figure-caption text-center font-weight-bolder">2.连接网线</figcaption>
            </figure>
          </div>
          <!-- 第二步与第一步之间的箭头 -->
          <div class="col-1  text-center">
            <i v-if="currentStep==1" class="bi bi-chevron-double-right  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
            <i v-else-if="currentStep==2" class="bi bi-chevron-double-right  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
            <i v-else="currentStep==3" class="bi bi-chevron-double-left  align-middle" style="font-size: 2rem; color: cornflowerblue;"></i>
          </div>
          <!-- 第三步 -->
          <div class="col-3 " :class="isThreeStep">
            <figure class="figure" id="3" @click="clickedStepCb">
              <img src="../assets/Link-img/link-02.gif" class="figure-img img-fluid rounded-circle " alt="3">
              <figcaption class="figure-caption text-center font-weight-bolder">3.输入IP地址</figcaption>
            </figure>
          </div>
      </div><!-- 连接部分的结束div -->
      <div class="row" style="margin-top: 8rem;"><!-- 输入IP部分的开始 -->
        <div class="col-4 offset-3  pr-0" >
            <el-input  placeholder="请输入ip地址" v-model="serverAndLinkInfo.ip">
                <el-select v-model="serverAndLinkInfo.ip" slot="prepend" placeholder="请选择">
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
    <div class="container-fluid  mb-0 mt-5"><!-- 底端的内容 -->
        <div class="row justify-content-between align-items-center">
          <div class="col-6 text-left">
            <i title="进入主页"class="bi bi-box-arrow-in-right pr-1 py-0 " style="font-size: 1.6rem; color: cornflowerblue;"
            @click="openHomePage"></i>
            <i class="bi bi-grip-vertical" style="font-size: 1.6rem; color: cornflowerblue;"></i>
            <i title="联系我们" class="footEmail bi bi-envelope pl-1 py-0 " style="font-size: 1.6rem; color: cornflowerblue;"></i>

          </div>
          <div class="col-6  text-right" style="color:#7B7B84; font-size: 15px;">版本v1.0.0</div>
        </div>
    </div>
  </div><!-- 最外层div结束 -->
</template>

<script>
  //引入WebSocke
  import WSocket from '../socket.js';
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
     ...mapState(['serverAndLinkInfo','positionOfAxis']),
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
     ...mapMutations(['mutationPositionOfXAxis']),
     clickedStepCb(event){
       this.clickedStep=event.target.alt;
       this.currentStep=this.clickedStep;
       console.log(this.clickedStep);
       console.log(this.currentStep);
     },
     handleCommand(command) {
       this.$message('click on item ' + command);
      },
     //连接到服务器函数，进行webSocket的实例初始化
     linkToServer(){
          if(this.serverAndLinkInfo.linkButtonText=="断开连接"){
               //如果是断开连接，则直接发送close关闭服务器
           WSocket.send("close");
          }else{
               //WebSocket自定义的初始化函数
                 WSocket.init({ip:this.serverAndLinkInfo.ip,port:this.serverAndLinkInfo.port},
              //服务器连接成功的生命周期函数
                  openevent=>{
                  //openevent为回调参数，里面包含各种连接信息
                  // console.log(openevent);
                  console.log('opened');
                  this.serverAndLinkInfo.linkButtonType="danger";
                  this.serverAndLinkInfo.linkButtonText='断开连接';
                  this.serverAndLinkInfo.haveEverLink=true;
                   this.$router.push('/home');
                  },
                  //接收到消息的回调函数，消息的具体内容在message中
                  message=>{
                    if(message="{have received}"){
                     this.mutationPositionOfXAxis(120);
                     // this.positionOfAxis.YAxis='200.3'
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
                      this.$alert('服务器关闭', '信息提示', {
                          confirmButtonText: '确定',
                          callback: () => {
                              this.serverAndLinkInfo.linkButtonText='连接服务器';
                              this.serverAndLinkInfo.linkButtonType="success"
                          }
                      });
                  }
               });//webSocket初始化init函数的右括号

          }//else的结束括号
      },//linkToServer点击槽函数的结束括号

      openHomePage(){
        console.log(123);
        this.$router.push('/home');
      }
   }

  }
</script>
<style>

</style>
