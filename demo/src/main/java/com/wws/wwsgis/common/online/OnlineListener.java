package com.wws.wwsgis.common.online;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.wws.wwsgis.common.utils.CommonValue;
import com.wws.wwsgis.common.utils.DateUtil;
import com.wws.wwsgis.dao.SysUserOnlineMapper;
import com.wws.wwsgis.models.SysUser;
import com.wws.wwsgis.models.SysUserOnline;

/**
 * session监听器类
 * @author Administrator
 *
 */
public class OnlineListener implements HttpSessionListener {

	private Log log = LogFactory.getLog(OnlineListener.class); // 处理日志的对象
	
	/**
	 * Session创建
	 */
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		// TODO Auto-generated method stub
		log.info("sessionCreated...");
	}

	/**
	 * Session销毁
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent sessionEvent) {
		// TODO Auto-generated method stub
		SysUser sysUser = (SysUser)sessionEvent.getSession().getAttribute(CommonValue.SESSION_CURRENT_USER);
		if(sysUser != null){
			String sessionId = sessionEvent.getSession().getId();
			String sessionMapKey = sessionId+"|"+sysUser.getId();
			Map<String, SysUserOnline> userOnlineMap = OnlineManager.getInstance().getOnlineMap();
			if(userOnlineMap.containsKey(sessionMapKey)){
				SysUserOnline sysUserOnline = userOnlineMap.get(sessionMapKey);
				sysUserOnline.setEtime(DateUtil.formatDate(new Date(), DateUtil.YEAR_TO_SECOND));
				userOnlineMap.remove(sessionMapKey);
				//数据库中修改结束时间
				ApplicationContext applicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(sessionEvent.getSession().getServletContext());
				SysUserOnlineMapper userOnLineMapper=(SysUserOnlineMapper) applicationContext.getBean("sysUserOnlineMapper");
				if(sysUserOnline.getSessionId()!= null || sysUserOnline.getUserId()!=null){
					userOnLineMapper.updateEtime(sysUserOnline);	
				}
				
			}
		}
		
		log.info("sessionDestroyed...");
	}

}
