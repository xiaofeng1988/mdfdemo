package com.longruan.zmsys.modules.sys.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longruan.zmsys.dao.ApiSysMapper;
import com.longruan.zmsys.models.ApiSys;
import com.longruan.zmsys.modules.sys.service.IApiSysService;


@Transactional
@Service("apiSysService")
public class ApiSysServiceImpl implements IApiSysService {
	
	@Resource(name="apiSysMapper")
	private ApiSysMapper apiSysMapper;

	@Override
	public List<ApiSys> findSysListByConditions(ApiSys apiSys) {
		// TODO Auto-generated method stub
		return apiSysMapper.selectByExample(null);
	}

	@Override
	public void addApiSys(ApiSys apiSys) {
		// TODO Auto-generated method stub
		apiSysMapper.insert(apiSys);
	}

	@Override
	public void updateApiSys(ApiSys apiSys) {
		// TODO Auto-generated method stub
		apiSysMapper.updateByPrimaryKeySelective(apiSys);
	}

	@Override
	public void deleteApiSys(String id) {
		// TODO Auto-generated method stub
		apiSysMapper.deleteByPrimaryKey(Integer.parseInt(id));
	}

	@Override
	public ApiSys findApiSysByPK(String id) {
		// TODO Auto-generated method stub
		return apiSysMapper.selectByPrimaryKey(Integer.parseInt(id));
	}

}
