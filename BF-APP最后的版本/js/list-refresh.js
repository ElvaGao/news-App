/** home.html/video.html
 * 	本页的js文件，用于首页列表页和视频列表页
 * 		1.初始化mui
 * 		2.下拉刷新，上拉加载的函数调用
 * 		3.对点击删除按钮，绑定事件，删除当前li
 */		
 
mui.init();

/*循环初始化所有下拉刷新，上拉加载。动作操作*/
mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
	mui(pullRefreshEl).pullToRefresh({ //刷新
		down: {  //下拉加载
			callback: function() {
				var self = this;
				setTimeout(function() {
					var ul = self.element.querySelector('.mui-table-view');
					createFragment('insert', ul, index, true); //执行添加数据的函数
					self.endPullDownToRefresh(); //停止加载
				}, 1000);
			}
		},
		up: { //上拉刷新
			callback: function() {
				var self = this;
				setTimeout(function() {
					var ul = self.element.querySelector('.mui-table-view');
					createFragment('append', ul, index); //执行添加数据的函数
					self.endPullUpToRefresh(); //停止加载
				}, 1000);
			}
		}
	});
});

/*点击删除按钮后，弹出框中不同的按钮，进行删除操作*/
mui("#dislike")[0].addEventListener("tap",function(){
	deleteLi();
});
mui("#poor")[0].addEventListener("tap",function(){
	deleteLi();
});
mui("#adult")[0].addEventListener("tap",function(){
	deleteLi();
});
mui("#broken")[0].addEventListener("tap",function(){
	deleteLi();
});

/*创建遮罩*/
var mask = mui.createMask(function(){
	mui(".operation")[0].className = "operation";//连同窗口一起关闭
});

/*点击下拉菜单出现操作对话框*/
operation();//页面加载完每个下拉的箭头绑定一次事件,弹出框

