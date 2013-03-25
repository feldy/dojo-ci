dojo.provide('app.views.master.grid.test.TableMenuTest');


dojo.declare('app.views.master.grid.test.TableMenuTest', null, {
    tableMenuTest: null,
    storeMenuTest: null,
    
    constructor: function(store) {
        this.storeMenuTest = store;
        this.initTable();
    },
    
    initTable: function() {
        // initialize table layout
        var layout = [{
            field: 'id',
            name: 'ID',
            width: 'auto'
        }, {
            field: 'username',
            name: 'Username',
            width: 'auto'
        }, {
            field: 'password',
            name: 'Password',
            width: 'auto'
        }, {
            field: 'isActive',
            name: 'isActive',
            width: 'auto'
        }];
        
        // create the grid
        this.tableMenuTest = new dojox.grid.EnhancedGrid({
            id: app.util.id.master.MenuTestID.grid,
            store: gridStore = dojo.data.ObjectStore({
                objectStore: this.storeMenuTest
            }),
            columnReordering: 'true',
            loadingMessage:'Loading...',
            rowsPerPage: 2,
            selectionMode: 'single',
            structure: layout,
            canSort: function(){
                return false;
            },
            plugins: {
                pagination: {
                    description: true,
                    sizeSwitch: false,
                    pageStepper:  true,
                    gotoButton: true,
                    maxPageStep: 7,
                    position: "bottom"
                }

            }
        });
    },
    
    getTable: function() {
        return this.tableMenuTest;
    }
});
