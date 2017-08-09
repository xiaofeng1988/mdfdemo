function getChinaExcelObject(divid){
	var obChinaExcel=document.getElementById(divid);
	//注册ChinaExcel
	obChinaExcel.SetPath("/zmsys");//此处参数是配置IIS下网站名称
	obChinaExcel.Login("北京龙软科技股份有限公司","1624f38e25f0561cd9dfe9315b13598e","北京龙软科技股份有限公司");
	return obChinaExcel;
}
//实现报表打开的操作
function setInit(strTab){
    var obChinaExcel=document.getElementById('ChinaExcel');
    obChinaExcel.ReadHttpFile(strTab);
}

//实现报表数据录入提交操作
function SaveData(){
	var strData;
	var obChinaExcel=document.getElementById('ChinaExcel');
	strData = obChinaExcel.ExportSaveDBData();
	document.form1.txtSaveData.value = strData;
	if (document.form1.txtSaveData.value==""){
		alert("ExportSaveDBData输出为空");
	}else{
		alert(document.form1.txtSaveData.value);
		document.form1.submit();
	}

}

//实现计算
function Calculate(){
    var obChinaExcel=document.getElementById('ChinaExcel');
    obChinaExcel.DesignMode = false;
    obChinaExcel.ReCalculate();
//    obChinaExcel.FormProtect = true;
}

//页面加载显示报表
function OnLoad(strTab){
    SetInit(strTab);
    Calculate();
}

//实现报表自定义向导
function Wizard(){
    var obChinaExcel=document.getElementById('ChinaExcel');
    obChinaExcel.UserFunctionGuide();
}

//返回最近一次计算之前的状态
function retDesgin(){
    var obChinaExcel=document.getElementById('ChinaExcel');
    obChinaExcel.RestoreAfterCalculate();
}

//关于打印设置
function PrintSetup(){
    var obChinaExcel=document.getElementById('ChinaExcel');
    obChinaExcel.OnPrintSetup();
}

//打印文档
function FilePrint(){
    var obChinaExcel=document.getElementById('ChinaExcel');
    obChinaExcel.OnFilePrint();
}

//打印预览
function Preview(){
    var obChinaExcel=document.getElementById('ChinaExcel');
   obChinaExcel.OnFilePrintPreview();
}

//输出
function onFileSave(){
    var obChinaExcel=document.getElementById('ChinaExcel');
   obChinaExcel.onFileSave();
}

//帮助
function Help(){
    var obChinaExcel=document.getElementById('ChinaExcel');
   obChinaExcel.AboutBox();
}

