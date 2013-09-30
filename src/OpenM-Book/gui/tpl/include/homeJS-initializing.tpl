<script type="text/javascript">{literal}
    $(function() {
    if (OpenM_BookController === undefined)
        var OpenM_BookController = {};
    if (OpenM_BookController.commons === undefined)
        OpenM_BookController.commons = {};
    if (OpenM_BookController.commons.URL === undefined)
        OpenM_BookController.commons.URL = {};
    {/literal}{include file='include/commonJS-initializing.tpl'}{literal}
        OpenM_BookGUI.home = {cst: undefined};
        OpenM_BookGUI.commons.initConst(OpenM_BookGUI.home, "{/literal}{$config_path}{$lang}{literal}.gui.home.xml", false);
        $("#home").append("<p>" + $("not-connected > desc", OpenM_BookGUI.home.cst).text() + "</p>");
        $("#home").append("<p><button type='submit' class='" + $("not-connected > button > class", OpenM_BookGUI.home.cst).text() + "'>" + $("not-connected > button > label", OpenM_BookGUI.home.cst).text() + "</button></p>");
    });{/literal}
        </script>