<?php

/**
 * @license http://www.apache.org/licenses/LICENSE-2.0 Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @link http://www.open-miage.org
 * @author Gael SAUNIER
 */

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