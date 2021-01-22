//开发环境
var baseURL='http://api-breakingnews-web.itheima.net'
//测试环境
// var baseURL='http://api-breakingnews-web.itheima.net'
//生产环境
// var baseURL='http://api-breakingnews-web.itheima.net'
//在发送Ajax()post()get()之前会触发
$.ajaxPrefilter(function(options){
    //获取到ajax所以参数信息
    options.url=baseURL + options.url
    // alert(options.url)

    //身份认证
    if(options.url.indexOf("/my/") !== -1){
        options.headers ={
            Authorization: localStorage.getItem("token") || ""
        }
    }

    //拦截所有响应，判断身份认证信息
    options.complete =function(res){
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if(obj.status == 1 && obj.message =='身份认证失败! '){
            //清空本地token
            localStorage.removeItem('token');
            //页面跳转
            location.href = "/login.html"
        }
    }
})