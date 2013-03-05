<?php

require 'build.php';

mkdir($dir, 0777, true);
echo " - $temp <b>correctly created</b><br>";
$zip = new ZipArchive();
$res = $zip->open($target_file_name);
if ($res === TRUE) {
    if ($zip->extractTo($temp))
        echo " - $target_file_name <b>unZip in</b> $temp<br>";
    else
        die("<h1>error occurs during unZip of $target_file_name</h1>");
}
else
    die('<h1>error occurs</h1>');

$file_lst = file_get_contents("build.full.file.lst");
$file_array = explode("\r\n", $file_lst);
$path = "../";
foreach ($file_array as $value) {
    if (is_file($path . $value)) {
        copy($path . $value, $temp . $value);
        echo " - $value <b>correctly copied to</b> $temp$value<br>";
    } else if (is_dir($path . $value)) {
        OpenM_Dir::cp($path . $value, $temp . $value);
        echo " - $value <b>correctly copied to</b> $temp$value<br>";
    }
    else
        die("$path$value is not a file or a directory");
}

Import::php("util.Properties");
$util = Properties::fromFile("../lib/openm.util.dependencies");
$e = $util->getAll()->keys();
while ($e->hasNext()) {
    $dir = $e->next();
    if (is_dir("../../lib/$dir")) {
        OpenM_Dir::cp("../../lib/$dir", $temp . "lib/$dir");
        echo " - $dir <b>correctly copied to</b> $temp/lib<br>";
    }
}
Import::php("util.pkg.OpenM_Dependencies");
$d = new OpenM_Dependencies("../lib");
$e = $d->explore(OpenM_Dependencies::RUN)->putAll($d->explore(OpenM_Dependencies::DISPLAY))->keys();
while ($e->hasNext()) {
    $dir = $e->next();
    if (is_dir("../../lib/$dir")) {
        OpenM_Dir::cp("../../lib/$dir", $temp . "lib/$dir");
        echo " - $dir <b>correctly copied to</b> $temp/lib<br>";
    }
}
$target_file_name = str_replace(".zip", "_full.zip", $target_file_name);
OpenM_Zip::zip($temp, $target_file_name);
echo " - $temp <b>correctly ziped to</b> $target_file_name<br>";
OpenM_Dir::rm($temp);
echo " - $temp <b>correctly removed</b><br>";
?>