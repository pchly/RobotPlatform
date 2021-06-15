<template>
    <div class="wholeWrap">
      <div class="container-fluid topBar " style="height: 6%;position:fixed;z-index: 20;background-color: white;"><!-- //顶部返回，状态和急停的开始 -->
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
      <div class="container-fluid" style="height: 92%; margin-top: 3px;"><!-- 中间区域的开始 -->
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="bi bi-bar-chart-steps"></i> 运动参数</span>
              <el-tabs :tab-position="tabPosition" style="height: 400px;">
                  <el-tab-pane label="关节运动参数">
                    <el-tabs :tab-position="tabPosition" style="height: 400px;">
                        <el-tab-pane label="Joint1">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="oneAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="oneAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Joint2">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="twoAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="twoAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Joint3">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="threeAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="threeAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Joint4">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="fourAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="fourAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Joint5">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="fiveAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="fiveAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Joint6">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="sixAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="sixAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Joint7">
                          <!-- 控制滑块和计数器组 -->
                          <div class=" row text-center align-items-center justify-content-center"
                            style="height: 45px;"
                            v-for="(item,index) in controlAxisButtonText" :key=index>
                            <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                            <el-slider @input="settingAxisParameter(index)"
                            class=" col-8 positionSlider"
                            :min="-180" :max="180" v-model="senveAxisSettingData[index]"></el-slider>
                            <el-input-number class="col-2" @change="settingAxisParameter(index)"
                              v-model="senveAxisSettingData[index]"
                              :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                          </div>
                        </el-tab-pane>
                    </el-tabs>
                  </el-tab-pane>
                  <el-tab-pane label="笛卡尔运动参数">
                      <el-tabs :tab-position="tabPosition" style="height: 400px;">
                          <el-tab-pane label="X">
                            <!-- 控制滑块和计数器组 -->
                            <div class=" row text-center align-items-center justify-content-center"
                              style="height: 45px;"
                              v-for="(item,index) in controlAxisButtonText" :key=index>
                              <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                              <el-slider @input="settingXYZPYRParameter(index)"
                              class=" col-8 positionSlider"
                              :min="-180" :max="180" v-model="XAxisSettingData[index]"></el-slider>
                              <el-input-number class="col-2" @change="settingXYZPYRParameter(index)"
                                v-model="XAxisSettingData[index]"
                                :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Y">
                            <!-- 控制滑块和计数器组 -->
                            <div class=" row text-center align-items-center justify-content-center"
                              style="height: 45px;"
                              v-for="(item,index) in controlAxisButtonText" :key=index>
                              <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                              <el-slider @input="settingXYZPYRParameter(index)"
                              class=" col-8 positionSlider"
                              :min="-180" :max="180" v-model="YAxisSettingData[index]"></el-slider>
                              <el-input-number class="col-2" @change="settingXYZPYRParameter(index)"
                                v-model="YAxisSettingData[index]"
                                :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Z">
                            <!-- 控制滑块和计数器组 -->
                            <div class=" row text-center align-items-center justify-content-center"
                              style="height: 45px;"
                              v-for="(item,index) in controlAxisButtonText" :key=index>
                              <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                              <el-slider @input="settingXYZPYRParameter(index)"
                              class=" col-8 positionSlider"
                              :min="-180" :max="180" v-model="ZAxisSettingData[index]"></el-slider>
                              <el-input-number class="col-2" @change="settingXYZPYRParameter(index)"
                                v-model="ZAxisSettingData[index]"
                                :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Pitch">
                            <!-- 控制滑块和计数器组 -->
                            <div class=" row text-center align-items-center justify-content-center"
                              style="height: 45px;"
                              v-for="(item,index) in controlAxisButtonText" :key=index>
                              <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                              <el-slider @input="settingXYZPYRParameter(index)"
                              class=" col-8 positionSlider"
                              :min="-180" :max="180" v-model="PitchAxisSettingData[index]"></el-slider>
                              <el-input-number class="col-2" @change="settingXYZPYRParameter(index)"
                                v-model="PitchAxisSettingData[index]"
                                :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Yaw">
                            <!-- 控制滑块和计数器组 -->
                            <div class=" row text-center align-items-center justify-content-center"
                              style="height: 45px;"
                              v-for="(item,index) in controlAxisButtonText" :key=index>
                              <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                              <el-slider @input="settingXYZPYRParameter(index)"
                              class=" col-8 positionSlider"
                              :min="-180" :max="180" v-model="YawAxisSettingData[index]"></el-slider>
                              <el-input-number class="col-2" @change="settingXYZPYRParameter(index)"
                                v-model="YawAxisSettingData[index]"
                                :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Roll">
                            <!-- 控制滑块和计数器组 -->
                            <div class=" row text-center align-items-center justify-content-center"
                              style="height: 45px;"
                              v-for="(item,index) in controlAxisButtonText" :key=index>
                              <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                              <el-slider @input="settingXYZPYRParameter(index)"
                              class=" col-8 positionSlider"
                              :min="-180" :max="180" v-model="RollAxisSettingData[index]"></el-slider>
                              <el-input-number class="col-2" @change="settingXYZPYRParameter(index)"
                                v-model="RollAxisSettingData[index]"
                                :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                            </div>
                          </el-tab-pane>
                      </el-tabs>
                  </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="工具参数">
              <span slot="label"><i class="bi bi-tools"></i> 工具参数</span>
              <el-tabs :tab-position="tabPosition" style="height: 200px;">
                  <el-tab-pane label="末端工具类型">
                    <!-- 选择运行模式 -->
                     <el-radio-group style="width: 190px;" v-model="modeKindOfEndTool">
                        <el-radio  style="width: 60px;margin: 1px;" :label="2" @change="kindOfToolChange">无</el-radio>
                        <el-radio  style="width: 60px;margin: 1px;" :label="1" @change="kindOfToolChange">吸盘</el-radio>
                        <el-radio  style="width: 60px;margin: 1px;" :label="0" @change="kindOfToolChange">夹爪</el-radio>
                     </el-radio-group>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="配置管理">IO</el-tab-pane> -->
                </el-tabs>

            </el-tab-pane>
            <el-tab-pane label="相机参数">
              <span slot="label"><i class="bi bi-camera-video-fill"></i> 相机参数</span>
            </el-tab-pane>
            <el-tab-pane label="其他参数">
              <span slot="label"><i class="bi bi-patch-plus-fill"></i> 其他参数</span>
              <el-tabs :tab-position="tabPosition" style="height: 400px;">
                  <el-tab-pane label="初始点设置">
                    <!-- 控制滑块和计数器组 -->
                    <div class=" row text-center align-items-center justify-content-center"
                      style="height: 45px;"
                      v-for="(item,index) in AxisOriginSettingText" :key=index>
                      <el-tag class="col-1 controlButtonTag" style="font-size: 20px;">{{item.name}}</el-tag>
                      <el-slider
                      class=" col-8 positionSlider"
                      :min="-180" :max="180" v-model="AxisOriginSettingData[index]"></el-slider>
                      <el-input-number class="col-2"
                        v-model="AxisOriginSettingData[index]"
                        :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="直线运动参数设置">
                    <!-- 控制滑块和计数器组 -->
                    <div class=" row text-center align-items-center justify-content-center"
                      style="height: 45px;"
                      v-for="(item,index) in lineMoveSettingText" :key=index>
                      <el-tag class="col-1 controlButtonTag text-right" style="font-size: 15px;">{{item.name}}</el-tag>
                      <el-slider
                      class=" col-8 positionSlider"
                      :min="-180" :max="180" v-model="lineMoveSettingData[index]"></el-slider>
                      <el-input-number class="col-2"
                        v-model="lineMoveSettingData[index]"
                        :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                    </div>
                  </el-tab-pane>
                </el-tabs>


            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
</template>

<script>
//按照map的方法使用vuex的state数据
import {mapState,mapGetters,mapMutations} from 'vuex';
export default {
    name:'setting',
     data(){
        return{
          showInformationTable:false,
          tabPosition: 'left',
          AxisOriginSettingText:[
            {name:'1轴'},
            {name:'2轴'},
            {name:'3轴'},
            {name:'4轴'},
            {name:'5轴'},
            {name:'6轴'},
            {name:'7轴'}
          ],
          lineMoveSettingText:[
            {name:'最大速度'},
            {name:'最大加速度'},
            {name:'最大加加速度'}
          ],
          controlAxisButtonText:[
            {name:'负限位'},
            {name:'正限位'},
            {name:'最大速度'},
            {name:'最大加速度'},
            {name:'最大加加速度'}
          ],
         }
        },
     mounted(){
        window.addEventListener('resize', this.changeHeight);
     },
     computed:{
       //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
       //引入的各个轴的位置数据positionOfAxis
       ...mapState(['AxisOriginSettingData','lineMoveSettingData','oneAxisSettingData','twoAxisSettingData','threeAxisSettingData',
            'fourAxisSettingData','fiveAxisSettingData','sixAxisSettingData','senveAxisSettingData',
            'XAxisSettingData','YAxisSettingData','ZAxisSettingData',
            'RollAxisSettingData','PitchAxisSettingData','YawAxisSettingData',
            'moveVecReal','kindOfEndTool','suckControlDisEnable','jawControlDisEnable','theRunInformation','runErrorCount','runInformationDataBuff']),
       modeKindOfEndTool:{
         get(){
           return this.kindOfEndTool
         },
         set(value){
            this.mutationKindOfEndTool(value)
         }
       },
       },
     methods:{
       //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
       ...mapMutations(['mutationRunErrorCount','mutationMoveVecReal',
       'mutationKindOfEndTool','mutationJawControlDisEnable','mutationSuckControlDisEnable']),
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
        settingAxisParameter(){

        },
        settingXYZPYRParameter(){

        },
        kindOfToolChange(){
          console.log("toolChange");
          if(this.kindOfEndTool==2){
            console.log("tool Null");
            this.mutationJawControlDisEnable(true);
            this.mutationSuckControlDisEnable(true);
            console.log(this.jawControlDisEnable);
            console.log(this.suckControlDisEnable);
          }else if(this.kindOfEndTool==1){
             console.log("tool suck");
            this.mutationJawControlDisEnable(true);
            this.mutationSuckControlDisEnable(false);
            console.log(this.jawControlDisEnable);
            console.log(this.suckControlDisEnable);
          }else if(this.kindOfEndTool==0){
             console.log("tool jaw");
            this.mutationJawControlDisEnable(false);
            this.mutationSuckControlDisEnable(true);
            console.log(this.jawControlDisEnable);
            console.log(this.suckControlDisEnable);
          }
        }
        // changeHeight(){
        //     this.styObj.height=window.innerHeight-255+'px';
        //   },
        // getSize()
        // {
        //   console.log(this.styObj.height);
        // },
        // ParameterSelect(index)
        // {
        //   this.menu_index=index;
        // }
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
.ParameterSettingLeft{
    width: 20%;
    float: left;
}

.ParameterSettingRight{
    width: 80%;
    float: left;
}
/* 媒体查询功能 */
/* 高度最大像素900像素 最小像素480像素 即高度在480-900之间时 */
@media only screen and (min-height:480px) and (max-height:800px){
.rootContain{
	  height: 699px;
	}
}
/* 高度最小像素901像素 即高度大于900时*/
@media only screen and (min-height:801px) {
	.rootContain{
	  height: 830px;
	}
}
</style>
