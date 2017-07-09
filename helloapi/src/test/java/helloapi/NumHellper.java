package helloapi;

import java.util.HashMap;
import java.util.Map;

public class NumHellper {
	
	private static Map<String ,  Object> tMap = null;
	
	public NumHellper(){
		System.out.println("构造函数...");
	}
	
	static{
		if(tMap == null){
			tMap = new HashMap<String,Object>();
		}
		
	}
	
	
	
	public void numCount(int []arr){
		
		long startTime=System.currentTimeMillis();
		System.out.println(startTime);
		int x = 18898;
		int startIndex=0; //开始索引
		int endIndex = arr.length-1; //结束索引
		while(true){
			int middle = (startIndex+endIndex)/2;
			if(x < arr[middle] ){  //左侧
				endIndex = middle -1;
			}else if(x > arr[middle] ){ //右侧
				startIndex = middle + 1;
			}else{
				System.out.println(arr[middle]);
				break;
			}
		}
		System.out.println(System.currentTimeMillis());
		System.out.println("耗时：" + (System.currentTimeMillis()-startTime));
	}

}
