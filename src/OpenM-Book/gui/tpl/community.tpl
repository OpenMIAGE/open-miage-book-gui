<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        <link href="{$resources_dir}OpenM-Book/gui/css/css-community.css" rel="stylesheet" type="text/css" rel="stylesheet">
    </head>
    <body>
        {include file='include/navBar.tpl'}
        {include file='include/menu.tpl'}

        <div class="container-fluid container-withmenunavigation">
            {include file='include/alert.tpl'}
            <div id="divParent"></div>
            <div id="divJSON"></div>
        </div>

        {include file='include/ressource_js.tpl'}

        <script type="text/javascript">            
            {literal}$(function(){
                OpenM_Book_CommunityPagesGui.ressource_dir = "{/literal}{$resources_dir}{literal}";
                OpenM_Book_CommunityPagesGui.ressource_loader = 'OpenM-Book/gui/img/ajax-loader.gif';
                OpenM_Book_CommunityPagesGui.divParentId = "divParent";
                OpenM_Book_CommunityPagesGui.divJSON = "divJSON";                    
                OpenM_Book_UserDAO.me.isAdmin = {/literal}{if $isAdmin}true{else}false{/if}{literal};
                OpenM_URLController.load();
            });
            {/literal}</script>
    </body>
</html>