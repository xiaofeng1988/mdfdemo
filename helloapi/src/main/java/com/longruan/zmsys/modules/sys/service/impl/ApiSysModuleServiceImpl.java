package com.longruan.zmsys.modules.sys.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longruan.zmsys.common.utils.EasyUIJsonTree;
import com.longruan.zmsys.dao.ApiSysModuleMapper;
import com.longruan.zmsys.models.ApiSysModule;
import com.longruan.zmsys.modules.sys.service.IApiSysModuleService;

@Transactional
@Service("apiSysModuleService")
public class ApiSysModuleServiceImpl implements IApiSysModuleService {

	
	@Resource(name="apiSysModuleMapper")
	private ApiSysModuleMapper apiSysModuleMapper;
	
	@Override
	public List<EasyUIJsonTree> findSysModuleTrees(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		 List<EasyUIJsonTree> easyUIJsonTreeList = new ArrayList<EasyUIJsonTree>(); 
		 EasyUIJsonTree easyUIJsonTree = null;
		List<Map<String, Object>> apiSysModuleList = apiSysModuleMapper.findSysModuleList(paramMap);
		for(Map<String, Object> moduleMap:apiSysModuleList){
			easyUIJsonTree = new EasyUIJsonTree();
			easyUIJsonTree.setId(String.valueOf(moduleMap.get("id")));   //子节点
			easyUIJsonTree.setPno(String.valueOf(moduleMap.get("pid"))); //父节点
			easyUIJsonTree.setText(String.valueOf(moduleMap.get("name"))); //模块名称
			easyUIJsonTreeList.add(easyUIJsonTree);
		}
		//集合列表结构=》为树形结构
		 List<EasyUIJsonTree> nodeList = new ArrayList<EasyUIJsonTree>(); 
		 for(EasyUIJsonTree node1 : easyUIJsonTreeList){ 
		     boolean mark = false; 
		     for(EasyUIJsonTree node2 : easyUIJsonTreeList){ 
		         if(node1.getPno()!=null && node1.getPno().equals(node2.getId())){ 
		             mark = true; 
		             if(node2.getChildren() == null) 
		                 node2.setChildren(new ArrayList<EasyUIJsonTree>()); 
		             node2.getChildren().add(node1);  
		             break; 
		         } 
		     } 
		     if(!mark){ 
		         nodeList.add(node1);  
		     }
		 }
		 return nodeList;
		
	}

	@Override
	public ApiSysModule findApiSysModuleByPK(String id) {
		// TODO Auto-generated method stub
		return apiSysModuleMapper.selectByPrimaryKey(Integer.parseInt(id));
	}


	@Override
	public void addApiSysModule(ApiSysModule apiSysModule) {
		// TODO Auto-generated method stub
		int maxOrderId = apiSysModuleMapper.findMaxOrderIdByPid(apiSysModule.getPid());
		apiSysModule.setOrderid((short) (maxOrderId+1));
		apiSysModuleMapper.insert(apiSysModule);
	}

	@Override
	public void deleteApiSysModule(int id) {
		// TODO Auto-generated method stub
		// 递归删除（若有子节点则删除）
		apiSysModuleMapper.deleteByPrimaryKey(id);
		List<Map<String, Object>> childMapList = apiSysModuleMapper.findMapListByPId(id);
		if (childMapList.size() > 0) {
			for (Map<String, Object> cMap : childMapList) {
				if (cMap.get("id") != null) {
					this.deleteApiSysModule(Integer.parseInt(String.valueOf(cMap.get("id"))));
				}
			}
		}
	}


	@Override
	public void updateApiSysModule(ApiSysModule apiSysModule) {
		// TODO Auto-generated method stub
		apiSysModuleMapper.updateByPrimaryKeySelective(apiSysModule);
	}

	@Override
	public void moveUpApiSysModule(String nodeId, String preNodeId) {
		// TODO Auto-generated method stub
		//orderId交换保存
		ApiSysModule nodeApiSysModule = apiSysModuleMapper.selectByPrimaryKey(Integer.parseInt(nodeId));
		ApiSysModule preApiSysModule = apiSysModuleMapper.selectByPrimaryKey(Integer.parseInt(preNodeId));
		short orderId = nodeApiSysModule.getOrderid();
		nodeApiSysModule.setOrderid(preApiSysModule.getOrderid());
		preApiSysModule.setOrderid(orderId);
		apiSysModuleMapper.updateByPrimaryKeySelective(nodeApiSysModule);
		apiSysModuleMapper.updateByPrimaryKeySelective(preApiSysModule);
	}

	@Override
	public void moveDownApiSysModule(String nodeId, String nextNodeId) {
		// TODO Auto-generated method stub
		//orderId交换保存
		ApiSysModule nodeApiSysModule = apiSysModuleMapper.selectByPrimaryKey(Integer.parseInt(nodeId));
		ApiSysModule preApiSysModule = apiSysModuleMapper.selectByPrimaryKey(Integer.parseInt(nextNodeId));
		short orderId = nodeApiSysModule.getOrderid();
		nodeApiSysModule.setOrderid(preApiSysModule.getOrderid());
		preApiSysModule.setOrderid(orderId);
		apiSysModuleMapper.updateByPrimaryKeySelective(nodeApiSysModule);
		apiSysModuleMapper.updateByPrimaryKeySelective(preApiSysModule);
	}
	

}
