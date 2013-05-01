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
            <div id="divJSON"></div>
            <div id="divParent"></div>
        </div>

        {foreach from=$clients_js item=client_js}
            <script src="{$client_js}"></script>
        {/foreach}
        {include file='include/ressource_js.tpl'}

        <script src="{$resources_dir}OpenM-Book/gui/js/CommonController.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityController.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityGui.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityDAO.js"></script>

        <script type="text/javascript">            
            {literal}$(function(){
                OpenM_Book_CommunityPagesGui.ressource_dir = "{/literal}{$resources_dir}{literal}";
                OpenM_Book_CommunityPagesGui.ressource_loader = 'OpenM-Book/gui/img/ajax-loader.gif';
                OpenM_Book_CommunityPagesGui.divParentId = "divParent";
                OpenM_Book_CommunityPagesGui.divJSON = "divJSON";
                OpenM_URLController.load();
            });
            {/literal}</script>
    </body>
</html>