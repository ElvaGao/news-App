/** articleAndroid.html
 * 	因为ios对iframe支持效果较好，出于性能考虑，把网页用iframe嵌入app中。
 * 	而安卓中，通过创建新的webview模拟出打开新页面效果，而且评论是通过新的webview引入的。
 * 		（当页面下拉到底端的时候,弹出评论的webview，当前webview被覆盖）
 * 	
 * 	1.获取接收到的文章地址，并写入title中
 *  2.创建遮罩蒙版
 * 	3.页面滚动，异步加载更多评论
 * 	4.点击评论出现评论详情
 */	
var mask;
mui.plusReady(function(){
	
	//获取接收到的文章地址，并写入title中
	var frameHref = plus.webview.currentWebview().detailUrl;
	mui("#nav")[0].value = frameHref;
	
	//当前webview
	var self = plus.webview.currentWebview();
	
	//创建新的webview-文章的webview
	var newsWV = newUrlWebview("http://www.buzzaura.com/","news",40,50,self);
	
	//创建评论内容的webview，先把它高度设置为屏幕高度
	var scale = plus.screen.scale; //屏幕分辨率比例
	var vHeight = plus.android.invoke(plus.android.currentWebview(),"getHeight"); //屏幕实际高度
	var screenHeight = vHeight/scale; //计算出像素高度
	var commentWV = newUrlWebview("articleAndroidInner.html","articleAndroidInner.html",(screenHeight-53),0,self);
	
	/*当页面下拉到底端的时候,弹出评论的webview，当前webview被覆盖
	 *这个操作需要被传入到文章的webview页面
	 * */
	
	//要传入文章webview的操作
	var str = "window.onscroll = function(){\
		var height2 =document.getElementsByTagName(\"body\")[0].clientHeight;\
		var screenHeight = plus.android.invoke(plus.android.currentWebview(),\"getHeight\")/plus.screen.scale;\
		var scrollTopTo = height2-document.body.scrollTop-screenHeight-50;\
		if(scrollTopTo<1){\
			setTimeout(function(){\
				plus.webview.getWebviewById('articleAndroidInner.html').setStyle({top: (40)+'px'});\
				},300);}}";
	newsWV.evalJS(str);
	
	
	
	
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
})
