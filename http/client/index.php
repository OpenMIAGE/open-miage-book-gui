<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/lib.php';

Import::php("util.Properties");
Import::php("OpenM-Services.gui.OpenM_ServiceView");
$property = Properties::fromFile(OpenM_SERVICE_CONFIG_FILE_NAME);
OpenM_Log::init(OpenM_SERVICE_CONFIG_DIRECTORY . "/" .$property->get(OpenM_ServiceView::LOG_PATH_PROPERTY), $property->get(OpenM_ServiceView::LOG_LEVEL_PROPERTY), $property->get(OpenM_ServiceView::LOG_FILE_NAME), $property->get(OpenM_ServiceView::LOG_LINE_MAX_SIZE));

Import::addClassPath();
Import::php("OpenM-Services.gui.OpenM_APIProxy_JSGeneratorServer");
$server = new OpenM_APIProxy_JSGeneratorServer(Properties::fromFile(OpenM_SERVICE_CONFIG_FILE_NAME)->get("OpenM_ViewDefaultServer.root")."api/");
$server->handle();
?>
