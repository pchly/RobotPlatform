<template>
    <div>
       <el-button-group>
         <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
       </el-button-group>
        <hr />
        <span>
            <div  class="ipAndPortInput" style="margin-top: 15px;">
                <el-input  placeholder="请输入ip地址" v-model="ip" class="input-with-select">
                    <el-select v-model="ip" slot="prepend" placeholder="请选择">
                    <el-option label="本地ip" value="127.0.0.1"></el-option>
                    <!-- <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option> -->
                    </el-select>
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                </el-input>
            </div>
            <div class="ipAndPortInput" style="margin-top: 15px;">
                <el-input  placeholder="请输入端口号" v-model="port" class="input-with-select">
                    <el-select v-model="port" slot="prepend" placeholder="请选择">
                    <el-option label="8888" value="8888"></el-option>
                    <!-- <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option> -->
                    </el-select>
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                 </el-input>
            </div>
            <el-button size="medium" class="buttonAboutServe" @click="linkToServe" :type=linkButtonType>{{linkButtonText}}</el-button>
        </span>
        <span>
            <hr>
        <el-input  style="width:500px" v-model="sendMessage" placeholder="发送的消息"></el-input>
         <el-button size="medium" class="buttonAboutServe" @click="sendMsg" type="primary">发送消息</el-button>
         <hr>
         <el-input rows="4" class="receivedInput" type="textarea" v-model="receivedMessage" placeholder="接收到的消息"></el-input>
        </span>

    </div>


</template>

<script>
//引入WebSocket
import WSocket from '../socket.js';
export default {
    name:' msg',
    data:function(){
        return{
            ip:'',
            port:'',
            sendMessage:'',
            receivedMessage:'',
            linkButtonType:'success',
            linkButtonText:'连接服务器',
            haveEverLink:false
        }
    },
    methods:{
        //触发的某一事件的回调函数里执行WebSocket的init，
        // 执行init时便开始尝试与服务器建立连接
        linkToServe(){
            if(this.linkButtonText=="断开连接"){
                 //发送消息的函数
             WSocket.send("close");
            }else{
                 //WebSocket自定义的初始化函数
                    WSocket.init({ip:this.ip,port:this.port},
                //服务器连接成功的生命周期函数
                    openevent=>{
                        //openevent为回调参数，里面包含各种连接信息
                    console.log(openevent);
                    console.log('opened');
                    this.linkButtonType="danger";
                    this.linkButtonText='断开连接';
                    this.haveEverLink=true;
                    },
                    //接收到消息的回调函数，消息的具体内容在message中
                    message=>{
                        if(this.receivedMessage=='')
                        {
                            this.receivedMessage+=message;
                        }else{
                            this.receivedMessage+="\n"+message;
                        }

                    console.log("enter reciver msg :");
                    console.log(message);
                    console.log('have reciver msg');
                    },
                    //出现错误的回调函数，具体错误信息在error参数里
                    error=>{
                    console.log(error);
                    console.log('have error');
                    this.$alert('服务器连接失败', '错误信息', {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.linkButtonType="success";
                                    }
                        });
                    },
                    //断开连接的回调函数，具体信息在closeevent中
                    closeevent=>{
                    console.log(closeevent);
                    console.log('closed');
                    if(this.haveEverLink){
                        this.$alert('服务器关闭', '信息提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.linkButtonText='连接服务器';
                                this.linkButtonType="success"
                            }
                        });
                    }
                 });

            }

        },
        //在某一个事件触发时调用sebd发送消息
        sendMsg(){
            //发送消息的函数
             WSocket.send(this.sendMessage);
        },
        backToHome(){
        this.$router.push('/home');
      }
    }
}
</script>
<style lang="">
    /* .buttonAboutServe{
        height:30px;
        text-align: center;

    } */
   .ipAndPortInput{
       width: 200px;
   }
   .receivedInput{
       background:  greenyellow;
       width: 500px;
       height: 50px;
   }
</style>
