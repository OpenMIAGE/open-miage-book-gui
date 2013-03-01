<?php

/**
 * recover OpenM.util package
 */
$util = explode("=", file_get_contents("lib/OpenM.util.version"));
$lib = "http://open-miage.org/download/" . $util[0] . "/" . $util[1];
$lib_dir = "../lib";
if (!is_dir($lib_dir)) {
    if (mkdir($lib_dir))
        echo " - $lib_dir <b>created</b><br>";
    else
        die("<h1>error occurs during creation of $lib_dir</h1>");
}
$lib_abs_dir = realpath($lib_dir);
$target = "$lib_abs_dir/temp/";
if (!is_dir($target))
    mkdir($target);

$targetZip = $target . $util[1];
if (copy($lib, $targetZip))
    echo " - $lib <b>copied to</b> $targetZip<br>";
else
    die("<h1>error occurs during copy of $lib</h1>");

$zip = new ZipArchive();
$res = $zip->open($targetZip);
if ($res === TRUE) {
    if ($zip->extractTo($target))
        echo " - $targetZip <b>unZip in</b> $target<br>";
    else
        die("<h1>error occurs during unZip of $targetZip</h1>");
    $zip->close();
    if (unlink($targetZip))
        echo " - $targetZip <b>correctly removed</b><br>";
    else
        die("<h1>error occurs during removing $targetZip</h1>");

    require_once $target . "lib/" . $util[0] . "/Import.class.php";
    Import::php("util.file.OpenM_Dir");
    OpenM_Dir::cp($target . "lib/", $lib_abs_dir);
    echo " - $target" . "lib/ <b>correctly copied in</b> $lib_abs_dir<br>";
    echo ' - lib OpenM.util succesfully installed !<br>';
}
else
    die('<h1>error occurs</h1>');

/**
 * recover OpenM packages
 */
Import::php("util.Properties");
Import::php("util.OpenM_Dir");
$libs = Properties::fromFile("lib/install.int.lib.version");
$prefix = $libs->get("install.int.lib.prefix");
$e = $libs->getAll()->keys();
while ($e->hasNext()) {
    $lib_path = $e->next();
    if ($lib_path == "install.int.lib.prefix")
        continue;
    $lib_file = $libs->get($lib_path);
    $lib = $prefix . $lib_path . "/" . $lib_file;
    $targetZip = $target . $lib_file;
    OpenM_Dir::rm($target);
    echo " - $target <b>correctly removed</b><br>";
    mkdir($target);
    echo " - $target <b>correctly created</b><br>";
    if (copy($lib, $targetZip))
        echo " - $lib <b>copied to</b> $targetZip<br>";
    else
        die("<h1>error occurs during copy of $lib</h1>");
    $zip = new ZipArchive();
    $res = $zip->open($targetZip);
    if ($res === TRUE) {
        if ($zip->extractTo($target))
            echo " - $targetZip <b>unZip in</b> $target<br>";
        else
            die("<h1>error occurs during unZip of $targetZip</h1>");
        $zip->close();
        if (unlink($targetZip))
            echo " - $targetZip <b>correctly removed</b><br>";
        else
            die("<h1>error occurs during removing $targetZip</h1>");

        OpenM_Dir::cp($target . "lib/", $lib_abs_dir);
        echo " - $target" . "lib/ <b>correctly copied in</b> $lib_abs_dir<br>";
        echo " - lib $lib_path succesfully installed !<br>";
    }
    else
        die("<h1>error occurs ($res)</h1>");
}

/**
 * recover other packages
 */
$libs = Properties::fromFile("lib/install.ext.lib.version");
$e = $libs->getAll()->keys();
while ($e->hasNext()) {
    $lib_path = $e->next();
    $lib_file = explode("::", $libs->get($lib_path));
    $lib = $lib_file[0];
    if (preg_match("/\.zip$/", $lib)) {
        $relative_path = $lib_file[1];
        $targetZip = $target . time() . ".zip";
        OpenM_Dir::rm($target);
        echo " - $target <b>correctly removed</b><br>";
        mkdir($target);
        echo " - $target <b>correctly created</b><br>";
        if (copy($lib, $targetZip))
            echo " - $lib <b>copied to</b> $targetZip<br>";
        else
            die("<h1>error occurs during copy of $lib</h1>");
        $zip = new ZipArchive();
        $res = $zip->open($targetZip);
        $unZiped = $target . $lib_path;
        if ($res === TRUE) {
            if ($zip->extractTo($unZiped))
                echo " - $targetZip <b>unZip in</b> $unZiped<br>";
            else
                die("<h1>error occurs during unZip of $targetZip</h1>");
            $zip->close();
            if (unlink($targetZip))
                echo " - $targetZip <b>correctly removed</b><br>";
            else
                die("<h1>error occurs during removing $targetZip</h1>");

            OpenM_Dir::cp($unZiped . $relative_path, "$lib_abs_dir/$lib_path");
            echo " - $unZiped$relative_path <b>correctly copied in</b> $lib_abs_dir/$lib_path<br>";
            echo " - lib $lib_path succesfully installed !<br>";
        }
        else
            die("<h1>error occurs ($res)</h1>");
    }
    else {
        $lib_file = explode("=", $libs->get($lib_path));
        $lib = $lib_file[0];
        if (isset($lib_file[1]))
            $file = "/" . $lib_file[1];
        else
            $file = substr($lib, strrpos($lib, "/"));
        if (!is_dir("$lib_abs_dir/$lib_path")) {
            mkdir("$lib_abs_dir/$lib_path", 0777, true);
            echo " - $lib_abs_dir/$lib_path <b>correctly created</b><br>";
        }
        if (copy($lib, "$lib_abs_dir/$lib_path$file"))
            echo " - $lib <b>correctly copied in</b> $lib_abs_dir/$lib_path$file<br>";
        else
            die("<h1>error occurs during copy of $lib</h1>");
        echo " - lib $lib_path succesfully installed !<br>";
    }
}

Import::php("util.file.OpenM_Dir");
OpenM_Dir::rm($target);
echo " - $target <b>correctly removed</b><br>";
?>