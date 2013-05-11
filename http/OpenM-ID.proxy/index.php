<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/lib.php';

Import::php("OpenM-ID.client.OpenM_IDLoginClientServer");
$server = new OpenM_IDLoginClientServer(OpenM_SERVICE_CONFIG_DIRECTORY."/OpenM_SSO.config.properties");
$server->handle();
?>