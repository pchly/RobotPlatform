 //引入WebSocke
import WSocket from './socket.js';
//发送机器人运动控制的相关函数在这里写好，其他页面导入该模块，执行相应的函数即可
export default{
  xMove(newPos){
      WSocket.send(newPos);
  }

}
