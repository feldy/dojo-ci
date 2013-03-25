dojo.provide('app.controllers.master.MenuTestController');

dojo.require('app.views.master.panel.MenuTestPanel');
dojo.require('app.util.id.master.MenuTestID');
dojo.require('app.util.MenuTestUtil');

dojo.require("dojox.encoding.digests.SHA1")

dojo.declare('app.controllers.master.MenuTestController', null, {

    menuTestPanel:null,
    tableTestStore: null,
    tableTestTreeStore: null,

    constructor:function () {
        this.initPanel();
    },

    initPanel:function () {
        //store Grid
        this.tableTestStore = dojo.store.JsonRest({
            target: 'index.php/test_controller/testControllerMenu1/'
        });

        this.tableTestTreeStore = dojo.data.ItemFileReadStore({
            url: 'index.php/test_controller/testTreeJson/'
        });
        
        this.filteringStore = dojo.data.ItemFileReadStore({
            url: '../testObj/index.php'
        });

        var pnl = new app.views.master.panel.MenuTestPanel(
            app.util.id.master.MenuTestID.panel,
            'Menu Test 1',
            this.tableTestStore,
            this.filteringStore,
            this.tableTestTreeStore);

        this.menuTestPanel = pnl.getMainPanel();

        var tbl = dijit.byId(app.util.id.master.MenuTestID.grid);
        dojo.connect(tbl.selection, "onSelected", this, this.rowClick);
        
        dojo.connect(dijit.byId('btn1'), "onClick", this, this.saveAction);
        dojo.connect(dijit.byId('btn2'), "onClick", this, this.refreshAction);
        dojo.connect(dijit.byId('btn3'), "onClick", this, this.deleteAction);
        dojo.connect(dijit.byId('txtTest2'), "onKeyPress", this, this.searchNama);

        dojo.connect(dijit.byId('testLightBoxUploader'), "onChange", this, this.uploadFoto);
        app.util.MenuTestUtil.createComboGrid();
    },
    uploadFoto: function(fileArray){
        dojo.forEach(fileArray, function (file) {
            dijit.byId('photo').set('value', file.name);
        });

        console.log('uploadFoto');
        // console.log(fileArray[0].name);
        var uploader = dijit.byId('testLightBoxUploader');
        dojo.when(uploader.uploadIFrame(), function(){
            var a = function(){
                testLightBox.href = 'application/views/app/tmp/'+dijit.byId('photo').get('value');
                dojo.byId('testLightBoxSrc').src = 'application/views/app/tmp/'+dijit.byId('photo').get('value');
            };
            setTimeout(a, 3000);
        },
        function(err){
            console.log(err);
        });

    },
    deleteAction: function(){
        var form = dijit.byId('formMenuTestPanel');
        var tbl = dijit.byId(app.util.id.master.MenuTestID.grid);

        var index = tbl.selection.selectedIndex;
        var sid = tbl.store.getValue(tbl.getItem(index), 'id');
        dojo.when(this.tableTestStore.remove(sid), 
            function(){
                alert('berhasil delete');
                    tbl.setQuery();
                tbl.selection.clear();
                form.reset();
            },
            function(err){
                alert(err);
        });
    },
    refreshAction: function(){
        var form = dijit.byId('formMenuTestPanel');
        var tbl = dijit.byId(app.util.id.master.MenuTestID.grid);
        tbl.setQuery();
        tbl.selection.clear();
        form.reset();
    },
    rowClick: function(index){
        var tbl = dijit.byId(app.util.id.master.MenuTestID.grid);

        var id = tbl.store.getValue(tbl.getItem(index), 'id');
        var username = tbl.store.getValue(tbl.getItem(index), 'username');
        var password = tbl.store.getValue(tbl.getItem(index), 'password');
        var active = tbl.store.getValue(tbl.getItem(index), 'isActive');

        dijit.byId('txtTest2').set('value', username);
        dijit.byId('txtTest3').set('value', password);
        dijit.byId('txtTest4').set('value', active);
        
        dijit.byId('sidHidden').set('value', id);

    },
    searchNama: function(event){
        var tbl = dijit.byId(app.util.id.master.MenuTestID.grid);
        if(event.keyCode == dojo.keys.ENTER) {
            tbl.setQuery({
                nama: dijit.byId('txtTest2').get('value')
            });
        }  
    },
    saveAction: function(){
        var arr = [];
        var form = dijit.byId('formMenuTestPanel');
        var tbl = dijit.byId(app.util.id.master.MenuTestID.grid);
        
        var objForm = dojo.formToObject('formMenuTestPanel');
        arr[0] = objForm;
        var id = dijit.byId('sidHidden').get('value');

        if(id == null || id == ""){
            dojo.when(this.tableTestStore.add(arr), 
                function(){
                    alert('berhasil');
                    var uploader = dijit.byId('testLightBoxUploader');
                    uploader.set('url', 'index.php/test_controller/getPhotoUploaded/save');
                    uploader.uploadIFrame()
                    uploader.set('url', 'index.php/test_controller/getPhotoUploaded');
                    tbl.setQuery();
                    tbl.selection.clear();
                    form.reset();
                },
                function(err){
                    alert(err);
            });
        } else {
            dojo.when(this.tableTestStore.put(objForm, {id: id}), 
                function(){
                    alert('berhasil update');
                    tbl.setQuery();
                    tbl.selection.clear();
                    form.reset();
                },
                function(err){
                    alert(err);
            });
        }
    },

    showPanel:function () {
        var mainPanel = dijit.byId('mainPanel');

        // if this panel is closed, initialize again
        if (dijit.byId(app.util.id.master.MenuTestID.panel) == undefined) {
            this.initPanel();
        }

        if (mainPanel.getIndexOfChild(dijit.byId(app.util.id.master.MenuTestID.panel)) == -1) {
            mainPanel.addChild(this.menuTestPanel);

            var filtering = new dijit.form.FilteringSelect({
                id: 'filtering1',
                store: this.filteringStore,
                searchAttr: 'mix',
                highlightMatch: "all",
                autoComplete:false,
                pageSize: 10,
                ignoreCase: true,
                queryExpr: "*${0}*"
            });

            dojo.byId('filteringDiv').appendChild(filtering.domNode);
           
        }
       
        mainPanel.selectChild(dijit.byId(app.util.id.master.MenuTestID.panel));
    }
});
