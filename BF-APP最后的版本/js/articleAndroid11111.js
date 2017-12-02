/** detail_ios.html
 * 	因为ios对iframe支持效果较好，出于性能考虑，把网页用iframe嵌入app中。
 * 	而安卓中，通过创建新的webview模拟出打开新页面效果，而且评论是通过新的webview引入的。
 * 		（当页面下拉到底端的时候,弹出评论的webview，当前webview被覆盖）
 * 	
 * 	1.获取接收到的文章地址，并写入title中
 *  2.创建遮罩蒙版
 * 	3.页面滚动，异步加载更多评论
 * 	4.点击评论出现评论详情
 */	

mui.plusReady(function(){
	
	//获取接收到的文章地址，并写入title中
	var frameHref = plus.webview.currentWebview().detailUrl;
	mui("#nav")[0].value = frameHref;
	
	//创建新闻内容的webview
	var self = plus.webview.currentWebview();//当前webview
//	var news = plus.webview.create("http://www.buzzaura.com/", "news", { //创建新的webview-文章的webview
//	    top: "44px",
//	    bottom: "50px"
//	});
//	self.append(news);
	
	//创建新的webview-文章的webview
	newUrlWebview("http://www.buzzaura.com/","news",44,50,self);
	
	//创建评论内容的webview，先把它高度设置为屏幕高度
	var scale = plus.screen.scale; //屏幕分辨率比例
	var vHeight = plus.android.invoke(plus.android.currentWebview(),"getHeight"); //屏幕高度
	var screenHeight = vHeight/scale; //计算出实际高度
//	var detail_article_inner = plus.webview.create("articleAndoidInner.html", "articleAndoidInner.html",{  //评论的的webview 
//		top: (screenHeight-46)+"px",
//		bottom: "0px"
//	});
//	self.append(detail_article_inner);
	newUrlWebview("articleAndoidInner.html","articleAndoidInner.html",(screenHeight-46),0,self);
	/*当页面下拉到底端的时候,弹出评论的webview，当前webview被覆盖
	 *这个操作需要被传入到文章的webview页面
	 * */
	//要传入文章webview的操作
	var str = "window.onscroll = function(){\
		var height2 =document.getElementsByTagName(\"body\")[0].clientHeight;\
		var scale = plus.screen.scale;\
		var vHeight = plus.android.invoke(plus.android.currentWebview(),\"getHeight\");\
		var screenHeight = vHeight/scale;\
		var scrollTopTo = height2-document.body.scrollTop-screenHeight-50;\
		if(scrollTopTo<1){\
			setTimeout(function(){\
				plus.webview.getWebviewById('articleAndoidInner.html').setStyle({top: (44)+'px'});\
				},300);}}";
	news.evalJS(str);
})
