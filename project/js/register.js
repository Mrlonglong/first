$(document).ready(function() {
	// 生成验证码
	var code1 = "";//全局变量
	function createCode(){
		code1 = "";
		var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');		
		for (i=0;i<4;i++) {
			var charIndex = Math.floor(Math.random()*36); 
			code1 +=selectChar[charIndex]; 
		}
		$(".code1").html(code1);
	}
	// 先生成一个验证码
	createCode();

	//验证码点击更换
	$(".code1").click(function(event) {
		createCode();
	});
	var yes1 = false;
	var yes2 = false;
	var yes3 = false;
	var yes4 = false;
	// 验证手机号
	$("#phone").blur(function(event) {
		var phoneNum = $("#phone").val();
		var pattern =/^1[34578]\d{9}$/;
		if (pattern.test(phoneNum)) {
			yes1 = true;
		}else{
			$("#phoneError").css("display","block");
			yes1 = false;
		}
	});
	$("#phone").focus(function(event) {
		$("#phoneError").css("display","none");
	});
	//验证验证码
	$("#code").blur(function(event) {
		var code = $("#code").val();
		if(code == code1){
			yes2 = true;
		}else{
			$("#codeError").css("display","block");
			yes2 = false;
		}
	});
	$("#code").focus(function(event) {
		$("#codeError").css("display","none");
	});
	//验证短信
	yes3 = true;
	//验证密码
	$("#pw").blur(function(event) {
		var pw = $("#pw").val();
		var pattern =/^[a-zA-Z0-9_-]{6,18}$/;
		if (pattern.test(pw)) {
			yes4 = true;
		}else{	
			$("#pwError").css("display","block");
			yes4 = false;
		}
	});
	$("#pw").focus(function(event) {
		$("#pwError").css("display","none");
	});
	var see = -1;
	$("#see").click(function(event) {
		see*= -1;
		if (see == 1) {
			$(this).css("color", '#ff4965').siblings('#pw').attr("type","text")
		}else{
			$(this).css("color", '#666').siblings('#pw').attr("type","password")
		}
	});
	//利用注册接口创建的注册方法
	function register(userID,password){
		//alert(1)
		$.ajax({
				url: "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+userID+"&password="+password,
				type: 'POST',
				//dataType:"jsonp"
	 		})
			.done(function(data) {
				
				if(data==1){
				//alert("注册成功")
				window.location.href="login.html";
				}else if(data == 0){
					alert("用户名重名")
				}else if(data == 2){
					alert("数据库报错")
				}
		})
	}
	//注册开始执行
	function startGo(){
		if (yes1==true&&yes2==true&&yes3==true&&yes4==true) {
			var userID = $("#phone").val();
			var password = $("#pw").val();
			register(userID,password);
		}else{
			if(yes1 == false){
				$('#phoneError').css("display",'block');
			}
			if(yes2 == false){
				$('#codeError').css("display",'block');
			}
			if(yes2 == false){
				$('#messageError').css("display",'block');
			}
			if(yes2 == false){
				$('#pwError').css("display",'block');
			}
		} 	
	}
	//点击注册 用接口
	$("#register").click(function(event) {
		startGo()
	})
	//键盘事件
	document.onkeydown=function(e){
		var keycode=document.all?event.keyCode:e.which;
		if(keycode==13){
			startGo()
		};
	}
	//点击注册 用cookie
	// $("#register").click(function(event) {
	// 	if (yes1==true&&yes2==true&&yes3==true&&yes4==true) {
	// 		$.cookie("userName",$("#phone").val());
	// 		$.cookie("password",$("#pw").val());
	// 		window.location.href="login.html"
	// 	};
	// });
	
});