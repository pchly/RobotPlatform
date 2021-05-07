<<<<<<< HEAD
<template>
    <div>
        <div class="wrap">
          <el-container>
            <!-- 头部 -->
            <el-header>EZCobot</el-header>
            <el-container>
              <!-- 侧边 -->
              <el-aside width="200px">
                 <el-button type="success" class="routeButton"
                 v-for="(item,index) in headers" :key=index
                 @click="routeTo(index)">
                   {{item.desc}}</el-button>
              </el-aside>
              <el-container>
                <!-- 主内容区域 -->
                <el-main>
                  <div class="IPInput">
                    <el-input  placeholder="请输入ip地址" v-model="serverAndLinkInfo.ip" class="input-with-select">
                        <el-select v-model="serverAndLinkInfo.ip" slot="prepend" placeholder="请选择">
                        <el-option label="本地ip" value="127.0.0.1"></el-option>
                        </el-select>
                        <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                    </el-input>
                  </div>
                   <el-button  class="linkButton" @click="linkToServer"
                   :type=serverAndLinkInfo.linkButtonType>{{serverAndLinkInfo.linkButtonText}}
                   </el-button>
                  <!-- <img src="../assets/zw-robot-img.png" style="width:1000px" alt="图标"> -->
                </el-main>
                <!-- 底部区域 -->
                <el-footer>www.ezcobot.com</el-footer>
              </el-container>
            </el-container>
          </el-container>
        </div>
        <!-- div.wrap--end -->
    </div>
</template>

<script>
  //引入WebSocke
  import WSocket from '../socket.js';
  //按照map的方法使用vuex的state数据
  import {mapState,mapGetters,mapMutations} from 'vuex';
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
      ...mapState(['headers','serverAndLinkInfo','positionOfAxis']),
    },
    methods: {
      //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
      ...mapMutations(['mutationPositionOfXAxis']),
      //页面跳转函数
      routeTo(index){
        this.$router.push('/'+this.headers[index].name);
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
  .wrap{

  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 40px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  .routeButton{
    margin: 10px 10px 10px 10px;
    display: block;
    width: 180px;
    height: 90px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 160px;
    background-image: url(../assets/zw-robot-img.png);
    background-repeat: no-repeat;
     background-position: center;
      background-attachment: fixed;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
  }
  .IPInput{
    display: inline-block;
    margin: 10px 10px 10px 10px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
=======
<template>
    <div>
        <div class="wrap">
          <el-container>
            <!-- 头部 -->
            <el-header>EZCobot</el-header>
            <el-container>
              <!-- 侧边 -->
              <el-aside width="200px">
                 <el-button type="success" class="routeButton"
                 v-for="(item,index) in headers" :key=index
                 @click="routeTo(index)">
                   {{item.desc}}</el-button>
              </el-aside>
              <el-container>
                <!-- 主内容区域 -->
                <el-main>
                  <div class="IPInput">
                    <el-input  placeholder="请输入ip地址" v-model="serverAndLinkInfo.ip" class="input-with-select">
                        <el-select v-model="serverAndLinkInfo.ip" slot="prepend" placeholder="请选择">
                        <el-option label="本地ip" value="127.0.0.1"></el-option>
                        <el-option label="服务器ip" value="192.168.0.1"></el-option>
                        </el-select>
                        <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                    </el-input>
                  </div>
                  <el-button  class="linkButton" @click="linkToServer"
                  :type=serverAndLinkInfo.linkButtonType>{{serverAndLinkInfo.linkButtonText}}</el-button>
                  <!-- <img src="../assets/zw-robot-img.png" style="width:1000px" alt="图标"> -->
                </el-main>
                <!-- 底部区域 -->
                <el-footer>www.ezcobot.com</el-footer>
              </el-container>
            </el-container>
          </el-container>
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
    routeTo(index){
      this.$router.push('/'+this.headers[index].name);
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
            // FileReader读取数据后将数据传出
            imgReader.onload = function(event){
              imgTextData = imgReader.result;//内容就在这里
            };
            // 以文本方式读取二进制数据
            imgReader.readAsText(message.slice(243,message.length),'utf8');
            //接收到的数据传递给全局变量，供其他页面使用
            // this.autoUpdateMessage.data=message;
            // 解析图像数据
            this.autoUpdateMessage.imgData='data:image/jpg;base64,'+ imgTextData;
            // console.log("自动上报的数据：");
            // console.log(this.autoUpdateMessage.data);
            // console.log("自动上报的图像数据：");
            // console.log(this.autoUpdateMessage.imgData);
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
  .wrap{

  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 40px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  .routeButton{
    margin: 10px 10px 10px 10px;
    display: block;
    width: 180px;
    height: 90px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 160px;
    background-image: url(../assets/zw-robot-img.png);
    background-repeat: no-repeat;
     background-position: center;
      background-attachment: fixed;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
  }
  .IPInput{
    display: inline-block;
    margin: 10px 10px 10px 10px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
>>>>>>> 727fa791d1ac39e4f9d52e41c71ae96f9e51f261
