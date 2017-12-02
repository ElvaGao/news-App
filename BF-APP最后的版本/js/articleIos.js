/** articleIos.html
 * 	因为ios对iframe支持效果较好，出于性能考虑，把网页用iframe嵌入app中。
 * 	而安卓中，通过创建新的webview模拟出打开新页面效果，而且底部的评论是通过新的webview引入的。
 * 	
 * 	1.拼接的评论模块
 *  2.创建遮罩蒙版
 * 	3.页面滚动，异步加载更多评论
 * 	4.点击评论出现评论详情
 */
//拼接的评论模块
var htmltext = "<div class=\"vc-img\">\
			<img src=\"images/p1.jpeg\"/>\
		</div>\
		<div class=\"vc-right\">\
			<h4 class=\"vcr-name\">D<span class=\"mui-icon mui-icon-email mui-pull-right\"></span><span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
			<p class=\"vcr-text\">12 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
			<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">2 replies</span></time>\
			<div class=\"vrc-reply\">\
				<div>\
	    				<div class=\"vc-img\">\
	    					<img src=\"images/p2.jpeg\"/>\
	    				</div>\
					<span>Michael: asudfhaikudsfhaioueh</span>\
				</div>\
				<p>view all replies</p>\
			</div>\
		</div>";
var mask;
mui.plusReady(function(){
	//页面滚动，异步加载更多评论
 	window.onscroll = function(){ //下滑页面
 		var oHeight =document.getElementsByTagName("body")[0].clientHeight; //页面高度
 		var oTop = document.body.scrollTop; //屏幕分辨率比例
		var vHeight = plus.screen.resolutionHeight-30; //屏幕高度-20:webview高度
		var scrollTopTo = oHeight - vHeight - oTop; //距离文档流底部高度
		if(scrollTopTo<90){ 
			refreshLi(htmltext,"detail-video-inner");//添加新li,"detail-video-inner"是ul最外层的类名
		}
	}
 	
	//创建遮罩蒙版
 	mask = mui.createMask(
 		function(){
 			if(plus.webview.getWebviewById("articleReply.html")){//关闭回复页面及子列表页面
 				closeWebview("articleReply.html");//关闭closeWebview()
 				closeWebview("articleReplyInner.html")
 			}
 			if(plus.webview.getWebviewById("articleReplyList.html")){//关闭列表页面及子列表页面
 				closeWebview("articleReplyList.html");
 				closeWebview("articleReplyListInner.html");
 			}
 		}
	);
	
	//点击一条评论出现评论详情
	mui(".detail-video-inner .mui-table-view-chevron").on("tap",".vrc-reply",function(){
		openNewWindow("articleReply.html","60px","slide-in-bottom");//新页面id,top高度，打开方向
		mask.show();//显示遮罩
	})	
	
	

	

})

/**
 * 需要真机测试-安卓，可能存在兼容问题
 */
//点击留言
var turn = true;
mui(".rl-input")[0].addEventListener("tap",function(){//根据评论模块高度设置页面滚动高度
	if(turn){
		var height = mui(".detail-ios")[0].offsetTop;
		document.body.scrollTop = height-44;
		turn = false;
	}else{
		document.body.scrollTop = 0;
		turn = true;
	}
});
//点击save
mui(".rl-save")[0].addEventListener("tap",function(){
	plus.ui.toast("saved");
});
castapp.init();
//点击share
mui(".rl-share")[0].addEventListener("tap",function(){
	castapp.share({
		shareTitle:'这里是标题',
		shareContent: '这里是内容',
		shareImg:'http://www.castapp/logo.png',
		shareLink:'http://www.castapp.cn'
	});
})