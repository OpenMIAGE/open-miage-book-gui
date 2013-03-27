<!DOCTYPE HTML>
<html>
    <head>
        <title>Community</title>
        {include file='include/head.tpl'}

        <style type="text/css">
            {literal}
                [class*="span"]{
                    border: black solid 1px;
                    background-color: lightgreen;
                    margin-bottom: 10px;
                    border-radius: 5px 5px 5px 5px;
                    /*   line-height: 80px;*/
                    text-align: center;
                }

                [class*="row"]{
                    border: #3333ff solid 1px;
                }
            {/literal}
        </style>

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
                </div>
            </div>
            <div class="row-fluid">
                <div class="span4 offset4" >
                    <a id="ajoutLigneCommu" href="#" class="btn btn-info btn-large"><i class="icon-white icon-plus"></i> Ajouter ligne</a>
                    <a id="supprLigneCommu" href="#" class="btn btn-danger btn-large"><i class="icon-white icon-remove"></i> Supprimer ligne</a>
                    <br>
                    <a id="addcomu" href="#" class="btn btn-inverse btn-large"><i class="icon-white icon-thumbs-up"></i> +1 commu</a>
                </div>
            </div>
            <br><br>

            <div class="row-fluid">
                <div class="span12">
                    communauté<br><br>

                    <div id="end_commu" ></div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    Utilisateur dans la communauté
                </div>
            </div>

            <div class="row-fluid">
                <div class="span12">
                    utilisateur à valider
                </div>
            </div>

        </div>


        {include file='include/ressource_js.tpl'}
        <script type="text/javascript">
            {literal}
            
            nbLigne = 0;
            nbCommu = 0;
            oldNbCommu = 0;
            
             $('#ajoutLigneCommu').bind('click', function(){
                 oldNbCommu = nbCommu;
                     
                 nbLigne++;
                 nbCommu = 1;
                var newLigne = " <div id='newLigneCommu"+nbLigne  +"' class='row-fluid'> <div id='Commu"+ nbLigne  + "-"   +  nbCommu +"' class=' span3'>Communauté "+ nbLigne  + "-"   +  nbCommu +"</div></div>";
              $('#end_commu').before(newLigne);
                   return false;
            });
                
            $('#supprLigneCommu').bind('click', function(){
                if (nbLigne != 0){
                        $("#newLigneCommu"+nbLigne).remove();
                        nbLigne--; 
                        nbCommu = oldNbCommu;
                    }
            return false;            
           });  
               
           $('#addcomu ').bind('click', function(){
                 nbCommu++;
                var newCommu = "<div id='Commu"+ nbLigne  + "-"   +  nbCommu +"' class=' span3'>Communauté "+ nbLigne  + "-"   +  nbCommu +"</div>";
              $("#newLigneCommu"+nbLigne).append(newCommu);
                   return false;
            });
            {/literal}
        </script>



    </body>
</html>