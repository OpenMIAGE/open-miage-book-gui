OpenM_BookGUI.user = {};

OpenM_BookGUI.user.Page = function() {
    this.cadre = null;
    this.modification = null;
    this.save = null;
    this.fields = null;
};

OpenM_BookGUI.user.Page.prototype.content = function() {
    this.page = $(document.createElement("div"));
    this.page.addClass("row-fluid").addClass("span10 well");
    this.page.append(this.fields.content());
    if (this.modification !== null)
        this.page.append(this.modification.content());
    if (this.save !== null)
        this.page.append(this.save.content());
    return this.cadre;
};

OpenM_BookGUI.user.Page.prototype.display = function(enabled) {
    if (this.cadre !== null)
        this.cadre.remove();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());
};

OpenM_BookGUI.user.button = {};

OpenM_BookGUI.user.button.Modification = function() {
    this.text = "Modifier";
    this.style = 'btn-info btn-large btn-space';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-pencil";
    this.a = $(document.createElement('a'));
    this.aSave = $(document.createElement('a'));
    this.click = undefined;
    this.clickSave = undefined;
    this.styleSave = 'btn-info btn-large';
    this.iconColorSave = "icon-white";
    this.iconStyleSave = "icon-ok";
    this.inModification = inModification;

    this.content = function() {
        this.a.empty()
                .addClass("btn " + this.style);
        var icon = $(document.createElement("i"))
                .addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon)
                .append('&nbsp;' + this.text)
                .click(this.click)
                .removeClass("active");
        this.aSave.empty().hide();

        if (this.inModification) {
            this.a.addClass('active');
            this.aSave.addClass("btn " + this.style);
            var icon = $(document.createElement("i"))
                    .addClass(this.iconColorSave + " " + this.iconStyleSave);
            this.aSave.append(icon)
                    .append('&nbsp;' + this.text)
                    .click(this.clickSave);


        }


        return this.a;
    };
};

OpenM_BookGUI.user.Fields = function() {
    this.fieldBlocks = new Array();

    this.content = function() {

        return;
    };
};

OpenM_BookGUI.user.FieldBlock = function(name) {
    this.name = name;
    this.fields = new Array();

    this.content = function() {

        return;
    };
};

OpenM_BookGUI.user.Field = function() {
    this.user = user;
    this.field = field;
    this.inModification = inModification;
    this.fieldName = this.field;
    this.fieldValue = "";
    this.c = $(document.createElement("div"));
    this.input = undefined;


    this.content = function() {
        if (!this.inModification) {
            //display
            this.c.empty();
            //this.c = $(document.createElement("div"));
            this.c.addClass("span2");
            this.c.addClass("user-field");
            var label = $(document.createElement("span"));
            label.text(this.fieldName + " :");
            this.c.append(label);
            this.c.append("<br>");
            var labelVal = $(document.createElement("span"));
            labelVal.text(this.fieldValue);
            this.c.append(labelVal);
            return this.c;
        } else {
            //modif
            this.c.empty();
            // this.c = $(document.createElement("div"));
            this.c.addClass("span2");
            this.c.addClass("user-field");
            this.c.addClass("control-group");
            var label = $(document.createElement("label")).addClass("control-label");
            label.attr("for", this.fieldName)
                    .text(this.fieldName);
            this.c.append(label);
            var div = $(document.createElement("div")).addClass("controls");
            this.input = $(document.createElement("input"))
                    .attr("id", this.fieldName)
                    .attr("type", "text")
                    .attr("placeholder", this.fieldName)
                    .val(this.fieldValue)
                    .addClass("input-small");
            div.append(this.input);
            this.c.append(div);

            //div.append(labelVal)
            //this.c.append(div);
            return this.c;
        }


    };
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