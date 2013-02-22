<!DOCTYPE HTML>
<html>
    <head>
        <title>Profil</title>
        {include file='include/head.tpl'}
    </head>
    <body>
        {include file='include/navBar.tpl'}
        
        
    <nav class="navbar navbar-inverse navbar-tablette hidden-desktop">
                    <div class="navbar-inner">
                        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </a>
                        <a class="brand" href="#">{$prenom} <br>{$nom}</a>
                        <div class="nav-collapse collapse">
                            <ul class="nav">
                                <li class="divider-vertical"></li>
                                <li ><a href="{$links.profile}">Mon Profil</a></li>
                                <li class="active"><a href="{$links.edit_profile}">Edition</a></li>
                                <li><a href="#">Communauté</a></li>
                            </ul>
                        </div> 
                    </div>
                </nav>
                                
                                
        <div class="container-fluid container-custom">
            <div class="row-fluid">
                {*  Menu d'onglet à gauche *}
                <nav class="span2 visible-desktop">
                    <div class="tabbable tabs-left  ">
                        <ul class="nav nav-tabs nav-tabs-custom">
                            <li class="cadre-nom">
                                <h3>{$prenom} </h3>
                                <h3>{$nom}</h3>
                            </li>
                           {* <li class="divider-onglet"></li>*}
                             <hr>
                            <li ><a href="{$links.profile}" >Mon Profil</a></li>
                            <li class="active"><a href="{$links.edit_profile}" >Edition</a></li>
                            <li ><a href="#">Communauté</a></li>
                        </ul>        
                    </div>
                </nav>



                <div class="span9 offset1">
                    {if $alert}
                        <div class="row-fluid">  
                            <div class="alert alert-info alert-block span4 offset4">
                                <button type="button" class="close">x</button>
                                {$alert}
                            </div> 
                        </div>
                    {/if}
                    <div class="row-fluid">
                        <div class="span9">
                            <h3>Page d'édition du profil</h3> 
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span4">
                            <span>Nom : </span> <p class="edit" id="monNom" contenteditable="true">  {$nom} </p>
                        </div>
                        <div class="span4">
                            <span>Prénom :</span><p class="edit" id="prenom" contenteditable="true">  {$prenom} </p>
                        </div>
                    </div>   
                </div>  


            </div>
        </div>


        {include file='include/ressource_js.tpl'}
        {literal}
            <script>
                $(function (){
                    $('.close').click(function() {
                        $('.alert').hide('slow');
                        $('#afficher').show();
                    });});
            </script>
        {/literal}
    </body>
</html>