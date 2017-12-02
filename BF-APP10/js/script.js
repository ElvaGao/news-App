/** 所有html文件
 * 	本页的js文件，用于app中所有的函数
 * 		1.列表页：点击下拉菜单出现操作对话框 operation()
 * 		2.列表页：删除li的dom节点 deleteLi()
 * 		3.列表页：点击新闻列表，打开相应的详情页
 * 		4.video内容相关页面：加载子页面：子页面url,top值
 * 		5.video内容相关页面：下拉刷新中的插入li，字符串拼接函数
 * 		6.打开新页面
 * 		7.关闭webview
 * 		8.新建有链接的webview
 */		
 
/*点击下拉菜单出现操作对话框*/
var elementTap; //设置全局变量，用于保存当前被点击的这个li，为了后面删除做准备
function operation(){//每个下拉的箭头绑定一次事件,弹出框
	mui.each(mui(".mui-icon-trash"), function() {
		var self = this;
		self.addEventListener("tap",function(event){
			event.stopPropagation();//阻止冒泡
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
	openNewWindow(pageUrl,"0px","slide-in-right",iframeHref,newTitle);
}

/*加载子页面：子页面url,top值*/
function mInit(tHtml,topHeight){
	mui.init({
		subpages:[{
			url:tHtml,
			id:tHtml,
			styles:{
				top: topHeight+'px',
				bottom: '0px',
			}
		}]
	});
}

/*下拉刷新中的插入li，字符串拼接函数*/
function refreshLi(htmltext,ulTxt){
	var li = document.createElement('li'); //创建li
	li.className = "mui-table-view-cell"; //类名
	li.innerHTML = htmltext;
	var eleUl = mui("."+ulTxt+" ul")[0]; //li的父级ul对象
	eleUl.appendChild(li); //新li插入到列表最前端
}

/*打开新页面:新页面地址，顶部高度，动画方向*/
function openNewWindow(newUrl,topHeight,slide,iframeHref,newTitle){
	mui.openWindow({
		url:newUrl,
		id:newUrl,
		styles:{
			top:topHeight,
			bottom:0
		},
		extras:{
			detailUrl:iframeHref,
			title:newTitle
		},
		createNew:true,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	    show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      aniShow:slide,//页面显示动画，默认为”slide-in-right“；
	      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    }
	})
}

/*关闭webview*/
function closeWebview(url){
	plus.webview.getWebviewById(url).close();
}

/*新建有链接的webview*/
function newUrlWebview(url,id,top,bottom,parentWV){
	var newWV = plus.webview.create(url, id, { //创建新的webview-文章的webview
	    top: top+"px",
	    bottom: bottom+"px"
	});
	parentWV.append(newWV);
	
	return newWV;
}