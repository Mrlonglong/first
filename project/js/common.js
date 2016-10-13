$(document).ready(function() {
	//如果有cookie显示手机号已登录
	if($.cookie("userName")){
		var username = $.cookie("userName");
		$("#lihide").css("display","none");
		$("#lishow").css("display","block").find('#userPhone').html(username);
	}else{
		$("#lihide").css("display","block");
		$("#lishow").css("display","none");
	}
	//退出点击事件
	$('#exit').click(function(event) {
		$.removeCookie("userName");
		//$.removeCookie("password");
		$("#lihide").css("display","block");
		$("#lishow").css("display","none").find('#userPhone').html("游客");
	});
	//判断有没有购物车的cookie
	if($.cookie('car')){
		showcookie();
	}

	//===========top===============
	$(".top .li3").mouseover(function(event) {
		
		$(this).find("div").stop().slideDown(100)
	});
	$(".top .li3").mouseout(function(event) {
		
		$(this).find("div").stop().slideUp(100)
	});

	$(".top .li4").mouseover(function(event) {
		
		$(this).find(".down").stop().slideDown(100)
	});
	$(".top .li4").mouseout(function(event) {
		
		$(this).find(".down").stop().slideUp(100)
	});

	//==========head购物车==============
	$(".head_car").mouseover(function(event) {
		$(this).find("#car_in").css({
		'display': 'block',
		});
	});
	$(".head_car").mouseout(function(event) {
		$(this).find("#car_in").css({
		'display': 'none',
		});
	});
	
	//==============二级菜单出现与隐藏=================
	$(".main_nav .nav_menu").mouseover(function(event) {
		
		$(this).find("#nav_menu_down").stop().slideDown(400);
	});
	$(".main_nav .nav_menu").mouseout(function(event) {
		
		$(this).find("#nav_menu_down").stop().slideUp(400);
	});
		//=====二级菜单内部鼠标滑过效果====
	$("#nav_menu_title li").mouseover(function(event) {
		$(this).addClass("activer").siblings('li').removeClass('activer')
	});
	// =============右边侧栏============
	$(".broadside .li3 ").mouseover(function(event) {
		$(this).find("i").css({
		'display': 'none',
		});
		$(this).find("span").css({
		'display': 'block',
		});
	});
	$(".broadside .li3 ").mouseout(function(event) {
		$(this).find("span").css({
		'display': 'none',
		});
		$(this).find("i").css({
		'display': 'block',
		});
	});
	//===========侧边购物车==============
	$(".broadside .li1").mouseover(function(event) {
		$(this).find("#car_in2").css({
		'display': 'block',
		});
	});
	$(".broadside .li1").mouseout(function(event) {
		$(this).find("#car_in2").css({
		'display': 'none',
		});
	});
	//==========侧边二维码==============
	$(".broadside .li2").mouseover(function(event) {
		$(this).find(".side_phone").css({
		'display': 'block',
		});
	});
	$(".broadside .li2").mouseout(function(event) {
		$(this).find(".side_phone").css({
		'display': 'none',
		});
	});
	//二级菜单获取数据
	$.get('jsondata/menu.json', function(data) {
		// console.log(data);
		$("#nav_menu_title li").each(function(index, el) {
			$(this).mouseover(function(event) {
				var liIndex = $(this).index();
				$.each(data,function(index, el) {
					if(index == liIndex){
						// console.log(data[liIndex].result)
						var da = data[liIndex].result;
						var str = "";
						for (var i = 0; i < da.length; i++) {
							str+="<li>"+
									"<a href='##'>"+
									"<img src="+da[i].img+" alt=''><br>"+
									"<span>"+da[i].name+"</span>"+
								"</a></li>";
						};
						$("#nav_menu_list .list_ul").html(str);
					}
					
				});
			});
		});
	});


	//点击goback
	$("#goback").click(function(event) {
		$('html, body').animate({scrollTop: $("#top").offset().top - 100 }, 400);
	});
});


    //定义一个全局的改变cookie的方法，product.js中也能用
	//展示cookie
	function showcookie(){
		var cookieObj = JSON.parse($.cookie("car"));
		//定义一个变量存储字符串
		var htmlstr="";
		$.each(cookieObj,function(index,value){
			//console.log(value.id,value.productId,value.size,value.num);
			//用ajax获取JSON数据
			var id = value.id;
			var productId = value.productId;
			var size = value.size;
			var num = value.num;
			$.get("jsondata/product.json",function(data){
				$.each(data,function(index,value){
					var dataId = value.id
					if(value.id == id){
						$.each(value.info,function(index, value) {
						//console.log(value)
						if(value.id == productId){
							//动态添加商品项
							//console.log(value.simg)
							 htmlstr +=	"<li class='clear'>"+
										"<div class='car_in_l left'>"+
											"<img src='"+value.simg+"' alt=''>"+
										"</div>"+
										"<div class='car_in_c left'>"+
											"<h5>"+value.info+"</h5>"+
											"<p>颜色:<span class='car_in_color'>"+value.color+"</span>尺码:<span class='car_in_size'>"+size+"</span></p>"+
										"</div>"+
										"<div class='car_in_r right'>"+
											"<p class='p1'>¥<span class='car_in_price'>"+value.newp+"</span></p>"+
											"<p class='p2'>x<span class='car_in_num'>"+num+"</span></p>"+
										"</div>"+
									"</li>";
						}
					});
					  $(".product").html(htmlstr)
					  //调用计算总额的方法
					  sum();
					  
					}
				})
			})
		})
	}
	//计算总额的方法
	function sum(){
		var sum = 0;
		var number = 0;
		//有两个.product  在这里只要循环遍历一个就够 用.product1
		$('.product1>li').each(function() {
			var price = Number($(this).find('.car_in_price').html());
			//console.log(price)
			var num = Number($(this).find('.car_in_num').html());
			number+=num;
			 sum += price*num;
		});
		//console.log(sum)
		$('.money').find('i').html(sum)
		$(".car_num").html(number)
		if(number == 0){
			$('.car2_top').css("display","block")
		}else{
			$('.car2_top').css("display","none")
		}
	}