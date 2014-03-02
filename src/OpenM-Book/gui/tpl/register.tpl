<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/registerCSS.tpl'}
    </head>
</head>
<body>
    {include file='include/commonMenuBar.tpl'}
    <div class="container-fluid register">
        {include file='include/alert.tpl'}
        <div class="col-md-5 openm-book-form">
            {config_load file="register."|cat:$lang|cat:".properties"}                    
            <form class="form-register form-group" method="POST" action="{$links.registration}">
                <legend><h2>{#inscription_title#}</h2>v{$version}</legend>
                <div class="control-group {if $isResponse}has-feedback {if $error.first_name!=null}has-error{else}has-success{/if}{/if}">
                    <label class="control-label" for="first_name">{#first_name_label#}{if $isResponse && $error.first_name!=null} {#$error.first_name#}{/if}</label>
                    <div class="controls">
                        <input type="text" class="form-control" {if $isResponse && $error.mail==null && $error.last_name==null && $error.birthday==null}autofocus{/if} required name="first_name" id="first_name" value="{$first_name}">{if $isResponse}
                        <span class="glyphicon {if $error.first_name!=null}glyphicon-remove{else}glyphicon-ok{/if} form-control-feedback"></span>{/if}
                    </div>
                </div>
                <div class="control-group {if $isResponse && $error.first_name==null}has-feedback {if $error.last_name!=null}has-error{else}has-success{/if}{/if}">
                    <label class="control-label" for="last_name">{#last_name_label#}{if $isResponse && $error.first_name==null && $error.last_name!=null} {#$error.last_name#}{/if}</label>
                    <div class="controls">
                        <input type="text" class="form-control" {if $isResponse && $error.last_name==null && $error.first_name==null}autofocus{/if} required name="last_name" id="last_name" value="{$last_name}">{if $isResponse && $error.first_name==null}
                        <span class="glyphicon {if $error.last_name!=null}glyphicon-remove{else}glyphicon-ok{/if} form-control-feedback"></span>{/if}
                    </div>
                </div>
                <div class="control-group {if $isResponse && $error.first_name==null && $error.last_name==null}has-feedback {if $error.birthday!=null}has-error{else}has-success{/if}{/if}">
                    <label class="control-label" for="birthday">{#birthday_label#}{if $isResponse && $error.birthday!=null} {#$error.birthday#}{/if}</label>
                    <div class="controls">
                        <input type="date" class="form-control" {if $isResponse && $error.birthday!=null && $error.last_name==null && $error.first_name==null}autofocus{/if} required  name="birthday" required id="birthday" value="{$birthday}">
                    </div> 
                </div>
                <div class="control-group {if $isResponse && $error.first_name==null && $error.last_name==null && $error.birthday==null}has-feedback {if $error.mail!=null}has-error{else}has-success{/if}{/if}">
                    <label class="control-label" for="mail">{#mail_label#}{if $isResponse && $error.mail!=null} {#$error.mail#}{/if}</label>
                    <div class="controls">
                        <input type="email" class="form-control" {if $isResponse && $error.mail!=null && $error.first_name==null && $error.last_name==null && $error.birthday==null}autofocus{/if} required  name="mail" required id="mail" value="{$mail}">{if $isResponse && $error.first_name==null && $error.last_name==null && $error.birthday==null}
                        <span class="glyphicon {if $error.mail!=null}glyphicon-remove{else}glyphicon-ok{/if} form-control-feedback"></span>{/if}
                    </div> 
                </div>
                <br/>
                <button type="submit" class="btn btn-success button-inline" name="submit" id="submit"><span class="glyphicon glyphicon-ok"></span> {#registration_label#}</button>
            </form>
        </div>
        <div class="col-md-7 hidden-xs">
            <div class="well jumbotron">
                <a name="Explication"></a>
                <h2>Explication </h2>
                <legend></legend>
            </div>
        </div>
    </div>                                         
    {include file='include/registerJS.tpl'}
    {include file='include/registerJS-initializing.tpl'}
</body>
</html>