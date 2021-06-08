const mutations={
  mutationPositionOfXAxis:function(state,payload){
    state.positionOfAxis.XAxis=payload;
  },
  mutationServerIp:function(state,payload){
    state.serverAndLinkInfo.ip=payload;
  },
  mutationOutExeclDataSimulate:function(state,payload){
    state.outExeclDataSimulate=payload;
  },
  mutationEnableRobot:function(state,payload){
    state.enableRobot=payload;
  },
  mutationMoveVecReal:function(state,payload){
    state.moveVecReal=payload;
  },
  mutationKindOfEndTool:function(state,payload){
    state.kindOfEndTool=payload;
  },
  mutationStateOfEndSuck:function(state,payload){
    state.stateOfEndSuck=payload;
  },
  mutationPosOfEndJaw:function(state,payload){
    state.posOfEndJaw=payload;
  },
  mutationRealRobotControlMode:function(state,payload){
    state.realRobotControlMode=payload;
  },
  mutationTheRunInformationfunction(state,payload){
    state.theRunInformation=payload;
  },
    // 用法示例
    // mutationIsShowMoreMenus:function(state,payload){
    //     //state表示当前的状态数据
    //     //payload表示使用方传递的附加数据
    //     state.isShowMoreMenus=payload;
    // },
    // mutationLogin:function(state){
    //     //state表示当前的状态数据
    //     //payload表示使用方传递的附加数据
    //     state.isLogined=true;
    // },
    // mutationLoginName:function(state,payload){
    //     //state表示当前的状态数据
    //     //payload表示使用方传递的附加数据
    //     state.loginName=payload;
    // },
    // mutationAccessToken:function(state,payload){
    //     //state表示当前的状态数据
    //     //payload表示使用方传递的附加数据
    //     state.accesstoken=payload;
    // },
    // mutationLogout:function(state){
    //     state.isLogined=false;
    //     state.loginName='';
    //     state.accesstoken='';
    // }



}
export default mutations;
