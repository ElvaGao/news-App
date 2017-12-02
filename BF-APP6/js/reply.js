/*
 * reply.js
 * reply.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.点击出现评论回复
 * 		3.关闭当前页面
 * 
 */

castapp.init();
/*下拉刷新和上拉加载*/
castapp.refreshLoad('pullrefresh',function(clearLoad){
	var htmltext = "<li class=\"mui-table-view-cell\">\
			    			<div class=\"vc-img\">\
			    				<img src=\"images/logo.png\"/>\
			    			</div>\
			    			<div class=\"vc-right\">\
			    				<h4 class=\"vcr-name\">D<span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
			    				<p class=\"vcr-text\">11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
			    				<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">reply</span></time>\
			    			</div>\
			    		</li>";
		var li = document.createElement('li');
		li.innerHTML = htmltext;
		mui(".rp-detail")[0].appendChild(li);
	alert('下拉刷新咯');
	clearLoad();
	
},function(dataState){
	
	alert('上拉加载了');
	dataState(true);
	
});

//点击出现评论回复
mui(".rp-detail").on("tap","li",function(){
		mui.openWindow({
			url:"reply_list.html",
			id:"reply_list.html",
			styles:{
				top:"45px"
			},
			createNew:true,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:"slide-in-bottom",//页面显示动画，默认为”slide-in-right“；
		      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    }
		})
});
//点击关闭按钮关闭当前页面
mui(".mui-icon-close")[0].addEventListener("tap",function(){
	plus.webview.getWebviewById("reply.html").close();
});	