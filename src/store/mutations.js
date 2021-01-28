const mutations={
    mutationIsShowMoreMenus:function(state,payload){
        //state表示当前的状态数据
        //payload表示使用方传递的附加数据
        state.isShowMoreMenus=payload;
    },
    mutationLogin:function(state){
        //state表示当前的状态数据
        //payload表示使用方传递的附加数据
        state.isLogined=true;
    },
    mutationLoginName:function(state,payload){
        //state表示当前的状态数据
        //payload表示使用方传递的附加数据
        state.loginName=payload;
    },
    mutationAccessToken:function(state,payload){
        //state表示当前的状态数据
        //payload表示使用方传递的附加数据
        state.accesstoken=payload;
    },
    mutationLogout:function(state){
        state.isLogined=false;
        state.loginName='';
        state.accesstoken='';
    }



}
export default mutations;