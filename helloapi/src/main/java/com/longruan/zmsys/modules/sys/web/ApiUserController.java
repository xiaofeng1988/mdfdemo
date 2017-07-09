package com.longruan.zmsys.modules.sys.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.longruan.zmsys.common.utils.MethodUtil;

/**
 * 心一：用户管理控制器
 * @author xiaofeng
 *
 */
@Controller
@RequestMapping(value="/apiUserCtr")
public class ApiUserController {
	
	private Log log = LogFactory.getLog(ApiUserController.class); // 处理日志的对象
	private static MethodUtil util = new MethodUtil(); // 信息传递公用类
	
	
}
