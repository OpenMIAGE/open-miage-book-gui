<?php

require_once dirname(__DIR__) . '/src.php';
Import::addLibPath("bootstrap/2.2.2");
Import::addLibPath("html5shiv/3.6.1");
Import::addLibPath("jQuery/1.9.1");

Import::php("util.file.OpenM_FileLoader");
OpenM_FileLoader::handle();
?>