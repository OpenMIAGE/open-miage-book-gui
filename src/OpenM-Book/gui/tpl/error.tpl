<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/commonCSS.tpl'}
    </head>
    <body>
        {include file='include/commonMenuBar.tpl'}
        <div class="container openm-book-error">
            <img src="{$resources_dir}OpenM-Book/gui/img/error_cross.png" title="erreur" ALT="image erreur" align="center"  width="100" >
            <div>
                {$error_default_message}
            </div>
            <br><br>
            <span style="font-size: x-large"><b><u>{if $error_code}ERROR {$error_code}{else}Internal ERROR{/if}: </u></b></span>
            <br>
            {if $error_title}
                <span style="font-size: large"><b>{$error_title}</b></span>
                <br>
            {/if} 
            <p>{$error_message}</p> 
            <br><br>
            <blockquote>
                <p>Vous pouvez vous diriger vers :</p>
                <dl>
                    {foreach from=$error_links item=other_links}
                        <dt>{$other_links.label}</dt>
                        <dd><a href="{$other_links.link}">{$other_links.link}</a></dd>
                    {/foreach}
                </dl>
            </blockquote>
        </div>
        {include file='include/commonJS.tpl'}
    </body>
</html>
