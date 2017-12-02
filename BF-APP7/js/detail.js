//获取到传过来的相应的地址，并插入到iframe中
mui.plusReady(function(){
	var frameHref = plus.webview.currentWebview().detailUrl;
	var title = plus.webview.currentWebview().title;
	mui("#pageTitle")[0].innerHTML = title
})