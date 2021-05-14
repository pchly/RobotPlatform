<template>
    <div><el-button-group>
		  <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
		</el-button-group>
    <hr />
     <canvas id="myCa"></canvas>
     <img src="../assets/reserve.png" style="width:100%" alt="">
    </div>
</template>
<script>
export default {
    name:"reserve",
    data:function(){
        return{
          currentStep:1,
          clickedStep:1,
          sendMessage:'',
          receivedMessage:''
        }
    },
    mounted(){
      console.log('123');
      //获取上下文对象
      const canvas = document.querySelector("#myCa");
      var webGL = canvas.getContext("webgl");
      webGL.viewport(0,0,600,800);
      webGL.clearColor(0.0,1.0,0.0,0.5);
      webGL.clear(webGL.COLOR_BUFFER_BIT);
    },
    methods:{
      backToHome(){
        this.$router.push('/home');
      }
    }
}
</script>
