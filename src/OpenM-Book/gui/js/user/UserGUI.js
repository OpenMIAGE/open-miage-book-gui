OpenM_BookGUI.user = {};

OpenM_BookGUI.user.Page = function() {
    this.modification = null;
    this.save = null;
    this.fields = null;
    this.name = '';
    this.firstName = '';
    this.lastName = '';
};

OpenM_BookGUI.user.Page.prototype.content = function() {
    var page = $(document.createElement("div"));
    page.addClass("row-fluid");
    page.append($(document.createElement("div")).append(this.name));
    page.append(this.fields.content());
    if (this.modification !== null)
        page.append(this.modification.content());
    if (this.save !== null)
        page.append(this.save.content());
    return page;
};

OpenM_BookGUI.user.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());

};

OpenM_BookGUI.user.button = {};

OpenM_BookGUI.user.button.Modification = function() {
    this.click = undefined;

    this.content = function() {
        var a = $(document.createElement("a"))
                .addClass("btn btn-info btn-large btn-space");
        var icon = $(document.createElement("i"))
                .addClass("icon-white icon-pencil");
        a.append(icon)
                .append('&nbsp;Modifier')
                .click(this.click);
        return a;
    };
};

OpenM_BookGUI.user.button.Save = function() {
    this.click = undefined;

    this.content = function() {
        var a = $(document.createElement("a"));
        a.addClass('active');
        a.addClass("btn btn-info btn-large btn-space");
        var icon = $(document.createElement("i"))
                .addClass("icon-white icon-ok");
        this.a.append(icon)
                .append('&nbsp;Modifier')
                .click(this.clickSave);
        return a;
    };

};

OpenM_BookGUI.user.Fields = function() {
    this.fieldBlocks = new Array();
    this.c = $(document.createElement("div"));
};

OpenM_BookGUI.user.Fields.prototype.content = function() {
    this.c.empty();
    for (var i in this.fieldBlocks) {
        this.c.append(this.fieldBlocks[i].content());
    }
    return this.c;
};

OpenM_BookGUI.user.Fields.prototype.update = function() {
    this.content();
};

OpenM_BookGUI.user.FieldBlock = function(name) {
    this.name = name;
    this.fields = new Array();

};

OpenM_BookGUI.user.FieldBlock.prototype.content = function() {
    var div = $(document.createElement("div")).addClass("row-fluid");
    var c = $(document.createElement("div")).addClass("span6 well");
    div.append(c);
    c.append(this.name+" :");
    for (var i in this.fields) {
        c.append(this.fields[i].content());
    }
    return div;
};

OpenM_BookGUI.user.Field = function(name, value, isInModificationMode) {
    this.isInModificationMode = (isInModificationMode !== undefined) ? isInModificationMode : false;
    this.name = name;
    this.value = value;
};

OpenM_BookGUI.user.Field.prototype.content = function() {
    var content = $(document.createElement("div"));
    if (this.isInModificationMode === false) {
        content.addClass("user-field");
        var label = $(document.createElement("span"));
        label.text(this.name + " :");
        //content.append(label);
        var labelVal = $(document.createElement("span"));
        labelVal.text(this.value);
        content.append(labelVal);
    } else {
        content.addClass("user-field");
        content.addClass("control-group");
        var label = $(document.createElement("label")).addClass("control-label");
        label.attr("for", this.name)
                .text(this.name);
        content.append(label);
        var div = $(document.createElement("div")).addClass("controls");
        var input = $(document.createElement("input"))
                .attr("id", this.name)
                .attr("type", "text")
                .attr("placeholder", this.name)
                .val(this.value)
                .addClass("input-small");
        div.append(input);
        content.append(div);
    }
    return content;
};



//à refactorer sur le même principe que CommunityGUI.js

// Affichage du bandeau profil (photo + nom + prénom)
function getBandeauProfil(fields) {
    var bandeauProfil = $(document.createElement('div'));

    // Photo de profil
    var photoUser = $(document.createElement("img")).attr({
        alt: "Photo du Profil",
        title: "Photo du profil",
        src: "http://us.cdn1.123rf.com/168nwm/mikefirsov/mikefirsov1205/mikefirsov120500001/13917063-icone-illustration-profil.jpg"
    }).addClass("photoCSS");
    bandeauProfil.append(photoUser);

    // Nom de l'utilisateur
    var titreLabel = $(document.createElement("span")).addClass("nameCSS");
    titreLabel.text(fields[0].fieldValue + " " + fields[1].fieldValue);
    bandeauProfil.append(titreLabel);

    // Bouton de modification
    /*var updateButton = $(document.createElement('span')).addClass("buttonUpdateProfil");
     updateButton.append(OpenM_BookGUI.user.button.Modification());
     bandeauProfil.append(updateButton);*/

    return bandeauProfil;
}

// Affichage du bloc d'information générales
function getBlocInfosGenerales(fields) {
    // Création du bloc d'information générales
    var blocInfosGenerales = $(document.createElement('div')).addClass("span5 blocInfosGenerales");
    var conteneurInfosGenerales = $(document.createElement('div')).addClass("row-fluid");

    // Titre du bloc
    var titleBlocInfosGenerales = $(document.createElement("p")).addClass("titleBlocInfosGenerales");
    titleBlocInfosGenerales.text("Informations Générales");
    conteneurInfosGenerales.append(titleBlocInfosGenerales);
    // Affichage du mail
    var labelMail = $(document.createElement("p"));
    //labelMail.text(fields.otherProperties[0].value);
    //labelMail.text("Mail : " + " lerouge.sylvain@gmail.com " + fields[3].keys(0));
    conteneurInfosGenerales.append(labelMail);

    // Affichage de la ville
    var labelTown = $(document.createElement("p"));
    labelTown.text("Ville actuelle : Toulouse");
    conteneurInfosGenerales.append(labelTown);
    blocInfosGenerales.append(conteneurInfosGenerales);
    return blocInfosGenerales;
}