{*Bare navigation mobile*}
<nav class="navbar navbar menunavigation-phone hidden-desktop">
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
                <li {if $menu_profile}class="active"{/if}><a href="{$links.profile}">Mon Profil</a></li>
                <li {if $menu_profile_edit}class="active"{/if}><a href="{$links.edit_profile}">Edition</a></li>
                <li {if $menu_community}class="active"{/if}><a href="{$links.community}">Communauté</a></li>
            </ul>
        </div> 
    </div>
</nav>
{*  Menu navigation DeskTop *}
<nav class=" visible-desktop">
    <div class="tabbable tabs-left  ">
        <ul class="nav nav-tabs nav-tabs-menunavigation">
            <li class="cadre-nom">
                <h3>{$prenom} </h3>
                <h3>{$nom}</h3>
            </li>
            <hr>
              <li {if $menu_profile}class="active"{/if}><a href="{$links.profile}">Mon Profil</a></li>
             <li {if $menu_profile_edit}class="active"{/if}><a href="{$links.edit_profile}">Edition</a></li>
            <li {if $menu_community}class="active"{/if}><a href="{$links.community}">Communauté</a></li>
        </ul>        
    </div>
</nav>