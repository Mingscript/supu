$(function(){
//	商品数量添加去除
		var count = 1;
	$(".shopping_count2 span i").eq(1).on("click",function(){
		console.log("a");
		count = $(this).parent().find("input").val()
		count++;
		$(this).parent().find("input").val(count);
	})
	$(".shopping_count2 span i").eq(0).on("click",function(){
		a = $(this).parent().find("input").val()
		a--;
		a == 0 ? a = 1 : a;
		$(this).parent().find("input").val(a);
	})

	
	
	
	
	
	
		var cookieUntil ={
		setCookie:function(name,value,iDate){
			var date = new Date();
			date.setDate(date.getDate()+iDate);
			document.cookie = name+"="+value+";expires="+date+";path=/";
		},
		getCookie:function(name){
			var arr = document.cookie.split("; ");
			for(var i =0;i<arr.length;i++){
				var arr1 = arr[i].split("=");
				if(arr1[0]==name){
					return arr1[1];
				}
			}
			return "";
		},
		removeCookie:function(name){
			this.setCookie(name,1,-1);
		}
	}

	
	
//	列表点击添加购物车
	//打开页面读取cookie
	var n = 0
	var new_count = cookieUntil.getCookie("buy_count")
	new_count == "" ? new_count = 0 : new_count; 
	if(new_count==0){
		$(".nothing").css("display","block");
		$(".something").css("display","none");
	}else{
		$(".nothing").css("display","none");
		$(".something").css("display","block");
	}

	$(".buy_count").text(new_count);
	$(".cart_box_small a em").text(new_count);
 	$(".add_car_").click(function(e){
 		e.stopPropagation();
 		var count = $(this).parent().find("input").first().val();
 		count = Number(count)
 		var old_count = $(".buy_count").text()
 		old_count = Number(old_count);
 		$(".buy_count").text(count+old_count);
 		count = $(".buy_count").text();
 		cookieUntil.setCookie("buy_count",count,7);
 		
 	})
 	

 	$(".add_carb span").click(function(e){
		var id = window.location.hash;
		var chosecolor = $(".choosen").text()
 		var count = $(".shopping_count span").find("input").val();
 		cookieUntil.setCookie(id,count,7)
 		console.log(count)
 		count = Number(count)
 		var old_count = $(".buy_count").text()
 		old_count = Number(old_count);
 		$(".buy_count").text(count+old_count);
 		count = $(".buy_count").text();
 		cookieUntil.setCookie("buy_count",count,7);
 		
 	
 	})	
		
	
//	数据调取
	$.ajax({
		type:"get",
		url:"../txt/goods_details.txt",
		async:true,
		success:function(data){
			var data = eval(data);
			var num = document.cookie;
			var color = cookieUntil.getCookie(color);
			for(var k = 0; k < data.length; k++){
				if(num.indexOf((data[k].id))!=-1){	
					
					var goods_count = cookieUntil.getCookie(data[k].id);
					$(".cloneme").clone(true).removeClass("cloneme").prependTo($(".main_car"));//复制购物车板块
					$(".petulant").eq(0).find(".save_id").text(data[k].id);//将ID存起来，删除用
					$(".petulant").eq(0).find(".car_img img").attr("src",data[k].imgres[0]);//图片设置
					$(".petulant").eq(0).find(".car_img b").text(data[k].title);//标题设置
					$(".petulant").eq(0).find(".color_year b").text(data[k].color[k]);//颜色设置，不过这里没有用
					$(".price_num dt strong").eq(0).text(data[k].price);//价钱设置
					$(".price_num em").eq(0).text(data[k].price);
					$(".petulant").eq(0).find(".shopping_count2 span input").val(goods_count);//商品数量
					$(".shopping_count2 em").eq(0).text(data[k].price*goods_count);//总价钱

				}
			};	

		}
	});
				

	
	//	删除
	$(".shopping_count2 b strong").click(function(){
		$(this).parents(".petulant").css("display","none")
		var dele_id = $(this).parents(".petulant").find(".save_id").text();
		var count = cookieUntil.getCookie("buy_count");
		var count2 = cookieUntil.getCookie(dele_id)
		cookieUntil.removeCookie(dele_id)
		cookieUntil.setCookie("buy_count",count -count2 )
	})

	
//	选中效果
//	var main = $(".something [type=checkbox]");//$("something ：checkbox")
//	main[0].onclick = function(){
//	for(var i = 1; i < aInput.length; i++){
//		main[i].checked = this.checked;
//	}
//	
//}

	
	
	
	
	
	
	
})
