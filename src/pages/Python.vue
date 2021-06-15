<template>
    <div class="rootContain border">
      <div class="container-fluid topBar " style="height: 6%;position: fixed;z-index: 20;background-color: white;"><!-- //顶部返回，状态和急停的开始 -->
        <div class="row h-100">
           <el-button class="col-2 " style="font-size: 20px;" @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
           <!-- <el-link class="col-8" type="primary">主要链接</el-link> -->
           <div class="col-8 border text-center align-item-middle" style="padding-top: 11px;background-color: white;">
             <el-badge :value="runErrorCount" class="item">
               <el-button size="medium" style="font-size: 1.3rem;"
               @click="showInformationTable=true"
               type="text">{{theRunInformation}}</el-button>
             </el-badge>
           </div>
           <el-button class="col-2" style="font-size: 20px;" @click="scramButtonClicked" type="danger" icon="el-icon-refresh">急停</el-button>
        </div><!-- //顶部的结束 -->
      </div>
      <el-drawer
        title="运行日志信息"
        :visible.sync="showInformationTable"
        direction="rtl"
        size="60%">
         <el-table :data="runInformationDataBuff" :row-class-name="tableRowClassName">
            <el-table-column property="number" label="编号" width="90px"></el-table-column>
            <el-table-column property="type" label="错误类型"></el-table-column>
            <el-table-column property="content" label="内容"></el-table-column>
           <el-table-column property="time" label="时间"></el-table-column>
           <el-table-column label="操作">
                 <template slot-scope="scope">
                   <el-button
                     size="mini"
                     type="danger"
                     @click="handleDeleteRunInformation(scope.$index, scope.row)">删除</el-button>
                 </template>
            </el-table-column>
          </el-table>
      </el-drawer>
      <div class="container-fluid topBar " style="height: 6%;"></div>
      <div class="row align-items-center h-75" style="margin-top: 8px;">
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
      ...mapState(['theRunInformation','runErrorCount','runInformationDataBuff']),
           },
    methods:{
      //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
      ...mapMutations(['mutationRunErrorCount','mutationMoveVecReal',
      'mutationKindOfEndTool']),
      sumTheErrorCount(){
         this.mutationRunErrorCount(0);
        for(let i in this.runInformationDataBuff){
          if(this.runInformationDataBuff[i].grade=="error"){
            this.mutationRunErrorCount(this.runErrorCount+1);
          }
         }
      },
      tableRowClassName({row, rowIndex}) {
        console.log(19898989898);
        console.log(this.runErrorCount);
        console.log(rowIndex);
        console.log(this.runInformationDataBuff);
        if(this.runInformationDataBuff.length==0){
          return '';
        }
        else{
          return{
            'success-row':this.runInformationDataBuff[rowIndex].grade === 'success',
            'warning-row':this.runInformationDataBuff[rowIndex].grade === 'warning',
            'error-row':this.runInformationDataBuff[rowIndex].grade === 'error'
          }
        }
      },
      handleDeleteRunInformation(index, row){
        console.log(index, row);
        this.runInformationDataBuff.splice(index,1);
        for(let i in this.runInformationDataBuff){
            this.runInformationDataBuff[i].number=parseInt(i)+1
         }
        console.log(this.runInformationDataBuff);
        this.sumTheErrorCount();
      },
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
  .el-table .warning-row {
      background-color: yellow;
      color: #000000;
      font-size: 15px;
      font-family: "微软雅黑";
      font-weight: bold;
    }
  .el-table .success-row {
    background-color: greenyellow;
    color: #000000;
    font-size: 15px;
    font-family: "微软雅黑";
    font-weight: bold;
  }
  .el-table .error-row {
    background-color: red;
    color: #000000;
    font-size: 15px;
    font-family: "微软雅黑";
    font-weight: bold;
  }
  .jupyterWebView{
    /* position:fixed; */
            width: 100%;
            height: 100vh;
  }

/* 媒体查询功能 */
/* 高度最大像素900像素 最小像素480像素 即高度在480-900之间时 */
@media only screen and (min-height:480px) and (max-height:800px){
.wholeWrap{
	  height: 870px;
	}
}
/* 高度最小像素901像素 即高度大于900时*/
@media only screen and (min-height:801px) {
	.wholeWrap{
	  height: 1000px;
	}
}
</style>
