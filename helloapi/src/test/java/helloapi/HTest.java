package helloapi;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;





public class HTest implements Serializable{
	
	
	
	static class MyClass implements Serializable{
		
		private MyClass(){
			System.out.println("aaa");
		}
		
		public String dosoString(){
			System.out.println("ppp");
			return null;
		}
		
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// A线程检测B线程变量i
	
//		   Ticket t = new Ticket();
//	        new Thread(t).start();
//	        new Thread(t).start();
		
		int a=1;
	    Integer b =1;
	    System.out.println(a==b);
	    System.out.println(b.equals(a));
	 
	    
	    
	    }
	
		
	}

	class Ticket implements Runnable {
		 
	    private int ticket = 10;
	 
	    public void run() {
	        while (ticket > 0) {
	            ticket--;
	            System.out.println("当前票数为：" + ticket);
	        }
	 
	    }

	
}
