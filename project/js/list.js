$(document).ready(function() {
	//列表项的点击事件
	$(".main2_b a").click(function(event) {
		$(this).addClass("active").siblings('a').removeClass('active')
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
		var str = "<i class='iconfont'>&#xe6d4;</i>剩余：<b>"+dd+"</b>天<b>"+hh+"</b>时<b>"+mm+"</b>分<b>"+ss+"</b>秒"
		$("#time").html(str);
	},1000)
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


	$.get('jsondata/list.json', function(data) {
		var numPerpage =21;
		var totalNum = data.length;
		var pageNum = Math.ceil(totalNum/numPerpage);
		var pageth =0;
		//创建列表
		function createlist(n){
			pageth = n;
			var str = "";
			for (var i = n*numPerpage; i < Math.min((n+1)*numPerpage,totalNum); i++) {
				str +="<li>"+
						"<a href='product.html?id="+data[i].id+"'>"+
							"<img src="+data[i].img+" alt=''>"+
							"<p>"+data[i].infor+"</p>"+
							"<div class='price'>"+
								"<span class='span1'>¥<b>"+data[i].newprice+"</b>.00</span>"+
								"<span class='span2'>¥"+data[i].oldprice+".00</span>"+
								"<span class='span3 right'>"+data[i].discount+"折</span>"+
							"</div>"+
						"</a>"+
					"</li>";
			}
			$(".main3>ul").html(str);
		}
		createlist(0);
		//创建分页按钮
		(function(){
			var str1 = "";
			for (var i = 0; i < pageNum; i++) {
			 str1 += "<li pageId='"+i+"'>"+(i+1)+"</li>";
		};
		$("#pageNum").html(str1)
		
		})();
		//页码点击事件
		$("#pageNum>li").each(function(index,val){
			$(this).click(function(){
				alert(index)
				createlist(Number($(this).attr("pageId")))//把字符串转化为数字类型
				$(this).addClass('clicked').siblings('li').removeClass('clicked')
			})
		})
		//给第一个页码添加默认样式
		$("#pageNum li:first").addClass('clicked')

		// 换页点击事件
		$("#firstPage").click(function(){
			createlist(0);
			$("#pageNum li:first").addClass('clicked').siblings('li').removeClass('clicked');
		})
		$("#lastPage").click(function(){
			createlist(pageNum-1);
			$("#pageNum li").eq(pageNum-1).addClass('clicked').siblings('li').removeClass('clicked');
		})
		$("#prePage").click(function(){
			if(pageth>0){
				createlist(pageth-1);
				$("#pageNum li").eq(pageth).addClass('clicked').siblings('li').removeClass('clicked');
			}
		})
		$("#nextPage").click(function(){
			if(pageth<(pageNum-1)){
				createlist(pageth+1);
				$("#pageNum li").eq(pageth).addClass('clicked').siblings('li').removeClass('clicked');
			}
		})
	});
	
});