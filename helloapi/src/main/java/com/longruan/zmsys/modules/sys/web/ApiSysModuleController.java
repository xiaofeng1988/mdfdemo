package com.longruan.zmsys.modules.sys.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.longruan.zmsys.common.utils.EasyUIJsonTree;
import com.longruan.zmsys.common.utils.MethodUtil;
import com.longruan.zmsys.models.ApiSysModule;
import com.longruan.zmsys.modules.sys.service.IApiSysModuleService;

@Controller
@RequestMapping(value = "/apiSysModuleCtr")
public class ApiSysModuleController {

	private Log log = LogFactory.getLog(ApiSysModuleController.class); // 处理日志的对象
	private static MethodUtil util = new MethodUtil(); // 信息传递公用类

	@Resource(name = "apiSysModuleService")
	private IApiSysModuleService apiSysModuleService; // 服务类

	// list--load
	@RequestMapping(value = "/list/load")
	public String apiSysModuleLoad() {
		log.info("apiSysModuleLoad...");
		return "api/modules/list";
	}

	// add--load
	@RequestMapping(value = "/{nodeid}/add/load")
	public String addSysModuleLoad(@PathVariable String nodeid, Model model) {
		log.info("addSysModuleLoad...");
		ApiSysModule sysModule = apiSysModuleService
				.findApiSysModuleByPK(nodeid);
		ApiSysModule apiSysModule = new ApiSysModule();
		if (sysModule != null) {
			apiSysModule.setName(sysModule.getName());
			apiSysModule.setId(sysModule.getId());
		} else {
			apiSysModule.setName("根目录");
		}
		model.addAttribute("apiSysModule", apiSysModule);
		return "api/modules/add";
	}

	// edit--load
	@RequestMapping(value = "/edit/load")
	public String editSysModuleLoad() {
		log.info("editSysModuleLoad...");
		return "api/modules/detail";
	}

	/**
	 * 心一：模块管理tree
	 * 
	 * @param sid：系统id
	 * @return
	 */
	@RequestMapping(value = "/tree/findsysModuleTrees")
	@ResponseBody
	public List<EasyUIJsonTree> findsysModuleTrees(ApiSysModule sysModule) {
		List<EasyUIJsonTree> easyUIJsonTreeList = new ArrayList<EasyUIJsonTree>();
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sysModule", sysModule);
		easyUIJsonTreeList = apiSysModuleService.findSysModuleTrees(paramMap);
		return easyUIJsonTreeList;
	}

	/**
	 * 查看模块详情
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/{id}/detailSysModule")
	public String findSysModuleById(@PathVariable String id, Model model) {
		ApiSysModule apiSysModule = apiSysModuleService
				.findApiSysModuleByPK(id);
		model.addAttribute("apiSysModule", apiSysModule);
		return "api/modules/detail";

	}

	/**
	 * 心一：保存模块信息
	 * 
	 * @param response
	 * @param apiSysModule
	 * @return
	 */
	@RequestMapping(value = "/apiSysModule/save")
	public String saveApiSysModule(ApiSysModule apiSysModule) {
		if (apiSysModule.getId() == null || "".equals(apiSysModule.getId())) { // add
			if (apiSysModule.getPid() == null
					|| "".equals(apiSysModule.getPid())) {
				apiSysModule.setPid(0); // 根目录:如果没有父ID则默认添加0
			}
			apiSysModule.setSid(1); // 系统id暂定为1
			apiSysModuleService.addApiSysModule(apiSysModule);
		} else { // update
			apiSysModuleService.updateApiSysModule(apiSysModule);
		}
		return "api/modules/list";
	}

	/**
	 * 心一：删除模块以及以下所有模块信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}/apiSysModule/delete")
	public String deleteApiSysModule(@PathVariable String id) {
		apiSysModuleService.deleteApiSysModule(Integer.parseInt(id));
		return "api/modules/list";
	}

	/**
	 * 心一：修改初始化
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/apiSysModule/{id}/edit")
	public String editApiSysModule(@PathVariable String id, Model model) {
		ApiSysModule apiSysModule = apiSysModuleService
				.findApiSysModuleByPK(id);
		model.addAttribute("apiSysModule", apiSysModule);
		return "api/modules/edit";
	}
	
	/**
	 * 心一：上移排序
	 * @param nodeId
	 * @param preNodeId
	 * @return
	 */
	@RequestMapping(value="/apiSysModule/moveUpApiSysModule")
	public void moveUpApiSysModule(String nodeId,String preNodeId){
		apiSysModuleService.moveUpApiSysModule(nodeId, preNodeId);
	}
	
	/**
	 * 心一：下移排序
	 * @param nodeId
	 * @param preNodeId
	 * @return
	 */
	@RequestMapping(value="/apiSysModule/moveDownApiSysModule")
	public void moveDownApiSysModule(String nodeId,String nextNodeId){
		apiSysModuleService.moveDownApiSysModule(nodeId, nextNodeId);
	}

}
