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
                <div class="span9">
                    <img width="750" src="{$resources_dir}OpenM-Book/view/img/exemple_Profil.PNG">
                </div>
            </div>
            <div class="row-fluid">
                <div class="span9">
                    <p id="monNom" contenteditable="true">  {$nom} </p>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
                <div class="span1">Span 1</div>
            </div>
            <div class="row-fluid">
                <div    class="span2">span 2</div>
                <div    class="span2">span 2</div>
                <div    class="span2">span 2</div>
                <div    class="span2">span 2</div>
                <div    class="span2">span 2</div>
                <div    class="span2">span 2</div>
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