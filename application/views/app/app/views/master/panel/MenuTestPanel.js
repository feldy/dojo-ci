dojo.provide('app.views.master.panel.MenuTestPanel');

dojo.require('app.views.master.grid.test.TableMenuTest');
dojo.require('app.views.master.grid.test.TableMenuTestTree');
dojo.require('app.views.master.form.test.MenuTestForm');


dojo.declare('app.views.master.panel.MenuTestPanel', null, {
    form: null,
    tableTest: null,
    tableTestTree: null,
    mainPanel: null,
    
    constructor: function(id, titlePanel, store, storeFil, storeTree) {
        this.initComponents(id, titlePanel, store, storeFil, storeTree);
    },

    initComponents: function(id, titlePanel, store, storeFil, storeTree) {
    	 
        this.tableTest = new app.views.master.grid.test.TableMenuTest(store).getTable();
    	this.tableTestTree = new app.views.master.grid.test.TableMenuTestTree(storeTree).getTable();

    	this.form = new app.views.master.form.test.MenuTestForm({
            id: app.util.id.master.MenuTestID.form,
            txt1: 'txtTest1',
            txt2: 'txtTest2',
            txt3: 'txtTest3',
            txt4: 'txtTest4',
            btn1: 'btnTest1',
            btn2: 'btnTest2'
		});

        // dijit.byId('txtTest1').store = storeFil;
		
        var contentPane = new dijit.layout.ContentPane({
			region: 'top',
			splitter: true,

			style:'height: 35%;',
            content: this.form
        });
        // we must call this function
        contentPane.startup();
        
        this.mainPanel = new dijit.layout.BorderContainer({
            id: id,
            title: titlePanel,
             closable: true,
            design:'sidebar',
            gutters:true,
            liveSplitters:true,
            style: 'height: 100%;width: 100%;'
        });
        
        this.mainPanel.addChild(contentPane);
        this.mainPanel.addChild(new dijit.layout.ContentPane({
            region: 'center',
            splitter: true,
            content: this.tableTest.domNode,
            style: 'height: 25%;width: 20%;'
        }));
        this.mainPanel.addChild(new dijit.layout.ContentPane({
            region: 'bottom',
            splitter: true,
            content: this.tableTestTree.domNode,
            style: 'height: 35%;width: 20%;'
        }));
    },
    
    getMainPanel: function() {
        return this.mainPanel;
    }
});
