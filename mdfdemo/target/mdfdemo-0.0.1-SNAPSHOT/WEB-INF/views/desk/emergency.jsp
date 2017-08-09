<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>应急物资</title>
<script type="text/javascript" src="${pageContext.request.contextPath }/view/desk/images/jquery-1.6.2.min.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/view/desk/images/css.css" />
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

//在父窗口提交URL
function indexLoad(page){
var	url='${pageContext.request.contextPath }/sysRight/'+page+'/firstMenuLoad';
window.parent.location.href=url;
}
</script>
</head>
<body>
<img src="${pageContext.request.contextPath }/view/desk/images/emergency.jpg" alt="" id="background" />
	<div class="prorequ">
			    <div class="productionlink1">
        		<a class="link productionlink7"  href="${pageContext.request.contextPath }/desk/main.jsp">
      		</div>
			<div class="emergencywrap1002">
	            <a hidefocus="true" class="link emergencylink1" href="javascript:indexLoad('06')"></a>
	            <a hidefocus="true" class="link emergencylink2" href="javascript:indexLoad('06')"></a>
	            <a hidefocus="true" class="link emergencylink3" href="javascript:indexLoad('06')"></a>
	            <a hidefocus="true" class="link emergencylink5" href="javascript:indexLoad('06')"></a>
	            <a hidefocus="true" class="link emergencylink6" href="javascript:indexLoad('06')"></a>
	       	</div>
	        </div>
<script type="text/javascript">
$(window).load(function() {
$("#background").fullBg();
});
</script>
</body>
</html>