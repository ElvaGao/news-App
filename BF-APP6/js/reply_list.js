/*
 * reply_list.js
 * reply_list.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.关闭按钮
 */
castapp.init();		
/*下拉刷新和上拉加载*/
			
castapp.refreshLoad('pullrefresh',function(clearLoad){
		var htmltext = "<li class=\"mui-table-view-cell\">\
				    			<div class=\"vc-img\">\
				    				<img src=\"images/logo.png\"/>\
				    			</div>\
				    			<div class=\"vc-right reply-person\">\
				    				Adsgfsdf\
				    			</div>\
				    		</li>";
		var li = document.createElement('li');
		li.innerHTML = htmltext;
		mui(".video-comment-list ul")[0].appendChild(li);
	alert('下拉刷新咯');
	clearLoad();
	
},function(dataState){
	
	alert('上拉加载了');
	dataState(true);
	
});
//关闭按钮
mui(".mui-icon-close")[0].addEventListener("tap",function(){
	plus.webview.getWebviewById("reply_list.html").close();
});