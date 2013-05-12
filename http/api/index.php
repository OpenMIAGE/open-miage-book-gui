<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/lib.php';

Import::php("OpenM-SSO.client.OpenM_SSOClientPoolSessionManager");
$ssoManager = OpenM_SSOClientPoolSessionManager::fromFile(OpenM_SERVICE_CONFIG_DIRECTORY . "/OpenM_SSO.config.properties");
$sso = $ssoManager->get("OpenM_Book", false);

Import::php("OpenM-Controller.client.OpenM_RESTControllerClient_JSONLocalServer");
$server = new OpenM_RESTControllerClient_JSONLocalServer($sso);
$server->handle();
?>