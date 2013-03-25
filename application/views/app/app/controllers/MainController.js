dojo.provide('app.controllers.MainController');

dojo.require('app.controllers.master.MenuTestController');
/**
 * MainController ini adalah controller utama untuk mulai 
 * menginisialisasi semua event.
 */
dojo.declare('app.controllers.MainController', null, {
	
    menuTestController: null,

    constructor: function() {
        this.initUIController();
        this.initListener();
    },
	
    initUIController: function() {
        this.menuTestController = new app.controllers.master.MenuTestController();
    },
	
    initListener: function() {
        dojo.connect(dijit.byId('treeSales'), 'onClick', this, function(evt) {
            if (evt.type != 'rootNode') {
                if (evt.id == 'test_first_menu'){
                    // console.log('Masu click tree');
                    this.menuTestController.showPanel();
                } 
            }
        });
    }
});
