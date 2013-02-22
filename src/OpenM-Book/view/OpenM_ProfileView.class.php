<?php

Import::php("OpenM-Book.view.OpenM_BookView");

/**
 * 
 * @author Gaël Saunier
 */
class OpenM_ProfileView extends OpenM_BookView {

    const EDIT_FROM = "edit";
    const VIEW_FORM = "view";
    
    public function _default() {
        $this->view();
    }

    public function view() {
        $this->initPage();
        
        
        
        $me = OpenM_SessionController::get(self::MY_DATA);
        $this->smarty->assign("nom",$me->get("ULN"));
        $this->smarty->assign("prenom",$me->get("UFN"));
        
        
        $this->smarty->display('profil.tpl');
    }
    
    public function edit(){
        $this->initPage();
        
        $me = OpenM_SessionController::get(self::MY_DATA);
        $this->smarty->assign("nom",$me->get("ULN"));
        $this->smarty->assign("prenom",$me->get("UFN"));
        
        $this->smarty->display('edit_profile.tpl');
        
    }
    
    
    private function initPage(){
        $connected =  $this->isConnected();
        
        $this->addLinks();
        $this->addNavBarItems();
        
        $this->showAlert();
        
        $links = $this->smarty->getTemplateVars("links");  // Variable("links");
        $links['profile'] = OpenM_URLViewController::from(self::getClass())->getURL();
        $links['edit_profile'] = OpenM_URLViewController::from(self::getClass(), self::EDIT_FROM)->getURL();
        $this->smarty->assign("links",$links);
        
        
        
        
    }

}

?>