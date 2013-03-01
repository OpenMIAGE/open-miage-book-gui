<div class="navbar navbar-inverse">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <a class="brand" href="{$links.root}">Open-MIAGE</a>

            <div class="nav-collapse collapse"> 
                <ul class="nav">
                    <li class="divider-vertical"></li>
                    {foreach from=$nav_bar item=menu}
                        <li class="dropdown"><a class="dropdown-toggle"  {if $menu.items} data-toggle="dropdown"{/if} href="{$menu.link}"> {$menu.label} {if $menu.items}<b class="caret"></b>{/if} </a>
                            {if $menu.items}
                                <ul class="dropdown-menu">
                                    {foreach from=$menu.items item=item}
                                        <li><a href="{$item.link}">{$item.label}</a></li>
                                    {/foreach}
                                </ul>
                            {/if}
                        </li>
                    {/foreach}
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </div>
</div>