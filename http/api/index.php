<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';

Import::php("util.pkg.OpenM_Dependencies");
$dependencies = new OpenM_Dependencies("../../lib");
$dependencies->addInClassPath(OpenM_Dependencies::RUN, is_dir("../../src"));

Import::php("OpenM-SSO.client.OpenM_SSOClientPoolSessionManager");
$ssoManager = OpenM_SSOClientPoolSessionManager::fromFile(OpenM_SERVICE_CONFIG_DIRECTORY . "/OpenM_SSO.config.properties");
$sso = $ssoManager->get("OpenM_Book", false);

if (!$sso->isConnected()) {
    die(OpenM_MapConvertor::arrayToJSON(array(
                OpenM_Service::RETURN_ERROR_PARAMETER => "",
                OpenM_Service::RETURN_ERROR_MESSAGE_PARAMETER => "Not Connected"
            )));
}

Import::php("OpenM-Controler.client.OpenM_RESTControllerClient_JSONLocalServer");
$server = new OpenM_RESTControllerClient_JSONLocalServer($sso);
$server->handle();
?>