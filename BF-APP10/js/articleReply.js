/**	articleReply.html中引用
 * 	1.预加载回复列表页面
 * 	2.点击关闭按钮，关闭当前页面
 * 
 */

//top高度
var height = 40;
//预加载评论列表页面
mInit("articleReplyInner.html",height);

//点击关闭按钮关闭当前页面
mui(".mui-icon-close")[0].addEventListener("tap",function(){
	if(mui.os.ios){
		var article = plus.webview.getWebviewById("articleIos.html");
	}else{
		var article = plus.webview.getWebviewById("articleAndroid.html");
	}
	article.evalJS("mask.close()");
	closeWebview("articleReply.html");
});	