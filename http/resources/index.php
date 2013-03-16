<?php

require_once dirname(__DIR__) . '/src.php';

Import::php("util.pkg.OpenM_Dependencies");
$dependencies = new OpenM_Dependencies("../../lib");
$dependencies->addInClassPath(OpenM_Dependencies::DISPLAY, is_dir("../../src"));

Import::php("util.file.OpenM_FileLoader");
OpenM_FileLoader::handle();
?>