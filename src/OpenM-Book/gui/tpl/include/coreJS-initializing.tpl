{literal}
OpenM_Book_PagesGui.ressource_dir = "{/literal}{$resources_dir}{literal}";
OpenM_Book_PagesGui.ressource_loader = 'OpenM-Book/gui/img/loader.gif';
OpenM_Book_PagesGui.userPhotoDefault = 'OpenM-Book/gui/img/userDefault.png';    
OpenM_Book_PagesGui.divParentId = "divParent";
OpenM_Book_PagesGui.divJSON = "divJSON";
OpenM_MenuGUI.menuId = "menuDesktop";
OpenM_MenuGUI.menuMobileId = "menuMobile";                        
OpenM_SSOClientConnectionManager.url = "{/literal}{$OpenM_ID_proxy.url}{literal}";    
OpenM_SSOClientConnectionManager.session_mode = OpenM_SSOClientConnectionManager.MODE_API_SELECTION;
OpenM_SSOClientConnectionManager.api_selected = "{/literal}{$OpenM_ID_proxy.api_selected}{literal}";
OpenM_SSOClientConnectionManager.timer_interval_reconnection = 2000;
OpenM_SSOClientConnectionManager.isConnected(function(){
    if(OpenM_SSOClientConnectionManager.connected){
        OpenM_Book_UserDAO.me = new OpenM_Book_UserExchangeObject();
        OpenM_Book_UserDAO.parseAndLoad(JSON.parse('{/literal}{$me}{literal}'), OpenM_Book_UserDAO.me);
        if(!OpenM_Book_UserDAO.me.loaded)
            location.reload("{/literal}{$links.registration}{literal}");
        OpenM_MenuGUI.init();
        OpenM_URLController.load();                             
    }
    else{
        location.reload();
    }
});{/literal}