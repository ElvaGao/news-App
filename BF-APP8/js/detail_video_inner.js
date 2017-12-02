/** video_detail_comment.html
 * 	此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.上拉刷新和下拉加载;
 * 		3.点击评论出现评论详情
 * 
 */
castapp.init();

//定义下拉刷新是拼接的li；
var htmltext = "<div class=\"vc-img\">\
	    				<img src=\"#\"/>\
	    			</div>\
	    			<div class=\"vc-right\">\
	    				<h4 class=\"vcr-name\">D<span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
	    				<p class=\"vcr-text\">12 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
	    				<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">2 replies</span></time>\
	    				<div class=\"vrc-reply\">\
	    					<span>A: asudfhaikudsfhaioueh</span>\
	    					<p>view all replies</p>\
	    				</div>\
	    			</div>";

//下拉刷新操作
castapp.refreshLoad('pullrefresh',function(clearLoad){
	clearLoad();
},function(dataState){
	refreshLi(htmltext,"detail-video-inner");//拼接的li，ul最外层的类名
	dataState(false);
});

//点击评论出现评论详情
mui(".detail-video-inner .mui-table-view-chevron").on("tap","li",function(){
	openNewWindow("reply.html","140px","slide-in-bottom");//新页面id,top高度，打开方向
})	

//点击评论出现评论详情
//关闭页面，再打开新页面会造成页面错误。同一个页面，那么，刷新数据会不会好一点？
mui(".recommend-list .mui-table-view").on("tap","li",function(){
	
	
})



//var nativeWebview, imm, InputMethodManager;
//var initNativeObjects = function() {
//	if (mui.os.android) {
//		var main = plus.android.runtimeMainActivity();
//		var Context = plus.android.importClass("android.content.Context");
//		InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
//		imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
//	} else {
//		nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
//	}
//};
//var showSoftInput = function() {
//	if (mui.os.android) {
//		imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
//	} else {
//		nativeWebview.plusCallMethod({
//			"setKeyboardDisplayRequiresUserAction": false
//		});
//	}
//	setTimeout(function() {
//		var inputElem = document.querySelector('input');
//		inputElem.focus();
//		inputElem.parentNode.classList.add('mui-active'); //第一个是search，加上激活样式
//	}, 200);
//};
//mui.plusReady(function() {
//	initNativeObjects();
//	showSoftInput();
//});
			

var turn = true;
mui(".rl-input")[0].addEventListener("tap",function(){
	comment();
})
//点击留言
function comment(){
	if(turn){
		var titleHeight = mui(".dvi-title")[0].clientHeight;
		var listHeight = mui(".recommend-list")[0].clientHeight;
		var oTop = titleHeight + listHeight + 20;
		mui(".detail-video-inner")[0].style.transform = "translate3d(0px, -"+oTop+"px, 0px) translateZ(0px)";
		turn = false;
	}else{
		mui(".detail-video-inner")[0].style.transform = "translate3d(0px, 0px, 0px) translateZ(0px)";
		turn = true;
	}
}
//点击save
mui.plusReady(function(){
	mui(".rl-save")[0].addEventListener("tap",function(){
		plus.ui.toast("saved");
	});
	
})
//点击share
mui(".rl-share")[0].addEventListener("tap",function(){
	castapp.share({
		shareTitle:'这里是标题',
		shareContent: '这里是内容',
		shareImg:'http://www.castapp/logo.png',
		shareLink:'http://www.castapp.cn'
	});
})