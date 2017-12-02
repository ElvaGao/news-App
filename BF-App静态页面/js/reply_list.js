/*
 * reply.js
 * reply.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.下拉加载
 * 		3.关闭按钮
 */

/*
 * 定义异步加载执行后的拼接li
 * 视频和正常的列表是需要分开的
 */
mui.init();
var createFragment = function(ul, index, count, reverse) {
	var length = ul.querySelectorAll('li').length;
	var fragment = document.createDocumentFragment();
	var li;
	var htmltext = "<li class=\"mui-table-view-cell\">\
			    			<div class=\"vc-img\">\
			    				<img src=\"images/logo.png\"/>\
			    			</div>\
			    			<div class=\"vc-right reply-person\">\
			    				Adsgfsdf\
			    			</div>\
			    		</li>";
	for (var i = 0; i < count; i++) {
		li = document.createElement('li');
		li.innerHTML = htmltext;
		fragment.appendChild(li);
	}
	return fragment;
};
/*
 * 上拉刷新和下拉加载
 */
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios?0.003:0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: false, //是否显示滚动条
		deceleration:deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							ul.appendChild(createFragment(ul, index, 1));
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});	
	});
})(mui);
//关闭按钮
mui(".mui-icon-close")[0].addEventListener("tap",function(){
	plus.webview.getWebviewById("reply_list.html").hide();
});