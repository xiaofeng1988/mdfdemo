Ext.define('MyDesktop.SafeMonitor', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id:'SafeMonitor',
    init : function(){
        this.launcher = {
            text: '安全监测',
            iconCls:'icon-grid'
        };
    },
    
    
    createWindow : function(){
    	//定义数据同步提示信息
    	var successInfo="数据同步成功!";
    	var failureInfo="数据同步失败!";
    	var synInfo="正在同步...";
    	//定义grid的数据源
    	var ds = Ext.create('Ext.data.Store', {
    	     autoLoad: true,
    	     fields: [  
                      {name:'shortName',mapping:'companyDept.shortName'},  
                      {name:'mineName',mapping:'mineDept.name'},    
                      {name:'sensorid',mapping:'jcSensor.sensorid'},
                      {name:'sensorname',mapping:'jcSensor.sensorname'},
                      {name:'location',mapping:'jcSensor.location'},
                      {name:'monitorvalue',mapping:'monitorvalue'},
                      {name:'realtime',mapping:'realtime'}
             ], 
    	     proxy: {
    	         type: 'ajax',
    	         url: '../../gasController/findEvenAllRTDataJson?md='+Math.random(),
    	         reader: {
    	             type: 'json',
    	             root: 'rows'
    	         }
    	     },
	         listeners: {
	           load: {
	               fn: function(store, records, success) {
	                   if(success){
	                	   Ext.getCmp('lblInfo').setText(successInfo);
	                   }else{
	                	   Ext.getCmp('lblInfo').setText(failureInfo);
	                   }
	               }
	           },
	           scope: this               
	        }
    	 });
    	
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('SafeMonitor');
        if(!win){
            win = desktop.createWindow({
                id: 'SafeMonitor',
                title:'安全监测',
                width:840,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'border',
                items: [{
                	title: '部门列表',
                    region: 'west',
                    width: 200,
                    collapsible: true,
                    xtype: 'treepanel',
                    store: Ext.create('Ext.data.TreeStore', {
                	    root: {
	            	        expanded: true,
	            	        children: [
	            	            { text: "detention", leaf: true },
	            	            { text: "homework", expanded: true, children: [
	            	                { text: "book report", leaf: true },
	            	                { text: "algebra", leaf: true}
	            	            ] },
	            	            { text: "buy lottery tickets", leaf: true }
	            	        ]
	            	    }
	            	})
                },{
            		region: 'center',
                    border: false,
                    xtype: 'grid',
                    store:ds,
                    tbar: new Ext.Toolbar({  
                        autoWidth:true,  
                            autoShow:true,  
                        items:[  
                             {id:'btnStart',text: '开始',disabled:true,handler:function(button,e){ 
                            	 	Ext.getCmp('btnStop').setDisabled(false);button.setDisabled(true); 
                             }},   
                             {id:'btnStop',text: '停止',handler:function(button,e){ 
                            	 	Ext.getCmp('btnStart').setDisabled(false);button.setDisabled(true); 
                             }},  
                             {id:'btnPopConfigWindow',text: '更新设置'}
                        ]  
                    }),
                    columns: [
                        new Ext.grid.RowNumberer(),
                        {
                            text: "二级公司",
                            flex: 1,
                            sortable: true,
                            dataIndex: 'shortName'
                        },
                        {
                            text: "煤矿",
                            flex: 1,
                            sortable: true,
                            dataIndex: 'mineName'
                        },
                        {
                            text: "传感器ID",
                            width: 70,
                            sortable: true,
                            //renderer: Ext.util.Format.usMoney,
                            dataIndex: 'sensorid'
                        },
                        {
                            text: "传感器类型",
                            width: 70,
                            sortable: true,
                            dataIndex: 'sensorname'
                        },
                        {
                            text: "安装地点",
                            width: 70,
                            sortable: true,
                            dataIndex: 'location'
                        },
                        {
                            text: "监测值",
                            width: 70,
                            sortable: true,
                            dataIndex: 'monitorvalue'
                        },
                        {
                            text: "时间",
                            width: 70,
                            sortable: true,
                            dataIndex: 'realtime'
                        }
                    ],
                    bbar:[
                          {
                        	  xtype: 'tbtext',id:'lblInfo'/*, text: '数据同步成功!'*/
                          }
                    ]
                }
            	]
            });
        }
        return win;
    },

    statics: {
        getDummyData: function () {
            return [
                ['3m Co',71.72,0.02,0.03],
                ['Alcoa Inc',29.01,0.42,1.47],
                ['American Express Company',52.55,0.01,0.02],
                ['American International Group, Inc.',64.13,0.31,0.49],
                ['AT&T Inc.',31.61,-0.48,-1.54],
                ['Caterpillar Inc.',67.27,0.92,1.39],
                ['Citigroup, Inc.',49.37,0.02,0.04],
                ['Exxon Mobil Corp',68.1,-0.43,-0.64],
                ['General Electric Company',34.14,-0.08,-0.23],
                ['General Motors Corporation',30.27,1.09,3.74],
                ['Hewlett-Packard Co.',36.53,-0.03,-0.08],
                ['Honeywell Intl Inc',38.77,0.05,0.13],
                ['Intel Corporation',19.88,0.31,1.58],
                ['Johnson & Johnson',64.72,0.06,0.09],
                ['Merck & Co., Inc.',40.96,0.41,1.01],
                ['Microsoft Corporation',25.84,0.14,0.54],
                ['The Coca-Cola Company',45.07,0.26,0.58],
                ['The Procter & Gamble Company',61.91,0.01,0.02],
                ['Wal-Mart Stores, Inc.',45.45,0.73,1.63],
                ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81]
            ];
        }
    }
});

