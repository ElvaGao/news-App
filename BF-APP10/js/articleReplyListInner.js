/** articleReplyListInner.html中引用
 * 	此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.下拉刷新操作
 */
//初始化castapp
castapp.init();		

//定义下拉刷新是拼接的li；
var htmltext = "<div class=\"vc-img\">\
	    				<img src=\"images/p1.jpeg\"/>\
	    			</div>\
	    			<div class=\"vc-right reply-person\">\
	    				Adsgfsdf\
	    			</div>";		
		    		
//下拉刷新操作			    		
castapp.refreshLoad('pullrefresh',function(clearLoad){
	clearLoad();
},function(dataState){
	refreshLi(htmltext,"reply-top");//拼接的li，ul最外层的类名
	dataState(false);
});