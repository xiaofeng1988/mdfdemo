<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

	<script type="text/javascript">
		$(function(){
			$("#nameId").validatebox({
				required:true,
				missingMessage:'功能名称不能为空'
<%--				validType:'remote["${pageContext.request.contextPath }/systemController/sysright/findCountSysrightNameByRoleId?id=${sysRight.id }", "name"]',--%>
<%--				invalidMessage:'功能名称已经存在'--%>
			}); 
			
// 			$("#urlId").validatebox({
// 				validType:'remote["${pageContext.request.contextPath }/systemController/sysright/findCountSysrightURLByRoleId?id=${sysRight.id }", "url"]',
// 				invalidMessage:'页面路径已经存在'
// 			});
			
		});
	</script>

		<form action="${rootPath }/reqUrlCtr/saveApiReqUrl" id="addSysRightFormId" method="post">
			
			<table class="dialog-tbl">
                    <tr style="height: 35px">
                        <th colspan="2" style="text-align: left">
                            <div id="addcurrentdept901">所属模块：${apiSysModule.name }</div>
                            <input type="hidden" name="moduleId" value="${apiSysModule.id }" />
                            <input type="hidden" name="id" value="${apiReqUrl.id }" />
                        </th>
                    </tr>
                    <tr style="height: 35px">
                        <td class="tit-col">
                            <div>接口标题</div>
                        </td>
                        <td>
                            <input  name="reqTitle" value="${apiReqUrl.reqTitle }"  style="width: 250px; height: 20px" type="text"
                                class="easyui-validatebox" id="nameId" data-options="validType:['length[0,50]']" />
                        </td>
                    </tr>
                    <tr style="height: 35px">
                        <td class="tit-col">
                            <div>请求路径</div>
                        </td>
                        <td>
                            <input  name="reqUrl" value="${apiReqUrl.reqUrl }"  style="width: 250px; height: 20px" type="text"
                                class="easyui-validatebox" id="urlId"/>
                        </td>
                    </tr>
	                    <tr style="height: 35px">
	                        <td class="tit-col">
	                            <div>子  功  能</div>
	                        </td>
	                        <td>
	                        	
	                        </td>
	                    </tr>
                    
                </table>
		</form>
