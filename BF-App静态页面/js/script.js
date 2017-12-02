/*
 * script.js
 * 在大部分文件中引用，将所有文件的公共部分提取出来，方便编写
 * 
 * 此文件包含：
 * 		1.mui初始化；
 * 		2.列表页面下拉刷新和上拉加载的执行函数；
 * 
 */

/*
 * mui初始化
 */
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
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							ul.insertBefore(createFragment(ul, index, 1, true), ul.firstChild);
							self.endPullDownToRefresh();
						}, 1000);
					}
				},
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