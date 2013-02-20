<?php

Import::php("OpenM-Book.view.OpenM_BookView");

/**
 * 
 * @author Gaël Saunier
 */
class OpenM_ProfileView extends OpenM_BookView {

    public function _default() {
        $this->view();
    }

    public function view() {
       $connected =  $this->isConnected();
        
        $this->addLinks();
        $this->addNavBarItems();
        $this->smarty->display('profil.tpl');
    }

}

?>