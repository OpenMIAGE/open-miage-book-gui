<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/homeCSS.tpl'}
    </head>
    <body>
        {include file='include/commonMenuBar.tpl'}
        <form id="home" class="home" action="{$links.login}" method="POST">
            <input type="hidden" name="login" value="new"/>
        </form>
        {include file='include/homeJS.tpl'}
        {include file='include/homeJS-initializing.tpl'}
    </body>
</html>