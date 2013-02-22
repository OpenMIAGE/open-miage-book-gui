<?php

if (!Import::php("Smarty"))
    throw new ImportException("Smarty");

Import::php("OpenM-Services.view.OpenM_ServiceViewSSO");
Import::php("util.session.OpenM_SessionController");

/**
 * 
 * @author Nicolas Rouzeaud & Gael SAUNIER
 */
abstract class OpenM_BookView extends OpenM_ServiceViewSSO {

    const ALERT = "alert";
    const MY_DATA = "me";

    protected $sso_book;
    protected $bookClient;
    protected $groupClient;

    public function __construct() {
        parent::__construct();
        $p2 = Properties::fromFile($this->properties->get(self::SSO_CONFIG_FILE_PATH));
        $api_name = $p2->get(OpenM_SSOClientSessionManager::OpenM_SSO_API_PREFIX . OpenM_SSOClientPoolSessionManager::OpenM_SSO_API_NAME_SUFFIX);
        $this->sso_book = $this->manager->get($api_name, FALSE);
        $this->bookClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book");
        $this->groupClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Groups");
        $this->setDirs();
    }

    /**
     * Permet de savoir si on est connecté au sso
     * @param Boolean $redirectToLogin si TRUE redirige vers la page de login
     * @return Boolean
     */
    protected function isConnected($redirectToLogin = true) {
        $isConnected = $this->sso_book->isConnected();

        if (!$isConnected && $redirectToLogin)
            OpenM_Header::redirect(OpenM_URLViewController::from(OpenM_RegistrationView, OpenM_RegistrationView::LOGIN_FORM)->getURL());
        else
            return $isConnected;
    }

    protected function setDirs() {
        $this->smarty->setTemplateDir(dirname(__FILE__) . '/tpl/');
        $this->smarty->setConfigDir(dirname(__FILE__) . '/config/');
        $this->smarty->setCompileDir($this->template_c);
        $this->smarty->assign(self::SMARTY_RESOURCES_DIR_VAR_NAME, $this->ressources_dir);
    }

    protected function addLinks() {
        
        $this->smarty->assign("links", array(
            "default" => OpenM_URLViewController::from()->getURL(),
            "root" => OpenM_URLViewController::getRoot(),
        ));
    }

    protected function addNavBarItems() {
        $this->smarty->assign("nav_bar", array(
            array(
                "label" => "home",
                "link" => OpenM_URLViewController::from()->getURL()
            ),
            array(
                "label" => "account",
                "items" => array(
                    array(
                        "label" => "login",
                        "link" => OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::LOGIN_FORM)->getURL()
                    ),
                    array(
                        "label" => "register",
                        "link" => OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::REGISTER_FORM)->getURL()
                    )
            )),
            array(
                "label" => "?",
                "items" => array(
                    array(
                        "label" => "Open-MIAGE",
                        "link" => "http://www.open-miage.org"
                    ),
                    array(
                        "label" => "Team Open-MIAGE",
                        "link" => "http://www.open-miage.org/la-team-open-miage.html"
                    )
            ))
        ));
    }

    protected function showAlert() {
        if (OpenM_SessionController::contains(self::ALERT)) {
            OpenM_Log::debug("There is an alert : " . OpenM_SessionController::get(self::ALERT), __CLASS__, __METHOD__, __LINE__);
            $this->smarty->assign(self::ALERT, OpenM_SessionController::get(self::ALERT));
            OpenM_SessionController::remove(self::ALERT);
        }
    }
    
    protected  function setAlert($message){
         OpenM_SessionController::set(self::ALERT,$message);
    }

}

Import::php("OpenM-Book.view.OpenM_RegistrationView");
Import::php("OpenM-Book.view.OpenM_InfoView");
?>