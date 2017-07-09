package com.longruan.zmsys.modules.sys.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.longruan.zmsys.common.utils.EasyUIJsonTree;
import com.longruan.zmsys.common.utils.MethodUtil;
import com.longruan.zmsys.common.utils.Paging;
import com.longruan.zmsys.models.ApiReqUrl;
import com.longruan.zmsys.models.ApiSysModule;
import com.longruan.zmsys.models.Student;
import com.longruan.zmsys.modules.sys.service.IApiReqUrlService;
import com.longruan.zmsys.modules.sys.service.IApiSysModuleService;

/**
 * 心一：API路径管理
 * @author xinyi
 *
 */
@Controller
@RequestMapping(value="/reqUrlCtr")
public class ApiReqUrlController {
	
	
	//reqUrlService
	
	private Log log = LogFactory.getLog(ApiReqUrlController.class); // 处理日志的对象
	private static MethodUtil util = new MethodUtil(); // 信息传递公用类
	
	@Resource(name="apiReqUrlService")
	private IApiReqUrlService apiReqUrlService;  //api路径服务类
	
	@Resource(name = "apiSysModuleService")
	private IApiSysModuleService apiSysModuleService; // 菜单服务类
	
	/**
	 * 心一：初始化列表
	 * @return
	 */
	@RequestMapping(value="/list/load")
	public String apiUrlLoad(){
		log.info("apiUrlLoad...");
		return "api/requrl/list";
	}
	
	@RequestMapping(value="/add/{moduleId}/load")
	public String addApiReqUrlLoad(@PathVariable String moduleId,Model model){
		log.info("addApiReqUrlLoad...");
		ApiSysModule apiSysModule = apiSysModuleService.findApiSysModuleByPK(moduleId);
		model.addAttribute("apiSysModule", apiSysModule);
		return "api/requrl/add";
	}
	
	
	
	/**
	 * 心一：分页查询API列表信息
	 * @param paging
	 * @param apiReqUrl
	 * @return
	 */
	@RequestMapping(value="/findReqUrlPageByConditions")
	@ResponseBody
	public Map<String,Object> findReqUrlPageByConditions(Paging paging,ApiReqUrl apiReqUrl){
		Map<String,Object> paramMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultMapList = null;
		paramMap.put("apiReqUrl", apiReqUrl);
		int total = apiReqUrlService.findReqUrlCountByConditions(paramMap);
		paging.setTotal(total);
		if (total > 0) {
			resultMapList = apiReqUrlService.findReqUrlPageByConditions(paramMap);
		}
		resultMap.put("rows", resultMapList);
		resultMap.put("total", total);
		resultMap.put("paging", paging);
		return resultMap;
	}
	
	/**
	 * 心一：添加API信息
	 * @param request
	 * @param apiReqUrl
	 */
	public void addApiReqUrl(HttpServletRequest request,ApiReqUrl apiReqUrl){
		
		
	}
	
	/**
	 * 心一：保存API信息
	 * @param response
	 * @param apiReqUrl
	 */
	@RequestMapping(value="/saveApiReqUrl")
	public void saveApiReqUrl(HttpServletResponse response,ApiReqUrl apiReqUrl){
		try{
			if(apiReqUrl!=null && apiReqUrl.getId()!=null){
				//1.修改
				
				apiReqUrlService.updateApiReqUrl(apiReqUrl);
			}else{
				//2.添加
				apiReqUrlService.addApiReqUrl(apiReqUrl);
			}
			util.toJsonMsg(response, 0, null);
		}catch(Exception ex){
			log.error(this, ex); // 打印异常内容
			util.toJsonMsg(response, 1, null);
		}
	}
	
	/**
	 * 心一：删除
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/deleteApiReqUrl/{id}")
	@ResponseBody
	public String deleteApiReqUrl(@PathVariable String id){
		int backCode=apiReqUrlService.deleteApiReqUrl(id);
		return backCode+"";
	}
	
	/**
	 * 心一：查询模块下的接口－tree
	 * @param moduleId
	 * @return
	 */
	@RequestMapping(value="/apiReqUrl/{moduleId}/tree")
	@ResponseBody
	public List<EasyUIJsonTree> findApiReqUrlTree(@PathVariable String moduleId) {
		List<EasyUIJsonTree> easyUIJsonTreeList = new ArrayList<EasyUIJsonTree>();
		EasyUIJsonTree easyUIJsonTree = null;
		List<Map<String, Object>> apiReqUrlMapList = apiReqUrlService
				.findApiReqUrlListByModuleId(moduleId);
		for (Map<String, Object> rMap : apiReqUrlMapList) {
			easyUIJsonTree = new EasyUIJsonTree();
			easyUIJsonTree.setId(String.valueOf(rMap.get("id"))); // 子节点
			easyUIJsonTree.setText(String.valueOf(rMap.get("req_title"))); // 模块名称
			easyUIJsonTreeList.add(easyUIJsonTree);
		}
		return easyUIJsonTreeList;
	}
	
	/**
	 * 心一：接口详情
	 * @param nodeid
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/apiReqUrl/{nodeid}/detail")
	public String detailApiReqUrl(@PathVariable String nodeid,Model model){
		ApiReqUrl  apiReqUrl = apiReqUrlService.findApiReqUrlByPK(Integer.parseInt(nodeid));
		model.addAttribute("apiReqUrl", apiReqUrl);
		return "api/requrl/detail";
	}
	
	@RequestMapping(value="/test")
	public void test(){
		int back = apiReqUrlService.test("4");
		log.info(back);
		
	}


}
