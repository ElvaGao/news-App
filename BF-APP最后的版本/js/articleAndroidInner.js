/** articleAndroidInner.html
 * 	此文件包含：
 * 		1.定义下拉刷新拼接的li;
 * 		1.新闻页面和评论页面切换；
 * 		2.
 * 		3.点击评论出现评论详情;
 * 		4.
 * 
 */
castapp.init();
//定义下拉刷新拼接的li；
var htmltext = "<div class=\"vc-img\">\
	    				<img src=\"images/tx.jpg\"/>\
	    			</div>\
	    			<div class=\"vc-right\">\
	    				<h4 class=\"vcr-name\">Abbott<span class=\"mui-icon mui-icon-email mui-pull-right\"></span><span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
	    				<p class=\"vcr-text\">12 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
	    				<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">2 replies</span></time>\
	    				<div class=\"vrc-reply\">\
	    					<div>\
				    			<div class=\"vc-img\">\
				    				<img src=\"images/p2.jpeg\"/>\
				    			</div>\
		    					<span>Michael: asudfhaikudsfhaioueh asudfhaikudsfhaioueh</span>\
	    					</div>\
	    					<p>view all replies</p>\
	    				</div>\
	    			</div>";

var scale,vHeight,screenHeight;
mui.plusReady(function(){
	
	//新闻页面和评论页面切换：上拉手势，如果在顶部还在上滑，那就把当前的评论页面面页面隐藏，将新闻页面显示出来。

	mui("body")[0].addEventListener("swipedown",function(){
		if(document.body.scrollTop<1){ //滚动到顶部
			scale = plus.screen.scale;//屏幕分辨率比例
			vHeight = plus.android.invoke(plus.android.currentWebview(),"getHeight");//屏幕实际高度
			screenHeight = vHeight/scale;//计算出像素高度
			plus.webview.currentWebview().setStyle({top: (screenHeight)+"px"}); //藏起来
		}
	});
	
	//点击评论出现评论和回复详情
	mui(".detail-video-inner .mui-table-view-chevron").on("tap",".vrc-reply",function(){
		openNewWindow("articleReply.html","40px","slide-in-bottom");//新页面id,top高度，打开方向
		plus.webview.getWebviewById("articleAndroid.html").evalJS("mask.show()");
	})	
	
	/**
	 * 需要真机测试-安卓，可能存在兼容问题
	 */
	//点击留言
	var turn = true;//是否点击的控制器
	mui(".rl-input")[0].addEventListener("tap",function(){
		scale = plus.screen.scale;//屏幕分辨率比例
		vHeight = plus.android.invoke(plus.android.currentWebview(),"getHeight");//屏幕实际高度
		screenHeight = vHeight/scale;//计算出像素高度
		if(turn){
			plus.webview.currentWebview().setStyle({top: (40)+"px"}); //显示出来
			turn = false;
		}else{
			setTimeout(function(){
				plus.webview.currentWebview().setStyle({top: (screenHeight-13)+"px"}); //显示出来
				turn = true;
			},300)
//			alert(screenHeight);
			
		}
	});
})



//下拉刷新操作
castapp.refreshLoad('pullrefresh',function(clearLoad){
	clearLoad();
},function(dataState){
	refreshLi(htmltext,"detail-video-inner");//拼接的li，ul最外层的类名
	dataState(false);
});

//点击save
mui(".rl-save")[0].addEventListener("tap",function(){
	plus.ui.toast("saved");
});

//点击share
mui(".rl-share")[0].addEventListener("tap",function(){
	castapp.share({
		shareTitle:'这里是标题',
		shareContent: '这里是内容',
		shareImg:'http://www.castapp/logo.png',
		shareLink:'http://www.castapp.cn'
	});
})