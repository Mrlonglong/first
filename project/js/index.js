$(document).ready(function() {
	
	//==========年龄菜单==============
	$(".sub_nav .age").mouseover(function(event) {
		$(this).find(".age_down").css({
		'display': 'block',
		});
	});
	$(".sub_nav .age").mouseout(function(event) {
		$(this).find(".age_down").css({
		'display': 'none',
		});
	});

	//============== 轮播==============
	var time = setInterval(Carculer,3000);
	var index = 0;
	function Carculer(){

		$(".banner ol li").eq(index).addClass("active").siblings().removeClass("active");
		$(".banner>li").eq( index ).animate({'opacity': 'show'},400, function() {}).siblings('li').animate({'opacity': 'hide'
},400);
		index++;
		// console.log($(".banner>li").length);
		if (index==$(".banner>li").length) {
			index=0;
		}
	}

	$(".banner ol li").mouseenter(function(){
		clearInterval(time);
		index = $(this).index();
		Carculer();
	})
	$(".banner ol li").mouseout(function(){
		time = setInterval(Carculer,3000);
	})

	
	//=========主商品区右侧 选项卡1=============
	$(".main_r .ul1>li button").mouseover(function(){
			 $(this).addClass("active1").parent('li').siblings('li').find('button').removeClass("active1"); //切换选中的按钮高亮状态
		 	var index=$(this).parent('li').index(); //获取被按下按钮的索引值，需要注意index是从0开始的
		 	$(".main_r .ul1>li").eq(index).find('div').show().parent('li').siblings('li').find('div').hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
		 });
	//=========主商品区右侧 选项卡2============
	$(".main_r .ul2>li").mouseover(function(){
			 $(this).addClass("active2").siblings('li').removeClass("active2"); //切换选中的按钮高亮状态
		 	var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
		 	$(".main_r .ul2_list").eq(index).show().parent('li').siblings('li').find('ul').hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
	 });
	
	//===========滚动浮窗================
	$(window).scroll(function(event) {
		if($(window).scrollTop()>181){
			$("#sub_nav").css("display","block");
		}
		if($(window).scrollTop()<181){
			$("#sub_nav").css("display","none");
		}
	});
})

jQuery(document).ready(function($) {

	//===========主商品区创建列表==========
	$.get('jsondata/index.json', function(data) {
		// console.log(data);
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str+="<li><div class='media'>"+
					  "<a class='media-left' href='list.html'>"+
					    "<img src="+data[i].imgsrc+" alt='...'>"+
					 " </a>"+
					  "<div class='media-body'>"+
						"<p class='time'></p>"+
						"<h4>"+data[i].title+"</h4>"+
						"<div class='list_down'>"+
							"芭比（Barbie）品牌系列商品坚持商品的质量的同时，也注重商品的售后服务体"+
						    "<div>"+
						    data[i].info+
						   " </div>"+
					  	"</div>"+
					  "	<p class='lable'><img src='images/main/mj_prom.png' alt='...''>"+data[i].label+"</p>"+
					  "	<a class='btn' href='##'>"+data[i].button+"&gt;&gt;</a>"+
					 " </div>"+
					"</div>"+
				"</li>"
		};
		$("#main_list").html(str);
			//===========主商品区滑动==============
		$("#main_list .list_down").mouseover(function(event) {
			$(this).find("div").css({
			'display': 'block',
			});
		});
		$("#main_list .list_down").mouseout(function(event) {
			$(this).find("div").css({
			'display': 'none',
			});
		});
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
		$("#main_list").find(".time").html(str)
	},1000)

});
