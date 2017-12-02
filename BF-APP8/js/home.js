/** home.html
 * 	此页面内容为，
 * 		1.针对请求到的数据进行处理拼接
 * 			获取数据后，判断数据类型：一张大图片,一张小图片,三张小图片,视频,gif图
 * 			判断完数据类型后，建议用switch-case分别载入不同的模版中
 * 			最后将数据插入页面
 * 		2.点击新闻列表，进入到相应的详情页
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
//	switch(li类型){
//		case 一张大图片／一张GIF图片:
//			img_src = "#";
//			break;
//		case 一张小图片:
//			img_src = "#";
//			break;
//		case :
//			img_src = "#";
//			break;
//		case 三张小图片:
//			img_src_small1 = "#";//三张小图片（1）
//			img_src_small2 = "#";//三张小图片（2）
//			img_src_small3 = "#";//三张小图片（3）
//			break;
//		case video:
//			video_src = "#";
//			break;
//		default:
//			break;
//	}
	/*数据拼接li*/
	//来源网站和评论和删除按钮-统一的
	var commentText = "<div class=\"m-detail\">\
							<span class=\"m-website\">"+website+"</span>\
							<span class=\"mui-icon mui-icon-chat\"></span>\
							<span>"+comment_number+"</span>\
							<span class=\"mui-icon mui-icon-trash mui-pull-righ\" style=\"float:right;\"></span>\
						</div>";
	//一张大图片 和 一张gif 格式是一样的
	var onePicBig = "<li class=\"mui-table-view-cell one-picture\">\
						<a data-src=\"#\" href=\"javascript:;\">\
							<div class=\"mui-media-body\">"+title+"</div>\
							<img src="+img_src+">\
						</a>"+commentText+"</li>";
	//一张小图片-居右
	var onePicSmall = "<li class=\"mui-table-view-cell one-picture-right\">\
							<a data-src=\"#\" href=\"javascript:;\">\
							<img class=\"mui-media-object mui-pull-right\" src="+img_src+">\
							</a>\
							<div class=\"mui-media-body\">"+title+"</div>"+commentText+"</li>";
	//三张小图片
	var threePic = "<li class=\"mui-table-view-cell three-picture\">\
							<a data-src=\"#\" href=\"javascript:;\">\
							<div class=\"mui-media-body\">"+title+"</div>\
							<div class=\"pictures-list\">\
								<img src="+img_src_small1+">\
								<img src="+img_src_small2+">\
								<img src="+img_src_small3+">\
							</div>\
						</a>"+commentText+"</li>";
	//video-home列表页中的样式				
	var oneVideoMain = "<li class=\"mui-table-view-cell\">\
						<a data-src=\"#\" href=\"javascript:;\">\
						<div class=\"mui-media-body\">"+title+"</div>\
								<div class=\"main-video\"></div>\
									<video playsinline controls=\"controls\" preload width=\"100%\" height=\"160\" style=\"object-fit:cover\">\
								    	<source src="+video_src+" type=\"video/mp4\">\
								</video>\
					</a>"+commentText+"</li>";
	/*
	 * 把查询到的内容拼接到一起，然后添加到列表中
	 */
	var newHtml="";//拼接的文档--放到循环的外面
	//要放到循环中?
	newHtml += onePicSmall + threePic;//根据内容进行拼接，然后插入到列表中
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
	openDetail("detail.html",newHref,title);
})