<template>
    <div>
        <el-button-group>
          <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
        </el-button-group>
        <hr />
       <img style="width:100%" src="../assets/python-zw.png" alt="">
    </div>
</template>

<script>
export default {
    name:'python',
    methods:{
      backToHome(){
        this.$router.push('/home');
      }
    }
}
</script>
