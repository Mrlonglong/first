$(document).ready(function() {
	//用接口登录
	function login(userID,password){
		//alert(2)
		$.ajax({
				url: "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password,
				type: 'POST',
				//dataType:"jsonp"
	 		})
			.done(function(data) {
				if(data==2){
					//alert("用户名与密码不符");
					$("#show").css("display","block");
				}else if(data == 0){
					//alert("用户名不存在");
					$("#show").css("display","block");
				}else {
					alert("正确");
					var checked = $("#checkBox").prop("checked");
					if(checked==true){
						$.cookie("userName",$("#phone").val(),{expires:7});
	 					//$.cookie("password",$("#pw").val(),{expires:7});
					}else{
						$.cookie("userName",$("#phone").val());
	 					//$.cookie("password",$("#pw").val());
					}
					window.location.href="index.html";

				}
		})
	}
	
	$('#login').click(function(){
		var userID = $("#phone").val();
		var password = $("#pw").val();
		login(userID,password)
	})



	

		//接收cookie注册的用户
	// console.log($.cookie("userName"))
	// var namec = $.cookie("userName");
	// 	var name=$("#phone").val();
	// $("#login").click(function(event) {
	// 	var namec = $.cookie("userName");
	// 	var name=$("#phone").val();
	// 	var pwc = $.cookie("password");
	// 	var pw = $("#pw").val();
	// 	if (name == namec && pw == pwc) {
	// 		window.location.href="index.html"
	// 	}else{
	// 		$("#show").css("display","block")
	// 	}
	// });
	//输入框获取焦点时警告隐藏
	$("#phone").focus(function(event) {
		$("#show").css("display","none")
	});
	$("#pw").focus(function(event) {
		$("#show").css("display","none")
	});
	//键盘事件
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			var userID = $("#phone").val();
			var password = $("#pw").val();
			login(userID,password);
		};
	}

});