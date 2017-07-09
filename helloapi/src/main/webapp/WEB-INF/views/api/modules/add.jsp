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
			
// 			$("#desId").validatebox({
// 				validType:'remote["${pageContext.request.contextPath }/systemController/sysright/findCountSysrightURLByRoleId?id=${sysRight.id }", "url"]',
// 				invalidMessage:'页面路径已经存在'
// 			});
			
		});
	</script>

		<form action="${rootPath }/apiSysModuleCtr/apiSysModule/save" id="addSysRightFormId" method="post">
			
			<table class="dialog-tbl">
                    <tr style="height: 35px">
                        <th colspan="2" style="text-align: left">
                            <div id="addcurrentdept901">当前选择功能：${apiSysModule.name }</div>
                            <input type="hidden" name="pid" value="${apiSysModule.id }" />
<%-- 							<input type="text" style="display:none;" name="nodeid" value="${sysRight.nodeid }" /> --%>
                        </th>
                    </tr>
                    <tr style="height: 35px">
                        <td class="tit-col">
                            <div>功能名称</div>
                        </td>
                        <td>
                            <input  name="name"  style="width: 250px; height: 20px" type="text"
                                class="easyui-validatebox" id="nameId" data-options="validType:['length[0,50]']" />
                        </td>
                    </tr>
                    <tr style="height: 35px">
                        <td class="tit-col">
                            <div>模块描述</div>
                        </td>
                        <td>
                            <input  name="des"   style="width: 250px; height: 20px" type="text"
                                class="easyui-validatebox" id="desId"/>
                        </td>
                    </tr>
                    
                    
                </table>
		</form>
