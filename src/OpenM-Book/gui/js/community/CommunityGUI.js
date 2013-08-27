OpenM_BookGUI.community = {};

OpenM_BookGUI.community.Page = function() {
    this.tree = null;
    this.actions = null;
    this.childs = null;
    this.users = null;
    this.usersNotValid = null;
};

OpenM_BookGUI.community.Page.prototype.display = function(enabled) {
    var cadre = $("#" + OpenM_BookGUI.Pages.divParentId);
    if (enabled === true || enabled === undefined) {
        cadre.empty();

        //le tree
        var tree = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(tree);
        tree.append(this.tree.content());
        //Les actions
        var actions = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(actions);
        actions.append(this.actions.content());

        //les childs
        var childs = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(childs);
        childs.append(this.childs.content());

        //les users
        var users = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(users);
        users.append(this.users.content());

        //les users not valid
        var usersNotValid = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(usersNotValid);
        usersNotValid.append(this.usersNotValid.content());
    }
    else {
        cadre.empty();
    }
};

OpenM_BookGUI.community.Tree = function(communityId) {
    this.id = communityId;
    this.communities = new Array();
};

OpenM_BookGUI.community.Tree.prototype.content = function() {
    var div = $(document.createElement('div'));
    div.addClass("span12 well");
    div.append("<p>Navigation:</p>");
    var first = true;
    $.each(this.communities, function(key, value) {
        if (first === true)
            first = false;
        else
            div.append(" <i class='icon-play'></i> ");

        div.append(value.content());
    });
    return div;
};

OpenM_BookGUI.community.InTree = function(communityId, name, active) {
    this.id = communityId;
    this.name = name;
    this.active = active;
    this.a = undefined;
    this.click = undefined;
};

OpenM_BookGUI.community.InTree.prototype.content = function() {
    if (this.active) {
        this.a = $(document.createElement('a'));
        this.a.addClass("btn btn-primary btn-large");
        this.a.click(this.click);
    }
    else {
        this.a = $(document.createElement('a'));
        this.a.addClass("btn btn-primary btn-large disabled");
    }
    this.a.text(this.name);
    return this.a;
};

OpenM_BookGUI.community.InTree.prototype.updateName = function(name) {
    this.name = name;
    if (this.a !== undefined)
        this.a.text(this.name);
};

OpenM_BookGUI.community.Childs = function(communityId) {
    this.communityId = communityId;
    this.communities = new Array();
    this.c = $(document.createElement('div'));
};

OpenM_BookGUI.community.Childs.prototype.content = function() {
    this.c.empty();
    if (this.communities.length !== 0) {
        this.c.addClass("span12 well");
        this.c.append("<p>Sous-communautés :</p>");
        var div = $(document.createElement('div')).addClass("row-fluid");
        this.c.append(div);
        for (var i in this.communities) {
            div.append(this.communities[i].content());
        }
        return this.c;
    } else {
        //pas d'enfant pour la commu 
        return this.c;
    }
};

OpenM_BookGUI.community.Child = function(communityId, name) {
    this.communityId = communityId;
    this.name = name;
    this.c = undefined;
    this.click = undefined;
};

OpenM_BookGUI.community.Child.prototype.content = function() {
    this.c = $(document.createElement('a'));
    this.c.addClass("btn btn-primary btn-large btn-space");
    this.c.text(this.name);
    this.c.click(this.click);
    return this.c;
};

OpenM_BookGUI.community.Child.prototype.updateName = function(name) {
    this.name = name;
    if (this.c !== undefined)
        this.c.text(this.name);
};

OpenM_BookGUI.community.Users = function(communityId) {
    this.communityId = communityId;
    this.users = new Array();
    this.c = $(document.createElement('div'));
};

OpenM_BookGUI.community.Users.prototype.content = function() {
    this.c.empty();
    if (this.users.length !== 0) {
        this.c.addClass("well").css("overflow", "hidden");
        this.c.append("<p>Users :</p>");
        var div = $(document.createElement('div')).css("display", "inline");
        this.c.append(div);
        for (var i in this.users) {
            div.append(this.users[i].content());
        }
        return this.c;
    } else {
        return this.c;
    }
};

OpenM_BookGUI.community.User = function(id, name) {
    this.id = id;
    this.name = name;
    this.click = undefined;
    this.c = $(document.createElement('div'));
};

OpenM_BookGUI.community.User.prototype.content = function() {
    this.c.empty();
    this.c.css("float", "left");
    var img = $(document.createElement("img")).addClass("user-little-img");
    img.attr("src", OpenM_BookGUI.Pages.ressource_dir + OpenM_BookGUI.Pages.userPhotoDefault);
    this.c.append(img);
    var a = $(document.createElement("a"));
    a.text(this.name);
    this.c.append(a);
    a.click(this.click);
    img.click(this.click);
    return this.c;
};

OpenM_BookGUI.community.User.prototype.updateName = function(newName){
    this.name = newName;
    this.content();
};

OpenM_BookGUI.community.UsersNotValid = function(communityId) {
    this.communityId = communityId;
    this.users = new Array();
    this.c = $(document.createElement('div'));
};

OpenM_BookGUI.community.UsersNotValid.prototype.content = function() {
    this.c.empty();
    if (this.users.length !== 0) {
        this.c.addClass("well").css("overflow", "hidden");
        this.c.append("<p>Users Non Validé :</p>");
//        this.c.append("<p>Les utilisateurs présents ici, ne sont pas valider. Cela signifie qu'ils postulent pour entrer dans la communauté. C'est a vous de valider leur adhésion. Plusieurs validation d'utilisateur sont requises pour etre accépter </p>");
        var div = $(document.createElement('div'));
        this.c.append(div);
        for (var i in this.users) {
            div.append(this.users[i].content());
        }
        return this.c;
    } else {
        return this.c;
    }
};

OpenM_BookGUI.community.UserNotValid = function(id, name, communityName) {
    this.id = id;
    this.name = name;
    this.communityName = communityName;
    this.buttonValidate = '';
    this.buttonDisplayProfil = '';
    this.c = $(document.createElement('div'));
    this.clickUser = undefined;
    this.clickCommunity = undefined;
};

OpenM_BookGUI.community.UserNotValid.prototype.content = function() {
    this.c.remove();
    this.c = $(document.createElement('div')).css("float", "left");
    var img = $(document.createElement("img")).addClass("user-little-img");
    img.attr("src", OpenM_BookGUI.Pages.ressource_dir + OpenM_BookGUI.Pages.userPhotoDefault);
    this.c.append(img);
    img.click(this.click);
    var a = $(document.createElement("a"));
    a.text(this.name);
    a.click(this.clickUser);
    var d = $(document.createElement("a"));
    d.text(" in '" + this.communityName + "'");
    d.click(this.clickCommunity);
    this.c.append(a);
    this.c.append("<br>");
    this.c.append(d);
    this.c.append("<br>");
    this.c.append(this.buttonValidate.content());
    return this.c;
};

OpenM_BookGUI.community.button = {};

OpenM_BookGUI.community.button.Validate = function() {
    this.text = "Valider";
    this.style = 'btn-inverse';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok-circle";
    this.a = $(document.createElement('a'));
    this.click = '';
};

OpenM_BookGUI.community.button.Validate.prototype.content = function() {
    this.a.remove();
    this.a = $(document.createElement('a')).addClass("btn " + this.style);
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass(this.iconColor + " " + this.iconStyle);
    this.a.append(icon);
    this.a.append(this.text);
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.button.DisplayProfile = function() {
    this.text = "Voir";
    this.style = 'btn-inverse';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-zoom-in";
    this.a = $(document.createElement('a'));
    this.click = undefined;

};

OpenM_BookGUI.community.button.DisplayProfile.prototype.content = function() {
    this.a.remove();
    this.a = $(document.createElement('a')).addClass("btn " + this.style);
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass(this.iconColor + " " + this.iconStyle);
    this.a.append(icon);
    this.a.append(this.text);
    this.a.click(this.clickUser);
    return this.a;
};

OpenM_BookGUI.community.Actions = function(communityId) {
    this.communityId = communityId;
    this.c = $(document.createElement('div'));
    this.buttons = new Array();
};

OpenM_BookGUI.community.Actions.prototype.content = function() {
    this.c.empty();
    if (this.buttons.length !== 0) {
        this.c.addClass("span12 well");
        var p = $(document.createElement('p'));
        p.text("Les actions possibles :");
        this.c.append(p);
        var div = $(document.createElement('div'));
        div.addClass("row-fluid");
        this.c.append(div);
        for (var i in this.buttons) {
            div.append(this.buttons[i].content());
        }
    }
    return this.c;
};

OpenM_BookGUI.community.button.Register = function(communityId) {
    this.communityId = communityId;
    this.text = "S'enregistrer";
    this.toolTipText = "S'enregistrer dans cette communauté";
    this.style = 'btn-inverse';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok";
    this.active = true;
    this.click = undefined;
    this.a = $(document.createElement('a'));
};

OpenM_BookGUI.community.button.Register.prototype.content = function() {
    this.a.remove();
    this.a = $(document.createElement('a')).addClass("btn " + this.style);
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass(this.iconColor + " " + this.iconStyle);
    this.a.append(icon);

    if (this.active) {
        var gui = this;
        this.a.click(function() {
            gui.click();
            $(gui.a).addClass('disabled');
        });
        this.toolTipText = "S'enregistrer dans cette communauté";
    } else {
        this.a.addClass("disabled");
        this.toolTipText = "Vous étes déja enregistrer";
    }
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", this.tooltipPlacement);
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    this.a.tooltip();
    this.a.text(this.text);
    return this.a;
};

OpenM_BookGUI.community.button.AddCommunity = function(communityId, communityName) {
    this.communityId = communityId;
    this.communityName = communityName;
    this.id = 'OpenM_BookGUI.community.button.AddCommunity-' + this.communityId;
    this.text = "Ajouter";
    this.toolTipText = this.text + " une sous communauté à '" + this.communityName + "'";
    this.style = 'btn-inverse';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok";
    this.popover = '';
    this.a = $(document.createElement('a'));
};

OpenM_BookGUI.community.button.AddCommunity.prototype.content = function() {
    this.a.remove();
    this.a = $(document.createElement('a')).attr("id", this.id).addClass("btn " + this.style);
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass(this.iconColor + " " + this.iconStyle);
    this.a.append(icon);

    this.popover.parentId = this.id;
    var option = {
        title: 'Nouvelle sous communauté',
        html: true,
        placement: 'bottom',
        content: this.popover.content().context
    };
    this.a.popover(option);
    this.toolTipText = this.text + " une sous communauté à '" + this.communityName + "'";

    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", this.tooltipPlacement);
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    var gui = this;
    this.a.click(function() {
        gui.popover.input.focus();
        gui.popover.popover.on("submit", gui.popover.submit);
    });
    this.a.tooltip();
    this.a.text(this.text);
    return this.a;
};

OpenM_BookGUI.community.button.Rename = function(communityId) {
    this.communityId = communityId;
    this.id = "OpenM_BookGUI.community.button.Rename-" + this.communityId;
    this.a = $(document.createElement("a"));
    this.text = "Renommer";
    this.toolTipText = this.text + " la communauté";
    this.style = 'btn-warning';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-refresh";
    this.popover = '';
};

OpenM_BookGUI.community.button.Rename.prototype.content = function() {
    this.a.remove();
    this.a = $(document.createElement('a')).attr("id", this.id).addClass("btn " + this.style).addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass(this.iconColor + " " + this.iconStyle);
    this.a.append(icon);
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", this.tooltipPlacement);
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    this.a.tooltip();

    this.popover.parentId = this.id;
    var option = {
        title: 'Renommer la communauté',
        html: true,
        placement: 'bottom',
        content: this.popover.content().context
    };
    this.a.popover(option);
    var gui = this;
    this.a.click(function() {
        gui.popover.input.focus();
        gui.popover.popover.on("submit", gui.popover.submit);
    });

    this.a.text(this.text);
    return this.a;
};

OpenM_BookGUI.community.button.Delete = function() {
    this.a = $(document.createElement("a"));
    this.text = "Supprimer";
    this.toolTipText = this.text + " la communauté (définitivement)";
    this.style = 'btn-danger';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-trash";
    this.click = '';
};

OpenM_BookGUI.community.button.Delete.prototype.content = function() {
    this.a.remove();
    this.a = $(document.createElement('a')).addClass("btn " + this.style);
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass(this.iconColor).addClass(this.iconStyle);
    this.a.append(icon);
    this.a.attr("rel", "tooltip").attr("data-placement", this.tooltipPlacement).attr("data-toggle", "tooltip").attr("data-original-title", this.toolTipText);
    this.a.tooltip();
    this.a.text(this.text);
    this.a.on('click', this.click);
    return this.a;
};

OpenM_BookGUI.community.popover = {};

//A continuer
OpenM_BookGUI.community.popover.Name = function(communityId, name) {
    this.communityId = communityId;
    this.name = name;

    // this.inputId = 'OpenM_BookGUI.community.popover.Name'
    this.input = $(document.createElement("input"));
    this.popover = $(document.createElement("form"));
    this.a = $(document.createElement("a"));
    this.parentId = '';
    this.submit = '';

};

OpenM_BookGUI.community.popover.Name.prototype.getName = function() {
    return this.input.val();
};

OpenM_BookGUI.community.popover.Name.prototype.content = function() {
    //création du popover
    this.input.remove();
    this.input = $(document.createElement("input"));
    this.input.attr("type", "text").attr("placeholder", this.text).attr("value", this.name);
    this.input.addClass("input-large");

    this.popover.remove();
    this.popover = $(document.createElement("form"));

    this.popover.addClass("control-group");
    var label = $(document.createElement("label"));
    label.addClass("control-label").attr("for", "inputNameCommunity").text(this.text);
    this.popover.append(label);
    var subdiv = $(document.createElement("div")).addClass("controls");
    subdiv.append(this.input);
    this.popover.append(subdiv);
    this.a.remove();
    this.a = $(document.createElement("button"));
    this.a.addClass("btn").addClass("btn-primary").addClass("btn-small");
    this.a.attr('type', 'submit');
    var i = $(document.createElement("i"));
    i.addClass("icon-white").addClass("icon-ok-circle");
    this.a.append(i);
    this.a.append(" Enregistrer");

    var cancel = $(document.createElement("a")).addClass("btn btn-primary btn-small");
    var icancel = $(document.createElement("i")).addClass("icon-white icon-remove");
    cancel.append(icancel);
    cancel.append(" Annuler");
    this.popover.append(this.a);
    this.popover.append("&nbsp;");
    this.popover.append(cancel);
    cancel.attr('onclick', "$('#" + this.parentId + "').popover('hide')");

    return this.popover;
};