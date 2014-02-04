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
        $this->sso->checkAuth(array(OpenM_ID::EMAIL_PARAMETER));
        if ($this->sso->isConnected()) {
            $this->core();
        } else {
            $this->addLinks();
            $this->addNavBarItems();
            $this->addClientsJS();
            $this->showAlert();
            $this->setDebugMode();
            $this->setLang();
            $this->smarty->assign("btn_navbar_left", false);
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
        $this->setLang();
        $this->smarty->assign("core_js", array(
            "OpenM-Book/gui/js/GUI/CommonGUI.js",
            "OpenM-Book/gui/js/Controller/menuController.js",
            "OpenM-Book/gui/js/GUI/menuGUI.js",
            "OpenM-Book/gui/js/DAO/CommunityDAO.js",
            "OpenM-Book/gui/js/Controller/CommunityController.js",
            "OpenM-Book/gui/js/GUI/CommunityGUI.js",
            "OpenM-Book/gui/js/DAO/UserDAO.js",
            "OpenM-Book/gui/js/Controller/UserController.js",
            "OpenM-Book/gui/js/GUI/UserGUI.js",
            "OpenM-Book/gui/js/DAO/searchDAO.js",
            "OpenM-Book/gui/js/Controller/searchController.js",
            "OpenM-Book/gui/js/GUI/searchGUI.js"
        ));
        $this->smarty->display('core.tpl');
    }

}

?>