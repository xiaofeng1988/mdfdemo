//二.生产运营
Ext.require([
    'Ext.grid.*',
    'Ext.toolbar.Paging',
    'Ext.util.*',
    'Ext.data.*',
    'Ext.chart.*'
]);
//小于0的数值飘红
function checknum(val){
	if(val < 0){   
	　	return '<font size="2"><span style="color:red;">' + val + '</span></font>';   
	}   
	return '<font size="2">'+val+'</font>'; 
}
//创建 store
var railroadStore = Ext.create('Ext.data.Store', {
    fields: ["item", "unit", "plan", "complete", "over", "progress",
         "ring", "increase"],
    pageSize: 20,  
    //是否在服务端排序 （true的话，在客户端就不能排序）
    remoteSort: false,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'js/extjs/generalInformation/productionRailroadData.json',
        reader: {   //这里的reader为数据存储组织的地方，下面的配置是为json格式的数据，例如：[{"total":50,"rows":[{"a":"3","b":"4"}]}]
            type: 'json', //返回数据类型为json格式
            root: 'rows',  //数据
            totalProperty: 'total' //数据总条数
        }
    },
    autoLoad: true  //即时加载数据
});
//铁路外运情况grid
var railroadGrid = Ext.create('Ext.grid.Panel',{
	id:'railroadGrid',
    store: railroadStore,
    disableSelection: false,//值为TRUE，表示禁止选择行
    columnLines: true,
    border:'2 2 2 2',
    columns: [
		      {text:"项目", width: 120,dataIndex:'item', sortable: false,menuDisabled:true,draggable:false,
            	  renderer:function(value) {
          	  	return '<font size="2">' + value + '</font>';
          	  }},
              {text:"单位", width: 65,dataIndex:'unit', sortable: false,
            	  renderer:function(value) {
          	  	return '<font size="2">' + value + '</font>';
          	  }},
              {text:"计划", width: 65,dataIndex:'plan', sortable: false,renderer: checknum},
              {text:"完成", width: 65,dataIndex:'complete', sortable: false,renderer: checknum},
              {text:"超欠 +.-", width: 67,dataIndex:'over', sortable: false,renderer: checknum},
              {text:"进度", width: 65,dataIndex:'progress', sortable: false,renderer: checknum},
              {text:"环比", width: 65,dataIndex:'ring', sortable: false,renderer: checknum},
              {text:"增幅", width: 65,dataIndex:'increase', sortable: false},
        
    ],
    loadMask: true,
    viewConfig: {
        forceFit: false,
        width:580,
        height:380,
        autoScroll:true
    },
    bbar: Ext.create('Ext.PagingToolbar', {
        store: railroadStore,
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
var railroadChartStore1 = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1','value2'],
	data:[{"date":"2014.03","value1":52.4,"value2":55.8},{"date":"2014.04","value1":47.1,"value2":53.3},{"date":"2014.05","value1":50.7,"value2":58.0},{"date":"2014.06","value1":51.5,"value2":58.0},{"date":"2014.07","value1":49.6,"value2":55.6},{"date":"2014.08","value1":47.1,"value2":51.8},{"date":"2014.09","value1":52.1,"value2":57.6},{"date":"2014.10","value1":50.4,"value2":56.9}]
});
var railroadPanel1=Ext.create('Ext.panel.Panel',{
	id:'railroadPanel1',
	itemId:'railroadPanel1',
    anchor: '100% 33%',
    items: [{  
        id: 'railroadChart1',  
        xtype: 'chart',  
        //width:710,
        width:550,
        height:380,
        items: [{
        	itemid:'chartTitle',
            type  : 'text',
            text  : '平朔公司煤质变化情况',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 550/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: railroadChartStore1,
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
             title:'5000大卡以上商品煤',
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
             title:'5000大卡以上铁路外运商品煤',
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
//无id
function createRoadRailPanel(){
	return Ext.create('Ext.panel.Panel',{
	    anchor: '100% 33%',
	    items: [{  
	        xtype: 'chart',  
	        width:710,
	        height:380,
	        items: [{
	        	itemid:'chartTitle',
	            type  : 'text',
	            text  : '平朔公司煤质变化情况',
	            font  : 'bold 14px Arial',
	            width : 100,
	            height: 30,
	            x : 730/2-100, //the sprite x position
	            y : 10  //the sprite y position
	         }],
	         //style: 'background:#fff',
	         animate: true,
	         store: railroadChartStore1,
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
	             fields: ['date']
	         }],
	         series: [{
	             type: 'line',
	             highlight: {
	                 size: 7,
	                 radius: 7
	             },
	             title:'5000大卡以上商品煤',
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
	             title:'5000大卡以上铁路外运商品煤',
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
}
var railroadChartPanel=Ext.create('Ext.Panel', {
	id:'railroadChartPanel',
	itemId:'railroadChartPanel',
	bodyStyle:'padding:6 6 6 6',
    layout: 'anchor',
    items: [railroadPanel1]
});