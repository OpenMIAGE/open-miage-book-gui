<?php

Import::php("OpenM-Services.view.OpenM_ServiceView");
Import::php("OpenM-SSO.client.OpenM_SSOClientPoolSessionManager");
Import::php("util.http.OpenM_Header");

/**
 *
 *
 * @author Gaël Saunier
 */
abstract class OpenM_ServiceViewSSO extends OpenM_ServiceView {

    const SSO_CONFIG_FILE_PATH = "OpenM_SSO.client.config.path";
    
    /**
     *
     * @var OpenM_SSOClientSession 
     */
    protected $manager;

    /**
     *
     * @var Properties
     */
    protected $properties;

    public function __construct() {
        parent::__construct();
        $this->properties = Properties::fromFile(self::CONFIG_FILE_NAME);
        $path = $this->properties->get(self::SSO_CONFIG_FILE_PATH);
        if ($path == null)
            throw new OpenM_ServiceViewException(self::SSO_CONFIG_FILE_PATH . " not defined in " . self::CONFIG_FILE_NAME);
        $this->manager = OpenM_SSOClientPoolSessionManager::fromFile($path);
    }
}

?>