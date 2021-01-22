$(function(){
    //获取用户信息，并渲染用户名和头像
    getUserInfo()

    //退出
    var layer = layui.layer;
    $('#btnLogout').on('click',function(){
        //框架提供的询问框
        layer.confirm('是否去确认退出',{icon: 3,title:'提示'},function(index){
            //清空本地token
            localStorage.removeItem("token");
            //页面跳转
            location.href = "/login.html";
            //关闭询问框
            layer.close(index);
        })
    })
    
})
//封装一个 获取用户信息，并渲染用户名和头像
//必须是全局函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success: function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user){
    //渲染名称
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //渲染头像
    if(user.user_pic !== null){
        //有头像
        $(".layui-nav-img").show().attr("src",user.user_pic);
        $(".text-avatar").hide();
    }else{
        //没有头像
        var text = name[0].toUpperCase();
        $(".layui-nav-img").hide();
        $('.text-avatar').show().html(text);
    }
}