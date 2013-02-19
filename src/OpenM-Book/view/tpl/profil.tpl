<!DOCTYPE HTML>
<html>
    <head>
        <title>Profil</title>
        {include file='include/head.tpl'}
    </head>
    <body>
    {include file='include/navBar.tpl'}
<div class="container-fluid">
    <div class="row-fluid">  
        <div class="alert alert-info alert-block span4 offset4">
            <button type="button" class="close">x</button>
            <h4>Hello!</h4> Welcom on your profile !
        </div> 
    </div>  
      <div class="row-fluid"> 
          <div class="span10 offset2">
               <img src="{$resources_dir}OpenM-Book/view/img/exemple_Profil.PNG">
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