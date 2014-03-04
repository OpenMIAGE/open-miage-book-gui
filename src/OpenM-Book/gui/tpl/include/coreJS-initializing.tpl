{if $debug}
    <script src="{$clients_js}"></script>
    <script src="{$root}js/?js={foreach from=$core_js item=js}{$js};{/foreach}"></script>
    <script src="{$root}js/?js={foreach from=$core_secondary_js item=js}{$js};{/foreach}"></script>
{/if}
<script type="text/javascript">
    {literal}
        $(function() {
            var progressBar = 0;
            var progressBarTimer = setInterval(function() {
                if (progressBar < 90) {
                    progressBar++;
                    $("#loader div div[class=progress-bar]").css("width", "" + progressBar + "%");
                }
                else
                    clearInterval(progressBarTimer);
            }, 100);
            OpenM_BookController.commons.URL.loader = "loader";
            var ressource = "{/literal}{$resources_dir}{literal}";
    {/literal}{include file='include/commonJS-initializing.tpl'}{literal}
            OpenM_BookController.commons.URL.jsLoadFinished = function() {
                clearInterval(progressBarTimer);
                progressBar = 90;
                $("#loader div div[class=progress-bar]").css("width", "" + progressBar + "%");
                OpenM_BookController.commons.URL.jsLoadFinished = function() {
                };
                OpenM_BookGUI.commons.initConst(OpenM_BookGUI.commons, "{/literal}{$config_path}home.{$lang}{literal}.xml");
                OpenM_BookGUI.commons.initConst(OpenM_BookGUI.community, "{/literal}{$config_path}community.{$lang}{literal}.xml");
                OpenM_BookGUI.commons.initConst(OpenM_BookGUI.user, "{/literal}{$config_path}user.{$lang}{literal}.xml");
                OpenM_BookGUI.commons.initConst(OpenM_BookGUI.search, "{/literal}{$config_path}search.{$lang}{literal}.xml");
                OpenM_BookGUI.Pages.ressource_dir = ressource;
                OpenM_BookGUI.Pages.userPhotoDefault = ressource + 'OpenM-Book/gui/img/userDefault.jpg';
                OpenM_BookGUI.Pages.divParentId = "divParent";
                OpenM_BookGUI.Pages.divJSON = "divJSON";
{/literal}{if $debug}OpenM_BookGUI.Pages.divJSONactivated = true;{/if}{literal}
                OpenM_SSOConnectionProxy.url = "{/literal}{$OpenM_ID_proxy.url}{literal}";
                OpenM_SSOConnectionProxy.session_mode = OpenM_SSOConnectionProxy.MODE_API_SELECTION;
                OpenM_SSOConnectionProxy.api_selected = "{/literal}{$OpenM_ID_proxy.api_selected}{literal}";
                OpenM_SSOConnectionProxy.waitingReConnectionTimeOut = 40;
                OpenM_APIProxy_AJAXController.addErrorListener(function(e, m) {
                    OpenM_BookController.error.onError(e, m);
                });
                progressBarTimer = setInterval(function() {
                    if (progressBar < 100) {
                        progressBar++;
                        $("#loader div div[class=progress-bar]").css("width", "" + progressBar + "%");
                    }
                    else
                        clearInterval(progressBarTimer);
                }, 100);
                OpenM_SSOConnectionProxy.isConnected(function() {
                    if (OpenM_SSOConnectionProxy.connected) {
                        OpenM_BookDAO.user.DAO.me = new OpenM_BookDAO.user.ExchangeObject();
                        OpenM_BookDAO.user.DAO.parseAndLoad($.parseJSON('{/literal}{$me}{literal}'), OpenM_BookDAO.user.DAO.me);
                        var allLoaded = function() {
                            if (!OpenM_BookDAO.user.DAO.me.loaded)
                                location.reload("{/literal}{$links.registration}{literal}");
                            $("#loader").remove();
                            OpenM_BookController.commons.URL.load();
{/literal}{if !$debug}
                            OpenM_BookController.commons.URL.jsLoad("{$root}js/?js={foreach from=$core_secondary_js item=js}{$js};{/foreach}&min");
{/if}{literal}
                            $("#OpenM_Book_CommonMenuBar_User").removeClass("hidden").click(function() {
                                OpenM_BookController.commons.URL.clickToUser();
                            }).find("span[class=hidden-xs]").text(" " + OpenM_BookDAO.user.DAO.me.name);
                            $("#OpenM_Book_CommonMenuBar_Search").removeClass("hidden").click(function() {
                                OpenM_BookController.commons.URL.clickToSearch();
                            }).find("span[class=hidden-xs]").text(" " + $("menu-bar > search > text", OpenM_BookGUI.community.cst).text());
                            $("#OpenM_Book_CommonMenuBar_Logout").removeClass("hidden").click(function() {
                                if (confirm($("logout > confirm-message", OpenM_BookGUI.community.cst).text())) {
                                    OpenM_BookController.commons.URL.clickToLogout();
                                }
                            }).find("span[class=hidden-xs]").text(" " + $("menu-bar > logout > text", OpenM_BookGUI.community.cst).text());
                            $("#OpenM_Book_CommonMenuBar_Home_Title").find("span[class=hidden-xs]").text(" " + $("menu-bar > home > text", OpenM_BookGUI.community.cst).text());
                        };
                        if (OpenM_BookController.commons.URL.isCommunityHash()) {
                            var community = OpenM_BookDAO.community.DAO.get(OpenM_BookController.commons.URL.getCommunityId(), false, false);
                            if (OpenM_BookController.commons.URL.getCommunityId() === undefined) {
                                community.ancestorsLoaded = true;
                                allLoaded();
                            }
                            else {
                                OpenM_BookDAO.community.DAO.getAncestors(community, false);
                                var communityAncestorLoaded = setInterval(function() {
                                    if (community.ancestorsLoaded === true) {
                                        clearInterval(communityAncestorLoaded);
                                        allLoaded();
                                    }
                                }, 10);
                            }
                        }
                        else
                            allLoaded();
                    }
                    else {
                        location.reload();
                    }
                });
            };
{/literal}{if !$debug}
            OpenM_BookController.commons.URL.jsLoad("{$clients_js}");
            OpenM_BookController.commons.URL.jsLoad("{$root}js/?js={foreach from=$core_js item=js}{$js};{/foreach}&min");{else}{literal}
            OpenM_BookController.commons.URL.jsLoadFinished();
    {/literal}{/if}{literal}
        });
            {/literal}
        </script>