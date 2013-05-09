<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
{include file='include/head.tpl'}
{include file='include/coreCSS.tpl'}
    </head>
    <body>
{include file='include/navBar.tpl'}
        <nav id="menuMobile"></nav>
        <nav id="menuDesktop"></nav>
        <div id="loader" style="z-index: -1; position: absolute;left: 50%; top: 50%; margin-left: -16px; margin-top: -16px; ">
            <img src="{$resources_dir}OpenM-Book/gui/img/loader.gif"/>
        </div>
        <div class="container-fluid container-withmenunavigation">
{include file='include/alert.tpl'}
            <div id="divParent"></div>
            <div id="divJSON"></div>
        </div>
{include file='include/coreJS.tpl'}

/*
<script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityController.js"></script>
<script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityDAO.js"></script>*/

        <script type="text/javascript">            
            {literal}$(function(){
                OpenM_URLController.loader = "loader";
                var ressource_js = "{/literal}{$resources_dir}{literal}";
                OpenM_URLController.jsLoadFinished = function(){
                    OpenM_Book_CommunityPagesGui.ressource_dir = "{/literal}{$resources_dir}{literal}";
                    OpenM_Book_CommunityPagesGui.ressource_loader = 'OpenM-Book/gui/img/ajax-loader.gif';
                    OpenM_Book_CommunityPagesGui.userPhotoDefault = 'OpenM-Book/gui/img/userDefault.png';    
                    OpenM_Book_CommunityPagesGui.divParentId = "divParent";
                    OpenM_Book_CommunityPagesGui.divJSON = "divJSON";
                        
                        var me = JSON.parse('{/literal}{$me}{literal}');
                        
                        
                    OpenM_Book_UserDAO.me.isAdmin = true;
                    OpenM_Book_UserDAO.me.firstName = me.UFN;
                    OpenM_Book_UserDAO.me.lastName = me.ULN;
                    OpenM_Book_UserDAO.me.id= me.UID;
                    OpenM_MenuGUI.menuId = "menuDesktop";
                    OpenM_MenuGUI.menuMobileId = "menuMobile";
                    OpenM_MenuGUI.init();
                    OpenM_URLController.load();
                }
                OpenM_URLController.jsLoad("{/literal}{$clients_js}{literal}");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/community/CommunityController.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/community/CommunityDAO.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/community/CommunityGUI.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/user/UserDAO.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/menuGUI.js");
            });
            {/literal}</script>
    </body>
</html>