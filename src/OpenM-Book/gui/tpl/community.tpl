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
            
        {include file='include/ressource_js.tpl'}

        <script type="text/javascript">            
            {literal}$(function(){
                OpenM_Book_CommunityPagesGui.ressource_dir = "{/literal}{$resources_dir}{literal}";
                OpenM_Book_CommunityPagesGui.ressource_loader = 'OpenM-Book/gui/img/ajax-loader.gif';
                OpenM_Book_CommunityPagesGui.divParentId = "divParent";
                OpenM_Book_CommunityPagesGui.divJSON = "divJSON";
                
                //todo a faire evoluer
                OpenM_Book_Users.me = JSON.parse('{/literal}{$UserJSON}{literal}');    
                OpenM_Book_Users.me[OpenM_Book_User.RETURN_USER_IS_ADMIN_PARAMETER]  =  (OpenM_Book_Users.me[OpenM_Book_User.RETURN_USER_IS_ADMIN_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE)?true:false;
                
                OpenM_URLController.load();
            });
            {/literal}</script>
    </body>
</html>