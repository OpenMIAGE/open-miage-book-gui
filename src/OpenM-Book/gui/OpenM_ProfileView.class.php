<?php

Import::php("OpenM-Book.gui.OpenM_BookView");

/**
 * 
 * @package OpenM  
 * @subpackage OpenM\OpenM-Book\gui
 * @license http://www.apache.org/licenses/LICENSE-2.0 Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @link http://www.open-miage.org
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
        $this->smarty->assign(self::MENU_PROFILE,TRUE);
        $this->smarty->assign("nom",$me->get(OpenM_Book::RETURN_USER_LAST_NAME_PARAMETER));
        $this->smarty->assign("prenom",$me->get(OpenM_Book::RETURN_USER_FIRST_NAME_PARAMETER));
        
        
        $this->showAlert();
        $this->smarty->display('profil.tpl');
    }
    
    public function edit(){
        $this->smarty->assign(self::MENU_PROFILE_EDIT,TRUE);
        $this->initPage();
        
        $me = OpenM_SessionController::get(self::MY_DATA);
        $this->smarty->assign("nom",$me->get("ULN"));
        $this->smarty->assign("prenom",$me->get("UFN"));
        
    
        
        $this->showAlert();
        $this->smarty->display('edit_profile.tpl');
    }
    
    
    private function initPage(){
        $connected =  $this->isConnected();
        
        $this->addLinks();
        $this->addNavBarItems();
        
        
    }

}

?>