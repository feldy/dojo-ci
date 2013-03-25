dojo.provide('app.views.master.grid.test.TableMenuTestTree');

dojo.require("dojox.grid.LazyTreeGrid");
dojo.require("dijit.tree.ForestStoreModel");
dojo.require("dojox.grid.LazyTreeGridStoreModel");

dojo.declare('app.views.master.grid.test.TableMenuTestTree', null, {
    tableMenuTestTree: null,
    storeMenuTestTree: null,
    
    constructor: function(store) {
        this.storeMenuTestTree = store;
        this.initTable(store);
    },
    
    initTable: function(store) {
        // initialize table layout

        // var forestModel = new dijit.tree.ForestStoreModel({
        //     // query   : { username : '*' },
        //     store: store,
        //     childrenAttrs: ['children']
        // });

        // var forestModel = new dojox.grid.LazyTreeGridStoreModel({
        //     // query   : { username : '*' },
        //     store: store,
        //     childrenAttrs: 'children'
        // });
        
        // var treeModel = new dojox.grid.LazyTreeGridStoreModel({
        //   store: store,
        //   serverStore: true
        // });


        var layout = [{
            field: 'id',
            name: 'ID',
            hidden: true
        }, {
            field: 'id_user',
            name: 'Id',
            hidden: true
        }, {
            field: 'username',
            name: 'Username',
            width: 'auto'
        }, {
            field: 'password',
            name: 'Password',
            width: 'auto'
        },{
            field: 'keterangan',
            name: 'Keterangan',
            width: 'auto'
        },{
            field: 'nilai',
            name: 'Nilai',
            width: 'auto'
        }];
        
        var treeModel2 = new dijit.tree.ForestStoreModel({
            store: store,
            // query: { type: 'kategori' },
            rootId: 'continentRoot',
            rootLabel: 'Continents',
            rowSelector: true,
            childrenAttrs: ['children']
        });
        
        // create the grid
        this.tableMenuTestTree = new dojox.grid.TreeGrid({
            id: 'tbtree',
            treeModel: treeModel2,
            structure: layout,
            defaultOpen: false,
            rowSelector: true
        });
    },
    
    getTable: function() {
        return this.tableMenuTestTree;
    }
});
