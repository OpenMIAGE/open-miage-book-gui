{if $debug}
    <script src="{$clients_js}"></script>
    {foreach from=$core_js item=js}
        <script src="{$resources_dir}{$js}"></script> 
    {/foreach}
{/if}
<script type="text/javascript">
    {literal}
        $(function() {
            OpenM_BookController.commons.URL.loader = "loader";
            var ressource = "{/literal}{$resources_dir}{literal}";
            OpenM_BookController.commons.URL.jsLoadFinished = function() {
                OpenM_BookController.commons.URL.jsLoadFinished = function() {
                };
                OpenM_BookGUI.commons.initConst(OpenM_BookGUI.community, "{/literal}{$config_path}{literal}gui.community.xml");
                OpenM_BookGUI.commons.initConst(OpenM_BookGUI.user, "{/literal}{$config_path}{literal}gui.user.xml");
                OpenM_BookGUI.Pages.ressource_dir = ressource;
                OpenM_BookGUI.Pages.ressource_loader = 'OpenM-Book/gui/img/loader.gif';
                OpenM_BookGUI.Pages.userPhotoDefault = 'OpenM-Book/gui/img/userDefault.png';
                OpenM_BookGUI.Pages.divParentId = "divParent";
                OpenM_BookGUI.Pages.divJSON = "divJSON";
{/literal}{if $debug}OpenM_BookGUI.Pages.divJSONactivated = true;{/if}{literal}
                OpenM_BookGUI.menu.Left.menuId = "menuDesktop";
                OpenM_BookGUI.menu.Left.menuMobileId = "menuMobile";
                OpenM_SSOConnectionProxy.url = "{/literal}{$OpenM_ID_proxy.url}{literal}";
                OpenM_SSOConnectionProxy.session_mode = OpenM_SSOConnectionProxy.MODE_API_SELECTION;
                OpenM_SSOConnectionProxy.api_selected = "{/literal}{$OpenM_ID_proxy.api_selected}{literal}";
                OpenM_SSOConnectionProxy.timer_interval_reconnection = 2000;
                OpenM_SSOConnectionProxy.isConnected(function() {
                    if (OpenM_SSOConnectionProxy.connected) {
                        OpenM_BookDAO.user.DAO.me = new OpenM_BookDAO.user.ExchangeObject();
                        OpenM_BookDAO.user.DAO.parseAndLoad(JSON.parse('{/literal}{$me}{literal}'), OpenM_BookDAO.user.DAO.me);
                        if (!OpenM_BookDAO.user.DAO.me.loaded)
                            location.reload("{/literal}{$links.registration}{literal}");
                        OpenM_BookGUI.menu.Left.init();
                        OpenM_BookController.commons.URL.load();
                    }
                    else {
                        location.reload();
                    }
                });
            };
{/literal}{if !$debug}
            OpenM_BookController.commons.URL.jsLoad("{$clients_js}");
    {foreach from=$core_js item=js}
            OpenM_BookController.commons.URL.jsLoad(ressource + "{$js}");
    {/foreach}
{else}{literal}
            OpenM_BookController.commons.URL.jsLoadFinished();
{/literal}{/if}{literal}
        });
{/literal}
</script>