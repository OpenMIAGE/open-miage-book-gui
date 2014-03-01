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
                <form class="form-register form-group" method="POST" action="{$links.registration}">
                    <legend id="form_title"></legend>
                    <div class="control-group">
                        <label class="control-label" for="form_first_name" id="form_first_name.label"></label>
                        <div class="controls">
                            <input type="text" class="form-control" required name="form_first_name" id="form_first_name.input" value="{$form.first_name}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="form_last_name" id="form_last_name.label"></label>
                        <div class="controls">
                            <input type="text" class="form-control" autofocus required name="form_last_name" id="form_last_name.input" value="{$form.last_name}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="form_birthday" id="form_birthday.label"></label>
                        <div class="controls">
                            <input type="date" class="form-control" autofocus required  name="form_birthday" required id="form_birthday.input" value="{$form.birthday}">
                        </div> 
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="form_mail" id="form_mail.label"></label>
                        <div class="controls">
                            <input type="email" class="form-control" required id="form_mail.input" name="form_mail" value="{$form.mail}">
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <label class="checkbox" id="form_cgu.label">
                                <input name="form_cgu" required type="checkbox" {if $form.cgu}checked{/if}>
                            </label>
                            <br>
                            <button type="submit" class="btn btn-success btn-large" name="submit" id="submit"><i class="icon-white icon-ok"></i></button>
                            <div class="visible-phone">
                                <br>
                                <a href="#Explication" class="text-info" id="explication.text"></a>
                            </div>
                        </div>
                    </div>
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