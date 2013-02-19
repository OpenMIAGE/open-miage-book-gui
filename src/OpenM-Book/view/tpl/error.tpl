<!DOCTYPE HTML>
<html>
    <head>
        <title>Open-MIAGE</title>
        {include file='include/head.tpl'}
    </head>
    <body>
        {include file='include/navBar.tpl'}
        <div class="container">
            <div class="row">
                <div class="span10 offset1">
                    <div class="alert alert-error">
                        <div class="row">
                            <div class="span10">
                                <span style="font-size: x-large" ><b>{if $error_code }ERROR {$error_code}{else}Internal ERROR{/if}: </b></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="span10">
                                <p>{$error_message}</p> 
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
        {include file='include/ressource_js.tpl'}
    </body>
</html>