package helloapi;

public class ThreadOne implements Runnable {

	
	 private volatile int ticket = 10;
	 
	    public void run() {
	        while (ticket > 0) {
	            ticket--;
	            System.out.println("当前票数为：" + ticket);
	        }
	    }
	




}
