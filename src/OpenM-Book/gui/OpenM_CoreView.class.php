<?php

Import::php("OpenM-Book.gui.OpenM_BookView");
Import::php("util.JSON.OpenM_MapConvertor");

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
 * @author Nicolas Rouzeaud & Gael SAUNIER
 */
class OpenM_CoreView extends OpenM_BookView {

    public function _default() {
        $this->home();
    }

    public function home() {
        $this->sso_book->checkAuth(array(OpenM_ID::EMAIL_PARAMETER));
        if ($this->sso_book->isConnected()) {
            $this->core();
        } else {
            $this->addLinks();
            $this->addNavBarItems();
            $this->addClientsJS();
            $this->showAlert();
            $this->setDebugMode();
            $this->smarty->assign("btn_navbar_left",false);
            $this->smarty->display('home.tpl');
        }
    }

    public function core() {
        $me = $this->isRegistered();
        $this->smarty->assign("me", OpenM_MapConvertor::mapToJSON($me));
        $this->addLinks();
        $this->addClientsJS();
        $this->showAlert();
        $this->setDebugMode();
        $this->smarty->assign("core_js", array(
            "OpenM-Book/gui/js/CommonGUI.js",
            "OpenM-Book/gui/js/menuGUI.js",
            "OpenM-Book/gui/js/community/CommunityController.js",
            "OpenM-Book/gui/js/community/CommunityDAO.js",
            "OpenM-Book/gui/js/community/CommunityGUI.js",
            "OpenM-Book/gui/js/user/UserDAO.js",
            "OpenM-Book/gui/js/user/UserController.js",
            "OpenM-Book/gui/js/user/UserGUI.js"
        ));
        $this->smarty->display('core.tpl');
    }

}

?>