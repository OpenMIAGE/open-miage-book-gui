<?php

Import::php("OpenM-Book.view.OpenM_BookView");
Import::php("OpenM-Book.view.OpenM_InfoView");
Import::php("OpenM-Book.view.OpenM_ProfileView");
Import::php("OpenM-Book.view.OpenM_RegistrationView");

/**
 * 
 *
 * @author Gael Saunier
 */
class OpenM_InfoView extends OpenM_BookView {

    public function index() {
       
        
        if (isset($_GET["conn"])) {
            $this->isConnected(TRUE);
        } else {
            if ($this->isConnected(FALSE)) {
                //je suis connecté redirection vers profil ...
               $profil_view = new OpenM_ProfileView();
               $profil_view->_default();
          } else {
                $this->addLinks();
                $this->addNavBarItems();
                $this->smarty->display("index.tpl");
            }
        }
    }

    public function _default() {
        $this->index();
    }

}

?>