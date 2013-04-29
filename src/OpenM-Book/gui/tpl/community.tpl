<!DOCTYPE HTML>
<html>
    <head>
        <title>Community</title>
        {include file='include/head.tpl'}
        <style type="text/css">
            {literal}
                /*  [class*="span"]{
                border: black solid 1px;
                background-color: lightgreen;
                margin-bottom: 10px;
                border-radius: 5px 5px 5px 5px;

                text-align: center;
                }

                [class*="row"]{
                border: #3333ff solid 1px;
                }*/
            {/literal}
        </style>
        <link href="{$resources_dir}OpenM-Book/gui/css/css-community.css" rel="stylesheet" type="text/css" rel="stylesheet">

    </head>
    <body>
        {include file='include/navBar.tpl'}
        {include file='include/menu.tpl'}

        <div class="container-fluid container-withmenunavigation">
            {include file='include/alert.tpl'}


            <!-- Zone communauté  -->
            <div id="divParent" class="hero-unit"></div>
        </div>



        <script src="{$links.js_client}OpenM_Book&min"></script>        
        {include file='include/ressource_js.tpl'}

        <script src="{$resources_dir}OpenM-Book/gui/js/CommunityController.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/CommunityGui.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/CommunityDAO.js"></script>

        <script type="text/javascript">            
            {literal}$(function(){
                OpenM_Book_CommunityPagesGui.ressource_dir = "{/literal}{$resources_dir}{literal}";
                OpenM_Book_CommunityPagesGui.ressource_loader = 'OpenM-Book/gui/img/ajax-loader.gif';
                OpenM_Book_CommunityPagesGui.divParentId = "divParent";
                try{
                   OpenM_Book_CommunityPagesController.communityPage().display();
                }catch(err){
                   console.error(err);
                   OpenM_Book_CommunityPagesGui.showError("erreur inattendue s'est produite, message : " +err);     
                }                  
            });
            {/literal}</script>
    </body>
</html>