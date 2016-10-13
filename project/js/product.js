$(function(){

		// 获取地址栏中的id值
	    var locStr=window.location.search.replace("?","");
		var id = locStr.split("=")[1]
		//console.log(id)
	//========= 放大镜==========
	$(".imgzoom-main").mouseover(function(event) {
				$(".imgzoom-shot").show();
				$(".imgzoom-pop").show();
		});
	// 鼠标移动
	$(".imgzoom-main").mousemove(function(e) {
		var shotLeft = e.pageX - $(this).offset().left - $(".imgzoom-shot").outerWidth()/2;
		var shotTop = e.pageY - $(this).offset().top-$(".imgzoom-shot").outerHeight()/2;

		//========== 限制小框运动的范围
		if(shotLeft<=0){
			shotLeft = 0;
		}
		if(shotTop<=0){
			shotTop = 0;
		}
		if(shotLeft >= $(this).outerWidth()-$('.imgzoom-shot').outerWidth()){
			shotLeft =  $(this).outerWidth()-$('.imgzoom-shot').outerWidth();
		}
		if(shotTop >= $(this).outerHeight()-$('.imgzoom-shot').outerHeight()){
			shotTop =  $(this).outerHeight()-$('.imgzoom-shot').outerHeight();
		}

		$(".imgzoom-shot").css({
			"left":shotLeft,
			"top":shotTop
		}) 


		//========计算放大镜的倍数===========
		var percent = $(".imgzoom-pop img").outerWidth()/$(".imgzoom-main").outerWidth();
		var imgLeft = -shotLeft*percent;
		var imgTop = -shotTop*percent;
		//===========大图运动=======
		$(".imgzoom-pop img").css({
			"left":imgLeft,
			"top":imgTop
		})
	});
	
	//鼠标移除，大图和小框隐藏
	$(".imgzoom-main").mouseout(function(event) {
			$(".imgzoom-shot").hide();
			$(".imgzoom-pop").hide();
	});

	//用ajax获取JSON数据
	$.get("jsondata/product.json",function(data){
		//console.log(data)

		//用each循环遍历数据
		$.each(data,function(index,value){
			if(index == id){
				//console.log(data[id].info);
				$.each(data[id].info,function(index, value) {
					//console.log(value)
					//动态添加轮播li
					 $("<li productId='"+value.id+"'><a href='##' ><img src='"+value.simg+"' alt=''></a></li>").appendTo($("#box ul"));
					 //给第一项轮播图添加默认样式
					 $("#box ul li:first-child").find("a").addClass('red');
					 //动态添加颜色选项
					 $("<li><a href='##'><span>"+value.color+"</span><img class='true' src='images/product/on.jpg' alt=''></a></li>").appendTo($(".color ul"));
					 //给第一个颜色项添加默认时间
					  $(".color ul li:first-child").find("a").addClass('red').find('.true').css("display","block");
					 //给颜色按钮添加点击事件
					$(".color ul li").click(function(event) {
						$(this).find("a").addClass("red").parent("li").siblings('li').find("a").removeClass('red');
						$(this).find(".true").css("display","block").parent("a").parent("li").siblings('li').find(".true").css("display","none")
					});

				});
			};
		});
		//设置展示框的默认样式第一个商品信息
		//console.log(data[id].info[0])
		$(".img1").attr("src",data[id].info[0].simg)
		$(".imgzoom-pop img").attr("src",data[id].info[0].bimg)
		$("#newPrice").html(data[id].info[0].newp)
		$("#oldPrice").html(data[id].info[0].oldp)
		

		//为存放productId设置初始值
		productId = data[id].info[0].id;
		// 遍历循环颜色按钮 添加点击事件
			$(".color ul li").each(function(index, el) {
				$(this).click(function(event) {
					var liIndex = $(this).index();
					$.each(data[id].info,function(index,value){
						//console.log(value)
						if(index == liIndex){
							productId = value.id;
							$(".img1").attr("src",value.simg);
							$(".imgzoom-pop img").attr("src",value.bimg);
						}
					})
					// 触发轮播图片的样式
					$("#box ul li").each( function(index, val) {
						if(index == liIndex){
							$("#box ul li").eq(liIndex).find("a").addClass('red').parent("li").siblings('li').find('a').removeClass('red');
						}
					});
				});
			});
		
		//点击轮播小图，替换上面的大图
		$("#box ul li").each(function(index,el){
			$(this).click(function(){
				$(this).find("a").addClass('red').parent("li").siblings('li').find('a').removeClass('red');
				var liIndex = $(this).index();
				$.each(data[id].info,function(index,el){
					if(index == liIndex){
						productId = el.id;
						$(".img1").attr("src",el.simg);
						$(".imgzoom-pop img").attr("src",el.bimg);
					}
				})
				$(".color ul li").each( function(index, val) {
						if(index == liIndex){
							$(".color ul li").eq(liIndex).find("a").addClass('red').parent("li").siblings('li').find('a').removeClass('red');
							$(".color ul li").eq(liIndex).find(".true").css("display","block").parent("a").parent("li").siblings('li').find(".true").css("display","none")
						}
					});
			})
		})
		//=========轮播==========
		 var $ul = $("#box ul");
		 var $li = $("#box li");
		 var len = $li.length;
		 var n = Math.ceil(len/4);
		 var perWidth = $li.outerWidth();
		 // 设置ul的宽度
		 $ul.css("width",perWidth*len);
		 $li.css("width",perWidth);
		var speed = -perWidth*4;
		var i = 0;
		 function move(){
		 	$("#box ul").animate({"left":speed*i+"px"},400);
		 }
		//左边点击事件
		$(".pre").click(function(){
			i--;
			if(i==-1){
				i=n-1;
			}
			move();
		});
		//右边点击事件
		$(".next").click(function(){
			i++;
			if(i==n){
				i=0;
			}
			move();
		});
	})

	//收藏
	$(".collect1").click(function(event) {
		$(this).css("display","none").siblings('.collect2').css("display","block");
	});
	$(".collect2").mouseover(function(event) {
		$(this).find(".span2").css("display","inline-block").siblings('.span1').css("display","none");
	});
	$(".collect2").mouseout(function(event) {
		$(this).find(".span1").css("display","inline-block").siblings('.span2').css("display","none");
	});
	$(".collect2").click(function(event) {
		$(this).find(".span1").css("display","inline-block").siblings('.span2').css("display","none");
		$(this).css("display","none").siblings('.collect1').css("display","block");
	});

	
	//尺码选择的开关变量
	var swit =0;
	//定义一个存放尺码的变量
	var size = "";
	//定义一个存放颜色的变量
	var productId="";
	//给尺码添加点击事件
	$(".size ul li").each(function(index, el) {
		$(this).click(function(event) {
			swit = 1;
			size =$(this).find("span").html()
			//console.log(size)
			// console.log(swit)
			$(this).find("a").addClass("red").parent("li").siblings('li').find("a").removeClass('red');
			$(this).find(".true").css("display","block").parent("a").parent("li").siblings('li').find(".true").css("display","none");
		});
	});
	//数量的加减
	var num = 1;
	$("#add").click(function(event) {
		num++;
		$("#val").val(num);
		if(num>1){
			$("#sub").removeProp("disabled");
		}
	});
	$("#sub").click(function(event) {
		num--;
		$("#val").val(num);
		if(num==1){
			$("#sub").prop("disabled","true");
		}
	});
	//点击立即抢购
	
	$("#buy").click(function(){
		if(swit==0){
			$(".cost .red").css("display","inline-block");
			$(this).mouseout(function(event) {
				$(".cost .red").css("display","none");
			});
		}else if(swit == 1){
			//console.log(swit)
			$("#buy").css("display","none").siblings('#account').css("display","block");
			//创建cookie
			//console.log(productId,size,num)
			var cookieObj ={};
			if($.cookie("car")){
				cookieObj = JSON.parse($.cookie("car"))
			}else{
				cookieObj = {};
			}
			
			var obj = {};
			obj["id"] = id;
			obj["productId"] = productId;
			obj["size"] = size;
			obj["num"] = num;
			//console.log(obj)
			cookieObj[productId] =obj;
			var objStr = JSON.stringify(cookieObj);
			//console.log(objStr)
			$.cookie("car",objStr,{expires:7});
			showcookie()
		}
	})




	//点击继续购买按钮
	$("#buy3").click(function(event) {
		$("#account").css("display","none").siblings('#buy').css("display","inline-block")

	});
	
	//==============倒计时==============
	var target =  Date.parse("2016/11/11");
	// console.log(target);
	setInterval(function(){
		var date = new Date();
		date = date.getTime();
		var n = target - date;
		var dd = parseInt(n/(3600000*24));
		dd=(dd>9?dd:"0"+dd);
		var hh = parseInt(n/3600000)%24;
		hh=(hh>9?hh:"0"+hh);
		var mm = parseInt(n/60000)%60;
		mm=(mm>9?mm:"0"+mm);
		var ss = parseInt(n/1000)%60;
		ss=(ss>9?ss:"0"+ss);
		// console.log(dd+"天"+hh+"时"+mm+"分"+ss+"秒")
		var str = "<i class='iconfont'>&#xe6d4;</i>剩余：<span>"+dd+"</span>天<span>"+hh+"</span>时<span>"+mm+"</span>分<span>"+ss+"</span>秒"
		$("#time").html(str)
	},1000)

	
})	



	
