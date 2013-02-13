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
    
    
    public function index(){
        $this->addLinks();
        $this->addNavBarItems();

         if ( isset($_GET["conn"])){
             $this->isConnected(TRUE);
         }  else {
            //1er arrivée sur la page (faut tester si connecté et si existe
            // if ($this->isConnected()){
                 //je suis connecté
                 
                 
                 //redirection vers le profil
                //  OpenM_Header::redirect(OpenM_URLViewController::from(OpenM_ProfileView::getClass())->getURL() );    
          //   }else{
                 //je ne suis pas connecté
                 
          //   }
         }
           
        
        $this->smarty->display("index.tpl");
    }
    
    
    public function _default() {
        $this->index();
    }

}
?>