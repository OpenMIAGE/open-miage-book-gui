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
        $this->view();
    }

    public function view() {
        $this->isConnected();
        $this->smarty->assign(self::MENU_COMMUNITY, TRUE);
        $this->initPage();        
        $this->showAlert();
        $this->smarty->display('core.tpl');
    }

    private function initPage() {
        $this->isConnected();
        $this->addLinks();
        $this->addNavBarItems();
        $this->addClientsJS();
    }

}

?>