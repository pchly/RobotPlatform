export default {
  // 保证整个项目只有一个socket实例
  ws: null, // Websocket实例
  init(config, onOpen,onMessage, onError,onClose) {
    if (!this.ws) {
      // 实例化socket对象
      this.ws = new WebSocket(`ws://${config.ip}:${config.port}`);
    }else{
      this.ws = null;
    }
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
  },
  send(msgObj) {
    // 发送消息的时候触发
    //this.ws.send(JSON.stringify(msgObj));
    this.ws.send(msgObj);
  }
};
