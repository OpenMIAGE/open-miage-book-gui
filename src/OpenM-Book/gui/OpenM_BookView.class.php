<?php

if (!Import::php("Smarty"))
    throw new ImportException("Smarty");

Import::php("OpenM-Services.gui.OpenM_ServiceViewSSO");
Import::php("util.session.OpenM_SessionController");
Import::php("OpenM-Book.api.OpenM_Book");
Import::php("OpenM-Book.api.OpenM_Book_User");
Import::php("OpenM-Book.api.OpenM_Groups");

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
abstract class OpenM_BookView extends OpenM_ServiceViewSSO {

    const ALERT = "alert";
    const MY_DATA = "me";
    const ALERT_TYPE = "alert_type";
    const ALERT_TYPE_DISPLAY_INFO = "alert-info";
    const ALERT_TYPE_DISPLAY_ERROR = "alert-error";
    const ALERT_TYPE_DISPLAY_DEFAULT = "";
    const ALERT_TYPE_DISPLAY_SUCCES = "alert-success";
    const ALERT_TITLE = "alert_title";
    const MENU_PROFILE = "menu_profile";
    const MENU_PROFILE_EDIT = "menu_profile_edit";
    const MENU_COMMUNITY = "menu_community";
    const SMARTY_OPENM_ID_PROXY_PATH = "OpenM_ID_proxy";
    const OPENM_ID_PROXY_PATH = "OpenM_ID.proxy.path";

    protected $sso_book;
    protected $bookClient;
    protected $userClient;
    protected $groupClient;
    protected $moderatorClient;
    protected $adminClient;
    protected $ssoProperties;

    public function __construct() {
        parent::__construct();
        $this->ssoProperties = Properties::fromFile($this->properties->get(self::SSO_CONFIG_FILE_PATH));
        $api_name = $this->ssoProperties->get(OpenM_SSOClientSessionManager::OpenM_SSO_API_PREFIX . OpenM_SSOClientPoolSessionManager::OpenM_SSO_API_NAME_SUFFIX);
        $this->sso_book = $this->manager->get($api_name, FALSE);
        $this->bookClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book");
        $this->userClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book_User");
        $this->groupClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Groups");
        $this->moderatorClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book_Moderator");
        $this->adminClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book_Admin");
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
            $this->sso_book->login(array(OpenM_ID::EMAIL_PARAMETER), true);
    }

    /**
     * Verrifi si on est Enregistrer, si oui savegarde les données user
     * @param type $retirectToRegistre
     */
    protected function isRegistred($retirectToRegistre = TRUE) {
        $me = null;
        try {
            $me = $this->userClient->getUserProperties();

            OpenM_Log::debug("user Properties found !", __CLASS__, __METHOD__, __LINE__);
            if ($me->containsKey(OpenM_Book_Const::RETURN_ERROR_PARAMETER)){
                if ($retirectToRegistre === TRUE)
                    OpenM_Header::redirect(OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::REGISTER_FORM)->getURL());
                else
                    return false;
            }
            OpenM_Log::debug("User conected, and registred", __CLASS__, __METHOD__, __LINE__);

            OpenM_SessionController::set(self::MY_DATA, $me);
            return true;
        } catch (Exception $e) { 
            
           

            if ($me !== null) {
                if ($me->containsKey(OpenM_Book_Const::RETURN_ERROR_PARAMETER)) {
                    if ($retirectToRegistre === TRUE)
                        OpenM_Header::redirect(OpenM_URLViewController::from(OpenM_RegistrationView::getClass(), OpenM_RegistrationView::REGISTER_FORM)->getURL());
                    else
                        return false;
                }
            }
            $message = "Une errueur interne viens d'etre déclanché.<br> Message : " . $e->getMessage();
            OpenM_Log::debug($message, __CLASS__, __METHOD__, __LINE__);
            $errorView = new OpenM_ErrorView();
            $errorView->error($message);
        }
    }

    protected function setDirs() {
        $this->smarty->setTemplateDir(dirname(__FILE__) . '/tpl/');
        $this->smarty->setConfigDir(dirname(__FILE__) . '/config/');
        $this->smarty->setCompileDir($this->template_c);
        $this->smarty->assign(self::SMARTY_RESOURCES_DIR_VAR_NAME, $this->ressources_dir);
        $this->smarty->assign(self::SMARTY_OPENM_ID_PROXY_PATH, array(
            "url" => $this->properties->get(self::OPENM_ID_PROXY_PATH),
            "api_selected" => $this->ssoProperties->get(OpenM_SSOClientSessionManager::OpenM_SSO_API_PREFIX . OpenM_SSOClientPoolSessionManager::OpenM_SSO_API_NAME_SUFFIX)
        ));
    }

    protected function addLinks() {
        $this->smarty->assign("links", array(
            "root" => OpenM_URLViewController::getRoot()
        ));
    }

    protected function addClientsJS() {
        $clientRoot = OpenM_URLViewController::getRoot() . "client/";
        $this->smarty->assign("clients_js", $clientRoot . "OpenM_Book;OpenM_Book_User;OpenM_Book_Moderator;OpenM_Book_Admin-min.js");
    }

    protected function addNavBarItems() {
        $this->smarty->assign("nav_bar", array(
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
                        "link" => "http://www.open-miage.org",
                        "blank" => true
                    ),
                    array(
                        "label" => "Team Open-MIAGE",
                        "link" => "http://www.open-miage.org/team.html",
                        "blank" => true
                    )
            ))
        ));
    }

    /**
     * Affiche une alert, peut etre utilisé deux deux façons. 
     * 1 - avec les parametres, affichage normal
     * 2 - sans parametre, irra chercher le message/titre/type dans la session 
     * (utiliser avant $this->setAlert(...))
     * L'affichage avec parametre prime sur le second
     * Les variables de session sont vidé si il y en a
     * @param string $message
     * @param string $titre
     * @param string $type
     */
    protected function showAlert($message = null, $titre = null, $type = self::ALERT_TYPE_DISPLAY_DEFAULT) {
        if ($message) {
            $this->smarty->assign(self::ALERT, $message);
            $this->smarty->assign(self::ALERT_TYPE, $type);
            if ($titre)
                $this->smarty->assign(self::ALERT_TITLE, $titre);
            if (OpenM_SessionController::contains(self::ALERT)) {
                OpenM_SessionController::remove(self::ALERT);
                OpenM_SessionController::remove(self::ALERT_TITLE);
                OpenM_SessionController::remove(self::ALERT_TYPE);
            }
        } else {
            if (OpenM_SessionController::contains(self::ALERT)) {
                OpenM_Log::debug("There is an alert : " . OpenM_SessionController::get(self::ALERT), __CLASS__, __METHOD__, __LINE__);
                $this->smarty->assign(self::ALERT, OpenM_SessionController::get(self::ALERT));
                OpenM_SessionController::remove(self::ALERT);
                if (OpenM_SessionController::contains(self::ALERT_TITLE)) {
                    $this->smarty->assign(self::ALERT_TITLE, OpenM_SessionController::get(self::ALERT_TITLE));
                    OpenM_SessionController::remove(self::ALERT_TITLE);
                }
                if (OpenM_SessionController::contains(self::ALERT_TYPE)) {
                    $this->smarty->assign(self::ALERT_TYPE, OpenM_SessionController::get(self::ALERT_TYPE));
                    OpenM_SessionController::remove(self::ALERT_TYPE);
                }
            }
        }
    }

    protected function setAlert($message, $titre = null, $type = self::ALERT_TYPE_DISPLAY_DEFAULT) {
        OpenM_SessionController::set(self::ALERT, $message);
        if ($titre)
            OpenM_SessionController::set(self::ALERT_TITLE, $titre);
        OpenM_SessionController::set(self::ALERT_TYPE, $type);
    }

}

Import::php("OpenM-Book.gui.OpenM_RegistrationView");
Import::php("OpenM-Book.gui.OpenM_CoreView");
?>