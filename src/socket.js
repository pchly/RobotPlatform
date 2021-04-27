export default {
  // 保证整个项目只有一个socket实例
  // 自动上报数据需要添加一个ws对象
  ws: null, // Websocket实例
  autoUpdateWS:null,//自动上报数据ws对象

  init(config, onOpen,onMessage, onError,onClose,onOpenAuto,onMessageAuto, onErrorAuto,onCloseAuto) {
    if (!this.ws) {
      // 实例化socket对象
      this.ws = new WebSocket(`ws://${config.ip}:${config.port}`);
      this.autoUpdateWS = new WebSocket(`ws://${config.ip}:${config.portAuto}`);
    }else{
      this.ws = null;
      this.autoUpdateWS =null;
    }

    // 连接成功
    this.ws.onopen=openevent=>{
      onOpen&&onOpen(openevent);
    };
    // 客户端接收消息
    this.ws.onmessage = msgevent => {
      //let message = JSON.parse(event.data);
      onMessage && onMessage(msgevent.data); // 接收到消息触发的回调
    };
    // 出错
    this.ws.onerror = error => {
      onError && onError(error);
    };
    //关闭
    this.ws.onclose = closeevent => {
      onClose&&onClose(closeevent);
      this.ws = null;
    };

    // 自动上报数据ws的事件
    // 连接成功
    this.autoUpdateWS.onopen=openevent=>{
      onOpenAuto&&onOpenAuto(openevent);
    };
    // 客户端接收消息
    this.autoUpdateWS.onmessage = msgevent => {
      onMessageAuto && onMessageAuto(msgevent.data); // 接收到消息触发的回调
    };
    // 出错
    this.autoUpdateWS.onerror = error => {
      onErrorAuto && onErrorAuto(error);
    };
    //关闭
    this.autoUpdateWS.onclose = closeevent => {
      onCloseAuto&&onCloseAuto(closeevent);
      this.autoUpdateWS = null;
    };
  },
  send(msgObj) {
    // 发送消息的时候触发
    //this.ws.send(JSON.stringify(msgObj));
    this.ws.send(msgObj);
  },
  close(){
    //徐冰洁添加，服务器可以监听到客户端webSocket关闭
    this.ws.close();
    this.autoUpdateWS.close();
  }
};
