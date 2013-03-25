<html>
<head>
    <meta charset="utf-8">
        <title>Test View</title>
       
        <style type="text/css"> 
            @import "application/views/app/lib/dojo1.6/dojox/grid/resources/Grid.css";
            @import "application/views/app/lib/dojo1.6/dojox/grid/resources/claroGrid.css"; 
            @import "application/views/app/lib/dojo1.6/dijit/themes/claro/claro.css";
            @import "application/views/app/lib/dojo1.6/dojox/grid/resources/soriaGrid.css"; 
            @import "application/views/app/lib/dojo1.6/dijit/themes/soria/soria.css";
            @import "application/views/app/lib/dojo1.6/dojox/form/resources/FileInput.css";
            @import "application/views/app/lib/dojo1.6/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css";
            @import "application/views/app/lib/dojo1.6/dojox/grid/enhanced/resources/claro/EnhancedGrid.css";
            @import "application/views/app/lib/dojo1.6/dijit/themes/claro/layout/TabContainer.css";
            @import "application/views/app/lib/dojo1.6/dijit/themes/claro/layout/ContentPane.css";
            @import "application/views/app/lib/dojo1.6/dijit/themes/soria/layout/TabContainer.css";
            @import "application/views/app/lib/dojo1.6/dijit/themes/soria/layout/ContentPane.css";
        </style>

        <script>
            var dojoConfig = {
                isDebug: true,
                modulePaths: {
                    app: '../../../app'
                }
            }
        </script>
        <script src="application/views/app/lib/dojo1.6/dojo/dojo.js"></script>
        <!-- JQuery-->
        <link rel="stylesheet" type="text/css" media="screen" href="application/views/app/lib/jquery-combo-grid/css/smoothness/jquery-ui-1.8.9.custom.css"/>
        <script type="text/javascript" src="application/views/app/lib/jquery-combo-grid/jquery/jquery-1.6.2.min.js"></script>
        <script type="text/javascript" src="application/views/app/lib/jquery-combo-grid/jquery/jquery-ui-1.8.9.custom.min.js"></script>
        <!-- <script type="text/javascript" src="http://jqueryui.com/themeroller/themeswitchertool/"></script> -->
        <link rel="stylesheet" type="text/css" media="screen" href="application/views/app/lib/jquery-combo-grid/css/smoothness/jquery.ui.combogrid.css"/>
        <script type="text/javascript" src="application/views/app/lib/jquery-combo-grid/plugin/jquery.ui.combogrid-1.6.2.js"></script>

        <script>
            // call base js 
            dojo.ready(function() {
                dojo.require("app.views.UILauncher");
           });
        </script>
    </head>
    <body class="soria" style="font-size: 12px; ">
        <!-- Prepare main container -->
        <div id="appContainer" ></div>
    </body>
</html>
