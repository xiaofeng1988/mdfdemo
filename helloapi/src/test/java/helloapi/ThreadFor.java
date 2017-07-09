package helloapi;

public class ThreadFor implements Runnable {
	
	public static int i=0;
	
	public static void main(String[] args) throws InterruptedException {
		
		Thread t=new Thread(new ThreadFor());
		t.start();
		
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true){
			System.out.println(i);
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		
	}

}
