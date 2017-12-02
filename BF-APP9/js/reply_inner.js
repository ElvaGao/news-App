/** reply_list_inner.html中引用
 * 	此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.下拉刷新操作
 * 		3.点击出现评论回复
 */
//初始化castapp
castapp.init();

//定义下拉刷新是拼接的li；
var htmltext = "<div class=\"vc-img\">\
	    				<img src=\"images/logo.png\"/>\
	    			</div>\
	    			<div class=\"vc-right\">\
	    				<h4 class=\"vcr-name\">D<span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
	    				<p class=\"vcr-text\">11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
	    				<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">reply</span></time>\
	    			</div>";
			    		
/*下拉刷新*/
castapp.refreshLoad('pullrefresh',function(clearLoad){
	clearLoad();
},function(dataState){
	refreshLi(htmltext,"reply-top");//拼接的li，ul最外层的类名
	dataState(true);
});
//点击出现评论回复
mui(".vc-right").on("tap","div",function(){
	openNewWindow("reply_list.html","140px","slide-in-bottom");//新页面id,top高度，打开方向
});