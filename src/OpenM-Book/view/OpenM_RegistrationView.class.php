<?php

Import::php("OpenM-Book.view.OpenM_BookView");
Import::php("OpenM-Controller.view.OpenM_URLViewController");
Import::php("OpenM-Services.client.OpenM_ServiceSSOClientImpl");

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

    /***
     * Méthode permetant d'envoyer l'utilisateur vers la page d'authetification (OpenM_ID) 
     * puis de rediriger vers l'index ou la méthode register si l'utilisateur n'existe pas dans OpenM_Book
     */
    public function login() {
       		OpenM_Log::debug("Methode LOGIN", __CLASS__, __METHOD__, __LINE__);
       
       		//envois vers la page de connection OpenM_ID
            $this->sso_book->login(array(OpenM_ID::EMAIL_PARAMETER), TRUE);
           
           //apres le succes de login
            
            /**
             * @todo test existance dans OpenM_Book, si oui on redirige vers index, si non vers register
             */
            
        try {
            $me = $this->bookClient->getUserProperties();
            //todo saved in session $me and redirect
            OpenM_Header::redirect(OpenM_URLViewController::from()->getURL());
        } catch (Exception $e) {
            OpenM_Header::redirect(OpenM_URLViewController::from(self::getClass(), self::REGISTER_FORM)->getURL());
        }
    }

    public function register() {

        $this->isConnected();

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

            $day = $param->get(self::DAY)->toInt();
            $month = $param->get(self::MONTHNUM)->toInt();
            $year = $param->get(self::YEAR)->toInt();
            if ($day === 0 || $year === 0 || $month === 0) {
                $error = TRUE;
                $error_message = "veuillez saisir votre date de naissance correctement";
            } else {
                $time = mktime(0, 0, 0, $day, $month, $year);
                if ($time === FALSE) {
                    $error = TRUE;
                    $error_message = "veuillez saisir votre date de naissance correctement";
                }
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
                $clientBook = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book");
                try {
                    //  $retour =  $clientBook->registerMe($param->get(self::FIRST_NAME) , $param->get(self::LAST_NAME) , $time);
                    //  echo "<pre>";
                    //   var_dump($retour);
                    // echo "</pre>";
                } catch (Exception $e) {
                    //  echo "<pre>";
                    //  var_dump($e);
                    // echo "</pre>";
                }


                
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
            ), self::EMAIL => array(
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