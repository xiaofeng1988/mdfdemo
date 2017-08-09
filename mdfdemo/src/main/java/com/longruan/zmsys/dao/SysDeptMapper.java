package com.longruan.zmsys.dao;

import com.longruan.zmsys.models.SysDept;
import com.longruan.zmsys.models.SysDeptExample;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface SysDeptMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int countByExample(SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int deleteByExample(SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int deleteByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int insert(SysDept record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int insertSelective(SysDept record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	List<SysDept> selectByExampleWithBLOBs(SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	List<SysDept> selectByExample(SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	SysDept selectByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByExampleSelective(@Param("record") SysDept record, @Param("example") SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByExampleWithBLOBs(@Param("record") SysDept record, @Param("example") SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByExample(@Param("record") SysDept record, @Param("example") SysDeptExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByPrimaryKeySelective(SysDept record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByPrimaryKeyWithBLOBs(SysDept record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByPrimaryKey(SysDept record);
	/**
	 * 心一：查询最大值
	 * @return
	 */
	int selectMaxId();
	/**
	 * 心一：根据父节点查询最大的排序号
	 * @param fatherId
	 * @return
	 */
	int findMaxOrderIdByFatherId(Integer fatherId);
	
	/**
	 * 心一：根据父部门查询子部门
	 * @param fatherId
	 * @return
	 */
	List<Map<String,Object>> findSysDeptListByFatherId(int fatherId);
	/**
	 * 心一：条件查询部门集合
	 * @param sysdept
	 * @return
	 */
	List<SysDept> findSysDeptListByCondition(SysDept sysdept);
}