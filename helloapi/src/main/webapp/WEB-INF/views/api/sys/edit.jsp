<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<script type="text/javascript">

	</script>

			
			
		<form id="addFormId" method="post">
		    <input type="hidden" id="id" name="id" value="${apiSys.id }" />
			<table class="dialog-tbl"> 
                    <tr style="height: 35px">
                        <td class="tit-col">
                            <div>系统：</div>
                        </td>
                        <td>
                            <input style="width: 250px; height: 20px" type="text" maxlength="50"
                                class="easyui-validatebox"  name="sName" value="${apiSys.sName }" id="nameId" />
                        </td>
                    </tr>
                    <tr style="height: 35px">
                        <td class="tit-col">
                            <div>描述：</div>
                        </td>
                        <td>
                            <input style="width: 250px; height: 20px" type="text" maxlength="100"
                                class="easyui-validatebox"  name="sDes" value="${apiSys.sDes }" id="remarkId" />
                        </td>
                    </tr>
                </table>
		</form>
