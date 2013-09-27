<script type="text/javascript">{literal}
    $(function() {
        OpenM_BookGUI.register = {const: undefined};
        OpenM_BookGUI.commons.initConst(OpenM_BookGUI.register, "{/literal}{$config_path}{$lang}{literal}.gui.register.xml", false);
        $("#form_title").text($("register > form > title", OpenM_BookGUI.register.const).text());
        $("#form_first_name\\.label").append($("register > form > first_name > label", OpenM_BookGUI.register.const).text());
        $("#form_last_name\\.label").append($("register > form > last_name > label", OpenM_BookGUI.register.const).text());
        $("#form_birthday\\.label").text($("register > form > birthday > label", OpenM_BookGUI.register.const).text());
        $("#form_mail\\.label").text($("register > form > mail > label", OpenM_BookGUI.register.const).text());
        $("#form_cgu\\.label").append($("register > form > cgu > label", OpenM_BookGUI.register.const).text());
        $("#submit").append(" "+$("register > form > submit > label", OpenM_BookGUI.register.const).text());
    });{/literal}
</script>