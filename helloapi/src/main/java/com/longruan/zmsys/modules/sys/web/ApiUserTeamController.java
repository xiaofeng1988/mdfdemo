package com.longruan.zmsys.modules.sys.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.longruan.zmsys.common.utils.MethodUtil;

/**
 * 心一：团队管理控制器
 * 1.团队CURD
 *
 */
@Controller
@RequestMapping(value="/teamCtr")
public class ApiUserTeamController {
	
	
	private Log log = LogFactory.getLog(ApiUserTeamController.class); // 处理日志的对象
	private static MethodUtil util = new MethodUtil(); // 信息传递公用类
	
	/**
	 * 心一：团队管理初始化
	 * @return
	 */
	@RequestMapping(value="/list/load")
	public String teamLoad(){
		log.info("teamLoad...");
		return "api/team/list";
	}
	
	
	
	@RequestMapping(value="/addTeam")
	public String addTeam(){
		
		return "";
	}
	
	
}
