mui.init();
(function($) {
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			
			$(pullRefreshEl).pullToRefresh({ //刷新
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
		var createFragment = function( loc, ul, index, reverse) { //拼接列表内容
			/* 
			 * 每次先请求数据
			 * 获取数据后，判断数据类型：一张大图片,一张小图片,三张小图片,视频,gif图
			 * 判断完数据类型后，建议用switch-case分别载入不同的模版中
			 * 最后将数据插入页面
			 */ 			
			
			/*
			 * 评论模块中统一要写入的数据
			 */
			var title = "11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away";//写入title
			var website = "Metro";//写入来源网站
			var comment_number = 42;//写入评论数量
			
			
			/*
			 * 所有类型图片的src
			 */
			var video_src = "";//video
			
			/*
			 * 不同类型的数据，进行区别
			 */
			var commentText = "<div class=\"m-detail\">\
									<span class=\"m-website\">"+website+"</span>\
									<span class=\"mui-icon mui-icon-chat\"></span>\
									<span>"+comment_number+"</span>\
									<span class=\"mui-icon mui-icon-trash mui-pull-righ\" style=\"float:right;\"></span>\
								</div>";
			//video					
			var oneVideo = "<li class=\"mui-table-view-cell\">\
								<a href=\"javascript:;\">\
									<div class=\"mui-media-body\">"+title+"</div>\
									<div class=\"main-video\"></div>\
								</a>"+commentText+"</li>";
							
							
			/*
			 * 把查询到的内容拼接到一起，然后添加到列表中
			 */
			var newHtml =  oneVideo ;//根据内容进行拼接，然后插入到列表中
			
			if(loc === "append"){ //判断是否是下拉刷新，从而决定是在前面添加数据，还是在底部添加数据
				ul.innerHTML += newHtml; 
			}else{
				ul.innerHTML = newHtml + ul.innerHTML;
			}
			
			operation();//每次加载完，都给每个下拉的箭头绑定一次事件,弹出框
			
		};
	
		//创建遮罩
		var mask = mui.createMask(function(){
			$(".operation")[0].className = "operation";//连同窗口一起关闭
		});//callback为用户点击蒙版时自动执行的回调；
		
		/*
		 * 点击下拉菜单出现操作对话框
		 */
		var elementTap ; //设置全局变量，用于保存当前被点击的这个li，为了后面删除做准备
		
		function operation(){
			
			$.each($(".mui-icon-trash"), function() {
				var self = this;
				self.addEventListener("tap",function(){
					elementTap = self.parentNode.parentNode;//点击的那个li
					
					$(".operation")[0].className = "operation mui-active";
					mask.show();//显示遮罩
				})
			});
		
		}
		operation();//每个下拉的箭头绑定一次事件,弹出框
		
		/*
		 * 点击删除按钮后，弹出框中不同的按钮，进行删除操作
		 */
		
		$("#dislike")[0].addEventListener("tap",function(){
			deleteLi();
		})
		$("#poor")[0].addEventListener("tap",function(){
			deleteLi();
		})
		$("#adult")[0].addEventListener("tap",function(){
			deleteLi();
		})
		$("#broken")[0].addEventListener("tap",function(){
			deleteLi();
		})
		//删除li的dom节点
		function deleteLi(){
			mui(".mui-slider-group .mui-active .mui-table-view")[0].removeChild(elementTap);//删除之前点击的li
			//关闭遮罩和弹出框
			$(".operation")[0].className = "operation";
			mask.close();//显示遮罩
		}
		
		
	
	});
	
	
	
	
	
	
})(mui);