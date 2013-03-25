dojo.provide('app.util.MenuTestUtil');

app.util.MenuTestUtil.createComboGrid = function(){
	jQuery(document).ready(function(){
		console.log('buat combogrid');
		$( "#cmbGrid" ).combogrid({
		url: 'index.php/test_controller/testComboGrid/',
		debug:true,
		colModel: [{'columnName':'no','width':'10','label':'NO.'}, {'columnName':'nama','width':'60','label':'Nama'},{'columnName':'kota','width':'30','label':'Kota'}],
		select: function( event, ui ) {
			$( "#cmbGrid" ).val( ui.item.nama );
			return false;
		}
	});
	});
}