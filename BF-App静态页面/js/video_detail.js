/*
 * 在video_detail.js
 * 在video_detail.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.上拉刷新和下拉加载;
 * 		3.一些操作
 * 
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
			    			<div class=\"vc-right\">\
			    				<h4 class=\"vcr-name\">dgsldskfgj<span class=\"mui-icon-extra mui-icon-extra-like mui-pull-right\"></span></h4>\
			    				<p class=\"vcr-text\">11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away</p>\
			    				<time class=\"vcr-time\"><span>10h.</span><span class=\"vcr-reply-num\">2 replies</span></time>\
			    				<div class=\"vrc-reply\">\
			    					<span>A: asudfhaikudsfhaioueh</span>\
			    					<p>view all replies</p>\
			    				</div>\
			    			</div>\
			    		</li>";
	for (var i = 0; i < count; i++) {
		li = document.createElement('li');
		li.innerHTML = htmltext;
		fragment.appendChild(li);
	}
	return fragment;
};
mui.init();
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

//mui初始化
mui.init();
var subpages = ['reply.html', 'reply_list.html'];
var subpage_style = {
	top: '42px',
	bottom: '0'
};
var aniShow = {};
var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；

mui.plusReady(function() {
	//增加子页面：评论页面和回复页面
	var self = plus.webview.currentWebview();
	for (var i = 0; i < 4; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		self.append(sub);
		sub.hide();
	}
	//点击的时候出现评论详情
	mui(".mui-table-view").on("tap","li",function(){
		mask.show();//显示遮罩
		plus.webview.show("reply.html","fade-in",300);
	})	
});