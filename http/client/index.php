<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/lib.php';

Import::addClassPath();
Import::php("OpenM-Services.gui.OpenM_ServiceClientJSGeneratorServer");
$server = new OpenM_ServiceClientJSGeneratorServer(Properties::fromFile(OpenM_SERVICE_CONFIG_FILE_NAME)->get("OpenM_ViewDefaultServer.root")."client/");
$server->handle();
?>