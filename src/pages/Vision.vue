<template>
    <div>
       <el-button-group>
         <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
       </el-button-group>
        <hr />
       <img src="../assets/vision.png" alt="">
    </div>
</template>
<script>
export default {
    name:'vision',
    methods:{
      backToHome(){
        this.$router.push('/home');
      }
    }
}
</script>
