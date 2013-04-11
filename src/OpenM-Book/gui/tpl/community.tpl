<!DOCTYPE HTML>
<html>
    <head>
        <title>Community</title>
        {include file='include/head.tpl'}

        <style type="text/css">
            {literal}
                /*[class*="span"]{
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

            <div class="row-fluid">
                <div class="span9">
                    <h1>Communauté</h1>
                    <br/>
                    <span>Bonjour !</span>
                    <p id="monNom" contenteditable="true">{$nom} </p>
                    <br><br>
                    Le retour JSON : 
                    <pre id="retourJSON"></pre>
                </div>
            </div>


            <div class="hero-unit">     
                <div class="row-fluid">
                    <div id="navigation_div" class="span12" style="display: none">
                        navigation communauté<br><br>
                        <ul id="navigation_community" class="breadcrumb">
                        </ul>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        communauté contenu :<br><br>
                        <div id="zone_community">

                        </div>                    
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    Utilisateur dans la communauté<br><br>
                    <div id="user_community">
                    
                    </div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    utilisateur à valider
                </div>
            </div>    
            
        </div>


        {include file='include/ressource_js.tpl'}
        <script src="{$resources_dir}OpenM-Book/gui/js/js-community.js"></script>
        <script src="{$links.js_client}OpenM_Book"></script>
        
        <script type="text/javascript">            
         {literal}$(function(){
            ressources_dir = "{/literal}{$resources_dir}{literal}";
                
            showLoading();
            OpenM_Book.getCommunityChilds(null, retourGetCommunityChilds);
          });
         {/literal}</script>
        </body>
    </html>