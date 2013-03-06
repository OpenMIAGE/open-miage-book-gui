<?php

Import::php("util.pkg.OpenM_Dependencies");
$dependencies = new OpenM_Dependencies(dirname(__DIR__) . "/lib");
$dependencies->addInClassPath(OpenM_Dependencies::RUN, is_dir(dirname(__DIR__) . "/src"));
?>