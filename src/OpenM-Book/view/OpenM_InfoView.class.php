<?php

Import::php("OpenM-Book.view.OpenM_BookView");

/**
 * 
 *
 * @author Gael Saunier
 */
class OpenM_InfoView extends OpenM_BookView {
    
    
    public function index(){
        $this->addLinks();
        $this->addNavBarItems();
        
        if ($this->sso_book->isConnected()){
            $this->smarty->assign("connect", TRUE);
            $links = $this->smarty->getVariable("links");
            $links->value['registration']= OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::REGISTER_FORM)->getURL();
        }else
            $this->smarty->assign("connect", FALSE);
       
        

        
        $this->smarty->display("index.tpl");
    }
    
    
    public function _default() {
        $this->index();
    }

}
?>