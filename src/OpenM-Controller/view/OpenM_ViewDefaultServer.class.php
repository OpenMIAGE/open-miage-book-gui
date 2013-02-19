<?php

Import::php("OpenM-Services.view.OpenM_ServiceView");
Import::php("OpenM-Controller.view.OpenM_ViewDefaultServerException");
Import::php("OpenM-Controller.view.OpenM_URLViewController");
Import::php("util.Properties");
Import::php("util.wrapper.RegExp");

/**
 * 
 * @author Gaël Saunier
 */
class OpenM_ViewDefaultServer extends OpenM_ServiceView {

    const DEFAULT_PAGE = "OpenM_ViewDefaultServer.default.page";
    const DEFAULT_ERROR_404 = "OpenM_ViewDefaultServer.default.error.404";
    const ROOT = "OpenM_ViewDefaultServer.root";
    const VIEW_PREFIX = "OpenM_";
    const VIEW_SUFFIX = "View";
    const VIEW_EXTENTION = ".class.php";

    private static $url;

    public static function handle() {
        try {
            $url = self::init();
        } catch (Exception $exc) {
            die($exc->getMessage());
        }
        $class = $url->getClass();
        $object = new $class();
        $form = $url->getMethod();
        $value = $url->getValue();
        if ($value != "" && $value != null)
            $object->$form($value);
        else
            $object->$form();
    }

    /**
     * 
     * @return OpenM_URLViewController
     * @throws OpenM_ViewDefaultServerException
     */
    private static function init() {
        if (self::$url != null)
            return self::$url;

        $p = Properties::fromFile(self::CONFIG_FILE_NAME);
        $root = $p->get(self::ROOT);
        if ($root == null)
            throw new OpenM_ViewDefaultServerException(self::ROOT . " not defined in " . self::CONFIG_FILE_NAME);

        OpenM_URLViewController::setRoot($root);

        if (!isset($_GET[OpenM_URLViewController::VIEW])) {
            $page = $p->get(self::DEFAULT_PAGE);
            if ($page == null)
                throw new OpenM_ViewDefaultServerException(self::DEFAULT_PAGE . " not defined in " . self::CONFIG_FILE_NAME);
            $a = explode(".", $page);
            if (isset($a[0]))
                $view = $a[0];
            if (isset($a[1]))
                $form = $a[1];
            if (isset($a[2]))
                $lang = $a[2];
        }
        else
            $view = $_GET[OpenM_URLViewController::VIEW];

        if (isset($_GET[OpenM_URLViewController::LANG]))
            $lang = $_GET[OpenM_URLViewController::LANG];
        if ($lang != null && $lang != "")
            OpenM_URLViewController::setLang($lang);

        $error404 = $p->get(self::DEFAULT_ERROR_404);
        if ($error404 == null)
            throw new OpenM_ViewDefaultServerException(self::DEFAULT_ERROR_404 . " not defined in " . self::CONFIG_FILE_NAME);
        $a = explode(".", $error404);
        $error404_class = OpenM_URLViewController::classFromView($a[0]);
        $error404_classFile = $error404_class . self::VIEW_EXTENTION;
        if (!Import::php($error404_classFile))
            throw new OpenM_ViewDefaultServerException("default error 404 manager class not found");

        if (isset($a[1]))
            $error404_form = $a[1];

        if (!RegExp::preg("/^([a-zA-Z0-9]|_)+$/", $view))
            return self::set($error404_class, $error404_form);

        $class = OpenM_URLViewController::classFromView($view);
        $classFile = $class . self::VIEW_EXTENTION;

        if (!is_file($classFile))
            return self::set($error404_class, $error404_form);
        if (!Import::php($classFile))
            return self::set($error404_class, $error404_form);
        if (!class_exists($class))
            return self::set($error404_class, $error404_form);

        if (isset($_GET[OpenM_URLViewController::FORM]))
            $form = $_GET[OpenM_URLViewController::FORM];
        else if ($form == null || $form == "")
            $form = self::DEFAULT_FORM;

        if (!RegExp::preg("/^([a-zA-Z0-9]|_)+$/", $form))
            return self::set($error404_class, $error404_form);
        if (!method_exists($class, $form))
            return self::set($error404_class, $error404_form);

        return self::set($class, $form);
    }

    private static function set($class, $form, $value = null) {
        self::$url = new OpenM_URLViewController($class, $form, $value);
        return self::$url;
    }

    public function _default() {
        die("forbidden method called");
    }

}

?>