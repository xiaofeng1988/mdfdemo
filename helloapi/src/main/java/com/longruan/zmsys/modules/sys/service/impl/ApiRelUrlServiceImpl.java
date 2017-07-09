package com.longruan.zmsys.modules.sys.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.longruan.zmsys.dao.ApiReqUrlMapper;
import com.longruan.zmsys.models.ApiReqUrl;
import com.longruan.zmsys.modules.sys.service.IApiReqUrlService;


@Service("apiReqUrlService")
public class ApiRelUrlServiceImpl implements IApiReqUrlService {

	
	@Resource(name="apiReqUrlMapper")
	private ApiReqUrlMapper apiReqUrlMapper;
	
	@Override
	public int findReqUrlCountByConditions(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return apiReqUrlMapper.findReqUrlCountByConditions(paramMap);
	}

	@Override
	public List<Map<String, Object>> findReqUrlPageByConditions(
			Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return apiReqUrlMapper.findReqUrlPageByConditions(paramMap);
	}

	@Override
	public void addApiReqUrl(ApiReqUrl apiReqUrl) {
		// TODO Auto-generated method stub
		apiReqUrlMapper.insert(apiReqUrl);
	}

	@Override
	public void updateApiReqUrl(ApiReqUrl apiReqUrl) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, Object>> findApiReqUrlListByModuleId(String moduleId) {
		// TODO Auto-generated method stub
//		apiReqUrlMapper
		return apiReqUrlMapper.findApiReqUrlListByModuleId(moduleId);
	}

	@Override
	public ApiReqUrl findApiReqUrlByPK(Integer id) {
		// TODO Auto-generated method stub
		return apiReqUrlMapper.selectByPrimaryKey(id);
	}

	@Override
	public int deleteApiReqUrl(String id) {
		// TODO Auto-generated method stub
		return apiReqUrlMapper.deleteByPrimaryKey(Integer.parseInt(id));
	}

	@Override
	public int test(String id) {
		// TODO Auto-generated method stub
	return	ttt(id);
	}
	
	@Transactional(propagation=Propagation.REQUIRES_NEW) 
	public int ttt(String id){
		ApiReqUrl  sd = apiReqUrlMapper.selectByPrimaryKey(Integer.parseInt(id));
		sd.setReqTitle("kkk");
		apiReqUrlMapper.updateByPrimaryKey(sd);
		ApiReqUrl  ddd = apiReqUrlMapper.selectByPrimaryKey(Integer.parseInt(id));
		int a =1/0;
		//System.out.println(a);
		return a;
	}
	

}
