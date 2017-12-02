/*
 * video.js
 * 在video.html中引用
 * 
 * 此文件包含：
 * 		1.定义下拉刷新是拼接的li；
 * 		2.打开video的详情页面;
 * 		3.视频的播放事件;
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
						<div class=\"mui-media-body\">\
							11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away\
						</div>\
						<video playsinline controls=\"controls\" preload width=\"100%\" height=\"160\" style=\"object-fit:cover\" poster=\"images/muwu.jpg\">\
						    <source src=\"http://cdn.buzzfond.com/Video/from-syria-to-rio-meet-this-olympian-swimmer-who-swam-for-hours-to-push-sinking-boat-carrying-20-to-safety/from-syria-to-rio-meet-this-olympian-swimmer-who-swam-for-hours-to-push-sinking-boat-carrying-20-to-safety_1.mp4\" type=\'video/mp4\'>\
						    <source src=\"MY_VIDEO.webm\" type=\'video/webm\'>\
						 </video>\
						<div class=\"author\"><span>hahah</span><time>2017-01-01</time></div>\
					</li>";
	for (var i = 0; i < count; i++) {
		li = document.createElement('li');
		li.innerHTML = htmltext;
		fragment.appendChild(li);
	}
	return fragment;
};
//打开video的详情页面
mui.plusReady(function(){
	mui(".mui-slider-group").on("tap","li",function(){
		mui.openWindow({
			url:"video_detail.html",
			id:"video_detail.html",
			createNew:true,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'loading...',//等待对话框上显示的提示内容
		    }
		})
	})
})

//视频的播放事件
window.onscroll = function(){
	videoPlay();
}
window.onload = function(){
	videoPlay();
}
function videoPlay(){
	//transform
	var scrolltTransform = 0,
		scrolltTransformY,
		scrollTop,
		liIndex;
	if(mui(".mui-slider-group .mui-active .mui-scroll")[0].style.transform){
		scrolltTransform = mui(".mui-slider-group .mui-active .mui-scroll")[0].style.transform;
		//transformY
		scrolltTransformY = scrolltTransform.toString().split(",")[1];
		//scrollTop
		scrollTop = parseInt(scrolltTransformY)*(-1);
		//li index
		liIndex = Math.round(scrollTop/(mui(".mui-slider-group .mui-active li")[0].clientHeight+10));
		//视频操作
		for(var i=0;i<mui(".mui-active li").length;i++){
			//不是当前视频，pause
			if(i!=liIndex){
				mui(".mui-active li")[i].getElementsByTagName("video")[0].pause();
			}
		}
		//当前视频，play
		mui(".mui-active li")[liIndex].getElementsByTagName("video")[0].play();
	}else{
		mui(".mui-slider-group .mui-active li")[0].getElementsByTagName("video")[0].play();
	}
}