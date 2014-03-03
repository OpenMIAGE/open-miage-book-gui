<?php

Import::php("OpenM-Book.gui.OpenM_BookView");
Import::php("OpenM-Controller.gui.OpenM_URLViewController");
Import::php("OpenM-Services.client.OpenM_ServiceSSOClientImpl");
Import::php("OpenM-Mail.api.OpenM_MailTool");
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

    const REGISTER_FORM = "register";
    const CONDITION_FORM = "condition";
    const LOGIN_FORM = "login";
    const LOGOUT_FORM = "logout";

    public function _default() {
        $this->login();
    }

    public function login() {
        if ($_POST["login"] == "new")
            $this->sso->reset();
        $this->sso->login(array(OpenM_ID::EMAIL_PARAMETER), true);
        $this->_redirect();
    }

    public function logout() {
        $this->sso->logout(false);
        $this->_redirect();
    }

    const MAIL_PARAMETER = "mail";
    const SMARTY_MAIL = self::MAIL_PARAMETER;
    const FIRST_NAME_PARAMETER = "first_name";
    const SMARTY_FIRST_NAME = self::FIRST_NAME_PARAMETER;
    const LAST_NAME_PARAMETER = "last_name";
    const SMARTY_LAST_NAME = self::LAST_NAME_PARAMETER;
    const BIRTHDAY_PARAMETER = "birthday";
    const SMARTY_BIRTHDAY = self::BIRTHDAY_PARAMETER;
    const SMARTY_ERROR = "error";
    const SMARTY_HEAD = "head";
    const SMARTY_ACTION = "action";
    const SMARTY_MAIL_NOT_VALID = "mail_not_valid";
    const SMARTY_FIRST_NAME_NOT_VALID = "first_name_not_valid";
    const SMARTY_LAST_NAME_NOT_VALID = "last_name_not_valid";
    const SMARTY_BIRTHDAY_NOT_VALID = "birthday_not_valid";
    const SMARTY_BIRTHDAY_TOO_YOUNG = "birthday_too_young";
    const SMARTY_BIRTHDAY_TOO_OLD = "birthday_too_old";
    const SMARTY_IS_RESPONSE = "isResponse";
    const SMARTY_VERSION = "version";

    public function register() {
        OpenM_Log::debug("check if a user is connected", __CLASS__, __METHOD__, __LINE__);
        if (!$this->isConnected())
            $this->_redirect();

        $error = array();

        OpenM_Log::debug("no user registered", __CLASS__, __METHOD__, __LINE__);
        $post = HashtableString::from($_POST);
        if ($post->containsKey(self::FIRST_NAME_PARAMETER)) {
            $this->smarty->assign(self::SMARTY_IS_RESPONSE, true);
            if ($post->get(self::FIRST_NAME_PARAMETER) == "") {
                OpenM_Log::debug("first name not defined", __CLASS__, __METHOD__, __LINE__);
                $error = array(
                    self::SMARTY_FIRST_NAME => self::SMARTY_FIRST_NAME_NOT_VALID
                );
            } else if ($post->get(self::LAST_NAME_PARAMETER) == "") {
                OpenM_Log::debug("last name not defined", __CLASS__, __METHOD__, __LINE__);
                $error = array(
                    self::SMARTY_LAST_NAME => self::SMARTY_LAST_NAME_NOT_VALID
                );
            } else if ($post->get(self::BIRTHDAY_PARAMETER) == "") {
                OpenM_Log::debug("birthday not defined", __CLASS__, __METHOD__, __LINE__);
                $error = array(
                    self::SMARTY_BIRTHDAY => self::SMARTY_BIRTHDAY_NOT_VALID
                );
            } else {
                if (!RegExp::preg("/^[1-9]{4}-[0-9]{2}-[0-9]{2}$/", $post->get(self::BIRTHDAY_PARAMETER)) &&
                        !RegExp::preg("/^[0-9]{2}\/[0-9]{2}\/[1-9]{4}$/", $post->get(self::BIRTHDAY_PARAMETER))) {
                    OpenM_Log::debug("birthday bad defined", __CLASS__, __METHOD__, __LINE__);
                    $error = array(
                        self::SMARTY_BIRTHDAY => self::SMARTY_BIRTHDAY_NOT_VALID
                    );
                } else {
                    if (RegExp::preg("/^[0-9]{2}\/[0-9]{2}\/[1-9]{4}$/", $post->get(self::BIRTHDAY_PARAMETER)))
                        $date = date_parse_from_format("m/d/Y", $post->get(self::BIRTHDAY_PARAMETER));
                    else
                        $date = date_parse_from_format("Y-m-d", $post->get(self::BIRTHDAY_PARAMETER));
                    OpenM_Log::debug("birthday correctly defined : " . $post->get(self::BIRTHDAY_PARAMETER), __CLASS__, __METHOD__, __LINE__);
                    $time = mktime(0, 0, 0, $date["month"], $date["day"], $date["year"]);
                    OpenM_Log::debug("birthday parse : $time", __CLASS__, __METHOD__, __LINE__);
                    if ($time === false) {
                        $error = array(
                            self::SMARTY_BIRTHDAY => self::SMARTY_BIRTHDAY_NOT_VALID
                        );
                    } else if (!OpenM_MailTool::isEMailValid($post->get(self::MAIL_PARAMETER))) {
                        $error = array(
                            self::SMARTY_MAIL => self::SMARTY_MAIL_NOT_VALID
                        );
                    } else {
                        OpenM_Log::debug("Given mail is valid", __CLASS__, __METHOD__, __LINE__);
                        try {
                            $this->userClient->registerMe($post->get(self::FIRST_NAME_PARAMETER), $post->get(self::LAST_NAME_PARAMETER), $time, $post->get(self::MAIL_PARAMETER));
                            $this->_redirect();
                        } catch (OpenM_HttpError_BadRequest $e) {
                            $arrayCode = array();
                            preg_match("/\[ERRNO:-?[0-9]+\]/", $e->getMessage(), $arrayCode);
                            $softwareCode = null;
                            if (sizeof($arrayCode) > 0)
                                $softwareCode = intval(substr($arrayCode[0], 7, -1));
                            switch ($softwareCode) {
                                case OpenM_Book_User::RETURN_ERROR_CODE_FIRST_NAME_BAD_FORMAT_VALUE;
                                    $error = array(
                                        self::SMARTY_FIRST_NAME => self::SMARTY_FIRST_NAME_NOT_VALID
                                    );
                                    break;
                                case OpenM_Book_User::RETURN_ERROR_CODE_LAST_NAME_BAD_FORMAT_VALUE;
                                    $error = array(
                                        self::SMARTY_LAST_NAME => self::SMARTY_LAST_NAME_NOT_VALID
                                    );
                                    break;
                                case OpenM_Book_User::RETURN_ERROR_CODE_BIRTHDAY_BAD_FORMAT_VALUE;
                                    $error = array(
                                        self::SMARTY_BIRTHDAY => self::SMARTY_BIRTHDAY_NOT_VALID
                                    );
                                    break;
                                case OpenM_Book_User::RETURN_ERROR_CODE_TOO_YOUNG_VALUE;
                                    $error = array(
                                        self::SMARTY_BIRTHDAY => self::SMARTY_BIRTHDAY_TOO_YOUNG
                                    );
                                    break;
                                case OpenM_Book_User::RETURN_ERROR_CODE_TOO_OLD_VALUE;
                                    $error = array(
                                        self::SMARTY_BIRTHDAY => self::SMARTY_BIRTHDAY_TOO_OLD
                                    );
                                    break;
                                case OpenM_Book_User::RETURN_ERROR_CODE_MAIL_BAD_FORMAT_VALUE;
                                    $error = array(
                                        self::SMARTY_MAIL => self::SMARTY_MAIL_NOT_VALID
                                    );
                                    break;
                                default:
                                    $error = array(
                                        self::SMARTY_HEAD => self::SMARTY_BIRTHDAY_NOT_VALID
                                    );
                                    break;
                            }
                        } catch (Exception $e) {
                            $this->sso->reset();
                            $this->_redirect();
                        }
                    }
                }
            }
        }

        if ($post->containsKey(self::MAIL_PARAMETER) && $post->get(self::MAIL_PARAMETER) != "")
            $this->smarty->assign(self::SMARTY_MAIL, $post->get(self::MAIL_PARAMETER));
        else
            $this->smarty->assign(self::SMARTY_MAIL, $this->sso->getProperties()->get(OpenM_ID::EMAIL_PARAMETER));

        $this->smarty->assign(self::SMARTY_FIRST_NAME, $post->get(self::FIRST_NAME_PARAMETER));
        $this->smarty->assign(self::SMARTY_LAST_NAME, $post->get(self::LAST_NAME_PARAMETER));
        $this->smarty->assign(self::SMARTY_BIRTHDAY, $post->get(self::BIRTHDAY_PARAMETER));
        $this->smarty->assign(self::SMARTY_ERROR, $error);
        $this->setDebugMode();
        $this->setLang();
        $this->smarty->assign(self::SMARTY_VERSION, self::VERSION);
        $this->smarty;
        $this->smarty->display('register.tpl');
    }

    public function condition() {
        $this->setLang();
        $this->smarty->display('condition.tpl');
    }

}

?>