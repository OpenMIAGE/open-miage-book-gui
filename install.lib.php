<?php

$version = file_get_contents("install.lib.version");
$lib = "http://dev.open-miage.fr/$version";
$lib_dir = "../lib";
if (!is_dir($lib_dir)) {
    if (mkdir($lib_dir))
        echo " - $lib_dir <b>created</b><br>";
    else
        die("<h1>error occurs during creation of $lib_dir</h1>");
}
$lib_abs_dir = realpath($lib_dir);
$target = "$lib_abs_dir/$version";
if (copy($lib, $target))
    echo " - $lib <b>copied to</b> $target<br>";
else
    die("<h1>error occurs during copy of $lib</h1>");
$zip = new ZipArchive();
$res = $zip->open($target);
if ($res === TRUE) {
    if ($zip->extractTo($lib_abs_dir))
        echo " - $target <b>unZip in</b> $lib_abs_dir<br>";
    else
        die("<h1>error occurs during unZip of $target</h1>");
    $zip->close();
    if (unlink($target))
        echo " - $target <b>correctly removed</b><br>";
    else
        die("<h1>error occurs during removing $target</h1>");

    die('<h1>lib installed !</h1>');
}
else
    die('<h1>error occurs</h1>');
?>