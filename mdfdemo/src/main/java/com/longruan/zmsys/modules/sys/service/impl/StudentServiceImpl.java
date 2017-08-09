package com.longruan.zmsys.modules.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.longruan.zmsys.common.utils.Paging;
import com.longruan.zmsys.dao.StudentMapper;
import com.longruan.zmsys.models.Student;
import com.longruan.zmsys.modules.sys.service.IStudentService;

/**
 * 学生实现类
 * @author 龙软科技
 *
 */
@Transactional
@Service("studentService")
public class StudentServiceImpl implements IStudentService{
	
	@Resource(name="studentMapper")
	private StudentMapper studentMapper;
	

	@Override
	public int addStudent(Student stu) {
		// TODO Auto-generated method stub
		return studentMapper.insert(stu);
	}

	@Override
	public Map<String,Object> findStudentPageByConditions(
			Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		Map<String,Object> resultMap=new HashMap<String, Object>();
		List<Map<String,Object>> resultMapList=null;
		int total=studentMapper.findStudentCountByConditions(paramMap);
		Paging paging=(Paging) paramMap.get("paging");
		paging.setTotal(total);
		if(total>0){
			resultMapList=studentMapper.findStudentPageByConditions(paramMap);
		}
		resultMap.put("rows", resultMapList);
		resultMap.put("total", total);
		resultMap.put("paging", paging);
		return resultMap;
	}

	@Override
	public int updateStudent(Student stu) {
		// TODO Auto-generated method stub
		return studentMapper.updateByPrimaryKeySelective(stu);
	}

	@Override
	public Student findStudentByPK(String id) {
		// TODO Auto-generated method stub
		return studentMapper.selectByPrimaryKey(Integer.parseInt(id));
	}

	@Override
	public void deleteStudent(String ids) {
		// TODO Auto-generated method stub
		String []idsArr=ids.split(",");
		for(int i=0;i<idsArr.length;i++){
			studentMapper.deleteByPrimaryKey(Integer.parseInt(idsArr[i]));
		}
	}

}
