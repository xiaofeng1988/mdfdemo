package helloapi;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.Map;

import com.longruan.zmsys.models.Student;

public class NumTest {

	private static int []arr = new int[10001];
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

//    for(int i=0;i<100;i++){
//    	System.out.println((i+"").hashCode());
//    }
		Map<String, Object> mm = new HashMap<String, Object>();
		mm.put("a", "aaaaa aaaaa");
		mm.put("bbb", "bbb xiaofeng");
		mm.put("biao", "hello xiaofeng");
		mm.put("ccc", "ccc xiaofeng");
		mm.put("ddd", "dddd xiaofeng");
		
		String key ="a";
		int hash = hash(key.hashCode());  
		int i = indexFor(hash, mm.size()); 
		System.out.println(key+":"+i+":"+mm.get(key));
		
		String key1 ="bbb";
		int hash1 = hash(key1.hashCode());  
		int i1 = indexFor(hash1, mm.size()); 
		System.out.println(key1+":"+i1+":"+mm.get(key1));
   
		System.out.println(9^6^7^8 );
    
    
	}
	
	static int hash(int h) {  
	    // This function ensures that hashCodes that differ only by  
	    // constant multiples at each bit position have a bounded  
	    // number of collisions (approximately 8 at default load factor).  
	    h ^= (h >>> 20) ^ (h >>> 12);  
	    return h ^ (h >>> 7) ^ (h >>> 4);  
	}  
	  
	/** 
	 * Returns index for hash code h. 
	 */  
	static int indexFor(int h, int length) {  
	    return h & (length-1);  
	}  

}
