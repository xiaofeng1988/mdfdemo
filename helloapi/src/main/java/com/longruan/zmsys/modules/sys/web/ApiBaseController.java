package com.longruan.zmsys.modules.sys.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.longruan.zmsys.common.utils.MethodUtil;

/**
 * <br>
 * <b>功能：</b>API管理<br>
 * <b>作者：</b>xinyi<br>
 * <b>日期：</b> 2017-05-21 <br>
 * <b>版权所有：心一<br>
 * <b>更新者：xinyi</b><br>
 * <b>日期：</b> <br>
 * <b>更新内容：</b><br>
 */
@Controller
@RequestMapping("/helloapi")
public class ApiBaseController {
	
	private Log log = LogFactory.getLog(ApiBaseController.class); // 处理日志的对象
	private static MethodUtil util = new MethodUtil(); // 信息传递公用类
	
	
	@RequestMapping(value="/list/load")
	public String apiLoad(){
		log.info("apiLoad...");
		return "api/list";
	}

}
