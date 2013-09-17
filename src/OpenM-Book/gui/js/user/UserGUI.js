OpenM_BookGUI.user = {};

OpenM_BookGUI.user.const = undefined;

OpenM_BookGUI.user.Page = function() {
    this.modification = null;
    this.save = null;
    this.communities = null;
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.page = $(document.createElement("div"));
};

OpenM_BookGUI.user.Page.prototype.udpate = function(name, firstName, lastName) {
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
    this.content();
};

OpenM_BookGUI.user.Page.prototype.content = function() {
    this.page.empty();
    this.page.addClass("row-fluid");
    var bandeauProfil = $(document.createElement('div'));
    // Photo de profil
    var photoUser = $(document.createElement("img")).attr({
        alt: "Photo du Profil",
        title: "Photo du profil",
        src: "http://us.cdn1.123rf.com/168nwm/mikefirsov/mikefirsov1205/mikefirsov120500001/13917063-icone-illustration-profil.jpg"
    }).addClass("photoCSS");
    bandeauProfil.append(photoUser)
            .append(this.name);

    this.page.append(bandeauProfil);

    var div = $(document.createElement('div')).addClass("row10 well");
    this.page.append(div);
    div.append(this.fields.content());
    div.append(this.communities.content());

//    if (this.modification !== null)
//        this.page.append(this.modification.content());
//    if (this.save !== null)
//        this.page.append(this.save.content());
    return this.page;
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
                .addClass("btn btn-info btn-large");
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
        a.addClass("btn btn-info btn-large");
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
    var div = $(document.createElement("div")).css("margin-bottom", 10);
    var c = $(document.createElement("div"));
    div.append(c);
    c.append($("properties multi-values "+this.name+" label",OpenM_BookGUI.user.const).text() + " :");
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
    var content = $(document.createElement("div")).css("margin-left", 20);
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

OpenM_BookGUI.user.Communities = function() {
    this.communityBlocks = new Array();
    this.c = $(document.createElement("div"));
};

OpenM_BookGUI.user.Communities.prototype.content = function() {
    this.c.empty();
    var div = $(document.createElement("div"));
    div.append($("communities label",OpenM_BookGUI.user.const).text()+" :");
    this.c.append(div);
    for (var i in this.communityBlocks) {
        div.append(this.communityBlocks[i].content());
    }
    return this.c;
};

OpenM_BookGUI.user.Communities.prototype.update = function() {
    this.content();
};

OpenM_BookGUI.user.CommunityBlock = function() {
    this.communities = new Array();
};

OpenM_BookGUI.user.CommunityBlock.prototype.content = function() {
    var div = $(document.createElement("div")).css("padding", 5);
    var c = $(document.createElement("div"));
    div.append(c);
    var first = true;
    for (var i in this.communities) {
        if (first)
            first = false;
        else
            c.append(" <i class='icon-play'></i> ");
        c.append(this.communities[i].content());
    }
    return div;
};

OpenM_BookGUI.user.Community = function(name) {
    this.name = name;
    this.click = undefined;
    this.c = $(document.createElement("a"));
};

OpenM_BookGUI.user.Community.prototype.content = function() {
    this.c.empty();
    this.c.addClass("btn");
    var icon = $(document.createElement("i"));
    icon.addClass("icon-white icon-zoom-in");
    this.c.append(icon);
    this.c.text(this.name);
    this.c.click(this.click);
    return this.c;
};

OpenM_BookGUI.user.Community.prototype.updateName = function(newName) {
    this.name = newName;
    this.content();
};