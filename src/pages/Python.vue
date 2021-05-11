<template>
    <div class="rootContain border">
      <div class="container-fluid">
        <div class="row ">
            <div class="col-3 p-0">
              <el-button-group>
                <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
              </el-button-group>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <iframe class="jupyterWebView" src="https://tool.lu/coderunner/" scrolling="no" frameborder="0"></iframe>
        </div>
      </div>
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
<style>
  .jupyterWebView{
    /* position:fixed; */
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
  }
</style>
