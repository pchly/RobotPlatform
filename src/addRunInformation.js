//添加日志信息的函数
export default{
  addRunInformation(grade,type,content,outPutBuff){
      let myDate = new Date();
      let yy = String(myDate.getYear()).slice(1);
          yy='20'+yy;
      let mm = String((myDate.getMonth()+1)<10?'0'+ (myDate.getMonth()+1): (myDate.getMonth()+1)) ;
      let dd = String(myDate.getDate()<10?'0'+ myDate.getDate(): myDate.getDate()) ;
      let hou = String(myDate.getHours()<10?"0"+myDate.getHours():myDate.getHours());
      let min = String(myDate.getMinutes()<10?'0'+myDate.getMinutes():myDate.getMinutes());
      let sec = String(myDate.getSeconds()<10?'0'+myDate.getSeconds():myDate.getSeconds());
      let allTimeContent=yy+'-'+mm+'-'+dd+'-'+hou+':'+min+':'+sec;
      let obj={
       		"number":'',
       		"type":type,
       		"content":content,
       		"time":allTimeContent,
          "grade":grade
       	}
      // this.theCountOfDataSimulate+=1;
      outPutBuff.push(obj);
      for(let i in outPutBuff){
          outPutBuff[i].number=parseInt(i)+1
       }
  }

}
