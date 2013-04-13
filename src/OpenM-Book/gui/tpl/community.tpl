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
            
            <div class="row-fluid"><div class="span12">Le retour JSON : <br><pre><code id="retourJSON">  </code></pre></div></div>

            <!-- Zone communauté  -->
            <div class="hero-unit">                
                <div class="row-fluid">
                    <div id="navigation_div" class="span10 well" style="display: none">
                        <span>Communauté en cours :</span><br><br>
                        <ul id="navigation_community" class="breadcrumb">
                        </ul>
                    </div>
                </div>
                <div id="action" class="row-fluid" style="display: none">
                    <div class="span10 well">
                        <span>Action Possible :</span>
                        <div id="action_container" class="row-fluid">
                        </div>
                    </div>                
                </div>
               
                <div class="row-fluid">
                    <div class="span10 well">
                        <legend>Contenu de la communauté :<span class="name-community"></span></legend>
                        <div id="div_community_container" class="row-fluid">
                            <div class="span10">
                                <p>Les sous-communautées :</p>
                                <div id="community_container" class="row-fluid">
                                </div>
                            </div>
                        </div>
                        <br>
                        
                        <div class="row-fluid">
                            <div class="span10">
                                <p>Utilisateur dans la communauté :</p>
                                <div id="user_community">
                                    No body :(
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
            <!-- FIN Zone communauté  -->
            
            
            <div class="row-fluid">
                <div class="span12">
                    
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