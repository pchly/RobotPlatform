<template>
    <div>
      <!-- 返回主页按钮 -->
		<el-button-group>
		  <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
		</el-button-group>
    <hr />
    <el-button @click="sendSocketMsgInBasicControl">
      发送位置
    </el-button>
    <div>{{positionOfAxis.XAxis}}</div>
        <img style="width:100%" src="../assets/basicControl-zw.png" alt="">
    </div>
</template>
<script>
  //引入WebSocke
  import WSocket from '../socket.js';
  //按照map的方法使用vuex的state数据
  import {mapState,mapGetters,mapMutations} from 'vuex';
  export default {
    name:'basicControl',
    data:function(){
      return{

      }
    },
    computed:{
      //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
      //引入的各个轴的位置数据positionOfAxis
      ...mapState(['positionOfAxis']),
    },
    methods:{
      //返回主页
      backToHome(){
        this.$router.push('/home');
      },
      //基础控制页面发送数据的函数
      sendSocketMsgInBasicControl(){
            //发送消息的函数
            WSocket.send("this.sendMessage");
      }
    }
  }
</script>
