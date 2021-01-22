$(function(){
    //自定义验证规则
    var form = layui.form;
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return "你成长度为1~6位之间"
            }
        }
    })

    //用户渲染
    initUserInfo();
    var layer = layui.layer;
    //封装函数
    function initUserInfo() {
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                //成功后渲染
                form.val("formUserInfo", res.data);
            }
        })
    }

    //表单重置
    $('#btnReset').on("click",function(e){
        e.preventDefault();
        initUserInfo()
    })
    //4.修改用户信息
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:"/my/userinfo",
            data:$(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("用户信息修改失败！")
                }
                layer.msg("恭喜你，用户信息修改失败")
                //调用父页面中更新的用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })
})