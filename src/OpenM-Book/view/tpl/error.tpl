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
                                <h2 class="text-center"><u>Page d'erreur</u></h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="span10">
                                {if $error_code }
                                    <span style="font-size: x-large" ><b>{$error_code} : </b></span>
                                {/if}
                                {if $error_title }
                                    <span style="font-size: large" ><b>{$error_title}</b> </span>
                                {/if}
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