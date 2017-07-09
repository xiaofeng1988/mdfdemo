var ollieryStockChartStore = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1','value2','value3'],
	//data:[]
	data:[{"date":"2013.10","value1":409,"value2":125,"value3":90},{"date":"2013.11","value1":251,"value2":140,"value3":120},{"date":"2013.12","value1":200,"value2":75,"value3":130},{"date":"2014.01","value1":210,"value2":65,"value3":143},{"date":"2014.02","value1":203,"value2":89,"value3":147},{"date":"2014.03","value1":200,"value2":75,"value3":130},{"date":"2014.04","value1":198,"value2":100,"value3":110},{"date":"2014.05","value1":200,"value2":94,"value3":107},{"date":"2014.06","value1":189,"value2":85,"value3":107},{"date":"2014.07","value1":124,"value2":65,"value3":102},{"date":"2014.08","value1":130,"value2":100,"value3":70},{"date":"2014.09","value1":233,"value2":123,"value3":101},{"date":"2014.10","value1":245,"value2":145,"value3":96}]
});
var portStockChartStore = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1','value2'],
	//data:[]
	data:[{"date":"2013.10","value1":95,"value2":145},{"date":"2013.11","value1":50,"value2":70},{"date":"2013.12","value1":53,"value2":86},{"date":"2014.01","value1":90,"value2":186},{"date":"2014.02","value1":93,"value2":248},{"date":"2014.03","value1":76,"value2":175},{"date":"2014.04","value1":80,"value2":134},{"date":"2014.05","value1":70,"value2":101},{"date":"2014.06","value1":65,"value2":101},{"date":"2014.07","value1":59,"value2":93},{"date":"2014.08","value1":130,"value2":260},{"date":"2014.09","value1":103,"value2":251},{"date":"2014.10","value1":101,"value2":228}]
});
var qhdPortStockChartStore = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1'],
	data:[{"date":"2013.10","value1":720},{"date":"2013.11","value1":502},{"date":"2013.12","value1":523},{"date":"2014.01","value1":680},{"date":"2014.02","value1":695},{"date":"2014.03","value1":614},{"date":"2014.04","value1":634},{"date":"2014.05","value1":587},{"date":"2014.06","value1":479},{"date":"2014.07","value1":497},{"date":"2014.08","value1":780},{"date":"2014.09","value1":709},{"date":"2014.10","value1":587}]
});
var hbhPriceChartStore = Ext.create('Ext.data.JsonStore', {
	fields:['date','value1'],
	data:[{"date":"2013.08","value1":623},{"date":"2013.09","value1":614},{"date":"2013.10","value1":607},{"date":"2013.11","value1":604},{"date":"2013.12","value1":600},{"date":"2014.01","value1":596},{"date":"2014.02","value1":578},{"date":"2014.03","value1":541},{"date":"2014.04","value1":530},{"date":"2014.05","value1":547},{"date":"2014.06","value1":578},{"date":"2014.07","value1":637},{"date":"2014.08","value1":567},{"date":"2014.09","value1":547},{"date":"2014.10","value1":534}]
});
//无idchart
function createOllieryStockChartPanel1(visible){
	return Ext.create('Ext.panel.Panel',{
		id:'osPanel1',
	    anchor: '100% 33%',
	    hidden:visible,
	    items: [{  
	        xtype: 'chart',  
	        width:890,
	        height:380,
	        items: [{
	            type  : 'text',
	            text  : '矿区煤炭库存情况 (单位:万吨)',
	            font  : 'bold 14px Arial',
	            width : 100,
	            height: 30,
	            x : 730/2-100, //the sprite x position
	            y : 10  //the sprite y position
	         }],
	         animate: true,
	         store: ollieryStockChartStore,
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
	             label: {font: 'bold 9px Arial'}
	         }],
	         series: [{
	             type: 'line',
	             highlight: {
	                 size: 7,
	                 radius: 7
	             },
	             title:'煤炭库存',
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
	             title:'原煤库存',
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
	             title:'商品煤库存',
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
}
//无idchart
function createOllieryStockChartPanel2(visible){
	return Ext.create('Ext.panel.Panel',{
		id:'osPanel2',
	    anchor: '100% 33%',
	    hidden:visible,
	    items: [{  
	        xtype: 'chart',  
	        width:890,
	        height:380,
	        items: [{
		        type  : 'text',
		        text  : '港口煤炭库存情况(单位:万吨) ',
		        font  : 'bold 14px Arial',
		        width : 100,
		        height: 30,
		        x : 730/2-100, //the sprite x position
		        y : 10  //the sprite y position
		     }],
		     //style: 'background:#fff',
		     animate: true,
		     store: portStockChartStore,
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
		         label: {font: 'bold 9px Arial'}
		     }],
		     series: [{
		         type: 'line',
		         highlight: {
		             size: 7,
		             radius: 7
		         },
		         title:'秦皇岛港',
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
		         title:'环渤海地区',
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
//无idchart
function createOllieryStockChartPanel3(visible){
	return Ext.create('Ext.panel.Panel',{
		id:'osPanel3',
	    anchor: '100% 33%',
	    hidden:visible,
	    items: [{  
	        xtype: 'chart',  
	        width:890,
	        height:380,
	        items: [{
		        type  : 'text',
		        text  : '秦皇岛港全港煤炭库存走势(单位:万吨) ',
		        font  : 'bold 14px Arial',
		        width : 100,
		        height: 30,
		        x : 730/2-100, //the sprite x position
		        y : 10  //the sprite y position
		     }],
		     //style: 'background:#fff',
		     animate: true,
		     store: qhdPortStockChartStore,
		     shadow: true,
		     axes: [{
		         type: 'Numeric',
		         minimum: 0,
		         position: 'left',
		         fields: ['value1'],
		         minorTickSteps: 1,
		         grid: true
		     }, {
		         type: 'Category',
		         position: 'bottom',
		         fields: ['date'],
		         label: {font: 'bold 9px Arial'}
		     }],
		     series: [{
		         type: 'line',
		         highlight: {
		             size: 7,
		             radius: 7
		         },
		         //title:'秦皇岛港',
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
}
//无idchart
function createOllieryStockChartPanel4(visible){
	return Ext.create('Ext.panel.Panel',{
		id:'osPanel4',
	    anchor: '100% 33%',
	    hidden:visible,
	    items: [{  
	        xtype: 'chart',  
	        width:890,
	        height:380,
	        items: [{
		        type  : 'text',
		        text  : '环渤海动力煤综合平均价格走势图（5500大卡）(单位:元/吨) ',
		        font  : 'bold 14px Arial',
		        width : 100,
		        height: 30,
		        x : 730/2-300, //the sprite x position
		        y : 10  //the sprite y position
		     }],
		     animate: true,
		     store: hbhPriceChartStore,
		     shadow: true,
		     axes: [{
		         type: 'Numeric',
		         minimum: 0,
		         position: 'left',
		         fields: ['value1'],
		         minorTickSteps: 1,
		         grid: true
		     }, {
		         type: 'Category',
		         position: 'bottom',
		         fields: ['date'],
		         label: {font: 'bold 9px Arial'}
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
}
//煤炭库存情况 
var ollieryStockChart=Ext.create('Ext.panel.Panel',{
	id:'ollieryStockChart',
	itemId:'ollieryStockChart',
    //anchor: '100% 100%',
	layout: 'column',
	defaults: {                     //设置没一列的子元素的默认配置
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        }
    },
    items: [{
    	columnWidth:.50,
        items:[{  
        id: 'ollieryStockChart1',  
        xtype: 'chart',  
        width:550,
        height:260,
        items: [{
        	itemid:'chartTitle1',
            type  : 'text',
            text  : '矿区煤炭库存情况 (单位:万吨)',
            font  : 'bold 14px Arial',
            width : 100,
            height: 30,
            x : 730/2-100, //the sprite x position
            y : 10  //the sprite y position
         }],
         //style: 'background:#fff',
         animate: true,
         store: ollieryStockChartStore,
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
             label: {font: 'bold 9px Arial'}
         }],
         series: [{
             type: 'line',
             highlight: {
                 size: 7,
                 radius: 7
             },
             title:'煤炭库存',
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
             title:'原煤库存',
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
             title:'商品煤库存',
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
    }
	]},
	{
		columnWidth:.50,
		items:[{  
				    id: 'ollieryStockChart2',  
				    xtype: 'chart',  
				    width:550,
				    height:260,
				    items: [{
				    	itemid:'chartTitle2',
				        type  : 'text',
				        text  : '港口煤炭库存情况(单位:万吨) ',
				        font  : 'bold 14px Arial',
				        width : 100,
				        height: 30,
				        x : 730/2-100, //the sprite x position
				        y : 10  //the sprite y position
				     }],
				     //style: 'background:#fff',
				     animate: true,
				     store: portStockChartStore,
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
				         label: {font: 'bold 9px Arial'}
				     }],
				     series: [{
				         type: 'line',
				         highlight: {
				             size: 7,
				             radius: 7
				         },
				         title:'秦皇岛港',
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
				         title:'环渤海地区',
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
				}
		]
	},
	{
		columnWidth:.50,
		items:[{  
				    id: 'ollieryStockChart3',  
				    xtype: 'chart',  
				    width:550,
				    height:260,
				    items: [{
				    	itemid:'chartTitle3',
				        type  : 'text',
				        text  : '秦皇岛港全港煤炭库存走势(单位:万吨) ',
				        font  : 'bold 14px Arial',
				        width : 100,
				        height: 30,
				        x : 730/2-100, //the sprite x position
				        y : 10  //the sprite y position
				     }],
				     //style: 'background:#fff',
				     animate: true,
				     store: qhdPortStockChartStore,
				     shadow: true,
				     axes: [{
				         type: 'Numeric',
				         minimum: 0,
				         position: 'left',
				         fields: ['value1'],
				         minorTickSteps: 1,
				         grid: true
				     }, {
				         type: 'Category',
				         position: 'bottom',
				         fields: ['date'],
				         label: {font: 'bold 9px Arial'}
				     }],
				     series: [{
				         type: 'line',
				         highlight: {
				             size: 7,
				             radius: 7
				         },
				         //title:'秦皇岛港',
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
				}
		]
	},
	{
		columnWidth:.50,
		items:[{  
				    id: 'ollieryStockChart4',  
				    xtype: 'chart',  
				    width:560,
				    height:260,
				    items: [{
				    	itemid:'chartTitle',
				        type  : 'text',
				        text  : '环渤海动力煤综合平均价格走势图（5500大卡）(单位:元/吨) ',
				        font  : 'bold 14px Arial',
				        width : 100,
				        height: 30,
				        x : 730/2-300, //the sprite x position
				        y : 10  //the sprite y position
				     }],
				     animate: true,
				     store: hbhPriceChartStore,
				     shadow: true,
				     axes: [{
				         type: 'Numeric',
				         minimum: 0,
				         position: 'left',
				         fields: ['value1'],
				         minorTickSteps: 1,
				         grid: true
				     }, {
				         type: 'Category',
				         position: 'bottom',
				         fields: ['date'],
				         label: {font: 'bold 9px Arial'}
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
				}
		]
	}
    ]
});

var ollieryStockPanel=Ext.create('Ext.Panel', {
	id:'ollieryStockPanel',
	itemId:'ollieryStockPanel',
	bodyStyle:'padding:6 6 6 6',
    layout: 'anchor',
    items: [ollieryStockChart]
});