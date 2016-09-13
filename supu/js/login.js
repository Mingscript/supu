$(function() {
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
	
	
	
	
	
	
	//登录框注册框滑动
	$(".click_register").click(function() {
		login_move(".login_form", ".register_form")
	})
	$(".click_login").click(function() {
		login_move(".register_form", ".login_form")
	})

	function login_move(obj1, obj2) {
		$(obj1).animate({
			"right": "-28%",
			"opacity": "0"
		}, 700, function() {
			$(obj1).css({
				"display": "none",
				"right": "31%"
			});
		});
		$(obj2).css("display", "block").animate({
			"right": "7%",
			"opacity": "1"
		}, 700);
	}

	//	关闭蒙版
	$(".find_close").click(function() {
		$(".find_form").animate({
			"opacity": "0"
		}, function() {
			$(".find_form").css("display", "none");
			$(".forget_meng").animate({
				"opacity": "0"
			}, 300, function() {
				$(".forget_meng").css("display", "none");
			})
		})

	})
	$(".forget_pass").click(function() {
			$(".forget_meng").css("display", "block").animate({
				"opacity": "0.7"
			}, 300, function() {
				$(".find_form").css("display", "block").animate({
					"opacity": "1"
				});
			})
		})
		//验证滑块拖动
	$(".test_drag").bind("mousedown",clickt)
		//表单验证
		//登录
		function clickt(e) {
			var l = e.clientX;
			$(".login_form").bind("mousemove", function(e) {
				var x = e.clientX - l;
				x <= 0 ? x = 0 : x;
				x >= 240 ? x = 240 : x;
				$(".test_drag").css({
					"left": x
				});
				return false;
			})
			$("body").mouseup(function() {
				$(".login_form").unbind("mousemove");
				var x = parseInt($(".test_drag").css("left"));
				if(x < 240) {
					$(".test_drag").animate({"left": "0"});
				} else {
					$(".test_drag").unbind("mousedown").css("background-image", "url(../img/login/bg_draggable_qaptcha_2.png)");
					$(".form_test").css("background", " rgb(166, 230, 154)").find("span").text("验证通过")
				}
			})
			return false;
		}
		//注册
		$(".register_sub").click(function(){
			yanzheng(".zhu_email",".icon_1");
				var reg1 = /^[1][358][0-9]{9}$/
				var reg11 = /^\w{6,16}$/
				var str = $(".zhu_email").val()
				var bTag = reg1.test(str);
				var bTag1 = reg11.test(str);
				var reg3 = /^\S{1,4}$/ig;
				var str3 = $(".yan_1").val()
				var bTag3 = reg3.test(str3);
				var reg2 = /^[0-9a-zA-Z]{6,16}$/;
				var str2 = $(".zhu_pas").val()
				var bTag2 = reg2.test(str2);
				console.log(bTag3)
				if(!bTag3){
				$(".error_tips").text("验证码错误。").css("display","block");
				$(".yan_1").css("borderColor","#e5004a");
				$(".iconfont4").css("color","#E5004A");	
				}
				yanzheng(".password",".icon_2");
				
				if(!bTag2){	
				$(".error_tips").text("请输入6-16位字符,必须包含英文字母和数字。").css("display","block");
				$(".password").css("borderColor","#e5004a");
				$(".icon_2").css("color","#E5004A");
				}else{
				$(".password").css("borderColor","#fff");
				$(".icon_2").css("color","#999");
				}
				yanzheng(".yanz",".iconfont4");
				a();
			function a(){
				if(bTag||bTag1){
				$(".user").css("borderColor","#fff");
				$(".icon_1").css("color","#999");
				return;
			}else if(!bTag||!bTag1){
				$(".error_tips").text("请输入正确的账号格式。").css("display","block");
				$(".user").css("borderColor","#e5004a");
				$(".icon_1").css("color","#E5004A");
			}
			}
			var a= cookieUntil.getCookie("num");
			a="" ? a=0 : a;  
			yanzheng(".phone_yanz",".iconfont5");
			console.log(bTag,bTag1)
			if((bTag ==true||bTag1==true)&& bTag2==true&& bTag3==true){
				alert("注册成功！")
				a++;
				$(".error_tips").css("display","none")
				cookieUntil.setCookie("num",a);
				cookieUntil.setCookie("user"+a,"{"+$(".zhu_email").val()+","+$(".zhu_pas").val()+"}")
		
			}	
		})
		$(".form_sub").click(function(){
				var o = yanzheng(".user",".icon_1");
				var p = yanzheng(".password",".icon_2");
				var q =movekuai();
				if(o==true&&p==true&&q==true){
					var user = $("#account_login").val();
					console.log(user);
					var pass = $("#password_login").val();
					var pin = user+","+pass
					var all = document.cookie;
					if(all.indexOf(pin)!=-1){
						alert("登录成功")
					}else{
						$("#account_login").text("")
						$("#password_login").text("")
						$(".test_drag").animate({"left": "0px"});				
						$(".test_drag").bind("mousedown",clickt)	
						
						
					}
					
				}
				
			
				
			})
		//验证函数
		function yanzheng(obj,icon){
			var bTag = false;
			var jud = ($(obj).val()=="")
			if(jud){
				$(obj).css("borderColor","#e5004a");
				$(icon).css("color","#E5004A");
			}else{
				$(obj).css("borderColor","#fff");
				$(icon).css("color","#999");
				bTag = true;
				return bTag;
			}
		}
		//滑块验证
		function movekuai(){
			var bTag2 = false;
			if($("#account_login").val()!=""&&$("#password_login").val()!=""){
				if(parseInt($(".test_drag").css("left")) < 240){
					$(".error_tips").text("请将滑块拖到右边，解锁登录。").css("display","block");
				}else{
					$(".error_tips").css("display","none");
					bTag2 = true;
					return bTag2;
				}
		}
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
	
	

})