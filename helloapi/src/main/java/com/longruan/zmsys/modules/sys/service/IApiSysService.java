package com.longruan.zmsys.modules.sys.service;

import java.util.List;

import com.longruan.zmsys.models.ApiSys;

public interface IApiSysService {
	
	/**
	 * 心一:全查询系统列表
	 * @param pageing
	 * @return
	 */
	 List<ApiSys> findSysListByConditions(ApiSys apiSys);
	 /**
	  * 心一:添加系统信息
	  * @param apiSys
	  */
	 void addApiSys(ApiSys apiSys);
	 /**
	  * 心一:修改系统信息
	  * @param apiSys
	  */
	 void updateApiSys(ApiSys apiSys);
	 /**
	  * 心一：删除系统信息
	  * @param id
	  */
	 void deleteApiSys(String id);
	 /**
	  * 心一：主键查询系统信息
	  * @param id
	  * @return
	  */
	 ApiSys findApiSysByPK(String id);

}
