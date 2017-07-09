package com.longruan.zmsys.modules.sys.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.longruan.zmsys.common.utils.MethodUtil;
import com.longruan.zmsys.models.ApiSys;
import com.longruan.zmsys.modules.sys.service.IApiSysService;

/**
 * 心一：系统管理控制器
 * @author xiaofeng
 *
 */
@Controller
@RequestMapping(value="/apiSysCtr")
public class ApiSysController {

	
	private Log log = LogFactory.getLog(ApiSysController.class); // 处理日志的对象
	private static MethodUtil util = new MethodUtil(); // 信息传递公用类
	
	@Resource(name="apiSysService")
	private IApiSysService apiSysService;  //api路径服务类
	
	
	/**
	 * 心一：初始化列表
	 * @return
	 */
	@RequestMapping(value="/list/load")
	public String apiUrlLoad(){
		log.info("reqUrlCtr...");
		return "api/sys/list";
	}
	
	@RequestMapping(value="/add/load")
	public String addApiUrlLoad(){
		log.info("reqUrlCtr...");
		return "api/sys/add";
	}
	
	@RequestMapping(value="/edit/load")
	public String editApiUrlLoad(String id,Model model){
		log.info("reqUrlCtr...");
		ApiSys apiSys=apiSysService.findApiSysByPK(id);
		model.addAttribute("apiSys", apiSys);
		return "api/sys/edit";
	}
	
	/**
	 * 心一：全查询系统列表
	 * @param apiSys
	 * @return
	 */
	@RequestMapping(value="findAllApiSys")
	@ResponseBody
	public List<ApiSys> findAllApiSys(ApiSys apiSys){
		return apiSysService.findSysListByConditions(apiSys);
	}
	
	/**
	 * 保存信息
	 * @param response
	 * @param stu
	 */
	@RequestMapping(value="/saveApiSys")
	public void saveApiSys(HttpServletResponse response,ApiSys apiSys){
		try{
			if(apiSys!=null && apiSys.getId()!=null){
				//1.修改
				apiSysService.updateApiSys(apiSys);
			}else{
				//2.添加
				apiSysService.addApiSys(apiSys);
			}
			util.toJsonMsg(response, 0, null);
		}catch(Exception ex){
			log.error(this, ex); // 打印异常内容
			util.toJsonMsg(response, 1, null);
		}
	}
	
	@RequestMapping(value="/deleteApiSys")
	public void deleteApiSys(HttpServletResponse response,String ids){
		try{
			if(!StringUtils.isEmpty(ids)){
				String []idsArr=ids.split(",");
				for(int i=0;i<idsArr.length;i++){
					apiSysService.deleteApiSys(idsArr[i]);
				}
				util.toJsonMsg(response, 0, null);
			}else{
				util.toJsonMsg(response, 1, null);
			}
		}catch(Exception ex){
			log.error(this, ex); // 打印异常内容
			util.toJsonMsg(response, 1, null);
		}
		
		
	}
	
	
}
