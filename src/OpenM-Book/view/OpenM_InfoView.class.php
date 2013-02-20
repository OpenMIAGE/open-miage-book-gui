<?php

Import::php("OpenM-Book.view.OpenM_BookView");

/**
 * 
 *
 * @author Gael Saunier
 */
class OpenM_InfoView extends OpenM_BookView {

    const LOGIN_BUTTON_URL = "login_url";

    public function _default() {
        $connected = $this->isConnected(false);
        $this->addLinks();
        $this->addNavBarItems();
        if (!$connected) {
            $this->smarty->assign(self::LOGIN_BUTTON_URL, OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::LOGIN_FORM)->getURL());
            $this->smarty->display("index.tpl");
        }
        else{
            //todo
        }           
    }

}

?>