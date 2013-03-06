<?php

if (!class_exists("Import")) {
    $util = dirname(__DIR__) . "/lib/openm.util.dependencies";
    if (is_file($util))
        $version = file_get_contents($util);
    else
        throw new Exception("lib OpenM.util version not found ($util)");

    $utilVersion = explode("=", $version);
    $utilVersion = $utilVersion[0];
    $util_suffix = "/lib/$utilVersion/Import.class.php";
    if (is_file(dirname(dirname(((__FILE__)))) . $util_suffix))
        require_once dirname(dirname(((__FILE__)))) . $util_suffix;
    else if (is_file(dirname(dirname(dirname(__FILE__))) . $util_suffix))
        require_once dirname(dirname(dirname(__FILE__))) . $util_suffix;
    else
        throw new Exception("lib $utilVersion not found");

    if (is_dir(dirname(__DIR__) . "/src"))
        Import::addClassPath(dirname(__DIR__) . "/src");
    else if (is_file(dirname(__DIR__) . "/lib/version")) {
        $version = file_get_contents(dirname(__DIR__) . "/lib/version");
        if (is_dir(dirname(__DIR__) . "/lib/$version"))
            Import::addClassPath(dirname(__DIR__) . "/lib/$version");
        else
            throw new ImportException(dirname(__DIR__) . "/lib/$version not found");
    }
    else
        throw new ImportException("sources dir not found not found");
}
?>