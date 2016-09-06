		//头部
$(function(){
		$(".top_nav_menu").hover(
			function(){
				$(this).next().css({"display":"block"})
			},
			function(){
				$(this).next().css({"display":"none"})
			});
		$(".cateMenu li").hover(function(){
			$(this).find(".fl").css({"backgroundPositionX":"-35px"})
			$(this).find(".list-item").css({"display":"block"}).prev().addClass("on")
			$(this).siblings().find(".cate-tag").next().css({"display":"none"}).end().removeClass("on")
		},function(){
			$(this).find(".fl").css({"backgroundPositionX":"0px"})
			$(this).find(".list-item").css({"display":"none"}).prev().removeClass("on")
		})
		//轮播图
		var i = 0;
		$("#bannerCtrl li").first().addClass("b_active");
		$(".slides li").first().css("opacity",1)
		var timer = null;
		timer = setInterval(move,3000);
		$("#bannerCtrl li").mouseenter(function(){
			clearInterval(timer);
			i = $(this).index() - 1;
			move();
		});
		$("#bannerCtrl li").mouseleave(function(){
			clearInterval(timer);
			timer = setInterval(move,3000)
		})
		$(".flex-next").click(function(){
			clearInterval(timer);
			move();
			timer = setInterval(move,3000)
		});
		$(".flex-prev").click(function(){
			clearInterval(timer);
			i == 0 ? i = 5 : i;
			i-=2;
			
			move();
			timer = setInterval(move,3000)
		})
		function move(){
			i++;
			i == 5 ? i = 0 : i;
			$(".slides li").eq(i).css("display","list-item").stop().animate({"opacity":"1"}).siblings().stop().animate({"opacity":"0"}).css("display","none");
			$("#bannerCtrl li").eq(i).addClass("b_active").siblings().removeClass();
		}
	})