<?php

Import::php("OpenM-Book.view.OpenM_BookView");

/**
 * Description of OpenM_ErrorView
 *
 * @author Nico
 */
class OpenM_ErrorView extends OpenM_BookView {
    /*     * *
     * Affiche une page d'erreur
     */

    public function error($message, $titre = null, $code = null) {
        $this->addLinks();
        $this->addNavBarItems();

        $this->smarty->assign("error_message", $message);

        if ($titre)
            $this->smarty->assign("error_title", $titre);

        if ($code)
            $this->smarty->assign("error_code", $code);
        
        $this->smarty->display("error.tpl");
    }

    public function _default() {
       $this->error('default call',"titre erreur","code 01");
        // $this->error('default call');
    }

}

?>
