/** articleReplyList.html中引用
 * 	此文件包含：
 * 		1.预加载reply_list_inner.html
 * 		2.关闭按钮关闭当前页面
 */

//预加载评论列表页面：
mInit("articleReplyListInner.html",40);

//关闭按钮
mui(".mui-icon-close")[0].addEventListener("tap",function(){
	closeWebview("articleReplyList.html");
});