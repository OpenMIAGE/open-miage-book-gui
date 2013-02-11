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
        $this->addLinks();
        $this->smarty->display('profil.tpl');
    }

}

?>