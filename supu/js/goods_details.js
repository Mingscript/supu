$(function(){
	
//切换图片
	$(".many_img li").hover(function(){
		var num = $(this).index();
		var src = $(".many_img").find("img").eq(num).attr("src");
		$(".main_img img").attr("src",src);
//		$(".move_big").css("background","url(../img/goods_details/goods/goods1_"+($(this).index() + 1)+"b.jpg)")
	})
//	放大镜
	$(".parent").bind("mousemove",function(e){
		var main_img = $(".main_img");
		var x = e.pageX-main_img.offset().left-94,
			y = e.pageY-main_img.offset().top-94;
			x <= 0 ? x = 0 : x;
			x >= 235 ? x = 235 : x;
			y <= 0 ? y = 0 : y;
			y >= 235 ? y = 235 : y; 
		$(".move_big").css({"display":"block"})
		$(".move_small").css({"display":"block","left":x,"top":y})
		$(".move_big").css({"backgroundPositionX":-x*(800/420),"backgroundPositionY":-y*(800/420)});
	})
	$(".parent").mouseout(function(){
		$(".move_small").css({"display":"none"})
		$(".move_big").css({"display":"none"})
	});
	//地区
	$(".diqu i").click(function(){
		$(".diqu_details").css("display","block");
	})
	$.ajax({
		type:"get",
		url:"../diqu.txt",
		async:true,
		success:function(data){
			var data = eval(data);	
			var atext = document.getElementById("atext");
			$(".provice li").click(function(){				
				var num = $(this).index();
				atext.innerHTML= $(".provice li").eq(num).text();
				$(".diqu_title").css("display","none");
				$(".center").css("display","block");
				for(var i =0 ;i < 2; i++){
					var center = data[num*2 + i].center;
//					$("<li/>").text(center).appendTo(".center ul");
					$(".center li").eq(i).text(center);
				}
				
				$(".center li").click(function(){
				var num2 = $(this).index();
				atext.innerHTML+= $(".center li").eq(num2).text();			
				$(".center").css("display","none");
				$(".qu").css("display","block");
				for(var i =0 ;i < 2; i++){
					var qu= data[num*2+ num2].qu1;
					$(".qu li").eq(i).text(qu);
				}
					$(".qu li").click(function(){
						console.log("a");
						var num3 = $(this).index();
						atext.innerHTML+= $(".qu li").eq(num3).text();
						$(".qu").css("display","none");
						$(".diqu_details").css("display","none");
						$(".diqu_title").css("display","block");
				
					})
				
				})
				
			
			})
			
			
		}
	});
	
	//颜色
	$(".goods_color i").bind("click",function(){
		$(this).addClass("choosen").siblings().removeClass("choosen");
	})
	$(".nochoose").unbind("click")
	$(".goods_years i").bind("click",function(){
		$(this).addClass("choosen").siblings().removeClass("choosen");
	})
	
//	数量加减
	var count = 1;
	$(".shopping_count i").eq(1).click(function(){
		count = $(this).parent().find("input").val()
		count++;
		$(this).parent().find("input").val(count);
		$(".shopping_count b").text(33*count);
	})
	$(".shopping_count i").eq(0).click(function(){
		a = $(this).parent().find("input").val()
		a--;
		a == 0 ? a = 1 : a;
		$(this).parent().find("input").val(a);
		$(".shopping_count b").text(33*a);
	})
	
//	tab切换
	var nTop = $(".goods_title").offset().top;
	$(".goods_title li:lt(3)").click(function(){
		var num = $(this).index();
		$(".noname .tabs").eq(num).css("display","block").siblings().css("display","none");
	})
	$(".title_fixed li:lt(3)").click(function(){
		var num = $(this).index();
		$(".noname .tabs").eq(num).css("display","block").siblings().css("display","none");
		$("body").animate({"scrollTop":nTop})
	})
	
	//标题固定
	$(window).scroll(function(){
		var scrollNum = $("body").scrollTop();	
		var k = nTop + 40;
		if(scrollNum >= k){
			$(".title_fixed").css("display","block");
		}else{
			$(".title_fixed").css("display","none");
		}
	})
	
	
//	接收数据
var num = window.location.hash
	$.ajax({
		type:"get",
		url:"../goods_details.txt",
		async:true,
		success:function(data){
			var data = eval(data);
			for(var i = 0; i < data.length; i++){
				if(data[i].id ==  num){				
					break;	
				}
			}
			$(".location span").text(data[i].title);  //标题
			$(".activity em").text(data[i].title);		//右边标题
			$(".supu_price b").text(data[i].price);		//老价钱
			$(".market_price span").text(data[i].oldprice);  //新价钱
			$(".market_price b").text(data[i].chajia);    //差价
			$(".goods_hot dt img").attr("src",data[i].activity); //、活动图片
			$(".goods_hot .jieshao").text(data[i].activity_title);  //活动主体
			$(".goods_hot .price").text(data[i].activity_price);	//活动价格
			for(var l =0;l<data[i].color.length;l++){
				$(".goods_color i").eq(l).text(data[i].color[l]);   //颜色
			}
			for(var b = 0 ;b <data[i].bom_pho.length;b++){
				$(".special img:gt(0)").eq(b).attr("src",data[i].bom_pho[b]); //下面照片
			}
			
			$(".main_img img").attr("src",data[i].imgres[i]);
			for(var k = 0; k< data[i].imgres[i].length; k++){
				$(".many_img li").eq(k).find("img").attr("src",data[i].imgres[k]);  //给下面小图加
			}
			$(".move_big").css("background","url("+data[i].imgres[2]+")");    //放大镜背景
			
		
			
	//切换放大镜的图片		
	$(".many_img li").hover(function(){
		var num = $(this).index();
		var src = $(".many_img").find("img").eq(num).attr("src");
		$(".main_img img").attr("src",src);
		console.log(data[i].imgres[num+2])
		$(".move_big").css("background","url("+data[i].imgres[num+2]+")")
		
		
	})
			
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
