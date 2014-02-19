<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/coreCSS.tpl'}
    </head>
    <body>
        {include file='include/commonMenuBar.tpl'}
        <div id="loader"  style="z-index: 10; position: absolute;left: 20%; top: 50%; margin-top: -16px; width:60%">
            Loading in progress...
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                </div>
            </div>
        </div>
        <div class="container-fluid container-fluid-book">
            {include file='include/alert.tpl'}
            <div id="divParent" class="divParent"></div>
        </div>
        {include file='include/coreJS.tpl'}
        {include file='include/coreJS-initializing.tpl'}
    </body>
</html>