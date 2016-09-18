
$(function(){
		
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
		
		
		//今日秒杀
		//数据调取
		
		$.ajax({
			type:"get",
			url:"txt/today_goods.txt",
			async:true,
			success:function(data){
				var data=eval(data);
				$(".effect-li").click(function(){
				$(this).find(".clicktime").css({"display":"block"}).parent().siblings().find(".clicktime").css({"display":"none"});
				var i = $(this).index();
				$(".today_goods_list dt img").attr("src",data[i].src);
				$(".today_goods_list .goods_details").text(data[i].title);
				$(".today_goods_list .goods_price").text(data[i].price);
				$(".today_goods_list .goods_old").text(data[i].old_price);
			})
		}
	})
		//今日秒杀定时计时
		setInterval(function(){
		var nDate = new Date();
		var minutes = nDate.getMinutes();
		var seconds = nDate.getSeconds();
		var hours = nDate.getHours();
		var count = null;
			hours % 2 == 0 ? count = 1 : count = 0;
			hours = Math.floor((hours - 8)/2);
			$(".clicktime").eq(hours).css("display","block").text((hours*2+8)+"：00"+"疯抢中");
			$(".clicktime:lt(" + hours + ")").text("已结束");
			$(".time_list:lt(" + hours + ")").addClass("time_past");
			$(".time_list").eq(hours).text("距结束").css({"color":"#999","fontSize":"14px"})
			var min = 59 - minutes;
			var sec = 59 - seconds;
			min < 10 ? min = "0" + min : min;
			sec < 10 ? sec = "0" + sec : sec;
			$(".time_list").eq(hours).next().text("0"+count + ":" + min +":"+ sec).css("display","block");
			$(".time_tip:lt(" + hours + ")").css("visibility","hidden");
			},1000)
		//限时特卖效果
		$(".grid dt").hover(function(){
			$(this).parent().find(".grid_logo").stop().animate({"top":"178px"},function(){
				$(this).parent().find(".grid_price").stop().animate({"top":"178px"},300)
			});
		},
		function(){
			$(this).parent().find(".grid_logo").stop().animate({"top":"234px"});
			$(this).parent().find(".grid_price").stop().animate({"top":"234px"},300)
			
		})
		//限时特卖倒计时	
		setInterval(function(){
			time(0,"2016/9/19")
			time(1,"2016/9/29")
			function time(num,timeout){
				var nDate = new Date();
	            var timeout = new Date(timeout) - nDate;
				var second = Math.floor((timeout/1000)%60)
				var min = Math.floor((timeout/1000/60)%60)
				var hour = Math.floor((timeout/1000/3600)%24)
				var day = Math.floor(timeout/1000/3600/24)
				$(".day").eq(num).text(day);
				$(".hour").eq(num).text(hour);
				$(".minute").eq(num).text(min);
				$(".second").eq(num).text(second);
			}
			
		},1000)
		
	//mini轮播图
	var timer2 = null;
	timer2 = setInterval(move2,3000)
	var j = 0;
	function move2(){
		j++
		j == 3 ? j = 1: j;
		$(".mini_lunbo ul").stop().animate({"left":(j*-130)+"px"},2000,function(){
			if(j == 2){
			$(".mini_lunbo ul").css("left","0px");
		}
		});	
	}
	
	
	$(".mini_lunbo .right").click(function(){
		clearInterval(timer2)
		move2();
		timer2 = setInterval(move2,3000)
	});
	$(".mini_lunbo .left").click(function(){
		clearInterval(timer2);
		if(j == 0){
			j = 2
			$(".mini_lunbo ul").css("left","-260px")
		}	
		j-=2;
		move2()
		timer2 = setInterval(move2,3000)
	})
	//图片缩放
	$(".floor_left img").hover(function(){
		$(this).animate({"width":"430px","height":"470px"})	
	},
	function(){
		$(this).animate({"width":"400px","height":"441px"})
	})

		
	//搜索框
	$(function () {
	var
		oSeachBox	  = $('#searchinfo'),
		oSeachContent = $('#search_text'),
		oSearchList   = $('#search_list11'),
		iSearchIndex  = -1,
		sOriHtml 	  = oSearchList.html();
	oSeachContent.focus(function () {
		oSeachContent.attr("value","")
		oSearchList.css('display', 'block');
	}).blur(function () {
		oSearchList.css('display', 'none');
	}).keyup(function (ev) {
		var
			ev = ev || window.event,
			aLi = $('#search_list11 li');
		if(ev.keyCode === 38 || ev.keyCode === 40) {
			if(ev.keyCode === 38 && iSearchIndex > 0) {
				iSearchIndex--;
			} else if(ev.keyCode === 40 && iSearchIndex < aLi.length - 1) {
				iSearchIndex++;
			}
		}
	}).bind('input propertychange', function () {
		var sSearchCon = $(this).val();
		if(sSearchCon) {
			$.ajax({
				url: 'http://www.gou.com/search/getkey.do',
				data: {
					q: sSearchCon,
				},
				type:'GET',
				jsonp: 'jsoncallback',
				dataType: 'jsonp',
				success: function (str) {
					var sHtml = '';
					sHtml = str.Content;
					sHtml+="<li>"+sSearchCon+"</li>"
					if(sHtml) {
						oSearchList.css('display', 'block').html(sHtml);
					} else {
						oSearchList.css('display', 'none');
					}
					iSearchIndex = -1;
				}
			});
		} else {
			oSearchList.html(sOriHtml);
			iSearchIndex = -1;
		}
	});
	
})





















});


