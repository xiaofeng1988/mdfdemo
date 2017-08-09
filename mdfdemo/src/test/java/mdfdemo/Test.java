package mdfdemo;

public class Test implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4262539607702924187L;
	/**
	 * 
	 */
	
	private static Test t = new Test();
	private static int a;
	private static int b = 0;
	
	private Test(){
		
		a++;
		b++;
		
	}

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
      
		String aaa="";
		System.out.println(a);
		System.out.println(b);
		
		
//	    System.out.println(a);
	    
//	    String a=String.valueOf(111);
//	    String b="222";
//	    System.out.println("a:"+a.hashCode());
//	    System.out.println("b:"+b.hashCode());
	    
	    
		
	}

}
