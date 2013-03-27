<?php
Import::php("OpenM-Book.gui.OpenM_BookView");


/**
 * Description of OpenM_CommunityView
 *
 * @author Nico
 */
class OpenM_CommunityView extends OpenM_BookView {

    public function _default() {
        $this->view();
    }
    
    
    public function view() {
        
        $this->smarty->assign(self::MENU_COMMUNITY,TRUE);
        $this->initPage();
        
        
        
        $me = OpenM_SessionController::get(self::MY_DATA);
        
        $this->smarty->assign("nom",$me->get("ULN"));
        $this->smarty->assign("prenom",$me->get("UFN"));
        
        
        $this->showAlert();
        $this->smarty->display('community.tpl');
        
        
    }
    
    
     private function initPage(){
        $connected =  $this->isConnected();
        
        $this->addLinks();
        $this->addNavBarItems();
        
        
    }

}

?>
