$(function(){
	
	$(".goods_buy li").click(function(){
		var m = 0;
		$(".page em li").each(function(index,value){
		$(this).hasClass("active") ? m = index : m;
		})
		var i = $(this).index()+ m * 8;
			console.log(i,m);
			i = Math.floor(i/4);
		$.ajax({
			type:"get",
			url:"../goods_details.txt",
			async:true,
			success:function(data){
				data = eval(data);
				var url = data[i].url +data[i].id
				
				$(".selling_point a").attr("href",url);
				
			}
		});
		
		
		
		
		
		
		
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
