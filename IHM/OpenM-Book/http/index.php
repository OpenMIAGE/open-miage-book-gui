<?php

define("OpenM_SERVICE_CONFIG_FILE_NAME", "../config.properties");

require_once 'src.php';
require_once 'lib.php';

Import::addClassPath();
Import::php("OpenM-Controller.view.OpenM_ViewDefaultServer");
OpenM_ViewDefaultServer::handle();
?>