dojo.provide('app.views.UILauncher');
//require component
dojo.require('dojo.store.JsonRest');
dojo.require('dojo.data.ObjectStore');
dojo.require("dojo.data.ItemFileReadStore");

dojo.require('dojox.grid.DataGrid');
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojox.grid.enhanced.plugins.Pagination");
dojo.require('dojox.form.Manager');
dojo.require('dojox.image.Lightbox');
dojo.require('dojox.image.LightboxNano');
dojo.require('dojox.form.Uploader');
dojo.require('dojox.form.uploader.plugins.IFrame');

dojo.require('dijit.form.CurrencyTextBox');
dojo.require('dijit.form.Button');
dojo.require('dijit.form.Form');
dojo.require("dijit.form.DateTextBox");
dojo.require('dijit.form.ValidationTextBox');
dojo.require('dijit.form.Select');
dojo.require('dijit.form.TextBox');
dojo.require('dijit.form.FilteringSelect');
dojo.require('dijit.form._FormWidget');
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.Tree");
dojo.require("dijit.tree.ForestStoreModel");
dojo.require('dijit._Templated');
dojo.require('dijit._Widget');


//require util ID
dojo.require('app.util.id.master.MenuTestID');


//require controller
dojo.require('app.controllers.MainController');



// dojo.ready(function () {
    var tabPanel = new dijit.layout.TabContainer({
        id:'mainPanel',
        region:'center'
    });

    
    // persiapkan accordion container yang ingin dipake
    var accordionContainer = new dijit.layout.AccordionContainer({
        region:'leading',
        minSize:'20',
        style:'width:30%;',
        splitter:true
    });

    // data menu sales
    var storeMenuSales = new dojo.data.ItemFileReadStore({
        id:'storeMenuSales',
        url:'application/views/app/dummy-data/menu/menu.json'
    });
    var treeModel = new dijit.tree.ForestStoreModel({
        store:storeMenuSales,
        query:{
            'type':'rootNode'
        },
        rootId:'rootNode',
        childrenAttrs:['children'],
        loadingMessage:'Loading data ...'
    });

    // define tree utk sales
    var treeSales = new dijit.Tree({
        id:'treeSales',
        model:treeModel,
        showRoot:false
    });

    // persiapkan menu untuk SALES Module
    var salesAccordionPane = new dijit.layout.ContentPane({
        title:'Test Menu',
        content:treeSales
    });

    var testAccordionPane = new dijit.layout.ContentPane({
        title:'Test Menu 2',
        content: 'test'
    });

    // tambahkan smua accordion panel ke container
    accordionContainer.addChild(salesAccordionPane);
    accordionContainer.addChild(testAccordionPane);

    // dashboard panel ini digunakan untuk menaruh accordion menu
    var dashboardPanel = new dijit.layout.BorderContainer({
        title:'Dashboard'
    });
    dashboardPanel.addChild(accordionContainer);
    dashboardPanel.addChild(new dijit.layout.ContentPane({
        region:'center',
        content:'Aplikasi Intergerasi CI dan Dojo'
    }));
    tabPanel.addChild(dashboardPanel);

    // panel utama
    var mainPanel = new dijit.layout.BorderContainer({
        id:'main',
        style:'height: 100%',
        gutters: true,
    });
    mainPanel.addChild(tabPanel);
    mainPanel.placeAt('appContainer');
    mainPanel.startup();

    // init mainController
    new app.controllers.MainController();
// });
