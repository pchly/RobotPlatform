<template>
    <div>
      <el-button-group>
        <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </el-button-group>
      <hr />
        <img  src="../assets/blockly.png" style="width:100%" alt="">
    </div>
</template>

<script>
export default {
    name:'blockly',
    methods:{
      backToHome(){
        this.$router.push('/home');
      }
    }
}
</script>
