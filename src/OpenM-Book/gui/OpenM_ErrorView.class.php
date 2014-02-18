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
 * @author Gaël Saunier & Nicolas Rouzeaud
 */
class OpenM_ErrorView extends OpenM_BookView {

    const ERROR_CODE = "error_code";
    const ERROR_MESSAGE = "error_message";
    const ERROR_TITLE = "error_title";
    const ERROR_DEFAULT_MESSAGE = "error_default_message";
    const ERROR_LINKS = "error_links";
    const DEFAULT_MESSAGE = "<h4>Ouups !!</h4><br/> Il semblerait que des lutins veuillent nuire au site :-(. <br/>Une erreur vient de ce produire.";

    public function error($message, $code = null, $titre = null) {
        $this->addLinks();
        $this->smarty->assign(self::ERROR_DEFAULT_MESSAGE, self::DEFAULT_MESSAGE);
        $this->smarty->assign(self::ERROR_MESSAGE, $message);
        //on rajoute les lien de proposition
        OpenM_Log::debug($message, __CLASS__, __METHOD__, __LINE__);
        /**
         * @todo faire la detection si on est en http ou https
         */
         $this->smarty->assign(self::ERROR_LINKS, array(
            array(
                "label" => "Profile : ",
                "link" => "http://".$_SERVER['HTTP_HOST'].OpenM_URLViewController::getRoot())
        ));

        if ($titre)
            $this->smarty->assign(self::ERROR_TITLE, $titre);
        if ($code)
            $this->smarty->assign(self::ERROR_CODE, $code);

        $this->smarty->display("error.tpl");
        exit();
    }

    public function _default() {
        $this->display404();
    }

    public function display404() {
        $this->error("La page que vous tenter d'acceder n'existe pas. (URL : " . "http://".$_SERVER['HTTP_HOST'].$_SERVER["REQUEST_URI"] . ")", 404);
    }

}

?>