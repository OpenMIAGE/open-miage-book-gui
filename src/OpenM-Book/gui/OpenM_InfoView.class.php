<?php

Import::php("OpenM-Book.gui.OpenM_BookView");
Import::php("OpenM-Book.gui.OpenM_ProfileView");

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
 * @author Gael Saunier
 */
class OpenM_InfoView extends OpenM_BookView {

    const LOGIN_BUTTON_URL = "login_url";

    public function _default() {
        $connected = $this->isConnected(false);
        
        if (!$connected) {
            //visiteur
            $this->addLinks();
            $this->addNavBarItems();
            $this->smarty->assign(self::LOGIN_BUTTON_URL, OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::LOGIN_FORM)->getURL());
            $this->smarty->display("index.tpl");
        }
        else{
            //connecté => affichage du profil (ça peux changer)
            OpenM_Log::debug("User cconnected, redirect to Profil", __CLASS__, __METHOD__, __LINE__);
             $profil_view = new OpenM_ProfileView();
             $profil_view->_default();  
        }           
    }

}

?>