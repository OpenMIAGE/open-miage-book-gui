<?php

Import::php("OpenM-Book.view.OpenM_BookView");
Import::php("OpenM-Book.view.OpenM_ProfileView");
/**
 * 
 *
 * @author Gael Saunier
 */
class OpenM_InfoView extends OpenM_BookView {

    const LOGIN_BUTTON_URL = "login_url";

    public function _default() {
        $connected = $this->isConnected(false);
        
        if (!$connected) {
            //visiteur
            $this->addLinks();
            $this->addNavBarItems();
            $this->smarty->assign(self::LOGIN_BUTTON_URL, OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::LOGIN_FORM)->getURL());
            $this->smarty->display("index.tpl");
        }
        else{
            //connecté => affichage du profil (ça peux changer)
             $profil_view = new OpenM_ProfileView();
              $profil_view->_default();  
        }           
    }

}

?>