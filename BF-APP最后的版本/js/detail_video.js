/** video_list.html 
 * 	预加载评论列表页面，同时预加载列表页面接着视频底部
 */ 		
//计算出视频高度
var height = mui(".video-top")[0].clientHeight-20;
//预加载评论列表页面
mInit("detail_video_inner.html",height);



var videoTurn = false;


mui.plusReady(function(){
	document.body.scrollTop = "1px"
})

//点击播放视频
//var videoTurn = true;
mui(".video-top").on("tap",".play",function(event){
	event.stopPropagation();//阻止点击冒泡
	
	var ele = this.nextElementSibling;//按钮
	var oVideoEle = this.nextElementSibling.nextElementSibling.getElementsByTagName("video")[0];//点击的video
	
	//点击播放按钮后执行-第一次点击播放，直接播放当前的，再次点击，终止
	if(videoTurn){
		ele.className = "main-video main-video-diaplay"; //去掉覆盖在上面的图片
		setTimeout(function(){
			ele.style.display = "none";
		},300);
		oVideoEle.play(); //播放视频
		oVideoEle.style.width="100%"; 
		videoTurn = false; //关闭控制器
	}else{
		oVideoEle.pause(); //
		videoTurn = true;
	}
})