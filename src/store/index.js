import Vue from 'vue';
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'

Vue.use(Vuex);

const store=new Vuex.Store({
        //状态数据
        state:{
          //主页对应的功能页面跳转按钮的文字
          headers:[
            // {name:'home',desc:'主页'},
            {name:'basicControl',desc:'基础控制'},
            {name:'blockly',desc:'blockly拖拽式编程'},
            {name:'python',desc:'python脚本编程'},
            {name:'vision',desc:'视觉控制'},
            {name:'webSocketTest',desc:'通信测试'},
            {name:'setting',desc:'设置'},
            {name:'reserve',desc:'预留'}
          ],
          //主页连接服务器的相关参数
          serverAndLinkInfo:{
            ip:'',//服务器ip地址
            port:'8888',//服务器交互通信端口号
            portAuto:'8889',//服务器自动上报数据端口号
            linkButtonType:'success',//连接服务器按钮的类型：danger和success对应红色和绿色
            linkButtonText:'连接服务器',//连接服务器按钮的文本
            haveEverLink:false//是否已经连接服务器的标志位
          },
          positionOfAxis:{
            XAxis:'123',
            YAxis:'456'
          },
          positionOfAxisInSimulate:{
            "oneAxis":'0.0',
            "twoAxis":'0.0',
            "threeAxis":'0.0',
            "fourAxis":'0.0',
            "fiveAxis":'0.0',
            "sixAxis":'0.0',
            "senveAxis":'0.0'
          },
          positionOfXYZRPYInReal:{
            "XPos":'0.0',
            "YPos":'0.0',
            "ZPos":'0.0',
            "Pitch":'0.0',
            "Yaw":'0.0',
            "Roll":'0.0'
          },
          positionOfAxisInReal:{
            "oneAxis":'0.0',
            "twoAxis":'0.0',
            "threeAxis":'0.0',
            "fourAxis":'0.0',
            "fiveAxis":'0.0',
            "sixAxis":'0.0',
            "senveAxis":'0.0'
          },
          enableRobot:false,
          moveVecReal:0.0,
          kindOfEndTool:2,//0代表夹爪，1代表吸盘,2代表无
          stateOfEndSuck:false,
          posOfEndJaw:0.0,
          theRunInformation:'未连接机械臂',
          runInformationDataBuff:[],
          realRobotControlMode:1,//1代表点动模式,2代表手动模式
          outExeclDataSimulate:[],
          outExeclDataHandMode:[],


          AxisOriginSettingData:{
            "oneAxis":'0.0',
            "twoAxis":'0.0',
            "threeAxis":'0.0',
            "fourAxis":'0.0',
            "fiveAxis":'0.0',
            "sixAxis":'0.0',
            "senveAxis":'0.0'
          },
          lineMoveSettingData:{
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          oneAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          twoAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          threeAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          fourAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          fiveAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          sixAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          senveAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          XAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          YAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          ZAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          RollAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          PitchAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },
          YawAxisSettingData:{
            "negativeLimitPosition":'0.0',
            "positiveLimitPosition":'0.0',
            "speedLimit":'0.0',
            "accLimit":'0.0',
            "jerkLimit":'0.0'
          },

          // 自动上报的数据
          autoUpdateMessage:{
            // 机器人状态初始化为全零数组
            robotStateData:new Uint8Array(243).fill(0),
            // 图像数据初始化为相机图片
            imgData:require('../assets/vision.png')
          }
          // 示例数据
            // topics:[
            //     {name:'all',desc:'全部'},
            //     {name:'good',desc:'精华'},
            //     {name:'share',desc:'分享'},
            //     {name:'ask',desc:'问答'},
            //     {name:'job',desc:'招聘'},
            //     {name:'dev',desc:'测试'}
            //   ],
            //   unLoginedMoreMenus:{
            //     login:'登录'
            //   },
            //   loginedMoreMenus:{
            //     center:'个人中心',
            //     createTopic:'发表话题',
            //     msg:'消息通知',
            //     logout:'退出登录'
            //   },
            //   isLogined:false,
            //   loginName:'',
            //   accesstoken:'',
            //   isShowMoreMenus:false
        },
        //状态数据的计算信息
        getters:{
            // 用法示例
            // moreMenus:function(state){
            //     if(state.isLogined==true){
            //       return state.loginedMoreMenus;
            //     }

            //     return state.unLoginedMoreMenus;

            //   },
            //   getTopicDescByType:function(state){
            //     return function(tab){
            //       for(var index=0;index<state.topics.length;index++){
            //         if(state.topics[index].name==tab){
            //           return state.topics[index].desc;
            //         }
            //       }

            //     };
            //   }

        },
        mutations,
        actions
});

export default store;
