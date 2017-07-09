package com.longruan.zmsys.modules.sys.service;

import java.util.List;
import java.util.Map;

import com.longruan.zmsys.models.ApiReqUrl;



public interface IApiReqUrlService {
	
	/**
	 * 心一：分页查询API路径总数
	 * @param pageing
	 * @return
	 */
	int findReqUrlCountByConditions(Map<String, Object> paramMap);
	/**
	 * 心一：分页查询API路径信息
	 * @param pageing
	 * @return
	 */
	List<Map<String,Object>> findReqUrlPageByConditions(Map<String, Object> paramMap);
	
    /**
     * 心一：添加API信息
     * @param apiReqUrl
     */
	void addApiReqUrl(ApiReqUrl apiReqUrl);
	/**
     * 心一：删除API信息
     * @param id
     */
	int deleteApiReqUrl(String id);
	/**
	 * 心一：修改API信息
	 * @param apiReqUrl
	 */
	void updateApiReqUrl(ApiReqUrl apiReqUrl);
	/**
	 * 心一：查看模块下的API列表
	 * @param moduleId
	 * @return
	 */
	List<Map<String, Object>> findApiReqUrlListByModuleId(String moduleId);
	/**
	 * 心一：主键查询信息
	 * @param id
	 * @return
	 */
	ApiReqUrl findApiReqUrlByPK(Integer id);
	
	int test(String id);
	

}
