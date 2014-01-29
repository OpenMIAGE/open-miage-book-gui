<?php

Import::php("OpenM-Book.gui.OpenM_BookView");
Import::php("OpenM-Controller.gui.OpenM_URLViewController");
Import::php("OpenM-Services.client.OpenM_ServiceSSOClientImpl");
Import::php("util.session.OpenM_SessionController");

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
 * 
 */
class OpenM_RegistrationView extends OpenM_BookView {

    const LAST_NAME = "last_name";
    const FIRST_NAME = "first_name";
    const YEAR = "year";
    const MONTH = "month";
    const MONTHNUM = "monthNum";
    const DAY = "day";
    const EMAIL = "mail";
    const CGU = "cgu";
    const BIRTHDAY = "birthday";
    const REGISTER_FORM = "register";
    const CONDITION_FORM = "condition";
    const LOGIN_FORM = "login";
    const LOGOUT_FORM = "logout";
    const SMARTY_REGISTER_KEYS_ARRAY = "form";
    const ERROR_SUFFIX = ".error";

    public function _default() {
        $this->login();
    }

    public function login() {
        if ($_POST["login"] == "new")
            $this->sso->init();
        $this->sso->login(array(OpenM_ID::EMAIL_PARAMETER), true);
        OpenM_Header::redirect(OpenM_URLViewController::getRoot());
    }

    public function logout() {
        $this->sso->logout(false);
        OpenM_Header::redirect(OpenM_URLViewController::getRoot());
    }

    private function checkForm($param, &$mail, &$error, &$error_message) {
        $mail = "";
        if ($param->containsKey("submit")) {
            if ($param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::LAST_NAME) == "") {
                $error = true;
                $error_message = self::LAST_NAME . self::ERROR_SUFFIX;
                return false;
            }
            if ($param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::FIRST_NAME) == "") {
                $error = true;
                $error_message = self::FIRST_NAME . self::ERROR_SUFFIX;
                return false;
            }
            $birthday = $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::BIRTHDAY);
            if ($birthday == "") {
                $error = true;
                $error_message = self::BIRTHDAY . self::ERROR_SUFFIX;
                return false;
            } else {
                $time = date_parse($birthday);
                if ($time === false) {
                    $error = true;
                    $error_message = self::BIRTHDAY . self::ERROR_SUFFIX;
                    return false;
                }
            }
            $mail = $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::EMAIL);
            if ($mail == "") {
                $mail = $this->sso->getProperties()->get(OpenM_ID::EMAIL_PARAMETER);
                if ($mail == null) {
                    $error = true;
                    $error_message = self::EMAIL . self::ERROR_SUFFIX;
                    return false;
                }
            }

            if ($param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::CGU) != "on") {
                $error = true;
                $error_message = self::CGU . self::ERROR_SUFFIX;
                return false;
            }
        } else {
            $mail = $this->sso->getProperties()->get(OpenM_ID::EMAIL_PARAMETER);
            return false;
        }

        return true;
    }

    public function register() {
        if (!$this->isConnected())
            OpenM_Header::redirect(OpenM_URLViewController::getRoot());

        $error = false;
        $error_message = "";
        $param = HashtableString::from($_POST);
        $mail = "";
        if ($this->checkForm($param, $mail, $error, $error_message)) {
            try {
                $date = date_parse_from_format("Y-m-d", $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::BIRTHDAY));
                $time = mktime(0, 0, 0, $date["month"], $date["day"], $date["year"]);
                if ($time === false) {
                    $error = true;
                    $error_message = "bad date format";
                }
                $this->userClient->registerMe(
                        $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::FIRST_NAME), $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::LAST_NAME), $time, $mail);
                OpenM_Header::redirect(OpenM_URLViewController::getRoot());
            } catch (Exception $e) {
                $error = true;
                $error_message = $e->getMessage();
            }
        }

        $this->smarty->assign(self::SMARTY_REGISTER_KEYS_ARRAY, array(
            self::LAST_NAME => $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::LAST_NAME) . "",
            self::FIRST_NAME => $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::FIRST_NAME) . "",
            self::BIRTHDAY => $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::BIRTHDAY) . "",
            self::EMAIL => $mail . "",
            self::CGU => $param->get(self::SMARTY_REGISTER_KEYS_ARRAY . "_" . self::CGU) == "on",
        ));

        $this->smarty->assign(self::SMARTY_REGISTER_KEYS_ARRAY . "_condition", OpenM_URLViewController::from(self::getClass(), self::CONDITION_FORM)->getURL());

        if ($error) {
            $this->showAlert($error_message, null, self::ALERT_TYPE_DISPLAY_ERROR);
        }

        $this->addLinks();
        $this->addNavBarItems();
        $this->showAlert();
        $this->setDebugMode();
        $this->setLang();
        $this->smarty->assign("btn_navbar_left", false);
        $this->smarty->display('register.tpl');
    }

    public function condition() {
        $this->addLinks();
        $this->addNavBarItems();
        $this->setLang();
        $this->smarty->display('condition.tpl');
    }

}

?>