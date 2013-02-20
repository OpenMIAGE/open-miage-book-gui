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
                <div class="span11 offset1">
                    <div class="alert alert-error">



                        <div class="row">
                                <div class="span2 offset1">
                                    <img src="{$resources_dir}OpenM-Book/view/img/error_cross.png" title="erreur" ALT="image erreur" align="center"  width="100" >
                                </div>
                                <div class="span6">
                                   {$error_default_message}
                                </div>
                        </div>
                                <br><br>
                        <div class="row">
                            <div class="span10">
                                <span style="font-size: x-large" ><b><u>{if $error_code }ERROR {$error_code}{else}Internal ERROR{/if}: </u></b></span>
                            </div>
                        </div>
                            <br>
                        {if $error_title }
                            <div class="row">
                                <div class="span10">
                                    <span style="font-size: large" ><b>{$error_title}</b> </span>
                                </div>
                            </div>
                                <br>
                        {/if} 
                        <div class="row">
                            <div class="span10">
                                <p>{$error_message}</p> 
                            </div>
                        </div>  
                            <br><br>
                        <div class="row">
                            <div class="span10">
                                <blockquote>
                                    <p>Permetez nous de vous proposer des liens :</p>
                                    <dl >
                                          {foreach from=$error_links item=other_links}
                                                <dt>{$other_links.label}</dt>
                                                 <dd> <a href="{$other_links.link} ">{$other_links.link} </a></dd>
                                          {/foreach}
                                    </dl>
                                </blockquote>
                            </div>  
                        </div>

                    </div>
                </div>
            </div>
        </div>
        {include file='include/ressource_js.tpl'}
    </body>
</html>
