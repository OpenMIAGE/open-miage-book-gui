<script type="text/javascript">{literal}
    $(function() {
        OpenM_BookGUI.home = {const: undefined};
        OpenM_BookGUI.commons.initConst(OpenM_BookGUI.home, "{/literal}{$config_path}{$lang}{literal}.gui.home.xml", false);
        $("#home").append("<p>"+$("not-connected > desc", OpenM_BookGUI.home.const).text()+"</p>");
        $("#home").append("<p><button type='submit' class='"+$("not-connected > button > class", OpenM_BookGUI.home.const).text()+"'>"+$("not-connected > button > label", OpenM_BookGUI.home.const).text()+"</button></p>");
    });{/literal}
</script>