import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
      {
        path:'/',
        //路由转接redirect
        redirect: '/home'
      },
      //home页面
      {
        path:'/home',
        name:'home',
        component:() => import("../components/Home.vue"),
        props:true
      },
      //基础控制
      {
        path:'/basicControl',
        name:'basicControl',
        component:() => import("../components/BasicControl.vue"),
        props:true
      },
      //blockly
      {
        path:'/blockly',
        name:'blockly',
        component:() => import("../components/Blockly.vue"),
        props:true
      },
      //python
      {
        path:'/python',
        name:'python',
        component:() => import("../components/Python.vue"),
        props:true
      },
      //vision
      {
        path:'/vision',
        name:'vision',
        component:() => import("../components/Vision.vue"),
        props:true
      },
      //消息测试,WebSocket
      {
        path:'/webSocketTest',
        name:'webSocketTest',
        component:() => import("../components/WebSocketTest.vue"),
        props:true
      },
      //设置页面
      {
        path:'/setting',
        name:'setting',
        component:() => import("../components/setting.vue"),
        props:true
      },
      //预留页面
      {
        path:'/reserve',
        name:'reserve',
        component:() => import("../components/reserve.vue"),
        props:true
      }
      // //ElementUi测试
      // {
      //   path:'/elementui/:total',
      //   name:'elementui',
      //   component:ElementUiTest,
      //   props:true
      // }
];

const router = new VueRouter({
  routes
});
export default router;