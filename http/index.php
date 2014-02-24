<?php

require_once 'config.php';
require_once 'src.php';
require_once 'lib.php';

Import::php("util.Properties");
Import::php("OpenM-Services.gui.OpenM_ServiceView");
$property = Properties::fromFile(OpenM_SERVICE_CONFIG_FILE_NAME);
OpenM_Log::init(OpenM_SERVICE_CONFIG_DIRECTORY . "/" . $property->get(OpenM_ServiceView::LOG_PATH_PROPERTY), $property->get(OpenM_ServiceView::LOG_LEVEL_PROPERTY), $property->get(OpenM_ServiceView::LOG_FILE_NAME), $property->get(OpenM_ServiceView::LOG_LINE_MAX_SIZE));

Import::addClassPath();
Import::php("OpenM-Controller.gui.OpenM_ViewDefaultServer");
OpenM_ViewDefaultServer::handle();
?>