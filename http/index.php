<?php

require_once 'config.php';
require_once 'src.php';
require_once 'lib.php';

Import::addClassPath();
Import::php("OpenM-Controller.gui.OpenM_ViewDefaultServer");
OpenM_ViewDefaultServer::handle();
?>