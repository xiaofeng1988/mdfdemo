<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>首导航</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-1.8.0.min.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/desk/images/css.css" />
<script type="text/javascript">
(function($) {
$.fn.fullBg = function(){
var bgImg = $(this);
bgImg.addClass('fullBg');
function resizeImg() {
var imgwidth = bgImg.width();
var imgheight = bgImg.height();
var winwidth = $(window).width();
var winheight = $(window).height();
var widthratio = winwidth/imgwidth;
var heightratio = winheight/imgheight;
var widthdiff = heightratio*imgwidth;
var heightdiff = widthratio*imgheight;
if(heightdiff>winheight) {
	bgImg.css({
		width: winwidth+'px',
		height: heightdiff+'px'
	});
} else {
	bgImg.css({
	width: widthdiff+'px',
	height: winheight+'px'
	});
	}
}
resizeImg();
$(window).resize(function() {
	resizeImg();
});
};
})(jQuery)

//打开对应的导航页
	function openWindow(page){
		var url="${pageContext.request.contextPath }/view/desk/"+page+".jsp";
		window.open(url,page);
	}
//打开首页
function firstPageLoad(page){
		var url="${pageContext.request.contextPath }/sysRight/12/firstMenuLoad";
		window.open(url,page);
}
</script>
</head>
<body>
<img src="${pageContext.request.contextPath}/static/css/desk/images/bg2.jpg" alt="" id="background" />
	<div class="requ">
		<div class="wrap1002">
	        <a hidefocus="true" class="link linkindex" href="javascript:void(0)"></a>
        	<a hidefocus="true" class="link link1" href="javascript:void(0)"></a>
            <a hidefocus="true" class="link link2" href="javascript:void(0)"></a>
            <a hidefocus="true" class="link link3" href="javascript:void(0)"></a>
            <a hidefocus="true" class="link link4" href="javascript:void(0)"></a>
            <a hidefocus="true" class="link link6" href="javascript:void(0)"></a>
<%--		    <a hidefocus="true" class="link linkindex" href="${pageContext.request.contextPath }/desk/souye.jsp"></a>--%>
<%--        	<a hidefocus="true" class="link link1" href="${pageContext.request.contextPath }/desk/safe.jsp"></a>--%>
<%--            <a hidefocus="true" class="link link2" href="${pageContext.request.contextPath }/desk/scheduling.jsp"></a>--%>
<%--            <a hidefocus="true" class="link link3" href="${pageContext.request.contextPath }/desk/production.jsp"></a>--%>
<%--            <a hidefocus="true" class="link link4" href="${pageContext.request.contextPath }/desk/emergency.jsp"></a>--%>
<%--            <a hidefocus="true" class="link link6" href="${pageContext.request.contextPath }/desk/complex.jsp"></a>--%>
		</div>
	</div>
<script type="text/javascript">
$(window).load(function() {
$("#background").fullBg();
});
</script>
</body>
</html>