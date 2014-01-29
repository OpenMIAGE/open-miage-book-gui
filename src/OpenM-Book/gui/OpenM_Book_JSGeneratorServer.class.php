<?php
Import::php("util.OpenM_Log");
Import::php("util.crypto.OpenM_Crypto");

if (!Import::php("Smarty"))
    throw new ImportException("Smarty");

/**
 * This server manage Javascript file generation for a js list in parameter
 * @package OpenM\OpenM-Book
 * @subpackage OpenM\OpenM-Book\gui
 * @copyright (c) 2013, www.open-miage.org
 * @license http://www.apache.org/licenses/LICENSE-2.0 Licensed under the Apache 
 * License, Version 2.0 (the "License");
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
 * @author Gael Saunier
 */
class OpenM_Book_JSGeneratorServer {

    const FILE_URL_PARAMETER = "js";
    const MIN_MODE_PARAMETER = "min";
    const FILE_URL_SEPARATOR_PARAMETER = ";";

    private $root_path;
    private $smarty;

    private static function min($string) {
        $string = str_replace("= ", "=", $string);
        $string = str_replace(" =", "=", $string);
        $string = preg_replace('/\s+/', ' ', $string);
        $string = str_replace("  ", " ", $string);
        $string = str_replace("\r\n", "", $string);
        $string = str_replace("\n", "", $string);
        $string = str_replace(' (', "(", $string);
        $string = str_replace('( ', "(", $string);
        $string = str_replace(' )', ")", $string);
        $string = str_replace(') ', ")", $string);
        $string = str_replace(': ', ":", $string);
        $string = str_replace(' :', ":", $string);
        $string = str_replace('{ ', "{", $string);
        $string = str_replace(' {', "{", $string);
        $string = str_replace(' }', "}", $string);
        $string = str_replace('} ', "}", $string);
        $string = str_replace(' ;', ";", $string);
        $string = str_replace('; ', ";", $string);
        $string = str_replace(' +', "+", $string);
        $string = str_replace('+ ', "+", $string);
        $string = str_replace(' -', "-", $string);
        $string = str_replace('- ', "-", $string);
        $string = str_replace(' ,', ",", $string);
        $string = str_replace(', ', ",", $string);
        $string = str_replace(' /', "/", $string);
        $string = str_replace('/ ', "/", $string);
        return $string;
    }

    /**
     * used to display javascript API client content generated from an api list
     * @param String $jsList is the list of api need to generate clients
     * @param boolean $min true if minified version required, else false
     * @throws ImportException if api definition file required not found
     */
    public function display($jsList, $min = true) {
        $files = explode(self::FILE_URL_SEPARATOR_PARAMETER, $jsList);
        OpenM_Log::debug("define header JS", __CLASS__, __METHOD__, __LINE__);
        header('Content-type: text/javascript');
        $this->smarty->assign("min", $min);

        OpenM_Log::debug("define js controller cache id", __CLASS__, __METHOD__, __LINE__);
        $id = OpenM_Crypto::md5($jsList) . "_" . ($min ? "min" : "");
        OpenM_Log::debug("check if cache already build", __CLASS__, __METHOD__, __LINE__);
        $tpl = "OpenM_Book_JSGeneratorServer.tpl";
        if ($this->smarty->isCached($tpl, $id))
            $this->smarty->display($tpl, $id);
        else {
            OpenM_Log::debug("build cache", __CLASS__, __METHOD__, __LINE__);
            foreach ($files as $value) {
                if (is_file(Import::getAbsolutePath($value)))
                    $string .= file_get_contents(Import::getAbsolutePath($value));
            }

            if ($min)
                $string = self::min($string);

            OpenM_Log::debug("assign id", __CLASS__, __METHOD__, __LINE__);
            $this->smarty->assign("js", $string);
            $this->smarty->cache_id = $id;
            $this->smarty->display($tpl);
        }
    }

    /**
     * used to instanciate server from the path from host to server directory,
     * absolute/relative dir path of smarty compilation dir and absolute/relative dir path of
     * smarty cache dir
     * @param String $root_path is relative path from host to server directory in URL
     * @param String $compile_dir is absolute/relative directory path of smarty compile dir
     * @param String $cache_dir is absolute/relative directory path of smarty cache dir
     */
    public function __construct($root_path = null, $compile_dir = null, $cache_dir = NULL) {
        $this->root_path = $root_path;
        $this->smarty = new Smarty();
        if ($cache_dir !== null)
            $this->smarty->setCacheDir($cache_dir);
        if ($compile_dir !== null)
            $this->smarty->setCompileDir($compile_dir);
        $this->smarty->setTemplateDir(__DIR__ . "/tpl");
        $this->smarty->caching = true;
        $this->smarty->compile_check = false;
    }

    /**
     * server handler URL controller
     * this method is required to catch URL
     */
    public function handle() {
        if (isset($_GET[self::FILE_URL_PARAMETER])) {
            try {
                $this->display($_GET[self::FILE_URL_PARAMETER], isset($_GET[self::MIN_MODE_PARAMETER]));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }
        else
            die("js not found");
    }

}
?>