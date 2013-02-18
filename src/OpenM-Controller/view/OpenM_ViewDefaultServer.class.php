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

    const DEFAULT_VIEW = "OpenM_ViewDefaultServer.default.view";
    const DEFAULT_FORM = "OpenM_ViewDefaultServer.default.form";
    const DEFAULT_LANG = "OpenM_ViewDefaultServer.default.lang";
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

        $lang = $p->get(self::DEFAULT_LANG);
        if ($lang != null && $lang != "")
            OpenM_URLViewController::setLang($lang);

        if (!isset($_GET[OpenM_URLViewController::VIEW])) {
            $view = $p->get(self::DEFAULT_VIEW);
            if ($view == null)
                throw new OpenM_ViewDefaultServerException(self::DEFAULT_VIEW . " not defined in " . self::CONFIG_FILE_NAME);
        }
        else
            $view = $_GET[OpenM_URLViewController::VIEW];

        if (!RegExp::preg("/^([a-zA-Z0-9]|_)+$/", $view))
            throw new OpenM_ViewDefaultServerException(OpenM_URLViewController::VIEW . " in bad format");
        $class = OpenM_URLViewController::classFromView($view);
        $classFile = $class . self::VIEW_EXTENTION;

        if (!is_file($classFile))
            throw new OpenM_ViewDefaultServerException(OpenM_URLViewController::VIEW . " not found");
        if (!Import::php($classFile))
            throw new OpenM_ViewDefaultServerException("Class path not correctly initialised");
        if (!class_exists($class))
            throw new OpenM_ViewDefaultServerException(OpenM_URLViewController::VIEW . " not correctly named");

        if (!isset($_GET[OpenM_URLViewController::FORM])) {
            $p = Properties::fromFile(self::CONFIG_FILE_NAME);
            $form = $p->get(self::DEFAULT_FORM);
            if ($form == "" || $form == NULL)
                $form = OpenM_ServiceView::DEFAULT_FORM;
        }
        else
            $form = $_GET[OpenM_URLViewController::FORM];
        if (!RegExp::preg("/^([a-zA-Z0-9]|_)+$/", $form))
            throw new OpenM_ViewDefaultServerException(OpenM_URLViewController::FORM . " in bad format");
        if (!method_exists($class, $form))
            throw new OpenM_ViewDefaultServerException(OpenM_URLViewController::FORM . " not found");



        self::$url = new OpenM_URLViewController($class, $form);
        return self::$url;
    }

    public function _default() {
        die("forbidden method called");
    }

}

?>