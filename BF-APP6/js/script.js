/**
 * 	本页的js文件，用于app中所有的函数
 * 		1.列表页：点击下拉菜单出现操作对话框 operation()
 * 		2.列表页：删除li的dom节点 deleteLi()
 */		
 
/*点击下拉菜单出现操作对话框*/
var elementTap; //设置全局变量，用于保存当前被点击的这个li，为了后面删除做准备
function operation(){//每个下拉的箭头绑定一次事件,弹出框
	mui.each(mui(".mui-icon-trash"), function() {
		var self = this;
		self.addEventListener("tap",function(){
			elementTap = self.parentNode.parentNode;//点击的那个li
			mui(".operation")[0].className = "operation mui-active";//弹出框类名
			mask.show();//显示遮罩
		})
	});
}
/*删除li的dom节点*/
function deleteLi(){
	mui(".mui-slider-group .mui-active .mui-table-view")[0].removeChild(elementTap);//删除之前点击的li
	mui(".operation")[0].className = "operation";//关闭弹出框
	mask.close();//显示遮罩
}

/*点击新闻列表，打开相应的详情页*/
function openDetail(pageUrl,iframeHref,newTitle){
	mui.openWindow({
		url:pageUrl,
		id:pageUrl,
		createNew:true,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		extras:{
	      detailUrl:iframeHref, //自定义扩展参数，可以用来处理页面间传值
	      title:newTitle 
	    },
	    show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
	      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    }
	})
}
