if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.community === undefined)
    OpenM_BookGUI.community = {};

OpenM_BookGUI.community.cst = undefined;

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
        var c = OpenM_BookGUI.gen.div();
        c.addClass("row10 well");
        c.addClass("book-community-page");
        cadre.append(c);

        //la navigation
        var communities = OpenM_BookGUI.gen.div();
        c.append(communities);
        var community = this.tree.content();
        communities.append(community);

        //Les actions
        var actions = OpenM_BookGUI.gen.div()
                .append(this.actions.content());
        communities.append(actions);

        var div = this.childs.content();
        div.addClass("inline");
        communities.append(div);

        //les users
        var users = OpenM_BookGUI.gen.div().addClass("row-fluid");
        c.append(users);
        users.append(this.users.content());

        //les users not valid
        var usersNotValid = OpenM_BookGUI.gen.div().addClass("row-fluid");
        c.append(usersNotValid);
        usersNotValid.append(this.usersNotValid.content());

        c.append(this.banned.content());
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
    var div = OpenM_BookGUI.gen.div();
    div.addClass("book-community-tree");
    var first = true;
    $.each(this.communities, function(key, value) {
        if (first === true)
            first = false;
        else
            div.append(" <i class='" + $("tree > separator", OpenM_BookGUI.community.cst).text() + "'></i> ");

        div.append(value.content());
    });
    return div;
};

OpenM_BookGUI.community.InTree = function(communityId, name, active) {
    this.id = communityId;
    this.name = name;
    this.active = active;
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.community.InTree.prototype.content = function() {
    this.a.empty();
    if (this.active) {
        this.a.addClass($("inTree > class", OpenM_BookGUI.community.cst).text());
        this.a.click(this.click);
        this.a.attr("rel", "tooltip");
        this.a.attr("data-placement", "top");
        this.a.attr("data-toggle", "tooltip");
        this.a.attr("data-original-title", $("inTree > tooltip", OpenM_BookGUI.community.cst).text() + " " + this.name);
        this.a.tooltip();
    }
    else {
        this.a.addClass($("inTree > classDisabled", OpenM_BookGUI.community.cst).text());
    }
    this.a.text(this.name);
    return this.a;
};

OpenM_BookGUI.community.InTree.prototype.updateName = function(name) {
    this.name = name;
    if (this.a !== undefined)
        this.content();
};

OpenM_BookGUI.community.Childs = function(communityId) {
    this.communityId = communityId;
    this.communities = new Array();
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.community.Childs.prototype.content = function() {
    this.c.empty();
    if (this.communities.length > 0)
        this.c.addClass("book-community-childs");
    for (var i in this.communities) {
        this.c.append(this.communities[i].content());
    }
    return this.c;
};

OpenM_BookGUI.community.Child = function(communityId, name) {
    this.communityId = communityId;
    this.name = name;
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.community.Child.prototype.content = function() {
    this.a.empty();
    this.a.addClass("book-community-child");
    this.a.addClass($("child > class", OpenM_BookGUI.community.cst).text());
    this.a.text(this.name);
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "bottom");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", $("child > tooltip", OpenM_BookGUI.community.cst).text() + " " + this.name);
    this.a.tooltip();
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.Child.prototype.updateName = function(name) {
    this.name = name;
    if (this.a !== undefined)
        this.content();
};

OpenM_BookGUI.community.Users = function(communityId) {
    this.communityId = communityId;
    this.users = new Array();
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.community.Users.prototype.content = function() {
    this.c.empty();
    if (this.users.length !== 0) {
        this.c.addClass("book-community-users");
        this.c.append("<p>" + $("users > label", OpenM_BookGUI.community.cst).text() + " :</p>");
        var div = OpenM_BookGUI.gen.div().css("display", "inline");
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
    this.c = OpenM_BookGUI.gen.div();
    this.buttonDisplayProfil = undefined;
    this.imageProfile = undefined;
};

OpenM_BookGUI.community.User.prototype.content = function() {
    this.c.empty();
    this.c.addClass("book-community-user");
    this.c.append(this.imageProfile.content());
    this.c.append("<br />");
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
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.community.UsersNotValid.prototype.content = function() {
    this.c.empty();
    if (this.users.length !== 0) {
        this.c.addClass("book-community-users-not-valid");
        this.c.append("<p>" + $("usersNotValid > label", OpenM_BookGUI.community.cst).text() + " :</p>");
        var div = OpenM_BookGUI.gen.div();
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
    this.c = OpenM_BookGUI.gen.div();
    this.imageProfile = undefined;
};

OpenM_BookGUI.community.UserNotValid.prototype.content = function() {
    this.c.empty();
    this.c.addClass("book-community-user-not-valid");
    this.c.append(this.imageProfile.content());
    this.c.append(this.buttonValidate.content())
            .append("<br />")
            .append(this.buttonDisplayProfil.content())
            .append("<br />")
            .append("<i class='icon-play'></i> ")
            .append(this.buttonDisplayCommunity.content());
    return this.c;
};

OpenM_BookGUI.community.Banned = function(name) {
    this.name = name;
    this.banned = false;
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.community.Banned.prototype.content = function() {
    this.c.empty();
    this.c.addClass("book-community-banned");
    if (this.banned)
        this.c.append($("banned > label", OpenM_BookGUI.community.cst).text()+" '" + this.name + "'");
    return this.c;
};

OpenM_BookGUI.community.button = {};

OpenM_BookGUI.community.button.Validate = function() {
    this.a = OpenM_BookGUI.gen.a();
    this.click = '';
    this.popover = undefined;
    this.isAlreadyAcceptedByUser = undefined;
};

OpenM_BookGUI.community.button.Validate.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons validate class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons validate icon", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", $("buttons > validate > tooltip", OpenM_BookGUI.community.cst).text());
    this.a.tooltip();
    if (this.isAlreadyAcceptedByUser === false) {
        var option = {
            title: $("buttons > validate > title", OpenM_BookGUI.community.cst).text(),
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
    } else {
        this.a.addClass("disabled");
    }
    return this.a;
};

OpenM_BookGUI.community.button.DisplayProfile = function(name) {
    this.name = name;
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.community.button.DisplayProfile.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > displayProfile > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > displayProfile > class", OpenM_BookGUI.community.cst).text());
    this.a.css("margin-bottom", 5)
            .append(icon)
            .text(this.name)
            .click(this.click);
    return this.a;
};

OpenM_BookGUI.community.button.DisplayProfile.prototype.updateName = function(newName) {
    this.name = newName;
    this.a.text(this.name);
};

OpenM_BookGUI.community.button.DisplayCommunity = function(name) {
    this.name = name;
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.community.button.DisplayCommunity.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > displayCommunity > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons displayCommunity icon", OpenM_BookGUI.community.cst).text());
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
    this.img = OpenM_BookGUI.gen.img();
    this.click = undefined;
};

OpenM_BookGUI.community.image.Profile.prototype.content = function() {
    this.img.empty();
    this.img.css("cursor", "pointer").attr({
        alt: "Photo du Profil",
        title: "Photo du profil",
        src: "http://us.cdn1.123rf.com/168nwm/mikefirsov/mikefirsov1205/mikefirsov120500001/13917063-icone-illustration-profil.jpg"
    }).addClass("book-community-user-photo");
    this.img.click(this.click);
    return this.img;
};

OpenM_BookGUI.community.Actions = function(communityId) {
    this.communityId = communityId;
    this.c = OpenM_BookGUI.gen.div();
    this.buttons = new Array();
};

OpenM_BookGUI.community.Actions.prototype.content = function() {
    this.c.empty();
    this.c.addClass("book-community-actions");
    if (this.buttons.length !== 0) {
        this.c.css("margin-top", 10);
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
    this.a = OpenM_BookGUI.gen.a();
};

OpenM_BookGUI.community.button.Register.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > register > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > register > icon", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);

    if (this.active) {
        var gui = this;
        this.a.click(function() {
            gui.click();
            $(gui.a).addClass('disabled');
        });
        this.toolTipText = $("buttons > register > tooltip", OpenM_BookGUI.community.cst).text();
    } else {
        this.a.addClass("disabled");
        this.toolTipText = $("buttons > register > tooltipAlreadyRegistered", OpenM_BookGUI.community.cst).text();
    }
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    this.a.tooltip();
    this.a.append(" " + $("buttons > register > label", OpenM_BookGUI.community.cst).text());
    return this.a;
};

OpenM_BookGUI.community.button.UnRegister = function(communityId) {
    this.communityId = communityId;
    this.active = true;
    this.click = undefined;
    this.a = OpenM_BookGUI.gen.a();
};

OpenM_BookGUI.community.button.UnRegister.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > unRegister > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > unRegister > icon", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);

    if (this.active) {
        var gui = this;
        this.a.click(function() {
            gui.click();
            $(gui.a).addClass('disabled');
        });
        this.toolTipText = $("buttons > unRegister > tooltip", OpenM_BookGUI.community.cst).text();
    } else {
        this.a.addClass("disabled");
        this.toolTipText = $("buttons > unRegister > tooltipAlreadyUnRegistered", OpenM_BookGUI.community.cst).text();
    }
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", this.toolTipText);
    this.a.tooltip();
    this.a.append(" " + $("buttons > unRegister > label", OpenM_BookGUI.community.cst).text());
    return this.a;
};

OpenM_BookGUI.community.button.AddCommunity = function(communityName) {
    this.communityName = communityName;
    this.popover = '';
    this.a = OpenM_BookGUI.gen.a();
};

OpenM_BookGUI.community.button.AddCommunity.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > add > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > add > icon", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);

    var option = {
        title: $("buttons > add > title", OpenM_BookGUI.community.cst).text(),
        html: true,
        placement: 'bottom',
        content: this.popover.content().context
    };
    this.a.popover(option);

    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", $("buttons > add > tooltip", OpenM_BookGUI.community.cst).text() + " '" + this.communityName + "'");
    var gui = this;
    this.a.click(function() {
        gui.popover.input.focus();
        gui.popover.popover.on("click", "button", gui.popover.submit);
        gui.popover.popover.on("click", "a", function() {
            gui.a.click();
        });
    });
    this.a.tooltip();
    this.a.append(" " + $("buttons > add > label", OpenM_BookGUI.community.cst).text());
    return this.a;
};

OpenM_BookGUI.community.button.Refresh = function(communityName) {
    this.name = communityName;
    this.popover = '';
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.community.button.Refresh.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > refresh > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > refresh > icon", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);
    this.a.attr("rel", "tooltip")
            .attr("data-placement", "top")
            .attr("data-toggle", "tooltip")
            .attr("data-original-title", $("buttons > refresh > tooltip", OpenM_BookGUI.community.cst).text() + " " + this.name);
    this.a.tooltip();
    this.a.click(this.click);
    this.a.append(" " + $("buttons > refresh > label", OpenM_BookGUI.community.cst).text());
    return this.a;
};

OpenM_BookGUI.community.button.Rename = function(communityId) {
    this.communityId = communityId;
    this.a = OpenM_BookGUI.gen.a();
    this.popover = undefined;
};

OpenM_BookGUI.community.button.Rename.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > rename > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > rename > icon", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);
    this.a.attr("rel", "tooltip");
    this.a.attr("data-placement", "top");
    this.a.attr("data-toggle", "tooltip");
    this.a.attr("data-original-title", $("buttons > rename > tooltip", OpenM_BookGUI.community.cst).text());
    this.a.tooltip();

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

    this.a.append(" " + $("buttons > rename > label", OpenM_BookGUI.community.cst).text());
    return this.a;
};

OpenM_BookGUI.community.button.Delete = function() {
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.community.button.Delete.prototype.content = function() {
    this.a.empty();
    this.a.addClass($("buttons > delete > class", OpenM_BookGUI.community.cst).text());
    var icon = OpenM_BookGUI.gen.i();
    icon.addClass($("buttons > delete > tooltip", OpenM_BookGUI.community.cst).text());
    this.a.append(icon);
    this.a.attr("rel", "tooltip")
            .attr("data-placement", "top")
            .attr("data-toggle", "tooltip")
            .attr("data-original-title", $("buttons > delete > tooltip", OpenM_BookGUI.community.cst).text());
    this.a.tooltip();
    this.a.append(" " + $("buttons > delete > label", OpenM_BookGUI.community.cst).text());
    this.a.click(this.click);
    return this.a;
};

OpenM_BookGUI.community.popover = {};

//A continuer
OpenM_BookGUI.community.popover.Name = function(name) {
    this.name = name;
    this.input = OpenM_BookGUI.gen.input();
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
    var subdiv = OpenM_BookGUI.gen.div().addClass("controls");
    subdiv.append(this.input);
    this.popover.append(subdiv);
    this.a.empty();
    this.a.addClass("btn").addClass("btn-primary").addClass("btn-small");
    this.a.attr('type', 'submit');
    var i = OpenM_BookGUI.gen.i();
    i.addClass("icon-white").addClass("icon-ok-circle");
    this.a.append(i);
    this.a.append(" Enregistrer");

    var cancel = OpenM_BookGUI.gen.a().addClass("btn btn-primary btn-small");
    var icancel = OpenM_BookGUI.gen.i().addClass("icon-white icon-remove");
    cancel.append(icancel);
    cancel.append(" Annuler");
    this.popover.append(this.a);
    this.popover.append("&nbsp;");
    this.popover.append(cancel);

    return this.popover;
};