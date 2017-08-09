package com.longruan.zmsys.common.net;

import java.io.InputStreamReader;
import java.io.LineNumberReader;

public class NetUtils {

	/**
	 * 测试网络连接状态(ping ip)
	 * @param ip
	 * @return
	 */
	private static boolean getNetStatus(String ip){  
        boolean isTrue=false;
        try{
            Process process = Runtime.getRuntime().exec("ping "+ip);   
            InputStreamReader r = new InputStreamReader(process.getInputStream());   
            LineNumberReader returnData = new LineNumberReader(r);   
            String returnMsg="";   
            String line = "";   
            while ((line = returnData.readLine()) != null) {   
                System.out.println(line);   
                returnMsg += line;   
            }   
            if(returnMsg.indexOf("100% loss")!=-1){   
                System.out.println("与 " +ip +" 连接不畅通.");   
            }   
            else{   
                System.out.println("与 " +ip +" 连接畅通.");   
                isTrue=true;
            }
        }catch(Exception ex){
        	ex.printStackTrace();
        }
        return isTrue;	
	}
}
