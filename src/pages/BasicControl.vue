<template>
    <div>
      <!-- 返回主页按钮 
		  <el-button-group>
		     <el-button @click="backToHome" type="primary" icon="el-icon-arrow-left">返回</el-button>
	  	</el-button-group>-->
       <hr />

     	<!---控制主界面--->
		<div id="app" unselectable="on" onselectstart="return false;" class="app-root">
			<!--主容器-->
			<div  class="main-container">
				<section class="el-container hello emulator-container">
				
				<!-- 顶部的控制、机器人连接状态、stop按钮-->
				<div class="common-header-wrapper">
					<!-- 顶部的控制按钮-->
					<!--<div style="display: flex; align-items: center;">
						cursor: pointer用于设置手形鼠标 
						<div  class="com-back-title" style="display: flex; align-items: center; cursor: pointer; position: absolute; left: 20px;">
							该control为返回主界面的超链接
							<a  class="el-icon-arrow-left" style="margin-right: 15px;"></a>
							控制
						</div>
					</div>  
					机器人连接状态
					<div >
						<div style="color: rgb(235, 158, 5);">
							el-icon-warning类可以自带警告图标
							<i class="el-icon-warning" style="margin-right: 10px;"><span title="192.168.1.105">Simulate Robot</span></i>
						</div> 
					</div> 
					<!-顶部的控制、机器人连接状态、stop按钮   该处使用的是绝对布局，按钮位置放置在了界面的左上角出
					<div style="position: absolute; right: 0px; top: 0px;">
						<button  class="stop-active" style="color: rgb(198, 37, 51);">急停</button>
					</div>
					-->
				</div>
				<!---控制与设置模块--->
				<div data-v-62fb6f82="" class="pc-control-wrapper">
					<div data-v-82323c94="" data-v-62fb6f82="" class="main-wrapper">
						<!---关节点动控制部分--->
						<div data-v-82323c94="" class="main-view top-block-wrapper">
							<div data-v-82323c94="" class="select-xarm-model">
								<div data-v-82323c94="" class="model-container com-block-wrapper com-padding">
									<div data-v-62fb6f82="" data-v-82323c94="" style="height: 100%;">
										<div data-v-1eff4eea="" data-v-6d66e2f4="" id="model-wrapper" class="hello" data-v-82323c94="">
											<div data-v-1eff4eea="" class="hello-row">
												<div data-v-1eff4eea="" id="emulator-overlay">   
												</div> 
												<div data-v-1eff4eea="" id="emulator-container">
													<canvas width="100" height="192" style="width: 100px; height: 192px;"></canvas>
												</div> 
												<div data-v-1eff4eea="" title="Reload" class="el-icon-refresh" style="position: absolute; top: 5px; left: 5px; font-size: 20px;">
												</div>
											</div>
										</div>
									</div>
								</div> 
								<div data-v-82323c94="" class="com-block-wrapper robot-select com-padding">
									<div data-v-564fc4ba="" data-v-82323c94="" id="root-menu" class="noselected">
										<div data-v-564fc4ba="" role="radiogroup" class="el-radio-group">
											<label data-v-564fc4ba="" role="radio" tabindex="0" class="el-radio">
												<span class="el-radio__input">
													<span class="el-radio__inner"></span>
													<input type="radio" tabindex="-1" class="el-radio__original" value="trueRobot">
												</span>
												<span class="el-radio__label"> 机械臂实体<!----></span>
											</label> 
											<label data-v-564fc4ba="" role="radio" tabindex="0" class="el-radio is-checked" aria-checked="true">
												<span class="el-radio__input is-checked">
													<span class="el-radio__inner"></span>
													<input type="radio" tabindex="-1" class="el-radio__original" value="simuRobot">
												</span>
												<span class="el-radio__label"> 仿真机械臂<!----></span>
											</label>
										</div>
									</div>
								</div>
							</div> 
							<div data-v-82323c94="" class="free-drive com-padding">
								<div data-v-4722dadc="" data-v-82323c94="" class="button-wrapper">
									<button data-v-4722dadc="" disabled="disabled" class="com-btn">
										<span data-v-4722dadc="" class="vertical-text"> Manual</span>
									</button>
									</div>
							</div> 
							<!---关节点动控制部分--->
							<div data-v-82323c94="" class="joint-control com-padding">
								<!---关节点动控制部分--->
								<div data-v-78c929e5="" data-v-82323c94="" class="dialog-content">
									<!---关节点动控制部分--->
									<div data-v-78c929e5="" class="range-wrapper">
										<!---关节点动控制部分--->
										<div data-v-78c929e5="" class="single-range-wrapper">
											<!---关节一：点动按钮--->
											<div data-v-78c929e5="" class="setting-line">
												<div data-v-78c929e5="" class="slider-wrapper">
													<span data-v-78c929e5="" class="left-title">关节1</span> <!----> 
													<div data-v-78c929e5="" style="width: 40%; margin: 0px 4%; display: flex; justify-content: center; align-items: center;">
														<input data-v-78c929e5="" type="range" min="-360" max="360" step="0.1" class="range-input select-joint-number enable-drag-input">
													</div> 
													<div data-v-78c929e5="" class="joint-btn-wrapper">
														<button data-v-78c929e5="" id="joint-angle-decrease" axis="0" class="el-icon-minus joint-btn"></button> 
														<div data-v-78c929e5="" class="input-box">
															<input data-v-78c929e5="" type="number">
															<span data-v-78c929e5="" style="padding: 4px;"></span>
														</div> 
														<button data-v-78c929e5="" id="joint-angle-increase" axis="0" class="el-icon-plus joint-btn"></button>
													</div>
												</div>
											</div>
											<!---关节二：点动按钮--->
											<div data-v-78c929e5="" class="setting-line">
												<div data-v-78c929e5="" class="slider-wrapper">
													<span data-v-78c929e5="" class="left-title">关节2</span> <!----> 
													<div data-v-78c929e5="" style="width: 40%; margin: 0px 4%; display: flex; justify-content: center; align-items: center;">
														<input data-v-78c929e5="" type="range" min="-124" max="124" step="0.1" class="range-input select-joint-number enable-drag-input">
													</div> 
													<div data-v-78c929e5="" class="joint-btn-wrapper">
														<button data-v-78c929e5="" id="joint-angle-decrease" axis="1" class="el-icon-minus joint-btn"></button>
														<div data-v-78c929e5="" class="input-box">
															<input data-v-78c929e5="" type="number">
															<span data-v-78c929e5="" style="padding: 4px;"></span>
														</div> 
														<button data-v-78c929e5="" id="joint-angle-increase" axis="1" class="el-icon-plus joint-btn"></button>
													</div>
												</div>
											</div>
											<!---关节三：点动按钮--->
											<div data-v-78c929e5="" class="setting-line">
												<div data-v-78c929e5="" class="slider-wrapper">
													<span data-v-78c929e5="" class="left-title">关节三</span> <!----> 
													<div data-v-78c929e5="" style="width: 40%; margin: 0px 4%; display: flex; justify-content: center; align-items: center;">
														<input data-v-78c929e5="" type="range" min="-229" max="5" step="0.1" class="range-input select-joint-number enable-drag-input">
													</div> 
													<div data-v-78c929e5="" class="joint-btn-wrapper">
														<button data-v-78c929e5="" id="joint-angle-decrease" axis="2" class="el-icon-minus joint-btn"></button>
														<div data-v-78c929e5="" class="input-box">
															<input data-v-78c929e5="" type="number">
															<span data-v-78c929e5="" style="padding: 4px;"></span>
														</div> 
														<button data-v-78c929e5="" id="joint-angle-increase" axis="2" class="el-icon-plus joint-btn"></button>
													</div>
												</div>
											</div>
											<!---关节四：点动按钮--->
											<div data-v-78c929e5="" class="setting-line">
												<div data-v-78c929e5="" class="slider-wrapper">
													<span data-v-78c929e5="" class="left-title">关节四</span> <!----> 
													<div data-v-78c929e5="" style="width: 40%; margin: 0px 4%; display: flex; justify-content: center; align-items: center;">
														<input data-v-78c929e5="" type="range" min="-360" max="360" step="0.1" class="range-input select-joint-number enable-drag-input">
													</div> 
													<div data-v-78c929e5="" class="joint-btn-wrapper">
														<button data-v-78c929e5="" id="joint-angle-decrease" axis="3" class="el-icon-minus joint-btn"></button>
														<div data-v-78c929e5="" class="input-box">
															<input data-v-78c929e5="" type="number">
															<span data-v-78c929e5="" style="padding: 4px;"></span>
														</div> 
														<button data-v-78c929e5="" id="joint-angle-increase" axis="3" class="el-icon-plus joint-btn"></button>
													</div>
												</div>
											</div>
											<!---关节五：点动按钮--->
											<div data-v-78c929e5="" class="setting-line">
												<div data-v-78c929e5="" class="slider-wrapper">
													<span data-v-78c929e5="" class="left-title">关节5</span> <!----> 
													<div data-v-78c929e5="" style="width: 40%; margin: 0px 4%; display: flex; justify-content: center; align-items: center;">
														<input data-v-78c929e5="" type="range" min="-100" max="180" step="0.1" class="range-input select-joint-number enable-drag-input">
													</div> 
													<div data-v-78c929e5="" class="joint-btn-wrapper">
														<button data-v-78c929e5="" id="joint-angle-decrease" axis="4" class="el-icon-minus joint-btn"></button> 
														<div data-v-78c929e5="" class="input-box"><input data-v-78c929e5="" type="number">
															<span data-v-78c929e5="" style="padding: 4px;"></span>
														</div> 
														<button data-v-78c929e5="" id="joint-angle-increase" axis="4" class="el-icon-plus joint-btn"></button>
													</div>
												</div>
											</div>
											<!---关节六：点动按钮--->
											<div data-v-78c929e5="" class="setting-line">
												<div data-v-78c929e5="" class="slider-wrapper">
													<span data-v-78c929e5="" class="left-title">关节6</span> <!----> 
													<div data-v-78c929e5="" style="width: 40%; margin: 0px 4%; display: flex; justify-content: center; align-items: center;">
														<input data-v-78c929e5="" type="range" min="-360" max="360" step="0.1" class="range-input select-joint-number enable-drag-input">
													</div> 
													<div data-v-78c929e5="" class="joint-btn-wrapper">
														<button data-v-78c929e5="" id="joint-angle-decrease" axis="5" class="el-icon-minus joint-btn"></button> 
													<div data-v-78c929e5="" class="input-box">
														<input data-v-78c929e5="" type="number">
														<span data-v-78c929e5="" style="padding: 4px;"></span>
													</div> 
														<button data-v-78c929e5="" id="joint-angle-increase" axis="5" class="el-icon-plus joint-btn"></button>
												</div>
											</div>
														</div><!---->
										</div>
									</div>
								</div>
							</div>
						</div> 
						<!---笛卡尔点动控制、回零、初始位置等设置部分--->
						<div data-v-82323c94="" class="main-view bottom-block-wrapper">
							<!---笛卡尔点动数据显示部分--->
							<div data-v-754c2d09="" data-v-82323c94="" class="position-view com-block-wrapper com-padding">
								<div data-v-754c2d09="" class="block-wrapper" style="display: inline-flex; padding-top: 1vh;">
									<ul data-v-754c2d09="">
										<li data-v-754c2d09="">位置</li> 
										<li data-v-754c2d09="">
											<div data-v-754c2d09="" class="left-title">
												x:
											</div> 
											<span data-v-754c2d09="" class="input-value">204.1</span> 
											<span data-v-754c2d09="" class="unit">mm</span>
										</li>
										<li data-v-754c2d09="">
											<div data-v-754c2d09="" class="left-title">
												y:
											</div> 
											<span data-v-754c2d09="" class="input-value">0</span> 
											<span data-v-754c2d09="" class="unit">mm</span>
										</li>
										<li data-v-754c2d09="">
											<div data-v-754c2d09="" class="left-title">
												z:
											</div> 
											<span data-v-754c2d09="" class="input-value">109.5</span> 
											<span data-v-754c2d09="" class="unit">mm</span>
										</li> 
										<li data-v-754c2d09="" style="margin-top: 2vh;">姿态</li> 
										<li data-v-754c2d09="">
											<div data-v-754c2d09="" class="left-title">
												roll:
											</div> 
											<span data-v-754c2d09="" class="input-value">180</span> 
											<span data-v-754c2d09="" class="unit"></span>
										</li>
										<li data-v-754c2d09="">
											<div data-v-754c2d09="" class="left-title">
												pitch:
											</div> <span data-v-754c2d09="" class="input-value">0.8</span> 
											<span data-v-754c2d09="" class="unit"></span>
										</li>
										<li data-v-754c2d09="">
											<div data-v-754c2d09="" class="left-title">
												yaw:
											</div> 
											<span data-v-754c2d09="" class="input-value">0</span> 
											<span data-v-754c2d09="" class="unit"></span>
										</li>
									</ul>
								</div>
							</div> 
							<!---笛卡尔点动控制部分--->
							<div data-v-82323c94="" class="position-control">
								<div data-v-399e5c3b="" data-v-82323c94="" class=" test-wrapper">
									<div data-v-399e5c3b="" class="btn-cover">
									</div> 
									<div data-v-399e5c3b="" class="test-container">
										<!---笛卡尔位置控制部分--->
										<div data-v-399e5c3b="" style="opacity: 0.8;">
											<!---Z轴点动控制部分--->
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="position-z-decrease" disabled="disabled" class="com-btn pos-z-down">
													<span data-v-399e5c3b="">Z-</span>
												</button> 
												<button data-v-399e5c3b="" id="position-z-increase" disabled="disabled" class="com-btn pos-z-up">
													<span data-v-399e5c3b="">Z+</span>
												</button>
											</div> 
											<!---X轴点动控制部分--->
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="position-x-increase" disabled="disabled" class="com-btn up ">
													<span data-v-399e5c3b="">X+</span>
												</button>
											</div> 
											<!---Y轴点动控制部分--->
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="position-y-increase" disabled="disabled" class="com-btn left">
													<span data-v-399e5c3b="">Y+</span>
												</button> 
												<button data-v-399e5c3b="" id="position-y-decrease" disabled="disabled" class="com-btn right">
													<span data-v-399e5c3b="">Y-</span>
												</button>
											</div> 
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="position-x-decrease" disabled="disabled" class="com-btn down">
													<span data-v-399e5c3b="">X-</span>
												</button>
											</div>
										</div> 
										<!---笛卡尔姿态控制部分--->					
										<div data-v-399e5c3b="" style="opacity: 0.8;">
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="attitude-yaw-decrease" disabled="disabled" class="com-btn rotate-z-left">
													<span data-v-399e5c3b="">Yaw-</span>
												</button> 
												<button data-v-399e5c3b="" id="attitude-yaw-increase" disabled="disabled" class="com-btn rotate-z-right">
													<span data-v-399e5c3b="">Yaw+</span>
												</button>
											</div> 
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="attitude-pitch-increase" disabled="disabled" class="com-btn up">
													<span data-v-399e5c3b="">Pitch+</span>
												</button>
											</div> 
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="attitude-roll-decrease" disabled="disabled" class="com-btn left">
													<span data-v-399e5c3b="">Roll- </span>
												</button>
												<button data-v-399e5c3b="" id="attitude-roll-increase" disabled="disabled" class="com-btn right">
													<span data-v-399e5c3b="">Roll+ </span>
												</button>
											</div> 
											<div data-v-399e5c3b="" class="btn-wrapper">
												<button data-v-399e5c3b="" id="attitude-pitch-decrease" disabled="disabled" class="com-btn down">
													<span data-v-399e5c3b="">Pitch- </span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div> 
							<!---回零、初始位置设置模块--->
							<div data-v-82323c94="" class="left-block-wrapper">
								<!---零位与初始位置--->
								<div data-v-481ef744="" data-v-82323c94="" class="btn-wrapper com-block-wrapper com-height point-default">
									<div data-v-481ef744="" class="range-speed">
										<button data-v-481ef744="" type="zero" class="com-btn">
											零位
										</button> 
										<button data-v-481ef744="" type="default" class="com-btn">
											初始位置
										</button>
									</div>
								</div>
								<!---速度设置模块--->
								<div data-v-129285b8="" data-v-82323c94="" class="config-wrapper com-height speed-wrapper com-padding" style="opacity: 0.6;">
									<div data-v-129285b8="" class="range-speed">
										<input data-v-129285b8="" type="range" disabled="disabled" step="0.01" max="1" min="0.01" class=""> 
										<div data-v-129285b8="" class="speed-title">
											<span data-v-129285b8="" class=" ">速度</span>
											<div data-v-129285b8="" class="el-input" style="width: 100px;"><!---->
												<input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner"><!----><!----><!---->
											</div>
										</div>
									</div>
								</div> 
								<!---工具设置模块--->
								<div class="config-wrapper com-block-wrapper com-height gripper-wrapper com-padding">
									<div class="range-speed gray-color">
										<span  class="com-font-style title">夹爪</span> 
										<div  style="opacity: 0.6;">
											<input data-v-3cd6c16d="" type="range" disabled="disabled" step="1" max="850" min="-10" class="">
										</div> 
										<div data-v-3cd6c16d="" class="num-wrapper">
											<span data-v-3cd6c16d="" class="com-font-style title">位置</span> 
											<div data-v-3cd6c16d="" class="el-input" style="width: 100px;"><!---->
												<input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner"><!----><!----><!---->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> <!---->
					</div>
				</div>
				</section> <!---->
			</div>
		</div>
    </div>
     
</template>
<script>
  //引入WebSocke
  import WSocket from '../socket.js';
  //按照map的方法使用vuex的state数据
  import {mapState,mapGetters,mapMutations} from 'vuex';
  export default {
    name:'basicControl',
    data:function(){
      return{

      }
    },
    computed:{
      //使用map方法引用state的变量时，需要在computed属性里利用...map语法引入具体使用的变量
      //引入的各个轴的位置数据positionOfAxis
      ...mapState(['positionOfAxis']),
    },
    methods:{
      //返回主页
      backToHome(){
        this.$router.push('/home');
      },
      //基础控制页面发送数据的函数
      sendSocketMsgInBasicControl(){
            //发送消息的函数
            WSocket.send("this.sendMessage");
      }
    }
  }
</script>
