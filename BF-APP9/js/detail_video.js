/** video_list.html 
 * 	预加载评论列表页面，同时预加载列表页面接着视频底部
 */ 		
//计算出视频高度
var height = mui(".video-top")[0].clientHeight-20;
//预加载评论列表页面
mInit("detail_video_inner.html",height);
