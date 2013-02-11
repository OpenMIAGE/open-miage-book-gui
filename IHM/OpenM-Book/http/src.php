<?php

$version = file_get_contents(dirname(dirname(__FILE__))."/OpenM_SSO.client.version");

if (!defined("OpenM_Import")) {
    if (is_file(dirname(dirname(__DIR__)) . "/lib/$version/Import.class.php"))
        require_once dirname(__DIR__) . "/lib/$version/Import.class.php";
    else if (is_file(dirname(dirname(dirname(dirname(__DIR__)))) . "/lib/$version/Import.class.php"))
        require_once dirname(dirname(dirname(dirname(__DIR__)))) . "/lib/$version/Import.class.php";
    else
        die("OpenM_SSO.client lib not found");
    
    if (is_dir(dirname(__DIR__) . "/src"))
        Import::addClassPath(dirname(__DIR__) . "/src");
    else if (is_dir(dirname(dirname(dirname(__DIR__))) . "/src"))
        Import::addClassPath(dirname(dirname(dirname(__DIR__))) . "/src");
    else
        die("src dir not found");
    define("OpenM_Import", true);
}
?>