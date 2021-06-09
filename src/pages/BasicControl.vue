<template>
    <div class="wholeWrap">
      <div class="container-fluid topBar " style="height: 6%;"><!-- //顶部返回，状态和急停的开始 -->
        <div class="row h-100">
           <el-button class="col-2 " style="font-size: 20px;" @click="backToHome" type="primary" icon="el-icon-arrow-left">
             返回</el-button>
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
      <div class="container-fluid" style="height: 92%;"><!-- 中间区域的开始 -->
        <div class="row h-100  border">
          <div class="col-3"><!-- 侧边状态显示区域的开始 -->
            <div class="row border" style="height: 40%;"><!-- 仿真机械臂显示区域 -->
              <div class="col text-center h-100"
              id="container" ref="piuuu"
              style="width: 500px;height: 350px;padding: 0px;"></div>
            </div>
            <div class="row justify-content-center" style="height: 16%;background-color: #D4D4D4;"><!--第一行 底部机械臂状态显示区域 -->
              <div class="col-5  stateCardLeft  border"><!-- 位置及姿态的显示区域 -->
                <div class="CardContent text-center"><!-- 位置卡片开始 -->
                    <div>
                      <span class="col cardTitle" >位置</span>
                    </div>
                    <div class="col xyzData">
                        <div>X:<span class="posiAndPoseData" ref='XPoseLable'>{{positionOfAxisInReal[0]}}</span> mm</div>
                        <div>Y:<span class="posiAndPoseData" ref='YPoseLable'>{{positionOfAxisInReal[1]}}</span> mm</div>
                        <div>Z:<span class="posiAndPoseData" ref='ZPoseLable'>{{positionOfAxisInReal[2]}}</span> mm</div>
                    </div>
                </div><!-- 位置卡片结束 -->
              </div>
              <div class="col-5 stateCardLeft border">
                <div class="CardContent text-center w-100  "><!-- 末端机构类型卡片开始 -->
                    <div>
                      <span class="col cardTitle ">末端机构类型</span>
                    </div>
                    <div >
                        <img v-if="kindOfEndTool==0" src="../assets/basicControlImge/endJaw.png" style="width: 60%;" />
                        <img v-else-if="kindOfEndTool==1" src="../assets/basicControlImge/endSuck.png" style="width: 60%;" />
                        <img v-else-if="kindOfEndTool==2" src="../assets/basicControlImge/endNone.png" style="width: 60%;" />
                    </div>
                </div><!-- 末端机构类型卡片结束 -->
              </div>
            </div>
            <div class="row justify-content-center" style="height: 16%;background-color: #D4D4D4;"><!--  第二行 底部机械臂状态显示区域 -->
              <div class="col-5  stateCardLeft  border"><!-- 位置及姿态的显示区域 -->
                <div class="CardContent text-center"><!-- 姿态卡片开始 -->
                    <div>
                      <span class="col cardTitle">姿态</span>
                    </div>
                    <div class="rpyData"><!-- 姿态角数据显示 -->
                        <div>Roll:<span class="posiAndPoseData" ref='RPoseLable'>{{positionOfAxisInReal[3]}}</span> °</div>
                        <div>Pitch:<span class="posiAndPoseData" ref='PPoseLable'>{{positionOfAxisInReal[4]}}</span> °</div>
                        <div>Yaw:<span class="posiAndPoseData" ref='YawPoseLable'>{{positionOfAxisInReal[5]}}</span> °</div>
                    </div><!-- 姿态角数据显示 -->
                </div><!-- 姿态卡片结束 -->
              </div>
              <div class="col-5 stateCardLeft border">
                <div class="CardContent text-center w-100 "><!-- 末端机构状态卡片开始 -->
                    <div>
                      <span class="col cardTitle">末端机构状态</span>
                    </div>
                    <div class="align-middle"><!-- 姿态角数据显示 -->
                        <img v-if="kindOfEndTool==0&&modePosOfEndJaw==0" src="../assets/basicControlImge/jawOpen.png" style="width: 60%;" />
                        <img v-else-if="kindOfEndTool==0&&modePosOfEndJaw!=0" src="../assets/basicControlImge/jawClose.png" style="width: 60%;" />
                        <img v-if="kindOfEndTool==1&&stateOfEndSuck==false" src="../assets/basicControlImge/suckOff.png" style="width: 60%;" />
                        <img v-else-if="kindOfEndTool==1&&stateOfEndSuck==true" src="../assets/basicControlImge/suckOn.png" style="width: 60%;" />
                        <img v-else-if="kindOfEndTool==2" src="../assets/basicControlImge/endNone.png" style="width: 60%;" />
                    </div><!-- 姿态角数据显示 -->
                </div><!-- 末端机构状态卡片结束 -->
              </div>
            </div>
            <div class="row justify-content-center" style="height: 16%;background-color: #D4D4D4;"><!--第一行 底部机械臂状态显示区域 -->
              <div class="col-5  stateCardLeft  border"><!-- 控制模式的显示区域 -->
                <div class="CardContent text-center"><!-- 控制模式卡片开始 -->
                    <div>
                      <span class="col cardTitle" >模式</span>
                    </div>
                    <div class="col xyzData">
                        <div>
                          <span v-if="modeEnableRobot==false" class="posiAndPoseData">仿真机械臂</span>
                          <span v-else-if="modeEnableRobot==true" class="posiAndPoseData">真实机械臂</span>
                        </div>
                        <div>
                          <span v-if="runModeRadio==1&&modeEnableRobot==false" class="posiAndPoseData">循环模式</span>
                          <span v-else-if="runModeRadio==2&&modeEnableRobot==false" class="posiAndPoseData">单次模式</span>
                          <span v-else-if="runModeRadio==3&&modeEnableRobot==false" class="posiAndPoseData">设定模式</span>
                        </div>
                        <div>
                          <span v-if="realRobotControlMode==1&&modeEnableRobot==true" class="posiAndPoseData">点动模式</span>
                          <span v-else-if="realRobotControlMode==2&&modeEnableRobot==true" class="posiAndPoseData">手动模式</span>
                        </div>
                    </div>
                </div><!-- 位置卡片结束 -->
              </div>
              <div class="col-5 stateCardLeft border">
                <div class="CardContent text-center w-100  "><!-- 末端机构类型卡片开始 -->
                    <div>
                      <span class="col cardTitle ">当前运行过程</span>
                    </div>
                    <div>
                        <div>
                          <div>当前运行第<span  class="posiAndPoseData">{{showRunRowNum}}</span>组</div>
                          <div>已经运行第<span  class="posiAndPoseData">{{showHaveRunConut}}</span>次</div>
                        </div>
                    </div>
                </div><!-- 末端机构类型卡片结束 -->
              </div>
            </div>
            <div class="row justify-content-center" style="height: 12%;background-color: #D4D4D4;"><!--第三行 底部机械臂状态显示区域 -->
            </div>
          </div><!-- 侧边状态显示区域的结束 -->
          <div class="col-9"><!-- 控制按钮区域的开始 -->
            <el-tabs type="border-card" style="height: 100%;"><!-- 运动控制选项卡 -->
              <el-tab-pane><!-- 仿真运动控制页面部分 -->
              <span slot="label"><i class="bi bi-file-earmark-slides-fill"></i> 仿真控制</span>
                <!-- 控制滑块和计数器组 -->
                <div class=" row text-center align-items-center"
                  style="height: 45px;"
                  v-for="(item,index) in controlAxisButtonText" :key=index>
                  <el-tag class="col-1 controlButtonTag" style="font-size: 20px;">{{item.name}}</el-tag>
                  <el-slider @input="controlAxisRotateInSimulate(index)"
                  class=" col-8 positionSlider"
                  :min="-180" :max="180" v-model="positionOfAxisInSimulate[index]"></el-slider>
                  <el-input-number class="col-3" @change="controlAxisRotateInSimulate(index)"
                    v-model="positionOfAxisInSimulate[index]"
                    :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                </div>
                <!-- 回原点、输入备注、记录数据等按钮所在行 -->
                <div class="row">
                  <div class="col text-right">
                      <el-divider content-position="left">数据记录</el-divider>
                      <!-- 回到原点 -->
                      <el-tooltip class="item" effect="dark" content="回到原点" placement="bottom">
                          <el-button type="primary"
                          @click="backToZeroPosition"
                          icon="el-icon-refresh-right" circle class="runModeAndDataSaveAboutButton" alet="12">
                          </el-button>
                      </el-tooltip>
                      <!-- 输入备注 -->
                     <el-input  v-model="remarksTextSimulate"
                     style="display: inline-block;width: 150px;"
                     placeholder="请输入备注内容">
                     </el-input>
                     <!-- 记录数据按钮 -->
                     <el-tooltip class="item" effect="dark" content="记录数据" placement="bottom">
                         <el-button type="primary"
                         icon="el-icon-s-order" @click="addExeclDataSimulate" circle class="runModeAndDataSaveAboutButton">
                         </el-button>
                     </el-tooltip>
                      <!-- 保存EXECL文件按钮 -->
                     <download-excel
                          style="display: inline-block;"
                          :data="outExeclDataSimulate"
                          :fields="outExeclFields"
                          name = "关节数据">
                          <el-tooltip class="item" effect="dark" content="保存文件" placement="bottom">
                             <el-button type="primary"
                             icon="el-icon-folder-add" circle class="runModeAndDataSaveAboutButton">
                             </el-button>
                          </el-tooltip>
                     </download-excel>
                     <!-- 打开EXECL文件按钮 -->
                     <label class="upLoadExeclFile" for="fileinp">
                       <el-tooltip class="item" effect="dark" content="打开数据文档" placement="bottom">
                          <el-button circle id="upLoadBtn" type="primary" class="runModeAndDataSaveAboutButton" icon="el-icon-notebook-1">
                          </el-button>
                       </el-tooltip>
                       <input type="file" id="fileinp" ref="upload" style="width: 50px;"
                       accept=".xls,.xlsx" class="outputlist_upload">
                     </label>
                     <!-- 选择运行模式 -->
                      <el-radio-group style="width: 190px;" v-model="runModeRadio">
                         <el-radio  style="width: 60px;margin: 1px;" :label="1">循环</el-radio>
                         <el-radio  style="width: 60px;margin: 1px;" :label="2">单次</el-radio>
                         <el-radio  style="width: 60px;margin: 1px;" :label="3">设定</el-radio>
                      </el-radio-group>
                      <el-input-number  style="width: 85px;" v-model="runCountSet" controls-position="right" :min="1" :max="10"></el-input-number>
                     <!-- 按照模式运行按钮 -->
                     <el-tooltip class="item"  effect="dark" content="启动" placement="bottom">
                         <el-button type="primary" :disabled="startDisabled"
                         @click="startMultipleRunSimulate"
                         icon="el-icon-timer" circle class="runModeAndDataSaveAboutButton">
                         </el-button>
                     </el-tooltip>
                     <el-tooltip class="item"  effect="dark" content="开始运行" placement="bottom">
                         <el-button type="primary" :disabled="rePlayDisabled"
                         @click="rePlayMultipleRunSimulate"
                         icon="el-icon-video-play" circle class="runModeAndDataSaveAboutButton" >
                         </el-button>
                     </el-tooltip>
                     <el-tooltip class="item"  effect="dark" content="暂停运行" placement="bottom">
                         <el-button type="primary" :disabled="pauseDisabled"
                         @click="pauseMultipleRunSimulate"
                         icon="el-icon-video-pause" circle class="runModeAndDataSaveAboutButton">
                         </el-button>
                     </el-tooltip>
                     <el-tooltip class="item"  effect="dark" content="停止运行" placement="bottom">
                         <el-button type="primary" :disabled="stopDisabled"
                         @click="stopMultipleRunSimulate"
                         icon="el-icon-circle-close" circle class="runModeAndDataSaveAboutButton">
                         </el-button>
                     </el-tooltip>

                  </div>
                 </div><!-- 按钮控制行的结束 -->
                   <!-- 数据表格所在行 -->
                  <div class="row w-100" style="margin: 10px auto;">
                    <div class="col  border">
                       <!-- 数据表格 -->
                       <el-table
                          :data="outExeclDataSimulate"
                          height="350px"
                          style="width: 100%"
                          @selection-change="handleTableRowSelectionChange"
                          >
                         <!-- //多选框列 -->
                          <el-table-column
                                type="selection"
                                width="55">
                              </el-table-column>
                          <!-- 第一列 -->
                          <el-table-column
                            prop="type"
                            label="序号">
                          </el-table-column>
                          <!-- 第二列 -->
                          <el-table-column
                            prop="oneAxis"
                            label="1轴" >
                          </el-table-column>
                          <!-- 第三列 -->
                          <el-table-column
                            prop="twoAxis"
                            label="2轴">
                          </el-table-column>
                          <!-- 第四列 -->
                          <el-table-column
                            prop="threeAxis"
                            label="3轴">
                          </el-table-column>
                          <!-- 第五列 -->
                          <el-table-column
                            prop="fourAxis"
                            label="4轴">
                          </el-table-column>
                          <!-- 第六列 -->
                          <el-table-column
                            prop="fiveAxis"
                            label="5轴">
                          </el-table-column>
                          <!-- 第七列 -->
                          <el-table-column
                            prop="sixAxis"
                            label="6轴">
                          </el-table-column>
                          <!-- 第八列 -->
                          <el-table-column
                            prop="senveAxis"
                            label="7轴">
                          </el-table-column>
                          <!-- 第九列 -->
                          <el-table-column
                            prop="remarks"
                            label="备注">
                          </el-table-column>
                          <!-- 第十列 -->
                          <el-table-column label="操作" width="180">
                                <template slot-scope="scope">
                                  <el-button
                                    size="mini"
                                    @click="handleRunSimulate(scope.$index, scope.row)">运行</el-button>
                                  <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDeleteSimulate(scope.$index, scope.row)">删除</el-button>
                                </template>
                              </el-table-column>
                        </el-table>
                    </div>
                  </div>
              </el-tab-pane>
              <!-- 实物控制tab页面 -->
              <el-tab-pane>
                  <span slot="label"><i class="bi bi-joystick"></i> 实物控制</span>
                  <!-- 控制按钮和计数器组 -->
                  <div class=" row text-center align-items-top">
                    <div class=" col-3 p-0">
                      <div class="text-center "
                        style="height: 50px;"
                        v-for="(item,index) in controlAxisButtonText" :key=index>
                        <el-tag class="col-4 controlButtonTag" style="font-size: 20px;width: 20%;">{{item.name}}</el-tag>
                        <el-input-number class="col-8" @change="controlAxisReal(index)"
                          v-model="positionOfAxisInReal[index]"
                          style="width: 80%;"
                          :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                      </div>
                    </div>
                    <div class="col-6  RealRobotControlButton ">
                      <div class="row" style="width: 100%;">
                          <div class="col-6 XYZButton " style="width: 50%;">
                              <label class="ControlButton zPosBtn" for="zPosBtn">
                                   <el-button class="controlBtnDown" circle id="zPosBtn"
                                   @click="zControlPosAdd"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp" src="../assets/basicControlImge/Z+.png" id="zPosImg" />
                                <!-- <img class="controlBtnUpHover" src="../assets/basicControlImge/Z-.png" id="zPosImg" /> -->
                              </label>
                              <label class="ControlButton zNegBtn" for="zNegBtn">
                                   <el-button class="controlBtnDown" circle id="zNegBtn"
                                   @click="zControlPosSub"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img  class="controlBtnUp" src="../assets/basicControlImge/Z-.png" id="zNegImg" />
                                <!-- <img class="controlBtnUpHover" src="../assets/basicControlImge/Z+.png" id="zPosImg" /> -->
                              </label>
                              <label class="ControlButton xPosBtn" for="xPosBtn">
                                   <el-button class="controlBtnDown" circle id="xPosBtn"
                                   @click="xControlPosAdd"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img  class="controlBtnUp" src="../assets/basicControlImge/X+.png" id="xPosImg" />
                              </label>
                              <label class="ControlButton xNegBtn" for="xNegBtn">
                                   <el-button class="controlBtnDown" circle id="xNegBtn"
                                   @click="xControlPosSub"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp" src="../assets/basicControlImge/X-.png" id="xNegImg" />
                              </label>
                              <label class="ControlButton yPosBtn" for="yPosBtn">
                                   <el-button class="controlBtnDown" circle id="yPosBtn"
                                   @click="yControlPosAdd"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp" src="../assets/basicControlImge/Y+.png" id="yPosImg" />
                              </label>
                              <label class="ControlButton yNegBtn" for="yNegBtn">
                                   <el-button class="controlBtnDown" circle id="yNegBtn"
                                   @click="yControlPosSub"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp"src="../assets/basicControlImge/Y-.png" id="yNegImg" />
                              </label>
                          </div>
                          <div class="col-6 RPYButton " style="width: 50%;">
                              <label class="ControlButton rPosBtn" for="rPosBtn">
                                   <el-button class="controlBtnDown" circle id="rPosBtn"
                                   @click="rControlPosAdd"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp" src="../assets/basicControlImge/Z+.png" id="zPosImg" />
                                <!-- <img class="controlBtnUpHover" src="../assets/basicControlImge/Z-.png" id="zPosImg" /> -->
                              </label>
                              <label class="ControlButton rNegBtn" for="rNegBtn">
                                   <el-button class="controlBtnDown" circle id="rNegBtn"
                                   @click="rControlPosSub"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img  class="controlBtnUp" src="../assets/basicControlImge/Z-.png" id="zNegImg" />
                                <!-- <img <class="controlBtnUpHover" src="../assets/basicControlImge/Z+.png" id="zPosImg" /> -->
                              </label>
                              <label class="ControlButton pPosBtn" for="pPosBtn">
                                   <el-button class="controlBtnDown" circle id="pPosBtn"
                                   @click="pControlPosAdd"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img  class="controlBtnUp" src="../assets/basicControlImge/X+.png" id="xPosImg" />
                              </label>
                              <label class="ControlButton pNegBtn" for="pNegBtn">
                                   <el-button class="controlBtnDown" circle id="pNegBtn"
                                   @click="pControlPosSub"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp" src="../assets/basicControlImge/X-.png" id="xNegImg" />
                              </label>
                              <label class="ControlButton yawPosBtn" for="yawPosBtn">
                                   <el-button class="controlBtnDown" circle id="yawPosBtn"
                                   @click="yawControlPosAdd"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp" src="../assets/basicControlImge/Y+.png" id="yPosImg" />
                              </label>
                              <label class="ControlButton yawNegBtn" for="yawNegBtn">
                                   <el-button class="controlBtnDown" circle id="yawNegBtn"
                                   @click="yawControlPosSub"
                                   type="primary" style="font-size: 1rem;" icon="el-icon-notebook-1">
                                   </el-button>
                                <img class="controlBtnUp"src="../assets/basicControlImge/Y-.png" id="yNegImg" />
                              </label>
                          </div>
                      </div>

                    </div>
                    <div class=" col-3  p-0 align-items-center">
                      <div class="text-left "
                        style="height: 50px;">
                        <el-tag class="col-6 controlButtonTag" style="font-size: 20px;">笛卡尔坐标</el-tag>
                      </div>
                      <div class="text-left "
                        style="height: 50px;"
                        v-for="(item,index) in controlPosButtonText" :key=index>
                        <el-tag class="col-4 controlButtonTag XYZRPYPosTag">{{item.name}}</el-tag>
                        <el-input-number  class="col-8" @change="controlPOsXYZRPYReal(index)"
                          v-model="positionOfXYZRPYInReal[index]"
                          style="width: 80%;"
                          :precision="2" :step="1" :min="-180" :max="180"></el-input-number>
                      </div>
                    </div>

                  </div>
                  <el-divider content-position="left"></el-divider>
                  <!-- 第二行所在行 -->
                  <div class="row text-center justify-content-center">
                    <div class="col-1 controlCardCenter text-center">
                      <div class="CardContent text-center m-0 w-100 "><!-- 末端机构状态卡片开始 -->
                          <div>
                            <span class="cardTitle">使能控制</span>
                          </div>
                          <div class="align-middle"><!-- 姿态角数据显示 -->
                              <el-switch
                              @change="enableControl"
                                v-model="modeEnableRobot"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                style="margin-top: 10px;"
                                >
                              </el-switch>
                          </div><!-- 姿态角数据显示 -->
                      </div><!-- 末端机构状态卡片结束 -->
                    </div>
                    <div class="col-1 controlCardCenter text-center">
                      <div class="CardContent text-center w-100  m-0"><!-- 末端机构状态卡片开始 -->
                          <div>
                            <span class="cardTitle">零位控制</span>
                          </div>
                          <div class="align-middle"><!-- 姿态角数据显示 -->
                              <el-tooltip class="item"  effect="dark" content="回零" placement="bottom">
                                  <el-button type="primary"
                                  @click="backToZeroReal"
                                  icon="el-icon-refresh-right" circle style="font-size: 1.2rem;">
                                  </el-button>
                              </el-tooltip>
                          </div><!-- 姿态角数据显示 -->
                      </div><!-- 末端机构状态卡片结束 -->
                    </div><!-- 使能控制行的结束 -->
                    <div class="col-1 controlCardCenter text-center">
                      <div class="CardContent text-center w-100 m-0"><!-- 末端机构状态卡片开始 -->
                          <div>
                            <span class="cardTitle">位置保存</span>
                          </div>
                          <div class="align-middle"><!-- 姿态角数据显示 -->
                              <el-tooltip class="item"  effect="dark" content="保存位置" placement="bottom">
                                  <el-button type="primary"
                                  @click="savePosReal"
                                  icon="el-icon-s-management" circle style="font-size: 1.2rem;">
                                  </el-button>
                              </el-tooltip>
                          </div><!-- 姿态角数据显示 -->
                      </div><!-- 末端机构状态卡片结束 -->
                    </div><!-- 按钮控制行的结束 -->
                    <div class="col-3 controlCardCenter text-center">
                      <div class="CardContent text-center w-100 m-0"><!-- 末端机构状态卡片开始 -->
                          <div>
                            <span class="cardTitle">末端控制</span>
                          </div>
                          <div class=" row align-item-middle justify-content-center p-0 "><!-- 姿态角数据显示 -->
                              <el-button  type="primary"
                              @click="subPosOfEndJaw"
                              icon="el-icon-minus"  class=" col-1 p-0 m-0" alet="12">
                              </el-button>
                              <el-slider @input="controlPosOfEndJaw"
                              class=" col-9 positionSlider "
                              :min="0" :max="100" v-model="modePosOfEndJaw"></el-slider>
                              <el-button  type="primary"
                              @click="addPosOfEndJaw"
                              icon="el-icon-plus"  class="col-1 p-0 m-0" alet="12">
                              </el-button>
                          </div><!-- 姿态角数据显示 -->
                      </div><!-- 末端机构状态卡片结束 -->
                    </div><!-- 按钮控制行的结束 -->
                    <div class="col-1 controlCardCenter text-center">
                      <div class="CardContent text-center m-0 w-100 "><!-- 末端机构状态卡片开始 -->
                          <div>
                            <span class="cardTitle">吸盘控制</span>
                          </div>
                          <div class="align-middle"><!-- 姿态角数据显示 -->
                              <el-switch
                              @change="controlStateOfEndSuck"
                                v-model="modeStateOfEndSuck"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                style="margin-top: 10px;"
                                >
                              </el-switch>
                          </div><!-- 姿态角数据显示 -->
                      </div><!-- 末端机构状态卡片结束 -->
                    </div>
                    <div class="col-3 controlCardCenter text-center ">
                      <div class="CardContent text-center w-100 m-0 "><!-- 末端机构状态卡片开始 -->
                          <div>
                            <span class="cardTitle">速度控制</span>
                          </div>
                          <div class="row align-item-middle justify-content-center p-0 "><!-- 姿态角数据显示 -->
                              <el-button  type="primary"
                              @click="subMoveVecReal"
                              icon="el-icon-minus"  class="col-1 p-0 m-0" alet="12">
                              </el-button>
                              <el-slider @input="controlMoveVecReal"
                              class=" col-9 positionSlider"
                              :min="0" :max="100" v-model="modeMoveVecReal"></el-slider>
                              <el-button  type="primary"
                              @click="addMoveVecReal"
                              icon="el-icon-plus"  class="col-1 p-0 m-0" alet="12">
                              </el-button>
                          </div><!-- 姿态角数据显示 -->
                      </div><!-- 末端机构状态卡片结束 -->
                    </div><!-- 按钮控制行的结束 -->
                  </div>
                  <el-divider content-position="left"></el-divider>
                   <!-- 第三行所在行 -->
                  <!-- <div class="row w-100 bg-danger" style="margin: 10px auto;">
                    <div class="col  border">
                      第三行
                    </div>
                  </div> -->
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="bi bi-person-check-fill"></i> 拖动控制</span>
                <!-- 回原点、输入备注、记录数据等按钮所在行 -->
                <div class="row">
                  <div class="col text-left">
                      <el-divider content-position="left">手动操作</el-divider>
                      <!-- 回到原点 -->
                      <el-tooltip v-if="realRobotControlMode==1"class="item" effect="dark" content="开启手动" placement="bottom">
                          <el-button type="primary"
                          @click="startHandMode"
                          icon="el-icon-thumb"  class="runModeAndDataSaveAboutButtonHandMode" alet="12">
                          </el-button>
                      </el-tooltip>
                      <!-- 回到原点 -->
                      <el-tooltip v-if="realRobotControlMode==2" class="item" effect="dark" content="关闭手动" placement="bottom">
                          <el-button type="primary"
                          @click="stoptHandMode"
                          icon="el-icon-coordinate"  class="runModeAndDataSaveAboutButtonHandMode" alet="12">
                          </el-button>
                      </el-tooltip>
                      <!-- 回到原点 -->
                      <el-tooltip class="item" effect="dark" content="回到原点" placement="bottom">
                          <el-button type="primary"
                          @click="backToZeroPositionHandMode"
                          icon="el-icon-refresh-right"  class="runModeAndDataSaveAboutButtonHandMode" alet="12">
                          </el-button>
                      </el-tooltip>
                      <!-- 输入备注 -->
                     <el-input  v-model="remarksTextSimulate"
                     style="display: inline-block;width: 140px;"
                     placeholder="请输入备注内容">
                     </el-input>
                     <!-- 记录数据按钮 -->
                     <el-tooltip class="item" effect="dark" content="记录数据" placement="bottom">
                         <el-button type="primary"
                         icon="el-icon-s-order" @click="addExeclDataHandMode"  class="runModeAndDataSaveAboutButtonHandMode">
                         </el-button>
                     </el-tooltip>
                      <!-- 保存EXECL文件按钮 -->
                     <download-excel
                          style="display: inline-block;"
                          :data="outExeclDataHandMode"
                          :fields="outExeclFields"
                          name = "关节数据">
                          <el-tooltip class="item" effect="dark" content="保存文件" placement="bottom">
                             <el-button type="primary"
                             icon="el-icon-folder-add" class="runModeAndDataSaveAboutButtonHandMode">
                             </el-button>
                          </el-tooltip>
                     </download-excel>
                     <!-- 打开EXECL文件按钮 -->
                     <label class="upLoadExeclFile" for="fileinp">
                       <el-tooltip class="item" effect="dark" content="打开数据文档" placement="bottom">
                          <el-button  id="upLoadBtn" type="primary" class="runModeAndDataSaveAboutButtonHandMode" icon="el-icon-notebook-1">
                          </el-button>
                       </el-tooltip>
                       <input type="file" id="fileinp" ref="upload" style="width: 50px;"
                       accept=".xls,.xlsx" class="outputlist_upload">
                     </label>
                  </div>
                 </div><!-- 按钮控制行的结束 -->
                 <div class="row">
                   <div class="col text-left">
                       <el-divider content-position="left">运动控制</el-divider>
                      <!-- 选择运行模式 -->
                       <el-radio-group style="width: 190px;" v-model="runModeRadioHandMode">
                          <el-radio  style="width: 60px;margin: 1px;" :label="1">循环</el-radio>
                          <el-radio  style="width: 60px;margin: 1px;" :label="2">单次</el-radio>
                          <el-radio  style="width: 60px;margin: 1px;" :label="3">设定</el-radio>
                       </el-radio-group>
                       <el-input-number  style="width: 85px;" v-model="runCountSetHandMode" controls-position="right" :min="1" :max="10"></el-input-number>
                      <!-- 按照模式运行按钮 -->
                      <el-tooltip class="item"  effect="dark" content="启动" placement="bottom">
                          <el-button type="primary" :disabled="startDisabledHandMode"
                          @click="startMultipleRunHandMode"
                          icon="el-icon-timer"  class="runModeAndDataSaveAboutButtonHandMode">
                          </el-button>
                      </el-tooltip>
                      <el-tooltip class="item"  effect="dark" content="开始运行" placement="bottom">
                          <el-button type="primary" :disabled="rePlayDisabledHandMode"
                          @click="rePlayMultipleRunHandMode"
                          icon="el-icon-video-play"  class="runModeAndDataSaveAboutButtonHandMode" >
                          </el-button>
                      </el-tooltip>
                      <el-tooltip class="item"  effect="dark" content="暂停运行" placement="bottom">
                          <el-button type="primary" :disabled="pauseDisabledHandMode"
                          @click="pauseMultipleRunHandMode"
                          icon="el-icon-video-pause"  class="runModeAndDataSaveAboutButtonHandMode">
                          </el-button>
                      </el-tooltip>
                      <el-tooltip class="item"  effect="dark" content="停止运行" placement="bottom">
                          <el-button type="primary" :disabled="stopDisabledHandMode"
                          @click="stopMultipleRunHandMode"
                          icon="el-icon-circle-close"  class="runModeAndDataSaveAboutButtonHandMode">
                          </el-button>
                      </el-tooltip>
                   </div>
                  </div><!-- 按钮控制行的结束 -->
                 <!-- 数据表格所在行 -->
                 <div class="row w-100" style="margin: 10px auto;">
                   <div class="col  border">
                      <!-- 数据表格 -->
                      <el-table
                         :data="outExeclDataHandMode"
                         height="350px"
                         style="width: 100%"
                         @selection-change="handleTableRowSelectionChange"
                         >
                        <!-- //多选框列 -->
                         <el-table-column
                               type="selection"
                               width="55">
                             </el-table-column>
                         <!-- 第一列 -->
                         <el-table-column
                           prop="type"
                           label="序号">
                         </el-table-column>
                         <!-- 第二列 -->
                         <el-table-column
                           prop="oneAxis"
                           label="1轴" >
                         </el-table-column>
                         <!-- 第三列 -->
                         <el-table-column
                           prop="twoAxis"
                           label="2轴">
                         </el-table-column>
                         <!-- 第四列 -->
                         <el-table-column
                           prop="threeAxis"
                           label="3轴">
                         </el-table-column>
                         <!-- 第五列 -->
                         <el-table-column
                           prop="fourAxis"
                           label="4轴">
                         </el-table-column>
                         <!-- 第六列 -->
                         <el-table-column
                           prop="fiveAxis"
                           label="5轴">
                         </el-table-column>
                         <!-- 第七列 -->
                         <el-table-column
                           prop="sixAxis"
                           label="6轴">
                         </el-table-column>
                         <!-- 第八列 -->
                         <el-table-column
                           prop="senveAxis"
                           label="7轴">
                         </el-table-column>
                         <!-- 第九列 -->
                         <el-table-column
                           prop="remarks"
                           label="备注">
                         </el-table-column>
                         <!-- 第十列 -->
                         <el-table-column label="操作" width="180">
                               <template slot-scope="scope">
                                 <el-button
                                   size="mini"
                                   @click="handleRunSimulate(scope.$index, scope.row)">运行</el-button>
                                 <el-button
                                   size="mini"
                                   type="danger"
                                   @click="handleDeleteSimulate(scope.$index, scope.row)">删除</el-button>
                               </template>
                             </el-table-column>
                       </el-table>
                   </div>
                 </div>
              </el-tab-pane>
            </el-tabs>
          </div><!-- 控制按钮区域的开始 -->
        </div><!-- 中间区域的结束 -->
        </div>
      </div>
    </div>
</template>
<script>
  import * as Three from "three";
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
  import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
  //引入WebSocke
  import WSocket from '../socket.js';
  import loadFile from '../loadFile.js';
  //引入机器人运动控制函数库文件
  import RBC from '../robotControl.js'
  //按照map的方法使用vuex的state数据
  import {mapState,mapGetters,mapMutations} from 'vuex';
  //引入读取本地文件的库
  import XLSX from 'xlsx'
  export default {
    name:'basicControl',
    components:{
    },
    data:function(){
      return{
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        JointOneMesh:null,
        JointTwoMesh:null,
        JointThreeMesh:null,
        JointFourMesh:null,
        JointFiveMesh:null,
        JointSixMesh:null,
        JointSenveMesh:null,
        JointEightMesh:null,
        oneRotateGroup:null,
        twoRotateGroup:null,
        threeRotateGroup:null,
        fourRotateGroup:null,
        fiveRotateGroup:null,
        sixRotateGroup:null,
        senveRotateGroup:null,
        controls:null,
        controlAxisButtonText:[
          {name:'1轴'},
          {name:'2轴'},
          {name:'3轴'},
          {name:'4轴'},
          {name:'5轴'},
          {name:'6轴'},
          {name:'7轴'}
        ],
        controlPosButtonText:[
          {name:'X轴'},
          {name:'Y轴'},
          {name:'Z轴'},
          {name:'Pitch'},
          {name:'Yaw'},
          {name:'Roll'}
        ],
        remarksTextSimulate:'',
        theCountOfDataSimulate:0,
        outExeclFields: {  //导出Excel表格的表头设置
          '序号': 'type',
          '一轴': 'oneAxis',
          '二轴': 'twoAxis',
          '三轴': 'threeAxis',
          '四轴': 'fourAxis',
          '五轴': 'fiveAxis',
          '六轴': 'sixAxis',
          '七轴': 'senveAxis',
          '备注':'remarks'
        },
        // outExeclDataSimulate:[],
        theOldPos:{
         		"type":'',
         		"oneAxis":0.0,
         		"twoAxis":0.0,
         		"threeAxis":0.0,
         		"fourAxis":0.0,
         		"fiveAxis":0.0,
         		"sixAxis":0.0,
         		"senveAxis":0.0,
         		"remarks":''
         	},
        oneAxisChangeStep:0.0,
        twoAxisChangeStep:0.0,
        threeAxisChangeStep:0.0,
        fourAxisChangeStep:0.0,
        fiveAxisChangeStep:0.0,
        sixAxisChangeStep:0.0,
        senveAxisChangeStep:0.0,
        TrackCountNum:0,
        runRowNum:0,
        showRunRowNum:0,
        pauseRunRowNum:0,
        multipleRunData:[],
        stopMultipleRunSimulateBool:false,
        pauseMultipleRunSimulateBool:false,
        runModeRadio:1,
        runModeRadioHandMode:1,
        runCountSet:0,
        runCountSetHandMode:0,
        haveRunConut:0,
        showHaveRunConut:0,
        dataSimulateFromExeclFile:[],
        rePlayDisabled:true,
        pauseDisabled:true,
        stopDisabled:true,
        startDisabled:true,
        startDisabledHandMode:true,
        rePlayDisabledHandMode:true,
        pauseDisabledHandMode:true,
        stopDisabledHandMode:true,
        showInformationTable:false,
        threeViewWidth:450,
        threeVieHeight:350,
        endMechanismValue:true
      }
    },
    computed:{
      //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
      //引入的各个轴的位置数据positionOfAxis
      ...mapState(['positionOfAxisInSimulate','positionOfAxisInReal','positionOfXYZRPYInReal',
      'enableRobot','moveVecReal','kindOfEndTool','stateOfEndSuck','posOfEndJaw','realRobotControlMode',
      'outExeclDataSimulate','outExeclDataHandMode','theRunInformation','runInformationDataBuff']),
      // v-mode双向绑定VUEX中的数据的正确方法
      modeEnableRobot:{
        get(){
          return this.enableRobot
        },
        set(value){
           this.mutationEnableRobot(value)
        }
      },
      modeMoveVecReal:{
        get(){
          return this.moveVecReal
        },
        set(value){
           this.mutationMoveVecReal(value)
        }
      },
      modePosOfEndJaw:{
        get(){
          return this.posOfEndJaw
        },
        set(value){
           this.mutationPosOfEndJaw(value)
        }
      },
      modeStateOfEndSuck:{
        get(){
          return this.stateOfEndSuck
        },
        set(value){
           this.mutationStateOfEndSuck(value)
        }
      },
    },
    mounted(){
      console.log('12323');
      this.threeViewWidth=this.$refs.piuuu.offsetWidth;
      this.threeVieHeight=this.$refs.piuuu.offsetHeight;
      // this.beforeInitClearPosition();
      this.init();
      this.setWindown();
      console.log(99999999999);
      this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
          this.readExcel(e);
          });
      this.setOriginPosXYZRPY();
    },
    updated(){
      console.log('update');
    },
    beforeDestroy(){
      console.log("destroy");
      this.backToZeroPosition();
    },
    methods:{
      //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
      ...mapMutations(['mutationOutExeclDataSimulate','mutationEnableRobot','mutationMoveVecReal',
      'mutationKindOfEndTool','mutationStateOfEndSuck','mutationPosOfEndJaw','mutationRealRobotControlMode'
      ]),
      //返回主页
      backToHome(){
        this.$router.push('/home');
      },
      enableControl(){

      },
      backToZeroReal(){

      },
      zControlPosAdd(){
        console.log('ZAdd');
        this.positionOfXYZRPYInReal[2]+=1;
        this.$refs.ZPoseLable.innerHTML=this.positionOfXYZRPYInReal[2];
      },
      zControlPosSub(){
        console.log('ZSub');
        this.positionOfXYZRPYInReal[2]-=1;
        this.$refs.ZPoseLable.innerHTML=this.positionOfXYZRPYInReal[2];
      },
      xControlPosAdd(){
        console.log('XAdd');
        this.positionOfXYZRPYInReal[0]+=1;
        this.$refs.XPoseLable.innerHTML=this.positionOfXYZRPYInReal[0];
      },
      xControlPosSub(){
        console.log('XSub');
        this.positionOfXYZRPYInReal[0]-=1;
        this.$refs.XPoseLable.innerHTML=this.positionOfXYZRPYInReal[0];
      },
      yControlPosAdd(){
        console.log('YAdd');
        this.positionOfXYZRPYInReal[1]+=1;
        this.$refs.YPoseLable.innerHTML=this.positionOfXYZRPYInReal[1];
      },
      yControlPosSub(){
        console.log('YSub');
        this.positionOfXYZRPYInReal[1]-=1;
        this.$refs.YPoseLable.innerHTML=this.positionOfXYZRPYInReal[1];
      },
      rControlPosAdd(){
        console.log('RAdd');
        this.positionOfXYZRPYInReal[5]+=1;
        this.$refs.RPoseLable.innerHTML=this.positionOfXYZRPYInReal[3];
      },
      rControlPosSub(){
        console.log('RSub');
        this.positionOfXYZRPYInReal[5]-=1;
        this.$refs.RPoseLable.innerHTML=this.positionOfXYZRPYInReal[3];
      },
      pControlPosAdd(){
        console.log('PAdd');
        this.positionOfXYZRPYInReal[3]+=1;
        this.$refs.PPoseLable.innerHTML=this.positionOfXYZRPYInReal[4];
      },
      pControlPosSub(){
        console.log('PSub');
        this.positionOfXYZRPYInReal[3]-=1;
        this.$refs.PPoseLable.innerHTML=this.positionOfXYZRPYInReal[4];
      },
      yawControlPosAdd(){
        console.log('YawAdd');
        this.positionOfXYZRPYInReal[4]+=1;
        this.$refs.YawPoseLable.innerHTML=this.positionOfXYZRPYInReal[5];
      },
      yawControlPosSub(){
        console.log('YawSub');
        this.positionOfXYZRPYInReal[4]-=1;
        this.$refs.YawPoseLable.innerHTML=this.positionOfXYZRPYInReal[5];
      },
      savePosReal(){

      },
      subPosOfEndJaw(){
        console.log(this.posOfEndJaw)
        this.mutationPosOfEndJaw(this.posOfEndJaw-1);
        console.log(this.posOfEndJaw)
      },
      addPosOfEndJaw(){
        console.log(this.posOfEndJaw)
        this.mutationPosOfEndJaw(this.posOfEndJaw+1);
        console.log(this.posOfEndJaw)
      },
      subMoveVecReal(){
        this.mutationMoveVecReal(this.moveVecReal-1);
      },
      addMoveVecReal(){
        this.mutationMoveVecReal(this.moveVecReal+1);
      },
      controlPosOfEndJaw(){

      },
      controlStateOfEndSuck(){

      },
      controlMoveVecReal(){

      },
      setOriginPosXYZRPY(){
        for(let i in this.positionOfXYZRPYInReal){
            this.positionOfXYZRPYInReal[i]=0.0;
         };
         for(let i in this.positionOfAxisInReal){
             this.positionOfAxisInReal[i]=0.0;
          }
      },
      controlAxisReal(index){
        console.log(this.positionOfAxisInReal[index]);
      },
      controlPOsXYZRPYReal(index){
         console.log(this.positionOfXYZRPYInReal[index]);
            // //发送消息的函数
            // // WSocket.send("this.sendMessage");
            // //执行运动控制函数
            // RBC.xMove('200');
      },
      startHandMode(){
        this.mutationRealRobotControlMode(2);
      },
      stoptHandMode(){
        this.mutationRealRobotControlMode(1);
      },
      backToZeroPositionHandMode(){

      },
      addExeclDataHandMode(){

      },
      startMultipleRunHandMode(){

      },
      rePlayMultipleRunHandMode(){

      },
      stopMultipleRunHandMode(){

      },
      pauseMultipleRunHandMode(){

      },
      addExeclDataSimulate(){
        console.log("enterAddExeclData");
        let obj={
         		"type":'',
         		"oneAxis":this.positionOfAxisInSimulate[0],
         		"twoAxis":this.positionOfAxisInSimulate[1],
         		"threeAxis":this.positionOfAxisInSimulate[2],
         		"fourAxis":this.positionOfAxisInSimulate[3],
         		"fiveAxis":this.positionOfAxisInSimulate[4],
         		"sixAxis":this.positionOfAxisInSimulate[5],
         		"senveAxis":this.positionOfAxisInSimulate[6],
         		"remarks":this.remarksTextSimulate
         	}
        // this.theCountOfDataSimulate+=1;
        this.outExeclDataSimulate.push(obj);

        this.theOldPos.oneAxis=this.positionOfAxisInSimulate[0];
        this.theOldPos.twoAxis=this.positionOfAxisInSimulate[1];
        this.theOldPos.threeAxis=this.positionOfAxisInSimulate[2];
        this.theOldPos.fourAxis=this.positionOfAxisInSimulate[3];
        this.theOldPos.fiveAxis=this.positionOfAxisInSimulate[4];
        this.theOldPos.sixAxis=this.positionOfAxisInSimulate[5];
        this.theOldPos.senveAxis=this.positionOfAxisInSimulate[6];

        for(let i in this.outExeclDataSimulate){
            this.outExeclDataSimulate[i].type=parseInt(i)+1
         }
      },
      handleRunSimulate(index, row) {
            // console.log(index, row);
            this.robotRunPosToPos(this.theOldPos,this.outExeclDataSimulate[index]);
            // this.oneRotateGroup.rotation.y=this.outExeclDataSimulate[index].oneAxis*Math.PI/180;//绕axis轴旋转π/8;
            // this.twoRotateGroup.rotation.x=this.outExeclDataSimulate[index].twoAxis*Math.PI/180;//绕axis轴旋转π/8;
            // this.threeRotateGroup.rotation.y=this.outExeclDataSimulate[index].threeAxis*Math.PI/180;//绕axis轴旋转π/8;
            // this.fourRotateGroup.rotation.x=this.outExeclDataSimulate[index].fourAxis*Math.PI/180;//绕axis轴旋转π/8;
            // this.fiveRotateGroup.rotation.y=this.outExeclDataSimulate[index].fiveAxis*Math.PI/180;//绕axis轴旋转π/8;
            // this.sixRotateGroup.rotation.x=this.outExeclDataSimulate[index].sixAxis*Math.PI/180;//绕axis轴旋转π/8
            // this.senveRotateGroup.rotation.y=this.outExeclDataSimulate[index].senveAxis*Math.PI/180;//绕axis轴旋转π/8;
            },
      robotRunPosToPos(theOldPos,theTargetPos){

        this.oneAxisChangeStep=(theTargetPos.oneAxis-theOldPos.oneAxis)/20;
        this.twoAxisChangeStep=(theTargetPos.twoAxis-theOldPos.twoAxis)/20;
        this.threeAxisChangeStep=(theTargetPos.threeAxis-theOldPos.threeAxis)/20;
        this.fourAxisChangeStep=(theTargetPos.fourAxis-theOldPos.fourAxis)/20;
        this.fiveAxisChangeStep=(theTargetPos.fiveAxis-theOldPos.fiveAxis)/20;
        this.sixAxisChangeStep=(theTargetPos.sixAxis-theOldPos.sixAxis)/20;
        this.senveAxisChangeStep=(theTargetPos.senveAxis-theOldPos.senveAxis)/20;

        let  runPosToPosTimer = setInterval(() => {
                this.posToPosFun(runPosToPosTimer,theOldPos,theTargetPos)
                 }, 100)
      },
      posToPosFun(PosToPosTimer,theOldPos,theTargetPos) {
         var that=this;
         setTimeout(()=>{
           console.log('enter the PosToPostimer');
           console.log("that.stopMultipleRunSimulateBool:"+that.stopMultipleRunSimulateBool);
           console.log("that.pauseMultipleRunSimulateBool:"+that.pauseMultipleRunSimulateBool);
           console.log("that.TrackCountNum:"+that.TrackCountNum);
           if(that.stopMultipleRunSimulateBool==true){
             this.theOldPos.oneAxis=this.positionOfAxisInSimulate[0];
             this.theOldPos.twoAxis=this.positionOfAxisInSimulate[1];
             this.theOldPos.threeAxis=this.positionOfAxisInSimulate[2];
             this.theOldPos.fourAxis=this.positionOfAxisInSimulate[3];
             this.theOldPos.fiveAxis=this.positionOfAxisInSimulate[4];
             this.theOldPos.sixAxis=this.positionOfAxisInSimulate[5];
             this.theOldPos.senveAxis=this.positionOfAxisInSimulate[6];
             clearInterval(PosToPosTimer);
             console.log("have cleared");
           }
           else{
             if(that.pauseMultipleRunSimulateBool==false){
               // 这里ajax 请求的代码片段和判断是否停止定时器
               if(that.TrackCountNum<=19){
                 this.positionOfAxisInSimulate[0]=(theOldPos.oneAxis + that.TrackCountNum*that.oneAxisChangeStep);//绕axis轴旋转π/8;
                 this.positionOfAxisInSimulate[1]=(theOldPos.twoAxis + that.TrackCountNum*that.twoAxisChangeStep);//绕axis轴旋转π/8;
                 this.positionOfAxisInSimulate[2]=(theOldPos.threeAxis+that.TrackCountNum*that.threeAxisChangeStep);//绕axis轴旋转π/8;
                 this.positionOfAxisInSimulate[3]=(theOldPos.fourAxis+that.TrackCountNum*that.fourAxisChangeStep);//绕axis轴旋转π/8;
                 this.positionOfAxisInSimulate[4]=(theOldPos.fiveAxis+that.TrackCountNum*that.fiveAxisChangeStep);//绕axis轴旋转π/8;
                 this.positionOfAxisInSimulate[5]=(theOldPos.sixAxis+that.TrackCountNum*that.sixAxisChangeStep);//绕axis轴旋转π/8
                 this.positionOfAxisInSimulate[6]=(theOldPos.senveAxis+that.TrackCountNum*that.senveAxisChangeStep);//绕axis轴旋转π/8;
               }
               that.TrackCountNum=that.TrackCountNum+1;
               // 如需要停止定时器，只需加入以下：
                 if(that.TrackCountNum==20){
                   this.positionOfAxisInSimulate[0]=theTargetPos.oneAxis;//绕axis轴旋转π/8;
                   this.positionOfAxisInSimulate[1]=theTargetPos.twoAxis;//绕axis轴旋转π/8;
                   this.positionOfAxisInSimulate[2]=theTargetPos.threeAxis;//绕axis轴旋转π/8;
                   this.positionOfAxisInSimulate[3]=theTargetPos.fourAxis;//绕axis轴旋转π/8;
                   this.positionOfAxisInSimulate[4]=theTargetPos.fiveAxis;//绕axis轴旋转π/8;
                   this.positionOfAxisInSimulate[5]=theTargetPos.sixAxis;//绕axis轴旋转π/8
                   this.positionOfAxisInSimulate[6]=theTargetPos.senveAxis;//绕axis轴旋转π/8;

                   that.TrackCountNum=0;
                   clearInterval(PosToPosTimer);
                   this.theOldPos.oneAxis=this.positionOfAxisInSimulate[0];
                   this.theOldPos.twoAxis=this.positionOfAxisInSimulate[1];
                   this.theOldPos.threeAxis=this.positionOfAxisInSimulate[2];
                   this.theOldPos.fourAxis=this.positionOfAxisInSimulate[3];
                   this.theOldPos.fiveAxis=this.positionOfAxisInSimulate[4];
                   this.theOldPos.sixAxis=this.positionOfAxisInSimulate[5];
                   this.theOldPos.senveAxis=this.positionOfAxisInSimulate[6];
                   if(this.showRunRowNum==this.multipleRunData.length-1){
                     console.log(this.showHaveRunConut);
                     this.showHaveRunConut=this.showHaveRunConut+1;
                     console.log(this.showHaveRunConut);
                   }
                 }
             }
             else{
               this.theOldPos.oneAxis=this.positionOfAxisInSimulate[0];
               this.theOldPos.twoAxis=this.positionOfAxisInSimulate[1];
               this.theOldPos.threeAxis=this.positionOfAxisInSimulate[2];
               this.theOldPos.fourAxis=this.positionOfAxisInSimulate[3];
               this.theOldPos.fiveAxis=this.positionOfAxisInSimulate[4];
               this.theOldPos.sixAxis=this.positionOfAxisInSimulate[5];
               this.theOldPos.senveAxis=this.positionOfAxisInSimulate[6];
               this.TrackCountNum=0;
               clearInterval(PosToPosTimer);
             }
           }

          }, 0)
         },
      handleTableRowSelectionChange(val){
            console.log('val:');
            console.log(val);
            this.startDisabled=false;
            this.multipleRunData=val;
            if(this.multipleRunData.length==0){
              this.startDisabled=true;
            }
         },
      startMultipleRunSimulate(){
        this.pauseDisabled=false;
        this.stopDisabled=false;
        this.startDisabled=true;
        // this.theOldPos=this.multipleRunData[0];
        this.TrackCountNum=0;
        this.runRowNum=0;
        this.haveRunConut=0;
        this.showRunRowNum=0;
        this.showHaveRunConut=0;
        this.pauseMultipleRunSimulateBool=false;
        this.stopMultipleRunSimulateBool=false;
        let  multipleRunPosToPosTimer = setInterval(() => {
                this.multiplePosToPosFun(multipleRunPosToPosTimer)
                 }, 2500)
      },
      rePlayMultipleRunSimulate(){
        this.rePlayDisabled=true;
        this.pauseMultipleRunSimulateBool=false;
        this.stopMultipleRunSimulateBool=false;
        this.runRowNum=this.pauseRunRowNum;
        let  multipleRunPosToPosTimer = setInterval(() => {
                this.multiplePosToPosFun(multipleRunPosToPosTimer)
                 }, 2500)
      },
      stopMultipleRunSimulate(){
        this.startDisabled=false;
        this.stopDisabled=true;
        this.rePlayDisabled=true;
        this.pauseDisabled=true;
        this.stopMultipleRunSimulateBool=true;
        this.TrackCountNum=0;
        this.runRowNum=0;
        this.haveRunConut=0;
        this.showRunRowNum=0;
        this.showHaveRunConut=0;
        console.log(this.stopMultipleRunSimulateBool);
        // this.theOldPos=this.multipleRunData[0];
      },
      pauseMultipleRunSimulate(){
        this.rePlayDisabled=false;
        this.pauseDisabled=true;
        this.pauseMultipleRunSimulateBool=true;
      },
      multiplePosToPosFun(timer){
        var that=this;
        setTimeout(()=>{

            if(that.stopMultipleRunSimulateBool==true){
              clearInterval(timer);
            }else{

                if(this.pauseMultipleRunSimulateBool==false){
                  this.pauseRunRowNum=that.runRowNum;
                  this.showRunRowNum=that.runRowNum;
                  this.robotRunPosToPos(this.theOldPos,this.multipleRunData[that.runRowNum]);
                  that.runRowNum=that.runRowNum+1;
                  // if(this.showRunRowNum==this.multipleRunData.length-1){
                  //   console.log(this.showHaveRunConut);
                  //   this.showHaveRunConut=this.showHaveRunConut+1;
                  //   console.log(this.showHaveRunConut);
                  // }
                  // 如需要停止定时器，只需加入以下：
                  if(that.runRowNum==this.multipleRunData.length){
                    that.runRowNum=0;
                    that.haveRunConut=that.haveRunConut+1;
                    if(that.runModeRadio==1){
                      if(that.stopMultipleRunSimulateBool==true){
                        clearInterval(timer);
                        this.showHaveRunConut=0;
                        this.startDisabled=false;
                        // that.stopleMultipleRunSimulateBool=false;
                      }
                    }
                    if(that.runModeRadio==2){
                      console.log(that.stopMultipleRunSimulateBool)
                      clearInterval(timer);
                      this.startDisabled=false;
                    }
                    if(that.runModeRadio==3){
                      // that.haveRunConut=that.haveRunConut+1;
                      console.log(that.stopMultipleRunSimulateBool)
                      if(that.stopMultipleRunSimulateBool==false){
                        if(that.runCountSet==that.haveRunConut){
                          clearInterval(timer);
                          that.haveRunConut=0;
                          this.startDisabled=false;
                        }
                      }else{
                        clearInterval(timer);
                      }
                    }
                }
              }
              else{
                clearInterval(timer);
              }
            }

          }, 0)
      },
      handleDeleteSimulate(index, row) {
            console.log(index, row);
            this.outExeclDataSimulate.splice(index,1);
            for(let i in this.outExeclDataSimulate){
                this.outExeclDataSimulate[i].type=parseInt(i)+1
             }
            console.log(this.outExeclDataSimulate);
        },
      readExcel(e) {//表格导入
          var that = this;
          const files = e.target.files;
          console.log(files);
          if(files.length<=0){//如果没有文件名
          return false;
          }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
          this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
          return false;
          }
          const fileReader = new FileReader();
          fileReader.onload = (ev) => {
          try {
              const data = ev.target.result;
              const workbook = XLSX.read(data, {
              type: 'binary'
              });
              const wsname = workbook.SheetNames[0];//取第一张表
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
              console.log('1001');
              console.log(ws);
              that.dataSimulateFromExeclFile = [];//清空接收数据
              //编辑数据
              for(var i= 0;i<ws.length;i++){
              var sheetData = {
                  "type":ws[i].序号,
                  "oneAxis":ws[i].一轴,
                  "twoAxis":ws[i].二轴,
                  "threeAxis":ws[i].三轴,
                  "fourAxis":ws[i].四轴,
                  "fiveAxis":ws[i].五轴,
                  "sixAxis":ws[i].六轴,
                  "senveAxis":ws[i].七轴,
                  "remarks":ws[i].备注
              }
              that.dataSimulateFromExeclFile.push(sheetData);
              }
              console.log('98745');
              console.log(that.dataSimulateFromExeclFile);
              that.mutationOutExeclDataSimulate(that.dataSimulateFromExeclFile);
              // that.outExeclDataSimulate=that.dataSimulateFromExeclFile;
              this.$refs.upload.value = '';

          } catch (e) {
              return false;
          }
          };
          fileReader.readAsBinaryString(files[0]);
      },
    // 渲染函数
      renderFrame() {
          this.renderer.render(this.scene, this.camera); //执行渲染操作
          requestAnimationFrame(this.renderFrame);//请求再次执行渲染函数render，渲染下一帧
        },
        // //定义窗口的设置
      setWindown(){
           var that=this;
            //加入事件监听器,窗口自适应
            // this.$refs.piuuu.addEventListener('resize', function(){
            //   console.log(that.$refs)
            //   that.threeViewWidth = that.$refs.piuuu.offsetWidth; //窗口宽度
            //   // console.log(this.$refs.piuuu.offsetWidth);
            //   that.threeVieHeight = that.$refs.piuuu.offsetHeight; //窗口高度
            //   // console.log(that.threeViewWidth);
            //   that.renderer.setSize(that.threeViewWidth,that.threeVieHeight);
            //   that.camera.aspect = that.threeViewWidth/that.threeVieHeight;
            //   that.camera.updateProjectionMatrix();
            // });
            window.addEventListener('resize', function(){
              console.log(that.$refs)
              that.threeViewWidth = that.$refs.piuuu.offsetWidth; //窗口宽度
              // console.log(this.$refs.piuuu.offsetWidth);
              that.threeVieHeight = that.$refs.piuuu.offsetHeight; //窗口高度
              // console.log(that.threeViewWidth);
              that.renderer.setSize(that.threeViewWidth,that.threeVieHeight);
              that.camera.aspect = that.threeViewWidth/that.threeVieHeight;
              that.camera.updateProjectionMatrix();
            });
          },
      init: function() {
        // this.setWindown();
        let container = document.getElementById("container");
              /**
             * 创建场景对象Scene
             */
           this.scene = new Three.Scene();
           //创建平面几何体
           var planeGeometry = new Three.PlaneGeometry( 500, 500, 32 );
           var planeMaterial = new Three.MeshBasicMaterial( {color: 0xffffff,
           side: Three.DoubleSide,
           wireframe:true
           } );
           var plane = new Three.Mesh( planeGeometry, planeMaterial );
           plane.rotateX(Math.PI/2);
           plane.translateZ(620);
           this.scene.add(plane);
           ///////////////////////////////////
           this.oneRotateGroup=new Three.Group();
           this.twoRotateGroup=new Three.Group();
           this.threeRotateGroup=new Three.Group();
           this.fourRotateGroup=new Three.Group();
           this.fiveRotateGroup=new Three.Group();
           this.sixRotateGroup=new Three.Group();
           this.senveRotateGroup=new Three.Group();
            /**
             * stl数据加载
             */
            // var robotGroup=new Three.Group();
            var loader = new STLLoader();
            var that=this;
            //加载关节1
            loader.load('../../static/robotStl/Joint-1.stl',function (JointOneGeometry) {
              // console.log(JointOneGeometry.boundingBox);
              // geometry.position.set(0,80,0);
              // // 缩放几何体
              // geometry.scale(0.5,0.5,0.5);
              // // 几何体居中
              JointOneGeometry.center();
              // // 平移立方体
              JointOneGeometry.translate(13,-140,0);
              JointOneGeometry.rotateY(Math.PI/3);
              //关节2材质对象Material
              var JointOneMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointOneMesh = new Three.Mesh(JointOneGeometry, JointOneMaterial); //网格模型对象Mesh
              that.JointOneMesh.translateY(-400);
              that.oneRotateGroup.translateY(-400);
              that.scene.add(that.JointOneMesh); //网格模型添加到场景中
              that.scene.add(that.oneRotateGroup); //网格模型添加到场景中
            })
            //加载关节2
            loader.load('../../static/robotStl/Joint-2.stl',function (JointTwoGeometry) {
              JointTwoGeometry.center();
              // // 旋转和平移立方体
              JointTwoGeometry.rotateY(Math.PI/3);
              JointTwoGeometry.translate(19,79.5,-1.6);
              //关节2材质对象Material
              var JointTwoMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointTwoMesh = new Three.Mesh(JointTwoGeometry, JointTwoMaterial); //网格模型对象Mesh

              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 46, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateX(Math.PI/2);
              // // plane.translateZ(220);
              // that.oneRotateGroup.add(plane);

              that.oneRotateGroup.add(that.JointTwoMesh);
              that.oneRotateGroup.add(that.twoRotateGroup);
              //平移第一轴子坐标系
              that.oneRotateGroup.translateX(-0.2);
              that.oneRotateGroup.translateY(-62.5);
              that.oneRotateGroup.translateZ(0.3);
            })
            //加载关节3
            loader.load('../../static/robotStl/Joint-3.stl',function (JointThreeGeometry) {
              // // 几何体居中
              JointThreeGeometry.center();
              // // 旋转和平移立方体
              JointThreeGeometry.rotateY(Math.PI/3);
              JointThreeGeometry.translate(-32,72.3,-2.6);
              //关节3材质对象Material
              var JointThreeMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointThreeMesh = new Three.Mesh(JointThreeGeometry, JointThreeMaterial); //网格模型对象Mesh
              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 45, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateY(Math.PI/2);
              // // plane.translateZ(220);
              // that.twoRotateGroup.add(plane);
              that.twoRotateGroup.add(that.JointThreeMesh);
              that.twoRotateGroup.add(that.threeRotateGroup);
              //平移第二轴子坐标系
              that.twoRotateGroup.translateX(75.5);
              that.twoRotateGroup.translateY(111.3);
              that.twoRotateGroup.translateZ(0.2);
            })
            //加载关节4
            loader.load('../../static/robotStl/Joint-4.stl',function (JointFourGeometry) {
              // // 几何体居中
              JointFourGeometry.center();
              // // 旋转和平移立方体
              JointFourGeometry.translate(-35.6,70,17.58);
              JointFourGeometry.rotateY(Math.PI/3);
              //关节4材质对象Material
              var JointFourMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointFourMesh = new Three.Mesh(JointFourGeometry, JointFourMaterial); //网格模型对象Mesh

              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 43, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateX(Math.PI/2);
              // // plane.translateZ(220);
              // that.threeRotateGroup.add(plane);

              that.threeRotateGroup.add(that.JointFourMesh);
              that.threeRotateGroup.add(that.fourRotateGroup);
              //平移第三轴的子坐标系
              that.threeRotateGroup.translateX(-75.4);
              that.threeRotateGroup.translateY(193);
              that.threeRotateGroup.translateZ(0.45);
            })
            //加载关节5
            loader.load('../../static/robotStl/Joint-5.stl',function (JointFiveGeometry) {
              // // 几何体居中
              JointFiveGeometry.center();
              // // 旋转和平移立方体
              JointFiveGeometry.rotateY(Math.PI/3);
              JointFiveGeometry.translate(24,-63.6,55.2);
              //关节2材质对象Material
              var JointFiveMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointFiveMesh = new Three.Mesh(JointFiveGeometry, JointFiveMaterial); //网格模型对象Mesh

              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 43, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateY(Math.PI/2);
              // // plane.translateZ(220);
              // that.fourRotateGroup.add(plane);

              that.fourRotateGroup.add(that.JointFiveMesh);
              that.fourRotateGroup.add(that.fiveRotateGroup);
              //平移第四轴子坐标系
              that.fourRotateGroup.translateX(-68);
              that.fourRotateGroup.translateY(99.2);
              that.fourRotateGroup.translateZ(52.2);
            })
            //加载关节6
            loader.load('../../static/robotStl/Joint-6.stl',function (JointSixGeometry) {
              // // 几何体居中
              JointSixGeometry.center();
              // // 旋转和平移立方体
              JointSixGeometry.rotateY(Math.PI/3);
              JointSixGeometry.translate(-24.7,-105,0.65);
              //关节2材质对象Material
              var JointSixMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointSixMesh = new Three.Mesh(JointSixGeometry, JointSixMaterial); //网格模型对象Mesh
              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 43, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateX(Math.PI/2);
              // // plane.translateZ(220);
              // that.fiveRotateGroup.add(plane);
             that.fiveRotateGroup.add(that.JointSixMesh);
             that.fiveRotateGroup.add(that.sixRotateGroup);
              // // 平移第五轴子坐标系
             that.fiveRotateGroup.translateX(68.7);
             that.fiveRotateGroup.translateY(-169.6);
             that.fiveRotateGroup.translateZ(77.5);
            })
            //加载关节7
            loader.load('../../static/robotStl/Joint-7.stl',function (JointSenveGeometry) {
              // // 几何体居中
              JointSenveGeometry.center();
              // // 旋转和平移立方体
              JointSenveGeometry.rotateY(Math.PI/3);
              JointSenveGeometry.translate(0.5,-15.5,35);
              //关节2材质对象Material
              var JointSenveMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointSenveMesh = new Three.Mesh(JointSenveGeometry, JointSenveMaterial); //网格模型对象Mesh
              // //创建平面几何体，用于辅助定位
              // var planeGeometry = new Three.CircleGeometry( 38, 32 );
              // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
              // side: Three.DoubleSide,
              // wireframe:true
              // } );
              // var plane = new Three.Mesh( planeGeometry, planeMaterial );
              // plane.rotateY(Math.PI/2);
              // // plane.translateZ(220);
              // that.sixRotateGroup.add(plane);
              that.sixRotateGroup.add(that.JointSenveMesh);
              that.sixRotateGroup.add(that.senveRotateGroup);
               // // 平移第六轴子坐标系
              that.sixRotateGroup.translateX(10);
              that.sixRotateGroup.translateY(-172.8);
              that.sixRotateGroup.translateZ(-0.15);
            })
            //加载关节8
            loader.load('../../static/robotStl/Joint-8.stl',function (JointEightGeometry) {

              // // 几何体居中
              JointEightGeometry.center();
              // // 旋转和平移立方体
              JointEightGeometry.rotateY(Math.PI/3);
              JointEightGeometry.translate(4.5,-13,2.5);
              //关节2材质对象Material
              var JointEightMaterial = new Three.MeshPhongMaterial({
                color: 0xffffff,
                shininess:20
              }); //材质对象Material
              that.JointEightMesh = new Three.Mesh(JointEightGeometry, JointEightMaterial); //网格模型对象Mesh
             // //创建平面几何体 用于辅助定位
             // var planeGeometry = new Three.CircleGeometry( 38, 32 );
             // var planeMaterial = new Three.MeshBasicMaterial( {color: 0xff00ff,
             // side: Three.DoubleSide,
             // wireframe:true
             // } );
             // var plane = new Three.Mesh( planeGeometry, planeMaterial );
             // plane.rotateX(Math.PI/2);
             // // plane.translateZ(220);
             // that.senveRotateGroup.add(plane);
             that.senveRotateGroup.add(that.JointEightMesh);
              // // 平移第七轴子坐标系
             that.senveRotateGroup.translateX(-9.94);
             that.senveRotateGroup.translateY(-69);
             that.senveRotateGroup.translateZ(76.12);
            })
            //三维坐标系辅助显示
            var AxesHelper = new Three.AxesHelper(300);
            AxesHelper.translateY(-620);
            this.scene.add(AxesHelper);

            //各个旋转轴的坐标系辅助线
            // this.oneRotateGroup.add(new Three.AxesHelper(300));
             // this.twoRotateGroup.add(new Three.AxesHelper(300));
            // this.threeRotateGroup.add(new Three.AxesHelper(300));
            // this.fourRotateGroup.add(new Three.AxesHelper(300));
            // this.fiveRotateGroup.add(new Three.AxesHelper(300));
            // this.sixRotateGroup.add(new Three.AxesHelper(300));
            // this.senveRotateGroup.add(new Three.AxesHelper(300));
            // this.eightRotateGroup.add(new Three.AxesHelper(300));
            /**
             * 光源设置
             */
            //点光源
            var pointL = new Three.PointLight(0xEAEAEA);
            pointL.position.set(400, 600, 400); //点光源位置
            this.scene.add(pointL); //点光源添加到场景中
            //点光源
            var pointB = new Three.PointLight(0xEAEAEA);
            pointB.position.set(-400, 500, 400); //点光源位置
            this.scene.add(pointB); //点光源添加到场景中
            //点光源
            var pointA = new Three.PointLight(0xEAEAEA);
            pointA.position.set(400, 600, -400); //点光源位置
            this.scene.add(pointA); //点光源添加到场景中
            //点光源
            var pointR = new Three.PointLight(0xEAEAEA);
            pointR.position.set(-400, 500, -400); //点光源位置
            this.scene.add(pointR); //点光源添加到场景中
            //环境光
            var ambient = new Three.AmbientLight(0x444444);
            this.scene.add(ambient);
            // console.log(this.scene)
            // console.log(this.scene.children)
            /**
             * 相机设置
             */
            var width = this.threeViewWidth; //窗口宽度
            // console.log(this.threeViewWidth);
            var height = this.threeVieHeight; //窗口高度
            var k = width / height; //窗口宽高比
            var s =700; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            this.camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1800);
            this.camera.position.set(300, 0, 600); //设置相机位置
            this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
            /**
             * 创建渲染器对象
             */
            this.renderer = new Three.WebGLRenderer();
            this.renderer.setSize(width, height);//设置渲染区域尺寸
            this.renderer.setClearColor(0xD4D4D4, 1); //设置背景颜色
            container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
            this.renderFrame();

             this.controls=new OrbitControls(this.camera,this.renderer.domElement);
             // this.controls.addEventListener('changer',renderFrame)
             console.log('initfin')
          },

      scramButtonClicked(){
        console.log(12235555);
      },
      controlAxisRotateInSimulate(index){
        // console.log(index)
        // console.log(this.positionOfAxisInSimulate[index])
        if((index+1)==1){
          this.oneRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==2){
          this.twoRotateGroup.rotation.x=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==3){
         this.threeRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==4){
          this.fourRotateGroup.rotation.x=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==5){
          this.fiveRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
        if((index+1)==6){
          this.sixRotateGroup.rotation.x=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8
        }
        if((index+1)==7){
          this.senveRotateGroup.rotation.y=this.positionOfAxisInSimulate[index]*Math.PI/180;//绕axis轴旋转π/8;
        }
      },
      backToZeroPosition(){
        this.oneRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[0]=0.0;
        this.twoRotateGroup.rotation.x=0.0;
        this.positionOfAxisInSimulate[1]=0.0;
        this.threeRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[2]=0.0;
        this.fourRotateGroup.rotation.x=0.0;
        this.positionOfAxisInSimulate[3]=0.0;
        this.fiveRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[4]=0.0;
        this.sixRotateGroup.rotation.x=0.0;
        this.positionOfAxisInSimulate[5]=0.0;
        this.senveRotateGroup.rotation.y=0.0;
        this.positionOfAxisInSimulate[6]=0.0;
      },
      beforeInitClearPosition(){
        var oneA=this.positionOfAxisInSimulate[0];
        var twoA=this.positionOfAxisInSimulate[1];
        var threeA=this.positionOfAxisInSimulate[2];
        var fourA=this.positionOfAxisInSimulate[3];
        var fiveA=this.positionOfAxisInSimulate[4];
        var sixA=this.positionOfAxisInSimulate[5];
        var senveA=this.positionOfAxisInSimulate[6];
        this.positionOfAxisInSimulate[0]=0.0;
        this.positionOfAxisInSimulate[1]=0.0;
        this.positionOfAxisInSimulate[2]=0.0;
        this.positionOfAxisInSimulate[3]=0.0;
        this.positionOfAxisInSimulate[4]=0.0;
        this.positionOfAxisInSimulate[5]=0.0;
        this.positionOfAxisInSimulate[6]=0.0;
        this.oneRotateGroup.rotation.y=0.0;//绕axis轴旋转π/8;
        this.twoRotateGroup.rotation.x=0.0;//绕axis轴旋转π/8;
        this.fourRotateGroup.rotation.x=0.0;//绕axis轴旋转π/8;
        this.fiveRotateGroup.rotation.y=0.0;//绕axis轴旋转π/8;
        this.sixRotateGroup.rotation.x=0.0;//绕axis轴旋转π/8
        this.senveRotateGroup.rotation.y=0.0;//绕axis轴旋转π/8;
        this.init();
        this.positionOfAxisInSimulate[0]=oneA;
        this.positionOfAxisInSimulate[1]=twoA;
        this.positionOfAxisInSimulate[2]=threeA;
        this.positionOfAxisInSimulate[3]=fourA;
        this.positionOfAxisInSimulate[4]=fiveA;
        this.positionOfAxisInSimulate[5]=sixA;
        this.positionOfAxisInSimulate[6]=senveA;

      }

    }
  }
</script>
<style>
  .wholeWrap{
  }
  .topBar{

  }
  .stateCardLeft{
    margin: 10px;
    padding:5px 10px 5px 10px;
    border-radius: 10px;
    height: 130px;
    background-color: #ECECEC;
     box-shadow: 4px 8px 10px 0 rgba(0, 0, 0, 0.5)
  }
  .stateCardLeft:hover{
    margin: 10px;
    padding:5px 10px 5px 10px;
    border-radius: 10px;
    height: 130px;
    background-color: #ECECEC;
    box-shadow: 7px 16px 18px 0 rgba(0, 0, 0, 0.5)
  }
  .controlCardCenter{
    margin: 10px;
    padding:5px 10px 5px 10px;
    border-radius: 10px;
    height: 80px;
    background-color: #ECECEC;
    box-shadow: 4px 5px 7px 0 rgba(0, 0, 0, 0.5)
  }
  .controlCardCenter:hover{
    margin: 10px;
    padding:5px 10px 5px 10px;
    border-radius: 10px;
    height: 80px;
    background-color: #ECECEC;
    box-shadow: 6px 11px 14px 0 rgba(0, 0, 0, 0.5)
  }
  .controlButtonTag{
    box-shadow: 3px 6px 8px 0 rgba(0, 0, 0, 0.5)
  }
  .CardContent {
      font-size: 15px;
      margin: 5px;
      padding: 1px;
      /* border: 5px solid #0000FF; */
    }
    .cardTitle{
      font-size: 15px;
      font-family: "微软雅黑";
      font-weight: bold;
    }
    .posiAndPoseData{
      font-size: 16px;
      color: #00B0FF;
    }
    .positionSlider{
      display: inline-block;
      width: 450px;
    }

.upLoadExeclFile{
        position: relative;
    }
    #fileinp{
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
    #upLoadBtn{
        margin-right: 5px;
        z-index: 10;
    }
  .ControlButton{
          position: relative;
      }
   .controlBtnDown{
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
      }
   .controlBtnUp{
          width: 60px;
          margin-right: 5px;
          z-index: 0;
          box-shadow: 6px 11px 14px 0 rgba(0, 0, 0, 0.5)
      }
    .controlBtnUp:hover{
             width: 60px;
             margin-right: 5px;
             z-index: 0;
             box-shadow: 2px 6px 9px 0 rgba(0, 0, 0, 0.5)
         }
  /* .controlBtnUpHover{
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 60px;
        margin-right: 5px;
        z-index: 1;
        box-shadow: 2px 5px 8px 0 rgba(0, 0, 0, 0.5)
      }
    .controlBtnUpHover:hover{
         position: absolute;
         left: 0;
         top: 0;
         opacity: 1;
         width: 60px;
         margin-right: 5px;
         z-index: 1;
       } */

   .RealRobotControlButton{
     position: relative;
     /* border:  1px solid #0000FF; */
   }
   .XYZRPYPosTag{
    font-size: 20px;
    width: 20%;
   }
   .XYZButton{
     position: absolute;
     top: 50px;
     /* border:  1px solid #0000FF; */
   }
   .RPYButton{
     position: absolute;
     top: 50px;
     left: 300px;
    /* border:  1px solid #0000FF; */
   }
   .zPosBtn{
     position: absolute;
     top: 5px;
     left: 45px;
   }
   .zNegBtn{
     position: absolute;
     top: 5px;
     left: 185px;
   }
   .xPosBtn{
     position: absolute;
     top: 75px;
     left: 115px;
   }
   .xNegBtn{
     position: absolute;
     top: 185px;
     left: 115px;
   }
   #yPosImg{
     width: 80px;
   }
   #yNegImg{
     width: 82px;
   }
   .yPosBtn{
     position: absolute;
     top: 130px;
     left: 60px;
   }
   .yNegBtn{
     position: absolute;
     top: 131px;
     left: 140px;
   }


  .rPosBtn{
    position: absolute;
    top: 5px;
    left: 45px;
  }
  .rNegBtn{
    position: absolute;
    top: 5px;
    left: 185px;
  }
  .pPosBtn{
    position: absolute;
    top: 75px;
    left: 115px;
  }
  .pNegBtn{
    position: absolute;
    top: 185px;
    left: 115px;
  }
  #yPosImg{
    width: 80px;
  }
  #yNegImg{
    width: 82px;
  }
  .yawPosBtn{
    position: absolute;
    top: 130px;
    left: 60px;
  }
  .yawNegBtn{
    position: absolute;
    top: 131px;
    left: 140px;
  }
  .runModeAndDataSaveAboutButton{
    font-size: 1.2rem;
    border: 2px solid #0DB7F0;
    box-shadow: 3px 6px 8px 0 rgba(0, 0, 0, 0.5)
  }
  .runModeAndDataSaveAboutButton:hover{
    font-size: 1.2rem;
    border: 2px solid #0DB7F0;
    box-shadow: 1px 4px 6px 0 rgba(0, 0, 0, 0.5)
  }
  .runModeAndDataSaveAboutButtonHandMode{
    font-size: 1.2rem;
     border: 2px solid red;
     border: 2px solid #0DB7F0;
     box-shadow: 3px 6px 8px 0 rgba(0, 0, 0, 0.5)
  }
  .runModeAndDataSaveAboutButtonHandMode:hover{
    font-size: 1.2rem;
     border: 2px solid red;
     border: 2px solid #0DB7F0;
     box-shadow: 1px 4px 6px 0 rgba(0, 0, 0, 0.5)
  }
  .sliderButtonContain{
      /* position: relative; */
  }

/* 媒体查询功能 */
/* 高度最大像素1000像素 最小像素480像素 即高度在480-1000之间时 */
@media only screen and (min-height:480px) and (max-height:1000px){
.wholeWrap{
	  height: 960px;
	}

}
/* 高度最小像素1001像素 即高度大于1000时*/
@media only screen and (min-height:1001px) {
	.wholeWrap{
	  height: 1000px;
	}
}
/* 媒体查询功能 */
/* 宽度最大像素1500像素 最小像素480像素 即宽度在480-1500之间时 */
@media only screen and (min-width:480px) and (max-width:1500px){
  .CardContent {
      font-size: 12px;
      margin: 2px;
      padding: 1px;
      /* border: 5px solid #0000FF; */
    }
    .cardTitle{
      font-size: 13px;
      font-family: "微软雅黑";
      font-weight: bold;
    }
    .posiAndPoseData{
      font-size: 14px;
      color: #00B0FF;
    }
    .XYZRPYPosTag{
     font-size: 20px;
     width: 20%;
     padding: 2px;
    }
    .XYZButton{
      position: absolute;
      top: 50px;
      left: -10px;
    }
    .RPYButton{
      position: absolute;
      top: 50px;
      left: 220px;
    }
}
/* 宽度最小像素1501像素 即高度大于1500时*/
@media only screen and (min-width:1501px) {

}
</style>
