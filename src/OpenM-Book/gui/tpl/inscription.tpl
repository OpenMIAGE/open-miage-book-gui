<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/coreCSS.tpl'}
    </head>
</head>
<body>
    {include file='include/navBar.tpl'}
    <div class="container-fluid">
        {include file='include/alert.tpl'}

        <div class="row-fluid">
            <div class="span5 offset1">
                <form class="form-custom " method="POST" action="{$links.registration}">
                    <legend >Inscription</legend>
                    <div class="control-group">
                        <label class="control-label" for="{$register_form.last_name.label}">{$register_form.last_name.label}</label>
                        <div class="controls">
                            <input type="text" class="input-large" autofocus required name="{$register_form.last_name.key}" id="{$register_form.last_name.key}" value="{$register_form.last_name.value}" placeholder="{$register_form.last_name.label}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="{$register_form.first_name.label}">{$register_form.first_name.label}</label>
                        <div class="controls">
                            <input type="text" class="input-large" required name="{$register_form.first_name.key}" id="{$register_form.first_name.key}" value="{$register_form.first_name.value}" placeholder="{$register_form.first_name.label}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="{$register_form.birthday}">{$register_form.birthday}</label>
                        <div class="controls">
                            <input type="number" style="vertical-align: top" class="input-micro" name="{$register_form.day.key}" value="{$register_form.day.value}" required id="{$register_form.day.key}" placeholder="{$register_form.day.label}">
                            <div class="btn-group" style="vertical-align: top">
                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                    <span id="{$register_form.month.key}"> {$register_form.month.label}</span>
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#" onClick="majMonthName('Janvier',1);">Janvier</a></li>
                                    <li><a href="#" onClick="majMonthName('Février',2);">Février</a></li>
                                    <li><a href="#" onClick="majMonthName('Mars',3);">mars</a></li>
                                    <li><a href="#" onClick="majMonthName('Avril',4);">Avril</a></li>
                                    <li><a href="#" onClick="majMonthName('Mai',5);">Mai</a></li>
                                    <li><a href="#" onClick="majMonthName('Juin',6);">Juin</a></li>
                                    <li><a href="#" onClick="majMonthName('Juillet',7);">Juillet</a></li>
                                    <li><a href="#" onClick="majMonthName('Aout',8);">Aout</a></li>
                                    <li><a href="#" onClick="majMonthName('Septembre',9);">Septembre</a></li>
                                    <li><a href="#" onClick="majMonthName('Octobre',10);">Octobre</a></li>
                                    <li><a href="#" onClick="majMonthName('Novembre',11);">Novembre</a></li>
                                    <li><a href="#" onClick="majMonthName('Décembre',12);">Décembre</a></li>
                                </ul>
                            </div>
                            <input type="number" style="vertical-align: top" class="input-mini" required name="{$register_form.year.key}" id="{$register_form.year.key}" value="{$register_form.year.value}" placeholder="{$register_form.year.label}">
                        </div> 
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="{$register_form.email.label}">{$register_form.email.label}</label>
                        <div class="controls">
                            <input type="email" class="input-large" required id="{$register_form.email.key}" name="{$register_form.email.key}" value="{$register_form.email.value}" placeholder="{$register_form.email.label}">
                        </div>
                    </div>
                    <input id="{$register_form.month.idHiden}" name="{$register_form.month.idHiden}" value="0" type="hidden">
                    <div class="control-group">
                        <div class="controls">
                            <label class="checkbox">
                                <input name="{$register_form.cgu}" required type="checkbox"> J'accepte les <a href="{$register_form_condition}" target="_blank">Conditions d'utilisation</a> ainsi que les <a href="#">Règles de confidentialité</a> d'Open-MIAGE
                            </label>
                            <br>
                            <button type="submit" class="btn btn-success btn-large" name="submit"><i class="icon-white icon-ok"></i> Enregistrer</button>
                            <div class="visible-phone">
                                <br>
                                <a href="#Explication" class="text-info" >(Voir ci-dessous les explications)</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="span6">
                <div class="hero-unit">
                    <a name="Explication"></a>
                    <h2>Explication </h2>
                    <legend></legend>
                    {include file='include/explicationOM_BOOK.tpl'}
                </div>
            </div>
        </div>
    </div>                                         
    {include file='include/commonJS.tpl'}
    {literal}
        <script>
            function majMonthName($month,$num){
                document.getElementById("{/literal}{$register_form.month.key}{literal}").innerHTML = $month;
                document.getElementById("{/literal}{$register_form.month.idHiden}{literal}").setAttribute('value', $num);
            }
        </script>
    {/literal}
</body>
</html>