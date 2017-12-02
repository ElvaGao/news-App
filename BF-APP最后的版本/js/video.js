/** video.html：
 * 	此页面内容为，针对请求到的数据进行处理拼接
 * 	获取数据后，判断数据类型：一张大图片,一张小图片,三张小图片,视频,gif图
 * 	判断完数据类型后，建议用switch-case分别载入不同的模版中
 * 	最后将数据插入页面
 */ 		
/*对相关数据的处理*/
var createFragment = function( loc, ul, index, reverse) { //拼接列表内容	
	/*所需变量*/
	var title = "11 Photos Of Shiloh Jolie Pitt's Changing Looks Will Take Your Breath Away";//标题
	var website = "Metro";//来源网站
	var comment_number = 42;//评论数量
	/*图片的src*/
	var img_src = "#";//一张大图片 和 一张GIF图片 和 一张小图片
	var img_src_small1 = "#";//三张小图片（1）
	var img_src_small2 = "#";//三张小图片（2）
	var img_src_small3 = "#";//三张小图片（3）
	var video_src = "";//video
	/*数据拼接li*/
	//来源网站和评论和删除按钮-统一的
	var commentText = "<div class=\"m-detail\">\
							<span class=\"m-website\">"+website+"</span>\
							<span class=\"mui-icon mui-icon-chat\"></span>\
							<span>"+comment_number+"</span>\
							<span class=\"mui-icon mui-icon-trash mui-pull-righ\" style=\"float:right;\"></span>\
						</div>";
	//video列表页中的样式		
	var oneVideoList = "<li class=\"mui-table-view-cell\">\
							<a data-src=\"#\" href=\"javascript:;\">\
								<div class=\"play\">\
									<span class=\"mui-icon mui-icon-arrowright\"></span>\
									<div class=\"progressbar_box\"><progress class=\"processbar\" id=\"processbar\" max=\"100\" value=\"0\"></progress><i class=\"dot\"></i></div>\
									<span class=\"mui-icon mui-icon-chatbubble\"></span>\
								</div>\
								<div class=\"main-video\">\
									<img src=\"images/dog2.jpg\"/>\
								</div>\
								<div class=\"video-play\">\
									<video class=\"video-js vjs-default-skin\" playsinline preload=\"auto\" width=\"100%\" height=\"160\" poster=\"images/p2.jpeg\" data-setup=\"{}\" loop>\
										<source src=\"images/v2.mp4\" type=\"video/mp4\">\
									</video>\
								</div>\
							<div class=\"mui-media-body\">"+title+"</div>\
						</a>"+commentText+"</li>";
	
	/*
	 * 把查询到的内容拼接到一起，然后添加到列表中
	 */
	var newHtml="";//拼接的文档--放到循环的外面
	//要放到循环中?
	newHtml += oneVideoList;//根据内容进行拼接，然后插入到列表中
	//判断是否是下拉刷新，从而决定是在前面添加数据，还是在底部添加数据
	if(loc === "append"){ 
		ul.innerHTML += newHtml; 
	}else{
		ul.innerHTML = newHtml + ul.innerHTML;
	}
	operation();//每次加载完，都给每个下拉的箭头绑定一次事件,弹出框
};



/*点击新闻列表，进入到相应的详情页*/
mui(".mui-slider-group").on("tap","li",function(){
	var newHref = this.getElementsByTagName("a")[0].getAttribute("data-src");
	var title = this.getElementsByClassName("mui-media-body")[0].innerHTML;
	openDetail("detail_video.html",newHref,title);
})



//video(event,element,playBtn,list)
//event:点击事件，element:当前被点击元素，playBtn：播放按钮，list：是否是列表中的
mui(".v-list").on("tap",".play-btn",function(event){
	video(event,this,true,true);	
})
mui(".v-list").on("tap",".progressbar_box",function(event){
	video(event,this,false,true);
});