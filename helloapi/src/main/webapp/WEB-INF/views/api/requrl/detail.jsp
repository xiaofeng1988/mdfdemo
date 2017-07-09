<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<script type="text/javascript">
		 	function getApiResult(url){ 
		 		$.post('${rootPath}/'+url, null, function(data){
		 			console.log(eval(data));
		 		    var json =JSON.stringify(data);
					$("#apiResultId").html(format_str(json)); 
					$.parser.parse("#apiResultId");
				});
		 	}
		 	
		 // format all string
		 	function format_str(txt) {
		 	    if (/^\s*$/.test(txt)) {
		 	        //alert('txt is empty');   
		 	        return '';
		 	    }
		 	    try {
		 	        //var data = eval('(' + txt + ')');
		 	        txt = txt.replace(new RegExp("\"{","gm"), "{").replace(new RegExp("}\"","gm"), "}");    // "{->{   }"->}
		 	        txt = txt.replace(new RegExp("\\\\\\\"","gm"), "\"");    // \"->"
		 	        txt = txt.replace(new RegExp("\\\\\\\"","gm"), "\"");
		 	        txt = txt.replace(new RegExp("\\\\\\\"","gm"), "\"");
		 	        
		 	        txt = txt.replace(new RegExp("\\\\\\\\r","gm"), "\\r");
		 	        txt = txt.replace(new RegExp("\\\\\\\\n","gm"), "\\n");
		 	        txt = txt.replace(new RegExp("\\\\\\\\r","gm"), "\\r");
		 	        txt = txt.replace(new RegExp("\\\\\\\\n","gm"), "\\n");
		 	        txt = txt.replace(new RegExp("\\\\\\\\r","gm"), "\\r");
		 	        txt = txt.replace(new RegExp("\\\\\\\\n","gm"), "\\n");

		 	        //txt = txt.replace(new RegExp("&nbsp;","gm"), "");

		 	        var draw = [];
		 	        var line = "<br/>";
		 	        var indent = 0;
		 	        var quoteCount = 0;
		 	        var quoteOddEven = 0;    // Even count quote(") to deal, Odd is string
		 	        var containLeftBrace = false;
		 	        var preChar = '';
		 	        var nextChar = '';
		 	        for (var i = 0; i < txt.length; i++) {
		 	             current = txt.charAt(i);
		 	             try {
		 	                 nextChar = txt.charAt(i + 1);
		 	             } catch (e) {
		 	                 console.log(e);
		 	             }
		 	             switch (current) {
		 	                 case '{':
		 	                     containLeftBrace = true;
		 	                 case '[': {
		 	                     if (preChar == '\"') {
		 	                         draw.push(current);
		 	                         break;
		 	                     }
		 	                     if (quoteOddEven == 0) {
		 	                         ++indent;
		 	                         draw.push(current);
		 	                         draw.push(line);
		 	                         draw.push(addIndentBlank(indent));
		 	                         break;
		 	                     } else {
		 	                         draw.push(current);
		 	                         break;
		 	                     }
		 	                 }
		 	                 case '}':
		 	                 case ']': {
		 	                     if (nextChar == '\"') {
		 	                         draw.push(current);
		 	                         break;
		 	                     }
		 	                     if (quoteOddEven == 0) {
		 	                         --indent;
		 	                         draw.push(line);
		 	                         draw.push(addIndentBlank(indent));
		 	                         draw.push(current);
		 	                         break;
		 	                     } else {
		 	                         draw.push(current);
		 	                         break;
		 	                     }
		 	                 }
		 	                 case ',': {
		 	                     if (quoteOddEven == 0 && quoteCount > 0 && containLeftBrace) {
		 	                         draw.push(current);
		 	                         draw.push(line);
		 	                         draw.push(addIndentBlank(indent));
		 	                         break;
		 	                     } else {
		 	                         draw.push(current);
		 	                         break;
		 	                     }
		 	                 }
		 	                 case '\\': {
		 	                     try {
		 	                         next1 = txt.charAt(i+1);
		 	                         next2 = txt.charAt(i+2);
		 	                         next3 = txt.charAt(i+3);
//		 	                         console.log(current + next1 + next2 + next3);
		 	                         if ((next1 + "") == "r" && (current + next1 + next2 + next3) == "\\r\\n") {
		 	                             draw.push(line);
		 	                             draw.push(addIndentBlank(indent + 1));
		 	                             i = i+3;
		 	                         }
		 	                     } catch(e) {
		 	                         console.log(e);
		 	                     }
		 	                     break;
		 	                 }
		 	                 case '\"': {
		 	                     quoteCount = quoteCount + 1;
		 	                     quoteOddEven = (quoteOddEven + 1) % 2;
		 	                     draw.push(current);
		 	                     break;
		 	                 }
		 	                 default: {
		 	                     draw.push(current);
		 	                 }
		 	             }
		 	             preChar = current;
		 	        }

//		 	        console.log('draw: ' + draw.join(''));
		 	    } catch (e) {
//		 	        alert('txt format error: '+e,'err');   
		 	        return txt;
		 	    }
		 	    ;
		 	    return draw.join('');
		 	}
		</script>
	</head>
	<body>
    <table class="defaulttableStyle" cellspacing="1px">
             <tr style="height: 35px">
                 <th colspan="2" style="text-align: left">
                     <div id="currentdept901">当前选择功能：${apiSysModule.name }</div>
                     <input type="hidden" id="hiddenNodeId" value="${apiReqUrl.id }"></input>
                 </th>
             </tr>
             <tr style="height: 35px">
                 <td>接口标题</td>
                 <td>
                     <div id="deptname901">${apiReqUrl.reqTitle }</div>
                 </td>
             </tr>
             <tr style="height: 35px">
                 <td>请求路径</td>
                 <td>
                     <div id="depttype901">${apiReqUrl.reqUrl }</div>
                 </td>
             </tr>
             <tr style="height: 65px">
                 <td>
                    <a href="javascript:void(0)" onclick="getApiResult('${apiReqUrl.reqUrl }')">请求结果</a>
                 </td>
                 <td>
                     <div id="depttype901">
                       <div data-options="border:false,region:'center'"   id="apiResultId" >
                       
                       json
                         </div>
                     	
                     </div>
                 </td>
             </tr>
         </table>
           <div id="adddeptpanel901" title="添加组织机构" class="easyui-dialog" 
				data-options="width:400,height:280,closed:true,buttons:[{text:'确定',iconCls:'icon-ok',handler:function(){var vd=$('#addSysRightFormId').form('validate');if(vd){$('#addSysRightFormId').submit();}}},{text:'取消',iconCls:'icon-cancel',handler:function(){$('#adddeptpanel901').dialog('close');}}]">  
		 </div> 
         
   </body>   
   
   

         
</html>