<!DOCTYPE HTML>
<html>
    <head>
        <title>Profil</title>
        {include file='include/head.tpl'}
    </head>
    <body>
        {include file='include/navBar.tpl'}
        {include file='include/menu.tpl'}
    
      <div class="container-fluid container-withmenunavigation">
          {include file='include/alert.tpl'}

            <div class="row-fluid">
                <div class="span9 offset1">
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