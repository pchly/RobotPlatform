<template>
  <div id="app">
     <!-- <tab>
       <tab-item v-for="(item,index) in headers" :key=index
       :selected="$route.path=='/'+item.name"
       @on-item-click="routeTo">{{item.desc}}</tab-item>

    </tab> -->
    <!-- 主界面的路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
//按需引入VUX组件的方法
import { Tab, TabItem } from 'vux'
//按照map的方法使用vuex的state数据
import {mapState,mapGetters,mapMutations} from 'vuex';
//网上的有个开源的  ’回到顶部‘  的组件
import vmBackTop from 'vue-multiple-back-top';



export default {
  name: 'app',
  //当按需引入vux组件时，需要在components里面注册
  components: {
    Tab,
    TabItem,
    vmBackTop
  },
  //挂载完成的生命周期函数
  mounted(){

  },
  computed:{
    //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
    // ...mapGetters(['moreMenus']),
    // ...mapState(['headers']),
  },
  data:function(){
    return{

    }
  },
  created:function(){
    //读取本地存储的内容
    var loginStatus=window.localStorage.getItem('loginStatus');
    if(loginStatus){
      //使用map方法后直接调用mutation定义的函数
      // this.mutationLogin();
      // this.mutationLoginName(window.localStorage.getItem('loginname'));
      // this.mutationAccessToken(window.localStorage.getItem('accesstoken'));
    }
  },
  methods: {
    //使用map方法引入mutation时，需要在methods方法中使用...map的语法引入具体的mutation
    ...mapMutations(['mutationLogin','mutationLoginName','mutationAccessToken']),
    routeTo(index){
      this.$router.push('/'+this.headers[index].name);
      console.log(this.headers[index].name);
    }
  }


}
</script>

<style lang="less">
//引入浏览器css初始化样式表
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
}
</style>
