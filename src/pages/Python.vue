<template>
    <div class="rootContain border">
      <div class="container-fluid topBar " style="height: 6%;"><!-- //顶部返回，状态和急停的开始 -->
        <div class="row h-100">
           <el-button class="col-2 " style="font-size: 20px;" @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
           <!-- <el-link class="col-8" type="primary">主要链接</el-link> -->
           <div class="col-8 border text-center align-item-middle" style="padding-top: 11px;">
             <el-badge :value="12" class="item">
               <el-button size="medium" style="font-size: 1.3rem;"
               @click="showInformationTable = true"
               type="text">{{theRunInformation}}</el-button>
             </el-badge>
           </div>
           <el-drawer
             title="运行日志信息"
             :visible.sync="showInformationTable"
             direction="rtl"
             size="50%">
              <el-table :data="runInformationDataBuff">
                 <el-table-column property="number" label="编号" ></el-table-column>
                 <el-table-column property="type" label="错误类型"></el-table-column>
                 <el-table-column property="content" label="内容"></el-table-column>
                  <el-table-column property="time" label="时间"></el-table-column>
               </el-table>
           </el-drawer>
           <el-button class="col-2" style="font-size: 20px;" @click="scramButtonClicked" type="danger" icon="el-icon-refresh">急停</el-button>
        </div><!-- //顶部的结束 -->
      </div>
      <div class="row">
        <div class="col">
          <iframe class="jupyterWebView" src="https://tool.lu/coderunner/" scrolling="no" frameborder="0"></iframe>
        </div>
      </div>
    </div>
</template>

<script>
 //按照map的方法使用vuex的state数据
 import {mapState,mapGetters,mapMutations} from 'vuex';
export default {
    name:'python',
    data(){
       return{
         showInformationTable:false,
         }
     },
    computed:{
      //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
      //引入的各个轴的位置数据positionOfAxis
      ...mapState(['theRunInformation','runInformationDataBuff']),
           },
    methods:{
      backToHome(){
        this.$router.push('/home');
      },
      scramButtonClicked(){
        console.log(12235555);
      },
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
