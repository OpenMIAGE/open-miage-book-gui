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

    const ERROR_CODE = "error_code";
    const ERROR_MESSAGE = "error_message";
    const ERROR_TITLE = "error_title";
    const ERROR_DEFAULT_MESSAGE = "error_default_message";
    const ERROR_LINKS = "error_links";
    const DEFAULT_MESSAGE = "<h4>Ouups !!</h4><br/> Il semblerait que des lutins veuillent nuire au site :-(. <br/>Une erreur vient de ce produire.";
    

    public function error($message,  $code = null, $titre = null) {
        $this->addLinks();
        $this->addNavBarItems();

        $this->smarty->assign(self::ERROR_DEFAULT_MESSAGE,  self::DEFAULT_MESSAGE);
        $this->smarty->assign(self::ERROR_MESSAGE,$message);
        
        //on rajoute les lien de proposition
        
         $this->smarty->assign(self::ERROR_LINKS, array(
            array(
                "label" => "Profile : ",
                "link" =>  OpenM_URLViewController::from(OpenM_ProfileView::getClass())-> getURL() )
             ));
        
        if ($titre)
            $this->smarty->assign(self::ERROR_TITLE, $titre);
        if ($code)
           $this->smarty->assign(self::ERROR_CODE,$code);
        
        $this->smarty->display("error.tpl");
    }

    public function _default() {
       $this->display404();
    }

	 public function display404() {
        $this->error("La page que vous tenter d'acceder n'existe pas. (URL : " . $_SERVER["REQUEST_URI"].")", 404);
    }


}

?>
