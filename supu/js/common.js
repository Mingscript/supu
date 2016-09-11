$(function(){
//	头部
	$(".li_box").hover(
			function(){
				$(this).find("div").eq(1).css({"display":"block"})
			},
			function(){
				$(this).find("div").eq(1).css({"display":"none"})
			});
		$(".cateMenu li").hover(function(){
			$(this).find(".fl").css({"backgroundPositionX":"-35px"})
			$(this).find(".list-item").css({"display":"block"}).prev().addClass("on")
			$(this).siblings().find(".cate-tag").next().css({"display":"none"}).end().removeClass("on")
		},function(){
			$(this).find(".fl").css({"backgroundPositionX":"0px"})
			$(this).find(".list-item").css({"display":"none"}).prev().removeClass("on")
		})
		//关闭底部广告
	$(".bot_close").click(function(){
		$("#bom").animate({"opacity":"0"},function(){
			$("#bom").css("display","none");
		});
	})
		
//	右侧滑动效果
	$(".nav_right li").hover(function(){
		$(this).find(".right_move").stop().animate({"left":"-77px"});
	},
	function(){
		$(this).find(".right_move").stop().animate({"left":"34px"});
	})
	//回到顶部
	$(".nav_right li").last().click(function(){
		$("body").animate({"scrollTop":"0"})
	})

//$(".popular img").eq(1).mousemove(function(e){
//	console.log(e.clientX,e.clientY)
//	})
//		
	
})
