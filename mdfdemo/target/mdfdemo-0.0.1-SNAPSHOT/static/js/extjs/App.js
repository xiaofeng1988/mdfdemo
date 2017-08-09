/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        'MyDesktop.SafeMonitor',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Notepad',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',
        'MyDesktop.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },
	//实例化所有需要添加到desktop的相关应用程序
    getModules : function(){
        return [
            new MyDesktop.VideoWindow(),
            new MyDesktop.SystemStatus(),
            new MyDesktop.SafeMonitor(),
            new MyDesktop.TabWindow(),
            new MyDesktop.AccordionWindow(),
            new MyDesktop.Notepad(),
            new MyDesktop.BogusMenuModule(),
            new MyDesktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],
			//快捷按钮（为上面getModules（）方法所实例化的按钮在左面上面添加一个快捷按钮）
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
				//要添加到desktop里面的应用程序name为应用的名字（可以自定义），
				//iconCls为desktop.css里面对应的样式指定的图片，
				//module为相应app里面的ID名称
                data: [
                    { name: '安全监测', iconCls: 'icon-48-aqjc', module: 'SafeMonitor' },
                    { name: '人员定位', iconCls: 'icon-48-rydw', module: 'acc-win' },
                    { name: '煤矿产、销统计', iconCls: 'icon-48-duomkcyxtj', module: 'notepad' },
                    { name: '销量统计', iconCls: 'icon-48-duomkxltj', module: 'systemstatus'},
                    { name: '产量统计', iconCls: 'icon-48-dmkcltj', module: 'systemstatus'},
                    { name: '掘进统计', iconCls: 'icon-48-dmkjctj', module: 'systemstatus'},
                    { name: '工业视频', iconCls: 'icon-48-gysp', module: 'systemstatus'},
                ]
            }),
			//desktop的背景图片
            wallpaper: 'wallpapers/Wood-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: '桌面',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [{
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },'-',{
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    
                }]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
			//快速启动按钮，将前面添加到desktop的app在任务栏下面添加快捷启动按钮
            quickStart: [
                { name: '联系人', iconCls: 'accordion', module: 'acc-win' },
                { name: '安全监测', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('退出系统', '你确定要退出?');
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
