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
    this.click = undefined;
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

    this.page.click(this.click);

    return this.page;
};

OpenM_BookGUI.user.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());

};

OpenM_BookGUI.user.button = {};

OpenM_BookGUI.user.Fields = function() {
    this.fieldBlocks = new Array();
    this.c = $(document.createElement("div"));
};

OpenM_BookGUI.user.Fields.prototype.content = function() {
    this.c.empty();
    var gui = this;
    $("properties > multi-values > *", OpenM_BookGUI.user.const).each(function(key, value) {
        for (var i in gui.fieldBlocks) {
            if (value.tagName === gui.fieldBlocks[i].name) {
                gui.c.append(gui.fieldBlocks[i].content());
                return;
            }
        }
    });
    return this.c;
};

OpenM_BookGUI.user.Fields.prototype.update = function() {
    this.content();
};

OpenM_BookGUI.user.FieldBlock = function(name) {
    this.name = name;
    this.fields = new Array();
    this.add = undefined;
};

OpenM_BookGUI.user.FieldBlock.prototype.content = function() {
    var div = $(document.createElement("div")).css("margin-bottom", 10);
    var c = $(document.createElement("div"));
    div.append(c);
    c.append($("properties multi-values " + this.name + " label", OpenM_BookGUI.user.const).text() + " :");
    for (var i in this.fields) {
        c.append(this.fields[i].content());
    }
    if (this.add !== undefined)
        c.append(this.add.content());
    return div;
};

OpenM_BookGUI.user.Field = function(name, value, isModifiable) {
    this.isInModificationMode = false;
    this.name = name;
    this.value = value;
    this.click = undefined;
    this.isModifiable = (isModifiable !== undefined) ? isModifiable : false;
    this.c = $(document.createElement("div"));
    this.remove = undefined;
    this.input = $(document.createElement("input"));
    this.enter = undefined;
};

OpenM_BookGUI.user.Field.prototype.val = function() {
    return this.input.val();
};

OpenM_BookGUI.user.Field.prototype.content = function() {
    this.c.empty();
    var content = $(document.createElement("div"));
    this.c.append(content);
    content.css("margin", 0).css("margin-left", 20);
    if (this.isInModificationMode === false) {
        content.css("height", 30);
        content.addClass("user-field");
        var labelVal = $(document.createElement("div")).css("padding-top", 7);
        labelVal.append($(document.createElement("i")).addClass($("properties multi-values " + this.name + " icon", OpenM_BookGUI.user.const).text()));
        var span = $(document.createElement("span")).append(this.value);
        labelVal.append(" ").append(span);
        content.append(labelVal);
        if (this.isModifiable) {
            span.click(this.click);
            span.css("cursor", "pointer");
        }
    } else {
        content.addClass("user-field");
        content.addClass("control-group");
        var div = $(document.createElement("div"))
                .addClass("controls");
        div.append($(document.createElement("i"))
                .addClass($("properties multi-values " + this.name + " icon", OpenM_BookGUI.user.const).text())
                .addClass("hidden-phone"))
                .append(" ");
        this.input.empty()
                .attr("type", "text")
                .attr("placeholder", $("properties multi-values " + this.name + " label", OpenM_BookGUI.user.const).text())
                .val(this.value)
                .addClass("input-large")
                .css("margin", 0);
        this.input.click(function(e) {
            e.stopPropagation();
        });
        var gui = this;
        this.input.keyup(function(e) {
            if (e.keyCode === 13)
                gui.enter(e);
        });
        div.append(this.input);
        var remove = $(document.createElement("a"))
                .addClass($("properties buttons cancel class", OpenM_BookGUI.user.const).text())
                .append($(document.createElement("i")).addClass($("properties buttons cancel icon", OpenM_BookGUI.user.const).text()))
                .append(" " + $("properties buttons cancel label", OpenM_BookGUI.user.const).text());
        remove.click(this.remove);
        div.append(remove);
        setTimeout(function() {
            gui.input.focus();
        }, 50);
        content.append(div);
    }
    return this.c;
};


OpenM_BookGUI.user.FieldAdd = function(name) {
    this.name = name;
    this.click = undefined;
    this.added = undefined;
    this.c = $(document.createElement("div"));
};

OpenM_BookGUI.user.FieldAdd.prototype.content = function() {
    this.c.empty();
    var content = $(document.createElement("div")).css("margin-left", 20).css("height", 30);
    content.addClass("user-field");
    var labelVal = $(document.createElement("span")).css("padding-top", 7);
    var i = $(document.createElement("i")).addClass($("properties add icon", OpenM_BookGUI.user.const).text());
    labelVal.append(i);
    var j = $(document.createElement("i")).append(" " + $("properties " + this.name + " add", OpenM_BookGUI.user.const).text());
    j.click(this.click);
    j.css("cursor", "pointer");
    labelVal.append(j);
    content.append(labelVal);
    if (this.added === undefined)
        this.c.append(content);
    else
        this.c.append(this.added.content()).append(content);
    return this.c;
};

OpenM_BookGUI.user.Communities = function() {
    this.communityBlocks = new Array();
    this.c = $(document.createElement("div"));
};

OpenM_BookGUI.user.Communities.prototype.content = function() {
    this.c.empty();
    var div = $(document.createElement("div"));
    div.append($("communities label", OpenM_BookGUI.user.const).text() + " :");
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