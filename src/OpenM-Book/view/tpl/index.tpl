<!DOCTYPE HTML>
<html>
    <head>
        <title>Open-MIAGE</title>
        {include file='include/head.tpl'}
    </head>
    <body>
        {include file='include/navBar.tpl'}
        <div class="container">
            <div class="row">
                {if $connect === TRUE}
                <div class="span6 offset2">
                    <label class="lead">Inscription sur Open-MIAGE</label>
                    <a href="{$links.registration}" class="btn btn-success btn-large"><i class="icon-white icon-plus-sign"></i> Inscription </a>
                </div>
                {else}
                <div class="span6 offset2">
                    <div class="row">
                        <p >Avant de pouvoir créer son profil sur OpenM-Book, il faut se connecter via son OpenM-ID.<br>Pour rappel un OpenM-ID permet d'acceder à la galaxie de service offert</p>
                        <!--(onclick="showElement('div_refresh');window.open(this.href); return false;)-->
                        <form method="GET" action="{$action}">
                          <label class="lead">Connxion sur OpenM-ID</label>
                          <input name="conn" type="hidden" value="ok">
                          <button class="btn btn-primary btn-large" type="submit"><i class="icon-white icon-user"></i> connexion</button>  
                        </form>
                         </div>
                    {/if}
                </div>
            </div>
        </div>
        {include file='include/ressource_js.tpl'}
    </body>
</html>