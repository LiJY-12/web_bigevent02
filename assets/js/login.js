$(function(){

    //1.点击去注册账号，隐藏登陆区域，显示注册区域
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //2.点击去登录账号，隐藏登陆区域，显示注册区域
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[
            //数组第一个元素，正则
            /^[\S]{6,16}$/,
            //数组第二个元素，报错信息
            '密码要6-12为，不能有空格'
                    ],
            //确认密码规则
            repwd: function(value){
                //获取注册表单中的密码值
            var pwd =  $('.reg-box input[name=password').val()
            //只判断有问题的，没问题直接过
            if(pwd !== value.trim()){
                return "两次密码输入不一致！"
            }
    })
     //3.注册
     $('#form_reg').on("submit",function(e){
         e.preventDefault();
        $.ajax({
            method:'POST',
            url:"/api/reguser",
            data:{
                username:$(".res-box [name=username]").val(),
                password:$('.reg-box [name=password]').val()
            },
            success:function(res){
                if(res.status !== 0) return layer.msg(res.message) 
                layer.msg('注册成功') 
                //跳转登录页
                $('#link_login').click();
                //重置form
                $('#form_reg')[0].reset();
            }

        })
//4.登录
$('#form_login').on('submit',function(e){
    //阻止表单提交
    e.preventDefault();
    //发送ajax
    $.ajax({
        method:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            //校验返回状态
        if(res.status != 0){
            return layer.msg(res.message)
        }
        //提示信息，保存token，跳转页面
        layer.msg('恭喜您，登陆成功')
        //保存token。未来的接口要使用token
        localStorage.setItem('token',res.token)
        //跳转
        location.href = "/index.html";
    }
    })
})
     })

})