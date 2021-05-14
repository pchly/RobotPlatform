<template>
  <div>
    <el-button-group>
      <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
    </el-button-group>
   <img src="../assets/setting-zw.png" />
  </div>
</template>
<script>
export default {
    name:'setting',
    methods:{
      backToHome(){
        this.$router.push('/home');
      }
      },
}
</script>
