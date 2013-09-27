<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <ul class="nav">{if $btn_navbar_left!==false}            
            <li>
                <a id="button-navbar-left" class="btn btn-navbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>  
            </li>
            <li class="divider-vertical"></li>{else}
            <li>&nbsp; &nbsp;</li>{/if}
            <li><a class="brand" class="text-center" href="{$root}#">OpenM-Book</a></li>                    
            <li class="divider-vertical"></li>{foreach from=$nav_bar item=menu}
            <li class="dropdown"><a class="dropdown-toggle"  {if $menu.items} data-toggle="dropdown"{/if} href="{$menu.link}"> {$menu.label} {if $menu.items}<b class="caret"></b>{/if} </a>{if $menu.items}
                <ul class="dropdown-menu">{foreach from=$menu.items item=item}
                    <li><a href="{$item.link}">{$item.label}</a></li>{/foreach}
                </ul>{/if}
            </li>{/foreach}
        </ul>
    </div>
</div>