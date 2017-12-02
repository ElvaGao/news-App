/*
 * home.js
 * 在home.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
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
	var htmltext = "<li class=\"mui-table-view-cell mui-media\">\
							<a href=\"javascript:;\">\
								<img class=\"mui-media-object mui-pull-right\" src=\"images/shuijiao.jpg\">\
								<div class=\"mui-media-body\">\
									幸福\
									<p class=\'mui-ellipsis\'>12 Examples of Breathtaking Body Painting Art That Will Leave You Speechless</p>\
									<div class=\"author\"><span>Dave</span><time>2017-01-01</time></div>\
								</div>\
							</a>\
						</li>\
						<li class=\"mui-table-view-cell mui-media three-picture\">\
							<a href=\"javascript:;\">\
								<div class=\"mui-media-body\">\
									木屋\
									<p class=\'mui-ellipsis\'>12 Examples of Breathtaking Body Painting Art That Will Leave You Speechless</p>\
								</div>\
								<div class=\"pictures-list\">\
									<img class=\"mui-media-object\" src=\"images/muwu.jpg\">\
									<img class=\"mui-media-object\" src=\"images/muwu.jpg\">\
									<img class=\"mui-media-object\" src=\"images/muwu.jpg\">\
								</div>\
								<div class=\"author\"><span>莫言</span><time>2017-01-01</time></div>\
							</a>\
						</li>";
	for (var i = 0; i < count; i++) {
		li = document.createElement('li');
		li.innerHTML = htmltext;
		fragment.appendChild(li);
	}
	return fragment;
};
