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
    const MONTHNUM = "monthNum";
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
/**
 * @todo test existance dans OpenM_Book, si oui on redirige vers index, si non vers register
 */            
            //OpenM_Header::redirect(OpenM_URLViewController::from()->getURL());
            
            $this->register();
        } else {
            $this->sso_book->login(array(OpenM_ID::EMAIL_PARAMETER), TRUE);
        }
    }

    public function register() {
        
        if (!$this->sso_book->isConnected())
            $this->login ();
            
        /**
         * @todo  finir le test sur la date ! 
         */
        
        $error = FALSE;
        $param = HashtableString::from($_POST);
        if ($param->containsKey("submit")) { 
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
                    || $param->get(self::MONTHNUM)->toInt() === 0) {
                
                $error = TRUE;
                $error_message = "veuillez saisir votre date de naissance correctement 1";
            } else if (!Float::isNumber($param->get(self::DAY))
                    || !Float::isNumber($param->get(self::MONTHNUM))
                    || !Float::isNumber($param->get(self::YEAR))) {
                $error = TRUE;
                $error_message = "veuillez saisir votre date de naissance correctement 2";
            } else {
                $time = mktime(0, 0, 0, $param->get(self::DAY)->toInt(), $param->get(self::MONTHNUM)->toInt(), $param->get(self::YEAR)->toInt());
                if ($time === FALSE) {
                    $error = TRUE;
                    $error_message = "veuillez saisir votre date de naissance correctement 3";
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

            
            
            echo "<pre>";
            var_dump($param);
            echo "</pre>";

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
            self::MONTH => array(
                "key" => self::MONTH,
                "label" => self::MONTH,
                "idHiden" => self::MONTHNUM
            ),self::EMAIL => array(
                "key" => self::EMAIL,
                "label" => self::EMAIL,
                "value" => $mail
            ),
            self::CGU => self::CGU,
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