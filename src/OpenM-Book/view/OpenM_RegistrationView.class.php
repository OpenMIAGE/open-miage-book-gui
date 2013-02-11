<?php

Import::php("OpenM-Book.view.OpenM_BookView");
Import::php("OpenM-Controller.view.OpenM_URLViewController");

/**
 * 
 * @author Gaël Saunier
 * 
 */
class OpenM_RegistrationView extends OpenM_BookView {

    const LAST_NAME = "last_name";
    const FIRST_NAME = "first_name";
    const YEAR = "year";
    const MONTH = "month";
    const DAY = "day";
    const EMAIL = "email";
    const CGU = "cgu";
    const BIRTHDAY = "birthday";
    const ERROR = "error";
    const ERROR_MESSAGE = "error_message";
    const REGISTER_FORM = "register";
    const CONDITION_FORM = "condition";
    const LOGIN_FORM = "login";
    const SMARTY_REGISTER_KEYS_ARRAY = "register_form";

    public function _default() {
        $this->login();
    }

    public function login() {
        if ($this->sso_book->isConnected()) {
            OpenM_Header::redirect(OpenM_URLViewController::from()->getURL());
        } else {
            $this->sso_book->login(array(OpenM_ID::EMAIL_PARAMETER), TRUE);
            $this->register();
        }
    }

    public function register() {
        $error = FALSE;

        $param = HashtableString::from($_POST);

        if ($param->contains("submit")) {
            if ($param->get(self::LAST_NAME) == "") {
                $error = TRUE;
                $error_message = "veuillez saisir votre nom";
            }

            if ($param->get(self::FIRST_NAME) == "") {
                $error = TRUE;
                $error_message = "veuillez saisir votre prénom";
            }

            if ($param->get(self::DAY) == ""
                    || $param->get(self::YEAR) == ""
                    || $param->get(self::MONTH) == ""
                    || $param->get(self::MONTH) === 0) {
                $error = TRUE;
                $error_message = "veuillez saisir votre date de naissance correctement";
            } else if (!Float::isNumber($param->get(self::DAY))
                    || !Float::isNumber($param->get(self::MONTH))
                    || !Float::isNumber($param->get(self::YEAR))) {
                $error = TRUE;
                $error_message = "veuillez saisir votre date de naissance correctement";
            } else {
                $time = mktime(0, 0, 0, $param->get(self::DAY), $param->get(self::MONTH), $param->get(self::YEAR));
                if ($time === FALSE) {
                    $error = TRUE;
                    $error_message = "veuillez saisir votre date de naissance correctement";
                }
                $date = new Date();
            }

            $mail = $param->get(self::EMAIL);
            if ($mail == "") {
                $mail = $this->sso_book->getProperties()->get(OpenM_ID::EMAIL_PARAMETER);
                if ($mail == null) {
                    $error = TRUE;
                    $error_message = "veuillez saisir votre eMail";
                }
            }

            if ($param->get(self::CGU) == "") {
                $error = TRUE;
                $error_message = "veuillez accepter la charte pour continuer";
            }


            if (!$error) {
//            $clientBook = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book");
//            OpenM_Header::redirect(OpenM_URLViewController::from(OpenM_ProfileView::getClass())->getURL());
            }
        }
        else
            $mail = $this->sso_book->getProperties()->get(OpenM_ID::EMAIL_PARAMETER);


        $this->smarty->assign(self::SMARTY_REGISTER_KEYS_ARRAY, array(
            self::LAST_NAME => array(
                "key" => self::LAST_NAME,
                "label" => self::LAST_NAME,
                "value" => $param->get(self::LAST_NAME)
            ),
            self::FIRST_NAME => array(
                "key" => self::FIRST_NAME,
                "label" => self::FIRST_NAME,
                "value" => $param->get(self::FIRST_NAME)
            ),
            self::BIRTHDAY => "Birthday",
            self::DAY => array(
                "key" => self::DAY,
                "label" => self::DAY,
                "value" => $param->get(self::DAY)
            ),
            self::YEAR => array(
                "key" => self::YEAR,
                "label" => self::YEAR,
                "value" => $param->get(self::YEAR)
            ),
            self::EMAIL => array(
                "key" => self::EMAIL,
                "label" => self::EMAIL,
                "value" => $mail
            )
        ));

        $this->smarty->assign(self::SMARTY_REGISTER_KEYS_ARRAY . "_condition", OpenM_URLViewController::from(self::getClass(), self::CONDITION_FORM)->getURL());

        if ($error) {
            $this->smarty->assign(self::ERROR, $error);
            $this->smarty->assign(self::ERROR_MESSAGE, $error_message);
        }

        $this->addLinks();
        $this->addNavBarItems();
        $this->smarty->display('inscription.tpl');
    }

    public function condition() {
        $this->addLinks();
        $this->addNavBarItems();
        $this->smarty->display('condition.tpl');
    }

}

?>