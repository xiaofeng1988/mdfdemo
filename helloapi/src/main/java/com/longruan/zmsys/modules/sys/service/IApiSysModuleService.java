package com.longruan.zmsys.modules.sys.service;

import java.util.List;
import java.util.Map;

import com.longruan.zmsys.common.utils.EasyUIJsonTree;
import com.longruan.zmsys.models.ApiSysModule;


public interface IApiSysModuleService {
	
	
	/**
	 * 心一：查询所有模块信息，并且封装成tree结构
	 * @param paramMap
	 * @return
	 */
	public List<EasyUIJsonTree> findSysModuleTrees(Map<String,Object> paramMap);

	/**
	 * 心一：主键查询模块信息
	 * @param id
	 * @return
	 */
	ApiSysModule findApiSysModuleByPK(String id);
	/**
	 * 心一：CURD
	 * @param apiSysModule
	 */
	void addApiSysModule(ApiSysModule apiSysModule);
	void deleteApiSysModule(int id);
	void updateApiSysModule(ApiSysModule apiSysModule);
	/**
	 * 心一：上移排序
	 * @param nodeId
	 * @param preNodeId
	 */
	void moveUpApiSysModule(String nodeId,String preNodeId);
	/**
	 * 心一：下移排序
	 * @param nodeId
	 * @param nextNodeId
	 */
	void moveDownApiSysModule(String nodeId,String nextNodeId);
}
