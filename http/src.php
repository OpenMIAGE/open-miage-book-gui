<?php

if (!class_exists("Import")) {
    $version = file_get_contents(OpenM_SERVICE_CONFIG_DIRECTORY . "/OpenM_SSO.client.version");
    if (is_file(dirname(dirname(__DIR__)) . "/lib/$version/Import.class.php"))
        require_once dirname(dirname(__DIR__)) . "/lib/$version/Import.class.php";
    else if (is_file(dirname(dirname(dirname(dirname(__DIR__)))) . "/lib/$version/Import.class.php"))
        require_once dirname(dirname(dirname(dirname(__DIR__)))) . "/lib/$version/Import.class.php";
    else
        die("OpenM_SSO.client lib not found");

    if (is_dir(dirname(__DIR__) . "/src"))
        Import::addClassPath(dirname(__DIR__) . "/src");
    else if (is_file(OpenM_SERVICE_CONFIG_DIRECTORY . "/OpenM_Book.gui.version")) {
        $version = file_get_contents(OpenM_SERVICE_CONFIG_DIRECTORY . "/OpenM_Book.gui.version");
        if (is_dir(dirname(__DIR__) . "/lib/$version/"))
            Import::addClassPath(dirname(__DIR__) . "/lib/$version/");
    }
    else
        die("OpenM_Book GUI dir not found");
}
?>