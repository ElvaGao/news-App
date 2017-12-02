/*
 * 在video_detail.js
 * 在video_detail.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.上拉刷新和下拉加载;
 * 		3.一些操作
 * 
 */
castapp.init();
//获取到传过来的相应的地址，并插入到iframe中
mui.plusReady(function(){
	var frameHref = plus.webview.currentWebview().detailUrl;
	var title = plus.webview.currentWebview().title;
	mui("#pageTitle")[0].innerHTML = title;
	
	var oHeight = mui(".video-top")[0].clientHeight;
	mui("#pullrefresh")[0].style.paddingTop = (parseInt(oHeight))+"px";
}) 

/**
 * 下拉刷新和上拉加载
 * 
 * 参数1 : 容器id
 * 参数2 : 下拉回调 回调参数clearLoad 移除加载信息
 * 参数3 : 上拉回调 回调参数dataState 监听数据情况 true 为没有新数据 false 为有更多新数据
 * 
 */
castapp.refreshLoad('pullrefresh',function(clearLoad){
	var htmltext = "<li class=\"mui-table-view-cell\">\
			    			<div class=\"vc-img\">\
			    				<img src=\"#\"/>\
			    			</div>\
			    			<div class=\"vc-right\">\
			    				<h4 class=\"vcr-name\">D<span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
			    				<p class=\"vcr-text\">11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
			    				<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">2 replies</span></time>\
			    				<div class=\"vrc-reply\">\
			    					<span>A: asudfhaikudsfhaioueh</span>\
			    					<p>view all replies</p>\
			    				</div>\
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

var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；

//点击的时候出现评论详情
mui(".mui-table-view").on("tap","li",function(){
	mui.openWindow({
		url:"reply.html",
		id:"reply.html",
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
})	

