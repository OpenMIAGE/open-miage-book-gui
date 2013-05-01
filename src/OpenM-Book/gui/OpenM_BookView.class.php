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
    const ALERT_TYPE_DISPLAY_DEFAULT = ""; //vide d'origine
    const ALERT_TYPE_DISPLAY_SUCCES = "alert-success";
    const ALERT_TITLE = "alert_title";
    
    const MENU_PROFILE= "menu_profile";
    const MENU_PROFILE_EDIT = "menu_profile_edit";
    const MENU_COMMUNITY = "menu_community";

    protected $sso_book;
    protected $bookClient;
    protected $userClient;
    protected $groupClient;
    
    public function __construct() {
        parent::__construct();
        $p2 = Properties::fromFile($this->properties->get(self::SSO_CONFIG_FILE_PATH));
        $api_name = $p2->get(OpenM_SSOClientSessionManager::OpenM_SSO_API_PREFIX . OpenM_SSOClientPoolSessionManager::OpenM_SSO_API_NAME_SUFFIX);
        $this->sso_book = $this->manager->get($api_name, FALSE);
        $this->bookClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book");
        $this->userClient = new OpenM_ServiceSSOClientImpl($this->sso_book, "OpenM_Book_User");
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
            "profile" => OpenM_URLViewController::from(OpenM_ProfileView::getClass())->getURL(),
            "edit_profile" => OpenM_URLViewController::from(OpenM_ProfileView::getClass(), OpenM_ProfileView::EDIT_FROM)->getURL(),
            "community" => OpenM_URLViewController::from(OpenM_CommunityView::getClass())->getURL()."#/community/",
            "js_client" =>OpenM_URLViewController::getRoot()."client/?api_gen="
        ));
        
        OpenM_Log::debug(OpenM_URLViewController::getRoot()."client/?api_gen=", __CLASS__, __METHOD__,__LINE__);
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

    protected function setAlert($message, $titre=null, $type = self::ALERT_TYPE_DISPLAY_DEFAULT) {
        OpenM_SessionController::set(self::ALERT, $message);
        if ($titre)
            OpenM_SessionController::set(self::ALERT_TITLE, $titre);
        OpenM_SessionController::set(self::ALERT_TYPE, $type);
    }

}

Import::php("OpenM-Book.gui.OpenM_RegistrationView");
Import::php("OpenM-Book.gui.OpenM_InfoView");
Import::php("OpenM-Book.gui.OpenM_CommunityView");
?>