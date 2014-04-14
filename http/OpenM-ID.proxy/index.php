<?php

require_once dirname(__DIR__) . '/src.php';
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/lib.php';

Import::php("util.Properties");
Import::php("OpenM-Services.gui.OpenM_ServiceViewSSO");
$property = Properties::fromFile(OpenM_SERVICE_CONFIG_FILE_NAME);
OpenM_Log::init(dirname(OpenM_SERVICE_CONFIG_FILE_NAME) . "/" . $property->get(OpenM_ServiceView::LOG_PATH_PROPERTY), $property->get(OpenM_ServiceView::LOG_LEVEL_PROPERTY), $property->get(OpenM_ServiceView::LOG_FILE_NAME), $property->get(OpenM_ServiceView::LOG_LINE_MAX_SIZE));

Import::php("OpenM-SSO.client.OpenM_SSOClientConnectionManagerServer");
$server = new OpenM_SSOClientConnectionManagerServer(dirname(OpenM_SERVICE_CONFIG_FILE_NAME) ."/". $property->get(OpenM_ServiceViewSSO::SSO_CONFIG_FILE_PATH));
$server->handle();
?>