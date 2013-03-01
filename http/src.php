<?php

if (!class_exists("Import")) {
    if (is_file(dirname(__DIR__) . "/lib/OpenM.util.version"))
        $version = file_get_contents(dirname(__DIR__) . "/lib/OpenM.util.version");
    else
        throw new Exception("lib OpenM.util version not found");

    $utilVersion = explode("=", $version);
    $utilVersion = $utilVersion[0];
    $util_suffix = "/lib/$utilVersion/Import.class.php";
    if (is_file(dirname(dirname(((__FILE__)))) . $util_suffix))
        require_once dirname(dirname(((__FILE__)))) . $util_suffix;
    else if (is_file(dirname(dirname(dirname(__FILE__))) . $util_suffix))
        require_once dirname(dirname(dirname(__FILE__))) . $util_suffix;
    else
        throw new Exception("lib $utilVersion not found");
}

require_once 'lib.php';
?>