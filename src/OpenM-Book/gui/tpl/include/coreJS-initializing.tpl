{if $debug}
    <script src="{$clients_js}"></script>
    {foreach from=$core_js item=js}
        <script src="{$resources_dir}{$js}"></script> 
    {/foreach}
{/if}
<script type="text/javascript">
    {literal}
        $(function() {
            OpenM_URLController.loader = "loader";
            var ressource = "{/literal}{$resources_dir}{literal}";
            OpenM_URLController.jsLoadFinished = function() {
                OpenM_Book_PagesGui.ressource_dir = ressource;
                OpenM_Book_PagesGui.ressource_loader = 'OpenM-Book/gui/img/loader.gif';
                OpenM_Book_PagesGui.userPhotoDefault = 'OpenM-Book/gui/img/userDefault.png';
                OpenM_Book_PagesGui.divParentId = "divParent";
                OpenM_Book_PagesGui.divJSON = "divJSON";
                OpenM_MenuGUI.menuId = "menuDesktop";
                OpenM_MenuGUI.menuMobileId = "menuMobile";
                OpenM_SSOConnectionProxy.url = "{/literal}{$OpenM_ID_proxy.url}{literal}";
                OpenM_SSOConnectionProxy.session_mode = OpenM_SSOConnectionProxy.MODE_API_SELECTION;
                OpenM_SSOConnectionProxy.api_selected = "{/literal}{$OpenM_ID_proxy.api_selected}{literal}";
                OpenM_SSOConnectionProxy.timer_interval_reconnection = 2000;
                OpenM_SSOConnectionProxy.isConnected(function() {
                    if (OpenM_SSOConnectionProxy.connected) {
                        OpenM_Book_UserDAO.me = new OpenM_Book_UserExchangeObject();
                        OpenM_Book_UserDAO.parseAndLoad(JSON.parse('{/literal}{$me}{literal}'), OpenM_Book_UserDAO.me);
                        if (!OpenM_Book_UserDAO.me.loaded)
                            location.reload("{/literal}{$links.registration}{literal}");
                        OpenM_MenuGUI.init();
                        OpenM_URLController.load();
                    }
                    else {
                        location.reload();
                    }
                });
            }
    {/literal}{if !$debug}
            OpenM_URLController.jsLoad("{$clients_js}");
        {foreach from=$core_js item=js}
            OpenM_URLController.jsLoad(ressource + "{$js}");
        {/foreach}
    {else}{literal}
            OpenM_URLController.jsLoadFinished();
    {/literal}{/if}{literal}
        });
    {/literal}
</script>