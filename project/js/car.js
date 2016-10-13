$(document).ready(function() {
	//console.log(JSON.parse($.cookie("car")))
	//判断有没有商品加入购物车
	function hasCookie(){
		if($.cookie("car")){
			$(".nullcar").css("display","none");
			 showCookie();
			 showcookie()
		}else{
			$(".nullcar").css("display","block");
			 $(".product").html("")
			 $('.money').find('i').html("0.00")
		}
	}


	//展示cookie
	function showCookie(){
		
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
							 htmlstr += 
							 		"<tr class='key' productId='"+value.id+"' >"+
					                   " <td style='text-align:center;'><input class='check' type='checkbox' checked='checked'/></td>"+
					                    "<td>"+
					                    	"<a class='img' href='##''><img src="+value.simg+" alt=''/></a>"+
					                    	"<a href='##'' class='left'>"+value.info+"</a>"+
					                   " </td>"+
					                    "<td class='color'>颜色：<span>"+value.color+"</span><br>尺码：<span>"+size+"</span></td>"+
					                   " <td class='td4'><span class='newp'>"+value.newp+"</span><br><span class='oldp'>"+value.oldp+"</span></td>"+
					                    "<td class='td5'>"+
					                    	"<div id='num'>"+
								    			"<input class='sub' type='button' value='-'' disabled='true'>"+
								    			"<input class='val' type='text' value='"+num+"'>"+
								    			"<input class='add' type='button' value='+''>"+
								    		"</div>"+
								    	"</td>"+
					                    "<td class='td6'>¥<span>"+num*value.newp+"</span></td>"+
					                   " <td class='td7'><a href='##' class='delete'>删除</a></td>"+
				                	"</tr>";
						}
					});
					  $("#tbody").html(htmlstr)
					  //计算总额

					  addsum();
					  select();
					  deletetr();
					  add();
					}
				})
			})
		})
	}
	
	//定义一个计算总金额 和总数量的方法
	function addsum (){
	 	var sum = 0;
	 	var total = 0;
	 	var discount =0;
	 	$("#tbody tr").each(function(index, el) {
	 		if($(this).find('.check').prop("checked")){
	 			sum += Number($(this).find('.td6').find('span').html());
	 			total += Number($(this).find('.val').val());
	 			discount += (Number($(this).find('.oldp').html())-Number($(this).find('.newp').html()))*Number($(this).find('.val').val())
	 		}

	 	})
	 	$("#sum").html(sum);
	 	$("#span1").html(total);
	 	$("#span2").html(discount)
 	}
 	
	//点击选择按钮 
	function select(){
		//页面刷新默认全选中
	    if($(".choseAll").prop("checked")==false){
	        $(".choseAll").prop("checked",true);
	    }
	    //!!!注意：复选框选中需用prop，用attr会失灵
	    //单项商品选中按钮
	    $(".check").click(function(){
	        if($(".check:checked").length==$(".check").length){
	            $(".choseAll").prop("checked",true);
	        }else{
	            $(".choseAll").prop("checked",false);
	        }
	        addsum();
   		 });
		
		//全选事件
		$('.choseAll').click(function(event) {
			if($(this).prop("checked")){
				$('.choseAll').prop("checked",true);
				$(".check").prop("checked",true);
				addsum();
			}else{
				$('.choseAll').prop("checked",false);
				$(".check").prop("checked",false);
				addsum();
			}
		});
	}


	//点击删除事件
	function deletetr(){
		//单项删除
		$('.delete').click(function(event) {
			$(this).parents('tr').remove();
			addsum()
			//console.log($(this).parents('tr').attr("productId"))
			var productId =$(this).parents('tr').attr("productId");
			var cookieObj = JSON.parse($.cookie("car"));
			delete cookieObj[productId];
			var cookieStr =	JSON.stringify(cookieObj);
			//判断cookie是否为空
			if(cookieStr == "{}"){
				$.removeCookie("car")
				 hasCookie()
			}else{
				$.cookie("car",cookieStr,{expires:7});
			}
			
			//重新改写展示的cookie商品
			hasCookie()
		});
		//单项删除
		$('.deleteAll').click(function(event) {
			
			$('tr .check').each(function(index, el) {
				if($(this).prop('checked')){
					//操作dom节点 删除tr
					$(this).parents('tr').remove()

					var productId =$(this).parents('tr').attr("productId");
					var cookieObj = JSON.parse($.cookie("car"));
					delete cookieObj[productId];
					var cookieStr =	JSON.stringify(cookieObj);
					//判断cookie是否为空
					if(cookieStr == "{}"){
						$.cookie("car",null)
						 hasCookie()
					}else{
						$.cookie("car",cookieStr,{expires:7});
					}
				}
			});





		});
	}

	//点击加减按钮
	function add(){
		 
		 //判断是否能点击
		  $("#tbody tr").each(function(index, el) {
			 var td5_num =$(this).find('.val').val();
				if(td5_num>1){
					$(this).find('.sub').removeProp("disabled");
				}
		  })
		//点击加按钮
		 $('.add').click(function(event) {
		 	var newp = $(this).parents('tr').find('.newp').html();
		 	var td5_num =$(this).parents("tr").find('.val').val();
		 	td5_num++;
		
		 	//数量增加
		 	$(this).siblings('.val').val(td5_num);
		 	//金额增加
		 	$(this).parents('.td5').siblings('.td6').find('span').html(td5_num*newp);
		 	//总额增加
		 	addsum()
		 	//操作cookie
		 	var productId =$(this).parents('tr').attr("productId");
		 	var cookieObj = JSON.parse($.cookie("car"));
			//console.log(cookieObj[productId]['num']);
			cookieObj[productId]['num']=td5_num;
			var cookieStr =	JSON.stringify(cookieObj);
			$.cookie("car",cookieStr,{expires:7});

			//重新改写展示的cookie商品
			//hasCookie()
			//如果数量大于1 减号能点击
		 	if(td5_num>1){
				$(this).siblings('.sub').removeProp("disabled");
			}
		 });
		 //点击减按钮
		 $('.sub').click(function(event) {
		 	var newp = $(this).parents('tr').find('.newp').html();
		 	var td5_num =$(this).parents("tr").find('.val').val();
		 	td5_num--;
		 	//console.log(td5_num)
		 	//数量减少
		 	$(this).siblings('.val').val(td5_num);
		 	//金额减少
		 	$(this).parents('.td5').siblings('.td6').find('span').html(td5_num*newp);
		 	//总额减少
		 	addsum()
		 	//操作cookie
		 	var productId =$(this).parents('tr').attr("productId");
		 	var cookieObj = JSON.parse($.cookie("car"));
			//console.log(cookieObj[productId]['num']);
			cookieObj[productId]['num']=td5_num;
			var cookieStr =	JSON.stringify(cookieObj);
			$.cookie("car",cookieStr,{expires:7});
			//如果数量为1 减号不能点击
		 	if(td5_num==1){
				$(this).prop("disabled","true");
			}
		 });
	}

	//如果有cookie显示
	hasCookie()
	
	
	
});