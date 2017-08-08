package com.wws.wwsgis.dao;

import com.wws.wwsgis.models.SysDeptAndRight;
import com.wws.wwsgis.models.SysDeptAndRightExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysDeptAndRightMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int countByExample(SysDeptAndRightExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int deleteByExample(SysDeptAndRightExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int deleteByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int insert(SysDeptAndRight record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int insertSelective(SysDeptAndRight record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	List<SysDeptAndRight> selectByExample(SysDeptAndRightExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	SysDeptAndRight selectByPrimaryKey(Integer id);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByExampleSelective(@Param("record") SysDeptAndRight record,
			@Param("example") SysDeptAndRightExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByExample(@Param("record") SysDeptAndRight record, @Param("example") SysDeptAndRightExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByPrimaryKeySelective(SysDeptAndRight record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table sys_dept_and_right
	 * @mbggenerated  Sat Feb 04 16:21:42 CST 2017
	 */
	int updateByPrimaryKey(SysDeptAndRight record);
}