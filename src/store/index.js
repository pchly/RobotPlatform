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
          autoUpdateMessage:{
            data:'',
            imgData:''
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
