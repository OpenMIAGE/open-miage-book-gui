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
        $this->smarty->display("index.tpl");
        
        
    }
    
    
    public function _default() {
        $this->index();
    }

}
?>