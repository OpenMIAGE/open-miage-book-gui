<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/lib.php';

Import::php("OpenM-SSO.client.OpenM_SSOClientConnectionManagerServer");
$server = new OpenM_SSOClientConnectionManagerServer(OpenM_SERVICE_CONFIG_DIRECTORY."/OpenM_SSO.config.properties", false);
$server->handle();
?>