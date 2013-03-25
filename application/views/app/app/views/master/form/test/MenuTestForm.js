dojo.provide('app.views.master.form.test.MenuTestForm');

dojo.declare('app.views.master.form.test.MenuTestForm', dijit.form.Form, {
    region: 'center',
    id: '',
    txt1: '',
    txt2: '',
    txt3: '',
    btn1: '',
    btn2: '',
    width: '100%',
    height: '100%',
    widgetsInTemplate: true,
    templateString: dojo.cache('app.views.templates', 'master/form/test/FormTestMenu.html'),
	
    postCreate: function() {
        this.inherited(arguments);
    }
});
