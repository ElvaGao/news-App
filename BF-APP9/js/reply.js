/**	reply.html中引用
 * 	1.预加载回复列表页面
 * 	2.点击关闭按钮，关闭当前页面
 * 
 */

//top高度
var height = 40;
//预加载评论列表页面
mInit("reply_inner.html",height);

//点击关闭按钮关闭当前页面
mui(".mui-icon-close")[0].addEventListener("tap",function(){
	plus.webview.getWebviewById("reply.html").close();
});	