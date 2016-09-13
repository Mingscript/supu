$(function(){
	//点击加减添加个数
	var count = 1;
	$(".add_top").click(function(){
		count = $(this).parent().find("input").val()
		count++;
		$(this).parent().find("input").val(count);
	})
	$(".add_bom").click(function(){
		a = $(this).parent().find("input").val()
		a--;
		a == 0 ? a = 1 : a;
		$(this).parent().find("input").val(a);
	})
	//分页效果及调用数据

	$.ajax({
		type:"get",
		url:"../txt/goods_list.txt",
		async:true,
		success:function(data){
			var data = eval(data);
			console.log()
			var i = 0;
			var pageNum = data.length/2;
			for(var j = 1; j <= pageNum; j++){
				 $("<li/>").text(j).addClass("goods_page").appendTo(".page ul em")	   
			}
			function pageTab(num){
				$(".goods_buy li dt:lt(4) img").attr("src",data[num*2].src);
				$(".goods_buy li dt:gt(3) img").attr("src",data[num*2+1].src);
				$(".selling_point i:lt(4)").text(data[num*2].zhekou);
				$(".selling_point i:gt(3)").text(data[num*2+1].zhekou);
				$(".selling_point a:lt(4)").text(data[num*2].title);
				$(".selling_point a:gt(3)").text(data[num*2+1].title);		
				$(".selling_price b:lt(4)").text(data[num*2].price);
				$(".selling_price b:gt(3)").text(data[num*2+1].price);
				$(".selling_price span:lt(4)").text(data[num*2].old_price);
				$(".selling_price span:gt(3)").text(data[num*2+1].old_price);
			}
			
			$(".goods_page").eq(0).addClass("active")
			$(".goods_page").click(function(){
				var k = $(this).index();		
				pageTab(k);
				$(".goods_page").eq(k).addClass("active").siblings().removeClass("active");
				$(".page_prev").click(function(){
				k == 0 ? k = 1 : k; 	
				pageTab(--k);
				$(".goods_page").eq(k).addClass("active").siblings().removeClass("active");
				})
				$(".page_next").click(function(){
				k == 4 ? k = 3 : k; 	
				pageTab(++k);
				$(".goods_page").eq(k).addClass("active").siblings().removeClass("active");
				})
			})
			$(".page li").first().click(function(){
				pageTab(0);
				$(".goods_page").eq(0).addClass("active").siblings().removeClass("active");
			})
			$(".page li").last().click(function(){
				pageTab(pageNum-1);
				$(".goods_page").eq(pageNum-1).addClass("active").siblings().removeClass("active");
			})
			$(".page li").click(function(){
				$("body").animate({"scrollTop":"200px"})
			})
			
		}
	})




})