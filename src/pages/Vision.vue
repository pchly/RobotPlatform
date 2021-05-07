<template>
    <div>
       <el-button-group>
         <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
       </el-button-group>
        <hr />
       <!-- <img src="../assets/vision.png" alt=""> -->
       <img class="videoImg"  width="640"  height="480" :src="autoUpdateMessage.imgData" alt="">
    </div>
</template>
<script>
//按照map的方法使用vuex的state数据
import {mapState,mapGetters,mapMutations} from 'vuex';
export default {
  name:'vision',
  computed:{
    //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
    //引入了autoUpdateMessage服务器自动上报数据
    ...mapState(['autoUpdateMessage']),
  },
  methods:{
    backToHome(){
      this.$router.push('/home');
    }
  }
}
</script>
