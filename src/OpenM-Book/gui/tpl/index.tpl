<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
    </head>
    <body>
        {include file='include/navBar.tpl'}
        {include file='include/menu.tpl'}
       
        <div class="container">
            <div class="row">
               test
                <!-- {if $connect === TRUE}
                    <div class="span6 offset2">
                        <label class="lead">Inscription sur Open-MIAGE</label>
                        <a href="{$links.registration}" class="btn btn-success btn-large"><i class="icon-white icon-plus-sign"></i> Inscription </a>
                    </div>
                {else}
                    <div class="span6 offset2">
                        <div class="row">
                            <!--<p >Avant de pouvoir créer son profil sur OpenM-Book, il faut se connecter via son OpenM-ID.<br>Pour rappel un OpenM-ID permet d'acceder à la galaxie de service offert</p>-->
                            <!--(onclick="showElement('div_refresh');window.open(this.href); return false;)-->
                            <a href="{$login_url}" class="btn btn-success btn-large"><i class="icon-white icon-user"></i> Login</a>
                        </div>
                    {/if}
                        -->
                </div>
            </div>
        </div>
        {include file='include/ressource_js.tpl'}
    </body>
</html>