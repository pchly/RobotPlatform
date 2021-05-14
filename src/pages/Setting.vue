<template>
<<<<<<< HEAD
    <div>
       <el-button-group>
         <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
         <el-button @click="getSize" type="primary" icon="el-icon-arrow-left">大小</el-button>
       </el-button-group>
       <hr />
        <div :style="{ height: styObj + 'px' }" class="ParameterSettingBox">
            <div class="ParameterSettingLeft">
                <ul>
                    <li v-for="(item,index) in parameterList" :key="index">
                       <el-button  @click="ParameterSelect(index)" type="primary" icon="el-icon-arrow-left"> {{item}}</el-button>
                    </li>
                </ul>
         </div>
         <div class="ParameterSettingRight">
             <div v-if="menu_index == 0">
                <div style="height:30px;">
                <div style="background-color:skyblue;width:300px;float:left">当前参数</div>
                <div style="background-color:green;width:300px;float:left">参数设置</div>
                </div>
                <hr/>
                <div>
                <p>正限位<input type="range" min="0" max="100" step="1"></p>
                <p>负限位<input type="range" min="0" max="100" step="1"></p>
                <p>速度<input type="range" min="0" max="100" step="1"></p>
                <p>加速度<input type="range" min="0" max="100" step="1"></p>
                <p>加加速度<input type="range" min="0" max="100" step="1"></p>
                </div>
               
                 <hr/>
                <div>
                <button>保存</button>
                </div>
             </div>
             <div v-if="menu_index == 1">
               <div>
                 气泵
                 <button>开</button>
                 <button>关</button>
               </div>
               <hr/>
               <div>
                 夹爪
                <input type="range" min="0" max="100" step="1"/>
               </div>
             </div>
             <div v-if="menu_index == 2">
                <button>打开相机</button>
                <button>关闭相机</button>
                <button>拍摄照片</button>
                <button>保存照片</button>
                <button>标定</button>
                <button>抓取</button>
             </div>
             <div v-if="menu_index == 3">
               <p>回零减速比：<span>数值</span></P>
               <p>通讯周期：<span>数值</span></P>
               <p>直线运动最大速度：<span>数值</span></P>
               <p>直线运动最大加速度：<span>数值</span></P>
               <p>直线运动最大加加速度：<span>数值</span></P>
               <hr/>
                <div>
                <button>保存</button>
                </div>
             </div>
         </div>
    </div>
    </div>
</template>

<script>
export default {
    name:'setting',
     data(){
              return{
                  parameterList:['运动参数','工具参数','相机参数','其它参数'],
                  menu_index:0,
                    styObj:{
                                    height:0
                        }
               }
        },
     mounted(){
        window.addEventListener('resize', this.changeHeight);
     },
     methods:{
        backToHome(){
          this.$router.push('/home');
        },
        changeHeight(){
            this.styObj.height=window.innerHeight-255+'px';
          },
        getSize()
        {
          console.log(this.styObj.height);
        },
        ParameterSelect(index)
        {
          this.menu_index=index;      
        }
      }
}
</script>

<style>
.ParameterSettingLeft{
    width: 20%;
    float: left;
}

.ParameterSettingRight{
    width: 80%;
    float: left;
}
</style>
=======
  <div>
    <el-button-group>
      <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
    </el-button-group>
   <img src="../assets/setting-zw.png" />
  </div>
</template>
<script>
export default {
    name:'setting',
    methods:{
      backToHome(){
        this.$router.push('/home');
      }
      },
}
</script>
>>>>>>> 0e26ba28fde773085ecac73535521ba25e4f4c9e
