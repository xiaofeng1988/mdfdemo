Ext.require([
    'Ext.grid.*',
    'Ext.toolbar.Paging',
    'Ext.util.*',
    'Ext.data.*',
    'Ext.chart.*'
]);
/*
这个方法四个参数分别是
row:合并起始行
col:合并起始列.这两个参数是为了定位,要从哪个单元格开始合并.
type:是要合并行或者列.
num:是要合并的数量

//==>监听load , 执行合并单元格
grid.getStore().on('load', function () {
span(grid, 0, 0, 'row', 5);
});
*/
var span = function (grid, row, col, type, num) {
    switch (type) {
        case 'row':
            tds = Ext.get(grid.view.getNode(row)).query('td');
            Ext.get(tds[col]).set({ rowspan: num });
            Ext.get(Ext.get(tds[col])).setStyle({ 'vertical-align': 'middle' });
            for (i = row + 1; i < row + num; i++) {
                Ext.get(Ext.get(grid.view.getNode(i)).query('td')[col]).destroy();
            }
            break;
        case 'col':
            tds = Ext.get(grid.view.lockedView.getNode(row)).query('td');
            Ext.get(tds[col]).set({ colspan: num });
            break;
    }
};
//小于0的数值飘红
function checknum(val){
	if(val < 0){   
	　	return '<font size="2"><span style="color:red;">' + val + '</span></font>';   
	}   
	return '<font size="2">'+val+'</font>'; 
}

//创建 store
var store = Ext.create('Ext.data.Store', {
    fields: ["item", "unit", "monthPlan", "monthComplete", "monthOver", "monthProgress",
         "yearPlan", "yearComplete", "yearOver", "yearProgress"],
    pageSize: 20,  
    //是否在服务端排序 （true的话，在客户端就不能排序）
    remoteSort: false,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'js/extjs/generalInformation/productionQuotasData.json',
        reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
            type: 'json', //返回数据类型为json格式
            root: 'rows',  //数据
            totalProperty: 'total' //数据总条数
        }
    },
    /*sorters: [{
        //排序字段。
        property: 'ordeId',
        //排序类型，默认为 ASC 
        direction: 'desc'
    }],*/
    autoLoad: true  //即时加载数据
});

//var sm = new Ext.selection.CheckboxModel({mode:'SINGLE'});
//创建Grid
function createProductionQuotasGrid(){
	var gridwidth=document.body.scrollWidth;//获取网页宽度
	gridwidth=(gridwidth-200)*0.6;
	//return productionQuotasGrid = Ext.create('Ext.grid.Panel',{
	return  new Ext.grid.Panel({
		id:'productionQuotasGrid',
	    store: store,
	    //selModel: new Ext.selection.CheckboxModel({mode:'SINGLE'}),
	    selModel: {  
			mode:'SINGLE',
            selType:'checkboxmodel'
        },  
	    disableSelection: false,//值为TRUE，表示禁止选择行
	    //viewConfig: { forceFit:true },
	    //forceFit: true,
	    columnLines: true,
	    border:'2 2 2 2',
	    columns: [
	              /*{text:"项目", width: 120,dataIndex:'item', sortable: false,
	            	  renderer:function(value) {
	            	  	return '<font size="2">' + value + '</font>';
	            	  }
	               },
	              {text:"单位", width: 75,dataIndex:'unit', sortable: false,
		            	  renderer:function(value) {
	            	  	return '<font size="2">' + value + '</font>';
	            	  }},
	        {
	            text:"月累计完成",
	            columns:[
	                {text: "计划", width: 75, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
	                {text: "完成", width: 75, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
	                {text: "超欠 +.-", width: 77, dataIndex: 'monthOver', sortable: false,renderer: checknum},
	                {text: "进度", width: 75, dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
	        },
	        {
	            text:"年累计完成",
	            columns:[
	                {text: "计划", width: 75, dataIndex: 'yearPlan', sortable: false,renderer: checknum},
	                {text: "完成", width: 75, dataIndex: 'yearComplete', sortable: false,renderer: checknum},
	                {text: "超欠 +.-", width: 77, dataIndex: 'yearOver', sortable: false,renderer: checknum},
	                {text: "进度", width: 75, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
	        }*/
	        {text:"项目",width:gridwidth*0.17,dataIndex:'item', sortable: false,
	            	  renderer:function(value) {
	            	  	return '<font size="2">' + value + '</font>';
	            	  }
	               },
            {text:"单位",width:gridwidth*0.1, dataIndex:'unit', sortable: false,
            	  renderer:function(value) {
        	  	return '<font size="2">' + value + '</font>';
        	  }},
	        {
	            text:"月累计完成",
	            columns:[
	                {text: "计划",width:gridwidth*0.1, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
	                {text: "完成",width:gridwidth*0.1, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
	                {text: "超欠 +.-",width:gridwidth*0.1,dataIndex: 'monthOver', sortable: false,renderer: checknum},
	                {text: "进度",width:gridwidth*0.1,dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
	        },
	        {
	            text:"年累计完成",
	            columns:[
	                {text: "计划",width:gridwidth*0.12,dataIndex: 'yearPlan', sortable: false,renderer: checknum},
	                {text: "完成",width:gridwidth*0.12,dataIndex: 'yearComplete', sortable: false,renderer: checknum},
	                {text: "超欠 +.-",width:gridwidth*0.12,dataIndex: 'yearOver', sortable: false,renderer: checknum},
	                {text: "进度",width:gridwidth*0.12, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
	        }
	        
	    ],
	    loadMask: true,
	    //renderTo: 'demo',
	    viewConfig: {
	        //id: 'gv',
	        //trackOver: false,
	        //stripeRows: false,
	        forceFit: false,
	        //width:800,
	        width:gridwidth,
	        height:380,
	        autoScroll:true
	    },
	    bbar: Ext.create('Ext.PagingToolbar', {
	        store: store,
	        displayInfo: true,
	        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	        emptyMsg: "没有数据"
	    }),
	    listeners:{
	    	select:function(row,record,index,eOpts){
	    		var proQuPanel=Ext.getCmp('productionQuotasChartPanel');
	    		/*var itemSize=proQuPanel.items.length;
	    		for(var i=0;i<itemSize;i++){
	    		     var x=proQuPanel.items.get(0);//每次删除时，只需删除组件数组中的首个组件即可
	    		     var array=Ext.query("*[for='"+x.id+"']");//获取组件数组中的子组件数组
	    		     Ext.removeNode(array[0]);//删除子节点，即label节点
	    		     proQuPanel.remove(x,true);//删除节点
	    		}*/
	    		//proQuPanel.removeAll();
	    		for(i=1;i<=13;i++){
	    			if(undefined != Ext.getCmp('proPanel'+i)){
	    				Ext.getCmp('proPanel'+i).setVisible(false);
	    			}
	    		}
		    	switch(index)
		    	{
		    	case 0:
		    		proPanel1.setVisible(true);
		    		break;
		    	case 1:
		    		proPanel2.setVisible(true);
		    		break;
		    	case 2:
		    		proPanel3.setVisible(true);
		    		break;
		    	case 3:
		    		proPanel4.setVisible(true);
		    		break;
		    	case 4:
		    		proPanel5.setVisible(true);
		    		break;
		    	case 5:
		    		proPanel6.setVisible(true);
		    		break;
		    	case 6:
		    		proPanel7.setVisible(true);
		    		break;
		    	case 7:
		    		proPanel8.setVisible(true);
		    		break;
		    	case 8:
		    		//合并行
		    		methanolGrid.getStore().on('load', function () {
		    			span(methanolGrid, 0, 0, 'row', 2);
		    			span(methanolGrid, 2, 0, 'row', 2);
		    			span(methanolGrid, 4, 0, 'row', 2);
		    		});
		    		//不能使用autoLoad，必须合并完后load
		    		methanolGrid.getStore().load();
		    		proPanel9.setVisible(true);
		    		break;
		    	case 9:
		    		//合并行
		    		ureaGrid.getStore().on('load', function () {
		    			span(ureaGrid, 0, 0, 'row', 2);
		    			span(ureaGrid, 2, 0, 'row', 2);
		    			span(ureaGrid, 4, 0, 'row', 2);
		    		});
		    		//不能使用autoLoad，必须合并完后load
		    		ureaGrid.getStore().load();
		    		proPanel10.setVisible(true);
		    		break;
		    	case 10:
		    		proPanel11.setVisible(true);
		    		break;
		    	case 11:
		    		proPanel12.setVisible(true);
		    		break;
		    	case 12:
		    		proPanel13.setVisible(true);
		    		break;
		    	default:
		    	  
		    	}
		    	proQuPanel.doLayout();
	    	}/*,
	    	collapse:function(panel , eOpts){
	    		
	    	}*/
	    	,afterrender : function(grid) {
                var elments = Ext.select(".x-column-header",true);//.x-grid3-hd  
                elments.each(function(el) {  
                                el.setStyle("font", 'bold 13px/2em "宋体",Arial,Times');
                                el.setStyle("color", 'black');  
                                el.setStyle("background", '#DBE6F4');
                        }, this);  
                var elments2 = Ext.select(".x-grid3-hd",true);//.x-grid3-hd  
                elments2.each(function(el) {  
                                el.setStyle("font", 'bold 13px/2em "宋体",Arial,Times');
                                el.setStyle("color", 'black');  
                                el.setStyle("background", '#DBE6F4');
                        }, this);  
                /*var elments2 = Ext.select(".x-grid-cell",true);
                elments2.each(function(el) {  
                    //el.setStyle("font", '16px/20px arial,sans-serif');
                	el.setStyle("font-size", '13px');
                }, this);*/ 
           }
	    }
	});
}
//创建主要生产指标完成情况 print Grid
/*function createPrintProductionQuotasGrid(){
	//return productionQuotasGrid = Ext.create('Ext.grid.Panel',{
	return  new Ext.grid.Panel({
		id:'printProductionQuotasGrid',
	    //store: printProductionQuotasStore,
		store:store,
		selModel: {  
			mode:'SINGLE',
            selType:'checkboxmodel'  
        }, 
	    disableSelection: true,//值为TRUE，表示禁止选择行
	    columnLines: true,
	    border:'2 2 2 2',
	    columns: [
	              {text:"项目", width: 120,dataIndex:'item', sortable: false},
	              {text:"单位", width: 60,dataIndex:'unit', sortable: false},
	        {
	            text:"月累计完成",
	            columns:[
	                {text: "计划", width: 60, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
	                {text: "完成", width: 60, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
	                {text: "超欠 +.-", width: 60, dataIndex: 'monthOver', sortable: false,renderer: checknum},
	                {text: "进度", width: 60, dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
	        },
	        {
	            text:"年累计完成",
	            columns:[
	                {text: "计划", width: 60, dataIndex: 'yearPlan', sortable: false,renderer: checknum},
	                {text: "完成", width: 60, dataIndex: 'yearComplete', sortable: false,renderer: checknum},
	                {text: "超欠 +.-", width: 60, dataIndex: 'yearOver', sortable: false,renderer: checknum},
	                {text: "进度", width: 60, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
	        }
	        
	    ],
	    loadMask: true,
	    //renderTo: 'demo',
	    viewConfig: {
	        //id: 'gv',
	        //trackOver: false,
	        //stripeRows: false,
	        forceFit: false,
	        width:800,
	        height:380,
	        autoScroll:true
	    },
	    bbar: Ext.create('Ext.PagingToolbar', {
	        store: store,
	        displayInfo: true,
	        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	        emptyMsg: "没有数据"
	    }),
	    listeners:{
	    	select:function(row,record,index,eOpts){
	    		var proQuPanel=Ext.getCmp('productionQuotasChartPanel');
	    		//proQuPanel.removeAll();
	    		for(i=1;i<=13;i++){
	    			if(undefined != Ext.getCmp('proPanel'+i)){
	    				Ext.getCmp('proPanel'+i).setVisible(false);
	    			}
	    		}
		    	switch(index)
		    	{
		    	case 0:
		    		proPanel1.setVisible(true);
		    		break;
		    	case 1:
		    		proPanel2.setVisible(true);
		    		break;
		    	case 2:
		    		proPanel3.setVisible(true);
		    		break;
		    	case 3:
		    		proPanel4.setVisible(true);
		    		break;
		    	case 4:
		    		proPanel5.setVisible(true);
		    		break;
		    	case 5:
		    		proPanel6.setVisible(true);
		    		break;
		    	case 6:
		    		proPanel7.setVisible(true);
		    		break;
		    	case 7:
		    		proPanel8.setVisible(true);
		    		break;
		    	case 8:
		    		//合并行
		    		methanolGrid.getStore().on('load', function () {
		    			span(methanolGrid, 0, 0, 'row', 2);
		    			span(methanolGrid, 2, 0, 'row', 2);
		    			span(methanolGrid, 4, 0, 'row', 2);
		    		});
		    		//不能使用autoLoad，必须合并完后load
		    		methanolGrid.getStore().load();
		    		proPanel9.setVisible(true);
		    		break;
		    	case 9:
		    		//合并行
		    		ureaGrid.getStore().on('load', function () {
		    			span(ureaGrid, 0, 0, 'row', 2);
		    			span(ureaGrid, 2, 0, 'row', 2);
		    			span(ureaGrid, 4, 0, 'row', 2);
		    		});
		    		//不能使用autoLoad，必须合并完后load
		    		ureaGrid.getStore().load();
		    		proPanel10.setVisible(true);
		    		break;
		    	case 10:
		    		proPanel11.setVisible(true);
		    		break;
		    	case 11:
		    		proPanel12.setVisible(true);
		    		break;
		    	case 12:
		    		proPanel13.setVisible(true);
		    		break;
		    	default:
		    	  
		    	}
		    	proQuPanel.doLayout();
	    	}
	    }
	});
}*/

var methStore = Ext.create('Ext.data.Store', {
    fields: ["item","item2", "unit", "monthPlan", "monthComplete", "monthOver", "monthProgress",
         "yearPlan", "yearComplete", "yearOver", "yearProgress"],
    pageSize: 20,  
    //是否在服务端排序 （true的话，在客户端就不能排序）
    remoteSort: false,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'js/extjs/generalInformation/productionQuotasMethanolData.json',
        reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
            type: 'json', //返回数据类型为json格式
            root: 'rows',  //数据
            totalProperty: 'total' //数据总条数
        }
    }
    //autoLoad: true  //即时加载数据
});
//甲醇grid
var methanolGrid = Ext.create('Ext.grid.Panel',{
	id:'methanolGrid',
    store: methStore,
    disableSelection: false,//值为TRUE，表示禁止选择行
    columnLines: true,
    columns: [
              {text:"项目",
            	  menuDisabled:true,
            	  columns:[
		              {text:"部门", width: 70,dataIndex:'item', sortable: false,menuDisabled:true,draggable:false,
		            	  renderer:function(value) {
		            	  	return '<font size="2">' + value + '</font>';
		            	  }},
		              {text:"产/销量", width: 60,dataIndex:'item2', sortable: false,menuDisabled:true,draggable:false,
			            	  renderer:function(value) {
			            	  	return '<font size="2">' + value + '</font>';
			            	  }}
		          ]
		       },
              {text:"单位", width: 60,dataIndex:'unit', sortable: false,
	            	  renderer:function(value) {
           	  	return '<font size="2">' + value + '</font>';
           	  }},
        {
            text:"月累计完成",
            columns:[
                {text: "计划", width: 60, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 60, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'monthOver', sortable: false,renderer: checknum},
                {text: "进度", width: 60, dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
        },
        {
            text:"年累计完成",
            columns:[
                {text: "计划", width: 60, dataIndex: 'yearPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 60, dataIndex: 'yearComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'yearOver', sortable: false,renderer: checknum},
                {text: "进度", width: 60, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
        }
        
    ],
    loadMask: true,
    viewConfig: {
        forceFit: false,
        width:580,
        height:120,
        autoScroll:true
    },
    bbar: Ext.create('Ext.PagingToolbar', {
        store: methStore,
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: "没有数据"
    }),
    listeners:{
    	afterrender : function(grid) {
	        var elments = Ext.select(".x-column-header",true);//.x-grid3-hd  
	        elments.each(function(el) {  
	                        el.setStyle("font", 'bold 13px/2em "宋体",Arial,Times');    
	                }, this);  
	        var elments2 = Ext.select(".x-grid-cell",true);
	        elments2.each(function(el) {  
	            el.setStyle("font", '13px/20px arial,sans-serif');    
	        }, this); 
    	}
    }
});
var blStore = Ext.create('Ext.data.Store', {
    fields: ["item", "unit", "monthPlan", "monthComplete", "monthOver", "monthProgress",
         "yearPlan", "yearComplete", "yearOver", "yearProgress"],
    pageSize: 20,  
    //是否在服务端排序 （true的话，在客户端就不能排序）
    remoteSort: false,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'js/extjs/generalInformation/productionQuotasBlData.json',
        reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
            type: 'json', //返回数据类型为json格式
            root: 'rows',  //数据
            totalProperty: 'total' //数据总条数
        }
    },
    autoLoad: true  //即时加载数据
});
//剥离grid
var blGrid = Ext.create('Ext.grid.Panel',{
	id:'blGrid',
    store: blStore,
    disableSelection: false,//值为TRUE，表示禁止选择行
    columnLines: true,
    columns: [

		      {text:"项目", width: 110,dataIndex:'item', sortable: false,menuDisabled:true,draggable:false,
            	  renderer:function(value) {
          	  	return '<font size="2">' + value + '</font>';
          	  }},
              {text:"单位", width: 50,dataIndex:'unit', sortable: false,
            	  renderer:function(value) {
          	  	return '<font size="2">' + value + '</font>';
          	  }},
        {
            text:"月累计完成",
            columns:[
                {text: "计划", width: 50, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 50, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'monthOver', sortable: false,renderer: checknum},
                {text: "进度", width: 50, dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
        },
        {
            text:"年累计完成",
            columns:[
                {text: "计划", width: 50, dataIndex: 'yearPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 50, dataIndex: 'yearComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'yearOver', sortable: false,renderer: checknum},
                {text: "进度", width: 50, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
        }
        
    ],
    loadMask: true,
    viewConfig: {
        forceFit: false,
        width:580,
        height:140,
        autoScroll:true
    },
    bbar: Ext.create('Ext.PagingToolbar', {
        store: blStore,
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: "没有数据"
    }),
    listeners:{
    	afterrender : function(grid) {
	        var elments = Ext.select(".x-column-header",true);//.x-grid3-hd  
	        elments.each(function(el) {  
	                        el.setStyle("font", 'bold 13px/2em "宋体",Arial,Times');    
	                }, this);  
	        var elments2 = Ext.select(".x-grid-cell",true);
	        elments2.each(function(el) {  
	            el.setStyle("font", '13px/20px arial,sans-serif');    
	        }, this); 
    	}
    }
});
var kjsgStore = Ext.create('Ext.data.Store', {
    fields: ["item", "unit", "monthPlan", "monthComplete", "monthOver", "monthProgress",
         "yearPlan", "yearComplete", "yearOver", "yearProgress"],
    pageSize: 20,  
    //是否在服务端排序 （true的话，在客户端就不能排序）
    remoteSort: false,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'js/extjs/generalInformation/productionQuotasKjsgData.json',
        reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
            type: 'json', //返回数据类型为json格式
            root: 'rows',  //数据
            totalProperty: 'total' //数据总条数
        }
    },
    autoLoad: true  //即时加载数据
});
//矿建施工成巷grid
var kjsgGrid = Ext.create('Ext.grid.Panel',{
	id:'kjsgGrid',
    store: kjsgStore,
    disableSelection: false,//值为TRUE，表示禁止选择行
    columnLines: true,
    columns: [

		      {text:"项目", width: 110,dataIndex:'item', sortable: false,menuDisabled:true,draggable:false,
            	  renderer:function(value) {
          	  	return '<font size="2">' + value + '</font>';
          	  }},
              {text:"单位", width: 50,dataIndex:'unit', sortable: false,
            	  renderer:function(value) {
          	  	return '<font size="2">' + value + '</font>';
          	  }},
        {
            text:"月累计完成",
            columns:[
                {text: "计划", width: 50, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 50, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'monthOver', sortable: false,renderer: checknum},
                {text: "进度", width: 50, dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
        },
        {
            text:"年累计完成",
            columns:[
                {text: "计划", width: 50, dataIndex: 'yearPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 50, dataIndex: 'yearComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 50, dataIndex: 'yearOver', sortable: false,renderer: checknum},
                {text: "进度", width: 50, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
        }
        
    ],
    loadMask: true,
    viewConfig: {
        forceFit: false,
        width:580,
        height:140,
        autoScroll:true
    },
    bbar: Ext.create('Ext.PagingToolbar', {
        store: kjsgStore,
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: "没有数据"
    }),
    listeners:{
    	afterrender : function(grid) {
	        var elments = Ext.select(".x-column-header",true);//.x-grid3-hd  
	        elments.each(function(el) {  
	                        el.setStyle("font", 'bold 13px/2em "宋体",Arial,Times');    
	                }, this);  
	        var elments2 = Ext.select(".x-grid-cell",true);
	        elments2.each(function(el) {  
	            el.setStyle("font", '13px/20px arial,sans-serif');    
	        }, this); 
    	}
    }
});
//尿素grid
var ureaStore = Ext.create('Ext.data.Store', {
    fields: ["item","item2", "unit", "monthPlan", "monthComplete", "monthOver", "monthProgress",
         "yearPlan", "yearComplete", "yearOver", "yearProgress"],
    pageSize: 20,  
    //是否在服务端排序 （true的话，在客户端就不能排序）
    remoteSort: false,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'js/extjs/generalInformation/productionQuotasUreaData.json',
        reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
            type: 'json', //返回数据类型为json格式
            root: 'rows',  //数据
            totalProperty: 'total' //数据总条数
        }
    }
    //autoLoad: true  //即时加载数据
});
var ureaGrid = Ext.create('Ext.grid.Panel',{
	id:'ureaGrid',
    store: ureaStore,
    disableSelection: false,//值为TRUE，表示禁止选择行
    columnLines: true,
    columns: [
              {text:"项目",
            	  menuDisabled:true,
            	  columns:[
		              {text:"部门", width: 70,dataIndex:'item', sortable: false,menuDisabled:true,draggable:false,
		            	  renderer:function(value) {
		            	  	return '<font size="2">' + value + '</font>';
		            	  }},
		              {text:"产/销量", width: 60,dataIndex:'item2', sortable: false,menuDisabled:true,draggable:false,
			            	  renderer:function(value) {
			            	  	return '<font size="2">' + value + '</font>';
			            	  }}
		          ]
		       },
              {text:"单位", width: 60,dataIndex:'unit', sortable: false,
	            	  renderer:function(value) {
           	  	return '<font size="2">' + value + '</font>';
           	  }},
        {
            text:"月累计完成",
            columns:[
                {text: "计划", width: 60, dataIndex: 'monthPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 60, dataIndex: 'monthComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'monthOver', sortable: false,renderer: checknum},
                {text: "进度", width: 60, dataIndex: 'monthProgress', sortable: false,renderer: checknum}]
        },
        {
            text:"年累计完成",
            columns:[
                {text: "计划", width: 60, dataIndex: 'yearPlan', sortable: false,renderer: checknum},
                {text: "完成", width: 60, dataIndex: 'yearComplete', sortable: false,renderer: checknum},
                {text: "超欠 +.-", width: 60, dataIndex: 'yearOver', sortable: false,renderer: checknum},
                {text: "进度", width: 60, dataIndex: 'yearProgress', sortable: false,renderer: checknum}]
        }
        
    ],
    loadMask: true,
    viewConfig: {
        forceFit: false,
        width:580,
        height:140,
        autoScroll:true
    },
    bbar: Ext.create('Ext.PagingToolbar', {
        store: ureaStore,
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: "没有数据"
    }),
    listeners:{
    	afterrender : function(grid) {
	        var elments = Ext.select(".x-column-header",true);//.x-grid3-hd  
	        elments.each(function(el) {  
	                        el.setStyle("font", 'bold 13px/2em "宋体",Arial,Times');    
	                }, this);  
	        var elments2 = Ext.select(".x-grid-cell",true);
	        elments2.each(function(el) {  
	            el.setStyle("font", '13px/20px arial,sans-serif');    
	        }, this); 
    	}
    }
});

/*********************以下是图表***************************/
/*var chartStore1 = Ext.create('Ext.data.Store',{
    fields:['deptname','value1','value2'],
    proxy:{
         type:'ajax',
         url: 'js/extjs/generalInformation/productionQuotasChart1.json',
         reader:{
              type:'json',
              root:'rows'
         }
    },
    autoLoad: true  //即时加载数据
});*/
var chartStore1 = Ext.create('Ext.data.JsonStore', {
	fields:['deptname','value1','value2'],
	data:[{"deptname":"集团公司","value1":5560.27,"value2":5640.17},{"deptname":"平朔公司","value1":3495.58,"value2":3502.56},{"deptname":"进出口公司","value1":709.27,"value2":716.14},{"deptname":"中煤华昱公司","value1":509.33,"value2":519.95},{"deptname":"大屯公司","value1":306.93,"value2":342.71},{"deptname":"中煤华晋","value1":239.44,"value2":256.10},{"deptname":"龙化公司","value1":96.43,"value2":113.89},{"deptname":"中煤建公司","value1":34.33,"value2":34.21},{"deptname":"陕西公司","value1":125.90,"value2":103.55},{"deptname":"鄂尔多斯分公司","value1":35.87,"value2":44.35},{"deptname":"中天合创公司","value1":7.18,"value2":6.69}]
});
var chartStore2 = Ext.create('Ext.data.JsonStore', {
	fields:['deptname','value1','value2'],
	data:[{"deptname":"集团公司","value1":4137.93,"value2":4238.32},{"deptname":"平朔公司","value1":2522.83,"value2":2618.51},{"deptname":"进出口公司","value1":630.90,"value2":608.87},{"deptname":"中煤华昱公司","value1":340.92,"value2":305.12},{"deptname":"大屯公司","value1":235.83,"value2":283.09},{"deptname":"中煤华晋","value1":187.12,"value2":204.23},{"deptname":"龙化公司","value1":96.57,"value2":100.27},{"deptname":"中煤建公司","value1":22.43,"value2":23.58},{"deptname":"陕西公司","value1":70.53,"value2":51.44},{"deptname":"鄂尔多斯分公司","value1":32.43,"value2":43.23}]
});
var chartStore3 = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1','value2'],
	data:[{"date":"2013.10","value1":27,"value2":22},{"date":"2013.11","value1":23,"value2":5},{"date":"2013.12","value1":26,"value2":21},{"date":"2014.01","value1":28,"value2":25},{"date":"2014.02","value1":28,"value2":21},{"date":"2014.03","value1":31,"value2":27},{"date":"2014.04","value1":37,"value2":27},{"date":"2014.05","value1":31,"value2":24},{"date":"2014.06","value1":34,"value2":26},{"date":"2014.07","value1":27,"value2":23},{"date":"2014.08","value1":28,"value2":24},{"date":"2014.09","value1":29,"value2":28},{"date":"2014.10","value1":32,"value2":24}]
});
var chartStore8 = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1'],
	data:[{"date":"2013.10","value1":1260},{"date":"2013.11","value1":1060},{"date":"2013.12","value1":1100},{"date":"2014.01","value1":1400},{"date":"2014.02","value1":1350},{"date":"2014.03","value1":1500},{"date":"2014.04","value1":1020},{"date":"2014.05","value1":1520},{"date":"2014.06","value1":1200},{"date":"2014.07","value1":1300},{"date":"2014.08","value1":1150},{"date":"2014.09","value1":1180},{"date":"2014.10","value1":1100}]
});
var chartStore9 = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1','value2','value3'],
	data:[{"date":"2014.1","value1":2950,"value2":2300,"value3":2850},{"date":"2014.2","value1":2610,"value2":2300,"value3":3002},{"date":"2014.3","value1":2580,"value2":2050,"value3":2780},{"date":"2014.4","value1":2500,"value2":2000,"value3":2750}]
});
var chartStore12 = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1'],
	data:[{"date":"2013.10","value1":61000},{"date":"2013.11","value1":59000},{"date":"2013.12","value1":63000},{"date":"2014.01","value1":51000},{"date":"2014.02","value1":65000},{"date":"2014.03","value1":40000},{"date":"2014.04","value1":32000},{"date":"2014.05","value1":55000},{"date":"2014.06","value1":58000},{"date":"2014.07","value1":43000},{"date":"2014.08","value1":49000},{"date":"2014.09","value1":56000},{"date":"2014.10","value1":54000}]
});
var chartStore13 = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1'],
	data:[{"date":"2013.10","value1":45000},{"date":"2013.11","value1":33000},{"date":"2013.12","value1":38000},{"date":"2014.01","value1":39600},{"date":"2014.02","value1":41000},{"date":"2014.03","value1":42300},{"date":"2014.04","value1":32000},{"date":"2014.05","value1":45000},{"date":"2014.06","value1":28000},{"date":"2014.07","value1":34000},{"date":"2014.08","value1":41000},{"date":"2014.09","value1":23000},{"date":"2014.10","value1":21000}]
});
//右边显示的panel
var proPanel1=Ext.create('Ext.panel.Panel',{
    //xtype: "panel",
    //html: "子元素1",
	id:'proPanel1',
	itemId:'proPanel1',
    anchor: '100% 33%',
    items: [{  
        id: 'chartCmp1',  
        xtype: 'chart',  
        //width:730,
        width:440,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '集团公司原煤产量完成情况图(单位:万吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            //x : 730/2-100, //the sprite x position
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
        animate: true,  
        shadow: true,  
        store: chartStore1, 
        legend: {   //默认在下侧显示图例
            position: 'bottom'
        },
        axes: [{    //定义坐标轴
            type: 'Numeric',    //坐标轴数据类型为数据
            position: 'left',    //左侧、纵坐标
            fields: ['value1','value2'],    //该坐标轴对应设置的store中的某个Field
            label: {    //格式化坐标轴上刻度数据显示
                renderer: Ext.util.Format.numberRenderer('0')    //格式化为整数
            },
            title: false,    //坐标轴名称
            grid: true,    //是否在图表上显示横向网格
            minimum: 0    //纵坐标最小值，最大值对应为maximum
        }, {
            type: 'Category',    //坐标轴类型
            position: 'bottom',    //表示为横坐标
            fields: ['deptname'],    //对应monthStore中的Field
            title: false,    //不显示坐标轴名称
            label: {font: 'bold 12px Arial',rotate: { degrees: 270}}
        }],  
        series: [{    //数据，一个series子项表示一组可展示的数据（曲线图为一条曲线，柱状图为一组柱子。。）
            type: 'column',    //表示该组数据以柱状图方式显示
            groupGutter:1,//组条间距
            gutter:10,//条间距
            title:['进度计划','累计完成'],//不设置title，图例(legend)显示 value1,value2
            //label:{font: 'bold 5px Arial'},
            seriesStyles: {
                mode: 'stretch',
                size: 12    //column item's width
            },
            axis: 'left',    //绑定数据对应的坐标轴，默认值为"left"，如果绑定bottom，则显示为横向的柱状图
            style: {    //柱子显示样式
                opacity: 0.85,    //透明度
                //fill: '#8CC81E'    //填充颜色
            },
            highlightCfg: {    //该配置参数API文档中没有说明，不过官方例子里有，为高亮状态的样式
                opacity: 0.85,    //透明度
                //fill: '#f0fea5'    //填充颜色
            },
            label: {    //柱子上数值的显示样式，具体属性可参考API
                display: 'insideEnd',    //表明Label显示的位置
                //'text-anchor': 'middle',    //对齐方案
                orientation:'vertical',
                field: ['value1','value2'],    //the name of field to displayed in the label, default value: 'name'
                //renderer: labelRender,    //显示Label的格式化函数
                orientation: 'vertical',    //水平显示
                color: '#333'    //Label颜色
                //font: 'bold 5px Arial'
            },
            listeners: {    //为柱状图添加click事件，没有专门的click事件，使用mouseup替代
                'itemmouseup': function(item) {
                    selectMonthItem(item);    //处理选中某一个Item的自定义函数
                }
            },
            xField: 'deptname',    //xField
            yField: ['value1','value2']    //yField
        }]  
    }]
});
function createProPanel1(visible){
	return Ext.create('Ext.panel.Panel',{
	    //xtype: "panel",
	    //html: "子元素1",
		id:'pproPanel1',
		//itemId:'proPanel1',
	    anchor: '100% 33%',
	    hidden:visible,
	    items: [{  
	        //id: 'chartCmp1',  
	        xtype: 'chart',  
	        width:730,
	        height:380,
	        items: [{
	        	//itemid:'chartTitle',
	            type  : 'text',
	            text  : '集团公司原煤产量完成情况图(单位:万吨)',
	            font  : 'bold 14px Arial',
	            width : 150,
	            height: 30,
	            x : 730/2-100, //the sprite x position
	            y : 10  //the sprite y position
	         }],
	        animate: true,  
	        shadow: true,  
	        store: chartStore1, 
	        legend: {   //默认在下侧显示图例
	            position: 'bottom'
	        },
	        axes: [{    //定义坐标轴
	            type: 'Numeric',    //坐标轴数据类型为数据
	            position: 'left',    //左侧、纵坐标
	            fields: ['value1','value2'],    //该坐标轴对应设置的store中的某个Field
	            label: {    //格式化坐标轴上刻度数据显示
	                renderer: Ext.util.Format.numberRenderer('0')    //格式化为整数
	            },
	            title: false,    //坐标轴名称
	            grid: true,    //是否在图表上显示横向网格
	            minimum: 0    //纵坐标最小值，最大值对应为maximum
	        }, {
	            type: 'Category',    //坐标轴类型
	            position: 'bottom',    //表示为横坐标
	            fields: ['deptname'],    //对应monthStore中的Field
	            title: false,    //不显示坐标轴名称
	            label: {font: 'bold 9px Arial'}
	        }],  
	        series: [{    //数据，一个series子项表示一组可展示的数据（曲线图为一条曲线，柱状图为一组柱子。。）
	            type: 'column',    //表示该组数据以柱状图方式显示
	            groupGutter:1,//组条间距
	            gutter:10,//条间距
	            title:['进度计划','累计完成'],//不设置title，图例(legend)显示 value1,value2
	            //label:{font: 'bold 5px Arial'},
	            seriesStyles: {
	                mode: 'stretch',
	                size: 12    //column item's width
	            },
	            axis: 'left',    //绑定数据对应的坐标轴，默认值为"left"，如果绑定bottom，则显示为横向的柱状图
	            style: {    //柱子显示样式
	                opacity: 0.85,    //透明度
	                //fill: '#8CC81E'    //填充颜色
	            },
	            highlightCfg: {    //该配置参数API文档中没有说明，不过官方例子里有，为高亮状态的样式
	                opacity: 0.85,    //透明度
	                //fill: '#f0fea5'    //填充颜色
	            },
	            label: {    //柱子上数值的显示样式，具体属性可参考API
	                display: 'insideEnd',    //表明Label显示的位置
	                //'text-anchor': 'middle',    //对齐方案
	                orientation:'vertical',
	                field: ['value1','value2'],    //the name of field to displayed in the label, default value: 'name'
	                //renderer: labelRender,    //显示Label的格式化函数
	                orientation: 'vertical',    //水平显示
	                color: '#333'    //Label颜色
	                //font: 'bold 5px Arial'
	            },
	            listeners: {    //为柱状图添加click事件，没有专门的click事件，使用mouseup替代
	                'itemmouseup': function(item) {
	                    selectMonthItem(item);    //处理选中某一个Item的自定义函数
	                }
	            },
	            xField: 'deptname',    //xField
	            yField: ['value1','value2']    //yField
	        }]  
	    }]
	});
}
var proPanel2=Ext.create('Ext.panel.Panel',{
    //xtype: "panel",
    //html: "子元素2",
	id:'proPanel2',
	itemId:'proPanel2',
    anchor: '100% 33%',
    items: [{  
        id: 'chartCmp2',  
        xtype: 'chart',  
        //width:730,
        width:440,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '集团公司商品煤产量完成情况图(单位:万吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
        //style: 'background:#000',  
        //labelTitle: { font: 'bold 14px Arial' },
        animate: true,  
        shadow: true,  
        store: chartStore2, 
        legend: {   //默认在下侧显示图例
            position: 'bottom'
        },
        axes: [{    //定义坐标轴
            type: 'Numeric',    //坐标轴数据类型为数据
            position: 'left',    //左侧、纵坐标
            fields: ['value1','value2'],    //该坐标轴对应设置的store中的某个Field
            label: {    //格式化坐标轴上刻度数据显示
                renderer: Ext.util.Format.numberRenderer('0')    //格式化为整数
            },
            title: false,    //坐标轴名称
            grid: true,    //是否在图表上显示横向网格
            minimum: 0    //纵坐标最小值，最大值对应为maximum
        }, {
            type: 'Category',    //坐标轴类型
            position: 'bottom',    //表示为横坐标
            fields: ['deptname'],    //对应monthStore中的Field
            title: false,    //不显示坐标轴名称
            label: {font: 'bold 12px Arial',rotate: { degrees: 270}}//X轴文字旋转270度
        }],  
        series: [{    //数据，一个series子项表示一组可展示的数据（曲线图为一条曲线，柱状图为一组柱子。。）
            type: 'column',    //表示该组数据以柱状图方式显示
            groupGutter:1,//组条间距
            gutter:10,//条间距
            title:['进度计划','累计完成'],//不设置title，图例(legend)显示 value1,value2
            //label:{font: 'bold 5px Arial'},
            seriesStyles: {
                mode: 'stretch',
                size: 12    //column item's width
            },
            axis: 'left',    //绑定数据对应的坐标轴，默认值为"left"，如果绑定bottom，则显示为横向的柱状图
            style: {    //柱子显示样式
                opacity: 0.85,    //透明度
                //fill: '#8CC81E'    //填充颜色
            },
            highlightCfg: {    //该配置参数API文档中没有说明，不过官方例子里有，为高亮状态的样式
                opacity: 0.85,    //透明度
                //fill: '#f0fea5'    //填充颜色
            },
            label: {    //柱子上数值的显示样式，具体属性可参考API
                display: 'insideEnd',    //表明Label显示的位置
                //'text-anchor': 'middle',    //对齐方案
                orientation:'vertical',
                field: ['value1','value2'],    //the name of field to displayed in the label, default value: 'name'
                //renderer: labelRender,    //显示Label的格式化函数
                orientation: 'vertical',    //水平显示
                color: '#333'    //Label颜色
                //font: 'bold 5px Arial'
            },
            listeners: {    //为柱状图添加click事件，没有专门的click事件，使用mouseup替代
                'itemmouseup': function(item) {
                    selectMonthItem(item);    //处理选中某一个Item的自定义函数
                }
            },
            xField: 'deptname',    //xField
            yField: ['value1','value2']    //yField
        }]  
    }]
});
//创建打印panel
function createProPanel2(visible){
	return Ext.create('Ext.panel.Panel',{
	    //xtype: "panel",
		id:'pproPanel2',
	    //html: "子元素2",
	    anchor: '100% 33%',
	    hidden:visible,
	    items: [{  
	        xtype: 'chart',  
	        width:730,
	        height:380,
	        items: [{
	        	itemid:'chartTitle',
	            type  : 'text',
	            text  : '集团公司商品煤产量完成情况图(单位:万吨)',
	            font  : 'bold 14px Arial',
	            width : 100,
	            height: 30,
	            x : 730/2-100, //the sprite x position
	            y : 10  //the sprite y position
	         }],
	        //style: 'background:#000',  
	        //labelTitle: { font: 'bold 14px Arial' },
	        animate: true,  
	        shadow: true,  
	        store: chartStore2, 
	        legend: {   //默认在下侧显示图例
	            position: 'bottom'
	        },
	        axes: [{    //定义坐标轴
	            type: 'Numeric',    //坐标轴数据类型为数据
	            position: 'left',    //左侧、纵坐标
	            fields: ['value1','value2'],    //该坐标轴对应设置的store中的某个Field
	            label: {    //格式化坐标轴上刻度数据显示
	                renderer: Ext.util.Format.numberRenderer('0')    //格式化为整数
	            },
	            title: false,    //坐标轴名称
	            grid: true,    //是否在图表上显示横向网格
	            minimum: 0    //纵坐标最小值，最大值对应为maximum
	        }, {
	            type: 'Category',    //坐标轴类型
	            position: 'bottom',    //表示为横坐标
	            fields: ['deptname'],    //对应monthStore中的Field
	            title: false,    //不显示坐标轴名称
	            label: {font: 'bold 9px Arial'}
	        }],  
	        series: [{    //数据，一个series子项表示一组可展示的数据（曲线图为一条曲线，柱状图为一组柱子。。）
	            type: 'column',    //表示该组数据以柱状图方式显示
	            groupGutter:1,//组条间距
	            gutter:10,//条间距
	            title:['进度计划','累计完成'],//不设置title，图例(legend)显示 value1,value2
	            //label:{font: 'bold 5px Arial'},
	            seriesStyles: {
	                mode: 'stretch',
	                size: 12    //column item's width
	            },
	            axis: 'left',    //绑定数据对应的坐标轴，默认值为"left"，如果绑定bottom，则显示为横向的柱状图
	            style: {    //柱子显示样式
	                opacity: 0.85,    //透明度
	                //fill: '#8CC81E'    //填充颜色
	            },
	            highlightCfg: {    //该配置参数API文档中没有说明，不过官方例子里有，为高亮状态的样式
	                opacity: 0.85,    //透明度
	                //fill: '#f0fea5'    //填充颜色
	            },
	            label: {    //柱子上数值的显示样式，具体属性可参考API
	                display: 'insideEnd',    //表明Label显示的位置
	                //'text-anchor': 'middle',    //对齐方案
	                orientation:'vertical',
	                field: ['value1','value2'],    //the name of field to displayed in the label, default value: 'name'
	                //renderer: labelRender,    //显示Label的格式化函数
	                orientation: 'vertical',    //水平显示
	                color: '#333'    //Label颜色
	                //font: 'bold 5px Arial'
	            },
	            listeners: {    //为柱状图添加click事件，没有专门的click事件，使用mouseup替代
	                'itemmouseup': function(item) {
	                    selectMonthItem(item);    //处理选中某一个Item的自定义函数
	                }
	            },
	            xField: 'deptname',    //xField
	            yField: ['value1','value2']    //yField
	        }]  
	    }]
	});
}
var proPanel3=Ext.create('Ext.panel.Panel',{
    //xtype: "panel",
    //html: "子元素3",
	id:'proPanel3',
	itemId:'proPanel3',
    anchor: '100% 33%',
    items: [{  
        id: 'chartCmp3',  
        xtype: 'chart',  
        //width:710,
        width:440,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '集团公司铁路外运量走势图(单位:万吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: chartStore3,
         shadow: true,
         //theme: 'Category1',
         legend: {
             position: 'bottom'
         },
         axes: [{
             type: 'Numeric',
             minimum: 0,
             position: 'left',
             fields: ['value1', 'value2'],
             minorTickSteps: 1,
             grid: true
         }, {
             type: 'Category',
             position: 'bottom',
             fields: ['date'],
             label: {rotate: { degrees: 270}}
         }],
         series: [{
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             title:'集团公司',
             axis: 'left',
             xField: 'date',
             yField: 'value1',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }, {
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             title:'平朔公司',
             axis: 'left',
             smooth: true,
             fill: true,
             xField: 'date',
             yField: 'value2',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }]  
    }]
});
var proPanel4=Ext.create('Ext.panel.Panel',{
	id:'proPanel4',
	itemId:'proPanel4',
	anchor:'100% 33%',
	items:[
	       {
	    	   xtype: "text",
	    	   width:440,
	           height:380,
	           padding:'40 5 0 20',
	    	   html: "<span style='text-align:center;font-size:18px'><bold>1-7日，集团公司煤炭贸易量完成449.45万吨，超计划29.9%，超销103.38万吨。其中销售公司自有贸易量完成233.79万吨，超计划25.3%，超销47.27万吨。</bold></span>"
	       }
	]
});
var proPanel6=Ext.create('Ext.panel.Panel',{
	id:'proPanel6',
	itemId:'proPanel6',
	anchor:'100% 33%',
	items:[
	       {
	    	   xtype: "text",
	    	   width:440,
	           height:380,
	           padding:'40 5 0 20',
	    	   html: "<span style='text-align:center;font-size:18px'><bold>1-13日，集团公司掘进进尺完成9476米，超计划6.4%，超掘566米。 </bold></span>"
	       }
	]
});
var proPanel11=Ext.create('Ext.panel.Panel',{
	id:'proPanel11',
	itemId:'proPanel11',
	anchor:'100% 33%',
	items:[
	       {
	    	   xtype: "text",
	    	   width:440,
	           height:380,
	           padding:'40 5 0 20',
	    	   html: "<span style='text-align:center;font-size:18px'><bold>1-13日，集团公司煤基天然气产量完成387万立方米，超计划6.2%，超产23万立方米。 </bold></span>"
	       }
	]
});
var proPanel8=Ext.create('Ext.panel.Panel',{
    //xtype: "panel",
    //html: "子元素3",
	id:'proPanel8',
	itemId:'proPanel8',
    anchor: '100% 33%',
    items: [{  
        id: 'chartCmp8',  
        xtype: 'chart',  
        //width:710,
        width:440,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '发电量(单位:万度)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: chartStore8,
         shadow: true,
         //theme: 'Category1',
         /*legend: {
             position: 'bottom'
         },*/
         axes: [{
             type: 'Numeric',
             minimum: 0,
             position: 'left',
             fields: 'value1',
             minorTickSteps: 1,
             grid: true
         }, {
             type: 'Category',
             position: 'bottom',
             fields: ['date'],
             label: {rotate: { degrees: 270}}
         }],
         series: [{
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             axis: 'left',
             xField: 'date',
             yField: 'value1',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }]  
    }]
});
var proPanel12=Ext.create('Ext.panel.Panel',{
    //xtype: "panel",
    //html: "子元素3",
	id:'proPanel12',
	itemId:'proPanel12',
    anchor: '100% 33%',
    items: [{  
        id: 'chartCmp12',  
        xtype: 'chart',  
        //width:710,
        width:440,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '九鑫公司焦炭库存走势图(单位:吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: chartStore12,
         shadow: true,
         //theme: 'Category1',
         /*legend: {
             position: 'bottom'
         },*/
         axes: [{
             type: 'Numeric',
             minimum: 0,
             position: 'left',
             fields: 'value1',
             minorTickSteps: 1,
             grid: true
         }, {
             type: 'Category',
             position: 'bottom',
             fields: ['date'],
             label: {rotate: { degrees: 270}}
         }],
         series: [{
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             axis: 'left',
             xField: 'date',
             yField: 'value1',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }]  
    }]
});
var proPanel13=Ext.create('Ext.panel.Panel',{
	id:'proPanel13',
	itemId:'proPanel13',
    anchor: '100% 33%',
    items: [{  
        id: 'chartCmp13',  
        xtype: 'chart',  
        //width:710,
        width:440,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '水泥库存走势图(单位:吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: chartStore13,
         shadow: true,
         //theme: 'Category1',
         /*legend: {
             position: 'bottom'
         },*/
         axes: [{
             type: 'Numeric',
             minimum: 0,
             position: 'left',
             fields: 'value1',
             minorTickSteps: 1,
             grid: true
         }, {
             type: 'Category',
             position: 'bottom',
             fields: ['date'],
             label: {rotate: { degrees: 270}}
         }],
         series: [{
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             axis: 'left',
             xField: 'date',
             yField: 'value1',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }]  
    }]
});
var proPanel5=Ext.create('Ext.panel.Panel',{
	id:'proPanel5',
	itemId:'proPanel5',
    anchor: '100% 33%',
    items: [blGrid]
});
var proPanel7=Ext.create('Ext.panel.Panel',{
	id:'proPanel7',
	itemId:'proPanel7',
    anchor: '100% 33%',
    items: [kjsgGrid]
});
var proPanel10=Ext.create('Ext.panel.Panel',{
	id:'proPanel10',
	itemId:'proPanel10',
    anchor: '100% 33%',
    items: [ureaGrid]
});
var proPanel9=Ext.create('Ext.panel.Panel',{
	id:'proPanel9',
	itemId:'proPanel9',
    anchor: '100% 33%',
    items: [methanolGrid,{  
        id: 'chartCmp9',  
        xtype: 'chart',  
        //width:710,
        width:440,
        height:240,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '甲醇出厂价格走势(单位:元/吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 440/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: chartStore9,
         shadow: true,
         //theme: 'Category1',
         legend: {
             position: 'bottom'
         },
         axes: [{
             type: 'Numeric',
             minimum: 0,
             position: 'left',
             fields: ['value1', 'value2', 'value3'],
             minorTickSteps: 1,
             grid: true
         }, {
             type: 'Category',
             position: 'bottom',
             fields: ['date'],
             label: {rotate: { degrees: 270}}
         }],
         series: [{
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             title:'龙化公司',
             axis: 'left',
             xField: 'date',
             yField: 'value1',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }, {
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             title:'蒙大公司',
             axis: 'left',
             smooth: true,
             fill: true,
             xField: 'date',
             yField: 'value2',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }, {
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             title:'郑商所指数',
             axis: 'left',
             smooth: true,
             fill: true,
             xField: 'date',
             yField: 'value3',
             markerConfig: {
                 type: 'cross',
                 size: 4,
                 radius: 4,
                 'stroke-width': 0
             }
         }]  
    }]
});


//放置在右边的panel
/*var rightPanel=Ext.create('Ext.Panel', {
	id:'rightPanel',
	items:[proPanel1]
});*/
//先隐藏其他panel
proPanel2.setVisible(false);
proPanel3.setVisible(false);
proPanel4.setVisible(false);
proPanel5.setVisible(false);
proPanel6.setVisible(false);
proPanel7.setVisible(false);
proPanel8.setVisible(false);
proPanel9.setVisible(false);
proPanel10.setVisible(false);
proPanel11.setVisible(false);
proPanel12.setVisible(false);
proPanel13.setVisible(false);
var productionQuotasChartPanel=Ext.create('Ext.Panel', {
		id:'productionQuotasChartPanel',
		itemId:'productionQuotasChartPanel',
		bodyStyle:'padding:6 6 6 6',
	    layout: 'anchor',
	    items: [proPanel1,proPanel2,proPanel3,proPanel4,proPanel5,proPanel6,proPanel7,proPanel8,proPanel9,proPanel10,proPanel11,proPanel12,proPanel13/*, , */]
	});