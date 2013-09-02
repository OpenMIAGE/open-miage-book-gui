OpenM_BookGUI.community = {};

OpenM_BookGUI.community.Page = function() {
    this.tree = null;
    this.actions = null;
    this.childs = null;
    this.users = null;
    this.usersNotValid = null;
    this.banned = null;
};

OpenM_BookGUI.community.Page.prototype.display = function(enabled) {
    var cadre = $("#" + OpenM_BookGUI.Pages.divParentId);
    if (enabled === true || enabled === undefined) {
        cadre.empty();

        //la navigation
        var communities = $(document.createElement('div'));
        cadre.append(communities);
        communities.addClass("row10 well");
        communities.append("<p>Communautés :</p>");
        var community = this.tree.content();
        communities.append(community);
        communities.append("<br />");

        //Les actions
        var actions = $(document.createElement("div"))
                .append(this.actions.content())
                .append("<br />").hide();
        communities.append(actions);
        var actionDisplayButton = $(document.createElement("button"));
        actionDisplayButton.addClass("btn btn-inverse").append("<i class='icon-wrench icon-white'></i>");
        actionDisplayButton.click(function() {
            if (actions.is(":visible"))
                actions.hide();
            else
                actions.show();
        });
        community.append("&nbsp;&nbsp;")
                .append(actionDisplayButton);

        var div = this.childs.content();
        div.addClass("inline");
        communities.append(div);

        //les users
        var users = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(users);
        users.append(this.users.content());

        //les users not valid
        var usersNotValid = $(document.createElement('div')).addClass("row-fluid");
        cadre.append(usersNotValid);
        usersNotValid.append(this.usersNotValid.content());

        cadre.append(this.banned.content());
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
    if (this.communities.length > 0)
        this.c.prepend(" <i class='icon-play'></i> <i class='icon-play'></i> ");

    for (var i in this.communities) {
        this.c.append(this.communities[i].content());
    }
    return this.c;
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
        this.c.append("<p>Utilisateur(s) :</p>");
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
    this.buttonDisplayProfil = undefined;
    this.imageProfile = undefined;
};

OpenM_BookGUI.community.User.prototype.content = function() {
    this.c.empty();
    this.c.css("float", "left");
    this.c.append(this.imageProfile.content());
    this.c.append(this.buttonDisplayProfil.content());
    return this.c;
};

OpenM_BookGUI.community.User.prototype.updateName = function(newName) {
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
        this.c.append("<p>Utilisateur(s) Non Validé(s) :</p>");
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
    this.buttonValidate = undefined;
    this.buttonDisplayProfil = undefined;
    this.buttonDisplayCommunity = undefined;
    this.c = $(document.createElement('div'));
    this.imageProfile = undefined;
};

OpenM_BookGUI.community.UserNotValid.prototype.content = function() {
    this.c.empty();
    this.c.css("float", "left").css("padding", 5);
    this.c.append(this.imageProfile.content());
    this.c.append(this.buttonValidate.content())
            .append(" ")
            .append(this.buttonDisplayProfil.content())
            .append(" dans ")
            .append(this.buttonDisplayCommunity.content());
    return this.c;
};

OpenM_BookGUI.community.Banned = function(name) {
    this.name = name;
    this.banned = false;
    this.c = $(document.createElement('div'));
};

OpenM_BookGUI.community.Banned.prototype.content = function() {
    this.c.empty();
    if (this.banned)
        this.c.append("Vous êtes banni de la communauté '" + this.name + "'");
    return this.c;
};

OpenM_BookGUI.community.button = {};

OpenM_BookGUI.community.button.Validate = function() {
    this.a = $(document.createElement('a'));
    this.click = '';
};

OpenM_BookGUI.community.button.Validate.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-success");
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-ok-circle");
    this.a.append(icon);
    this.a.append("Valider");
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.button.DisplayProfile = function(name) {
    this.name = name;
    this.a = $(document.createElement('a'));
    this.click = undefined;
};

OpenM_BookGUI.community.button.DisplayProfile.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-info");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-zoom-in");
    this.a.append(icon);
    this.a.text(this.name);
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.button.DisplayProfile.prototype.updateName = function(newName) {
    this.name = newName;
    this.a.text(this.name);
};

OpenM_BookGUI.community.button.DisplayCommunity = function(name) {
    this.name = name;
    this.a = $(document.createElement('a'));
    this.click = undefined;
};

OpenM_BookGUI.community.button.DisplayCommunity.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-primary");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-zoom-in");
    this.a.append(icon);
    this.a.text(this.name);
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.button.DisplayCommunity.prototype.updateName = function(newName) {
    this.name = newName;
    this.a.text(this.name);
};

OpenM_BookGUI.community.image = {};

OpenM_BookGUI.community.image.Profile = function() {
    this.img = $(document.createElement("img"));
    this.click = undefined;
};

OpenM_BookGUI.community.image.Profile.prototype.content = function() {
    this.img.empty();
    this.img.css("cursor", "pointer").attr({
        alt: "Photo du Profil",
        title: "Photo du profil",
        src: "http://us.cdn1.123rf.com/168nwm/mikefirsov/mikefirsov1205/mikefirsov120500001/13917063-icone-illustration-profil.jpg"
    }).addClass("photoCSS");
    this.img.click(this.click);
    return this.img;
};

OpenM_BookGUI.community.Actions = function(communityId) {
    this.communityId = communityId;
    this.c = $(document.createElement('div'));
    this.buttons = new Array();
};

OpenM_BookGUI.community.Actions.prototype.content = function() {
    this.c.empty();
    if (this.buttons.length !== 0) {
        for (var i in this.buttons) {
            this.c.append(this.buttons[i].content());
        }
    }
    return this.c;
};

OpenM_BookGUI.community.button.Register = function(communityId) {
    this.communityId = communityId;
    this.active = true;
    this.click = undefined;
    this.a = $(document.createElement('a'));
};

OpenM_BookGUI.community.button.Register.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-inverse");
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-star-empty");
    this.a.append(icon);

    if (this.active) {
        var gui = this;
        this.a.click(function() {
            gui.click();
            $(gui.a).addClass('disabled');
        });
        this.toolTipText = "S'inscrire dans cette communauté";
    } else {
        this.a.addClass("disabled");
        this.toolTipText = "Vous étes déja enregistré";
    }
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    this.a.tooltip();
    this.a.append(" S'inscrire");
    return this.a;
};

OpenM_BookGUI.community.button.UnRegister = function(communityId) {
    this.communityId = communityId;
    this.active = true;
    this.click = undefined;
    this.a = $(document.createElement('a'));
};

OpenM_BookGUI.community.button.UnRegister.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-inverse");
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-remove");
    this.a.append(icon);

    if (this.active) {
        var gui = this;
        this.a.click(function() {
            gui.click();
            $(gui.a).addClass('disabled');
        });
        this.toolTipText = "Se désinscrire s cette communauté";
    } else {
        this.a.addClass("disabled");
        this.toolTipText = "Vous n'étes pas enregistré dans cette communauté";
    }
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    this.a.tooltip();
    this.a.append(" Se désinscrire");
    return this.a;
};

OpenM_BookGUI.community.button.AddCommunity = function(communityName) {
    this.communityName = communityName;
    this.popover = '';
    this.a = $(document.createElement('a'));
};

OpenM_BookGUI.community.button.AddCommunity.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-inverse");
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-plus");
    this.a.append(icon);

    var option = {
        title: 'Nouvelle sous communauté',
        html: true,
        placement: 'bottom',
        content: this.popover.content().context
    };
    this.a.popover(option);

    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", "Ajouter une sous communauté à '" + this.communityName + "'");
    var gui = this;
    this.a.click(function() {
        gui.popover.input.focus();
        gui.popover.popover.on("click", "button", gui.popover.submit);
        gui.popover.popover.on("click", "a", function() {
            gui.a.click();
        });
    });
    this.a.tooltip();
    this.a.append(" Ajouter");
    return this.a;
};

OpenM_BookGUI.community.button.Rename = function(communityId) {
    this.communityId = communityId;
    this.id = "OpenM_BookGUI.community.button.Rename-" + this.communityId;
    this.a = $(document.createElement("a"));
    this.popover = undefined;
};

OpenM_BookGUI.community.button.Rename.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-warning btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-refresh");
    this.a.append(icon);
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", "Renommer la communauté");
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
        gui.popover.popover.on("click", "button", gui.popover.submit);
        gui.popover.popover.on("click", "a", function() {
            gui.a.click();
        });
    });

    this.a.append(" Renommer");
    return this.a;
};

OpenM_BookGUI.community.button.Delete = function() {
    this.a = $(document.createElement("a"));
    this.click = undefined;
};

OpenM_BookGUI.community.button.Delete.prototype.content = function() {
    this.a.empty();
    this.a.addClass("btn btn-danger");
    this.a.addClass("btn-space");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-trash");
    this.a.append(icon);
    this.a.attr("rel", "tooltip")
            .attr("data-placement", "top")
            .attr("data-toggle", "tooltip")
            .attr("data-original-title", "Supprimer la communauté (définitivement)");
    this.a.tooltip();
    this.a.append(" Supprimer");
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.popover = {};

//A continuer
OpenM_BookGUI.community.popover.Name = function(name) {
    this.name = name;
    this.input = $(document.createElement("input"));
    this.popover = $(document.createElement("form"));
    this.a = $(document.createElement("button"));
    this.submit = '';
};

OpenM_BookGUI.community.popover.Name.prototype.getName = function() {
    return this.input.val();
};

OpenM_BookGUI.community.popover.Name.prototype.content = function() {
    this.input.empty();
    this.input.attr("type", "text").attr("placeholder", this.text).attr("value", this.name);
    this.input.addClass("input-large");
    this.popover.empty();
    this.popover.addClass("control-group");
    var label = $(document.createElement("label"));
    label.addClass("control-label").attr("for", "inputNameCommunity").text(this.text);
    this.popover.append(label);
    var subdiv = $(document.createElement("div")).addClass("controls");
    subdiv.append(this.input);
    this.popover.append(subdiv);
    this.a.empty();
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

    return this.popover;
};