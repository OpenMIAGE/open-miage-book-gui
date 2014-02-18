<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/coreCSS.tpl'}
    </head>
    <body>
        {include file='include/commonMenuBar.tpl'}
        <div id="loader" style="z-index: -1; position: absolute;left: 50%; top: 50%; margin-left: -16px; margin-top: -16px; ">
            <img src="{$resources_dir}OpenM-Book/gui/img/loader.gif"/>
        </div>
        <div class="container-fluid container-fluid-book">
            {include file='include/alert.tpl'}
            <div id="divParent" class="divParent"></div>
        </div>
        {include file='include/coreJS.tpl'}
        {include file='include/coreJS-initializing.tpl'}
    </body>
</html>