<?php

Import::php("OpenM-Book.view.OpenM_BookView");

/**
 * Description of OpenM_ErrorView
 *
 * @author Gaël Saunier
 */
class OpenM_ErrorView extends OpenM_BookView {

    const ERROR_CODE = "error_code";
    const ERROR_MESSAGE = "error_message";

    public function _default() {
        $this->display404();
    }

    public function display404() {
        $this->error("Page not found: " . $_SERVER["REQUEST_URI"], 404);
    }

    public function error($message, $code = null) {
        $this->addLinks();
        $this->addNavBarItems();
        $this->smarty->assign(self::ERROR_CODE,$code);
        $this->smarty->assign(self::ERROR_MESSAGE,$message);
        $this->smarty->display('error.tpl');
    }

}

?>