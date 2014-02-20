if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.user === undefined)
    OpenM_BookGUI.user = {};

OpenM_BookGUI.user.cst = undefined;

OpenM_BookGUI.user.Page = function() {
    this.modification = null;
    this.save = null;
    this.communities = null;
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.birthday = '';
    this.page = OpenM_BookGUI.gen.div();
    this.click = undefined;
};

OpenM_BookGUI.user.Page.prototype.update = function(name, firstName, lastName, birthday) {
    this.name = name;
    this.birthday = birthday;
    this.firstName = firstName;
    this.lastName = lastName;
    this.content();
};

OpenM_BookGUI.user.Page.prototype.content = function() {
    this.page.empty();
    this.page.addClass("row-fluid book-user-page");
    var bandeauProfil = OpenM_BookGUI.gen.div();
    var photoUser = OpenM_BookGUI.gen.div().append(OpenM_BookGUI.gen.img().attr({
        alt: "Photo du Profil",
        title: "Photo du profil",
        src: OpenM_BookGUI.Pages.userPhotoDefault
    }).addClass("book-user-photo"));
    bandeauProfil.append(photoUser);
    var userProperties = OpenM_BookGUI.gen.div()
            .addClass($("one-value > block > class", OpenM_BookGUI.user.cst).text())
            .append("<p>" + this.name + "</p>");
    if (this.birthday !== undefined)
        userProperties.append("<p><span class='glyphicon glyphicon-gift'></span> " + this.birthday + "<p>");
    bandeauProfil.append(userProperties);

    this.page.append(bandeauProfil);

    var div = OpenM_BookGUI.gen.div().addClass("row10 well book-user-fields-communities");
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
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.user.Fields.prototype.content = function() {
    this.c.empty();
    this.c.addClass("book-user-fields");
    var gui = this;
    $("properties > multi-values > *", OpenM_BookGUI.user.cst).each(function(key, value) {
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
    var div = OpenM_BookGUI.gen.div()
            .addClass("book-user-field-block");
    var c = OpenM_BookGUI.gen.div();
    div.append(c);
    c.append($("properties > multi-values > " + this.name + " > label", OpenM_BookGUI.user.cst).text() + " :");
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
    this.c = OpenM_BookGUI.gen.div();
    this.remove = undefined;
    this.input = OpenM_BookGUI.gen.input();
    this.enter = undefined;
};

OpenM_BookGUI.user.Field.prototype.val = function() {
    return this.input.val();
};

OpenM_BookGUI.user.Field.prototype.content = function() {
    this.c.empty();
    var content = OpenM_BookGUI.gen.div()
            .addClass("book-user-field");
    this.c.append(content);
    if (this.isInModificationMode === false) {
        if (this.isModifiable)
            content.addClass("book-user-field-modifiable");
        else
            content.addClass("book-user-field-read");
        var labelVal = OpenM_BookGUI.gen.div()
                .addClass("book-user-field-read-label");
        labelVal.append(OpenM_BookGUI.gen.span()
                .addClass($("properties > multi-values > " + this.name + " > icon", OpenM_BookGUI.user.cst).text()));
        var span = OpenM_BookGUI.gen.span()
                .append(this.value);
        labelVal.append(" ").append(span);
        content.append(labelVal);
        if (this.isModifiable) {
            span.click(this.click);
        }
    } else {
        content.addClass("control-group book-user-field-modification");
        var div = OpenM_BookGUI.gen.div()
                .addClass("form-inline controls");
        div.append(OpenM_BookGUI.gen.span()
                .addClass($("properties > multi-values > " + this.name + " > icon", OpenM_BookGUI.user.cst).text())
                .addClass("hidden-phone"))
                .append(" ");
        this.input.empty()
                .attr("type", $("properties > multi-values > " + this.name + " > type", OpenM_BookGUI.user.cst).text())
                .attr("placeholder", $("properties > multi-values > " + this.name + " > label", OpenM_BookGUI.user.cst).text())
                .val(this.value)
                .addClass("form-control " + $("properties > multi-values > " + this.name + " > input-class", OpenM_BookGUI.user.cst).text())
                .addClass("book-user-field-modification-input");
        this.input.click(function(e) {
            e.stopPropagation();
        });
        var gui = this;
        this.input.keyup(function(e) {
            if (e.keyCode === 13)
                gui.enter(e);
        });
        div.append(this.input);
        var remove = OpenM_BookGUI.gen.a()
                .addClass($("properties > buttons > cancel > class", OpenM_BookGUI.user.cst).text())
                .append(OpenM_BookGUI.gen.div().addClass($("properties > buttons > cancel > icon", OpenM_BookGUI.user.cst).text()))
                .append(" " + $("properties > buttons > cancel > label", OpenM_BookGUI.user.cst).text());
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
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.user.FieldAdd.prototype.content = function() {
    this.c.empty();
    var content = OpenM_BookGUI.gen.div()
            .addClass("book-user-fieldadd");
    var labelVal = OpenM_BookGUI.gen.span()
            .addClass("book-user-fieldadd-label");
    var i = OpenM_BookGUI.gen.span()
            .addClass($("properties > add > icon", OpenM_BookGUI.user.cst).text());
    labelVal.append(i);
    var j = OpenM_BookGUI.gen.span()
            .append(" " + $("properties > multi-values > " + this.name + " > add", OpenM_BookGUI.user.cst).text());
    j.click(this.click);
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
    this.communityNotValidatedBlocks = new Array();
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.user.Communities.prototype.sort = function(block) {
    var communitiesSorted = new Array();
    for (var i in block) {
        communitiesSorted.push(block[i]);
    }
    communitiesSorted = $(communitiesSorted).sort(function(a, b) {
        if (a.category !== undefined)
            return (a.category.name > b.category.name) ? 1 : -1;
    });
    return communitiesSorted;
};

OpenM_BookGUI.user.Communities.prototype.content = function() {
    this.c.empty();
    if (this.communityBlocks.length > 0) {
        var divCommunities = OpenM_BookGUI.gen.div();
        divCommunities.addClass("book-user-communities");
        divCommunities.append($("communities > label", OpenM_BookGUI.user.cst).text() + " :");
        this.c.append(divCommunities);
        var community = {name: ""};
        this.sort(this.communityBlocks).each(function(k, v) {
            if (v.category !== undefined) {
                if (community.name !== v.category.name) {
                    divCommunities.append("<br/>");
                    community = v.category;
                    divCommunities.append(OpenM_BookGUI.gen.div()
                            .addClass("book-user-community-categorie")
                            .append(v.category.content()));
                }
                divCommunities.append(v.content());
            }
        });
    }
    if (this.communityNotValidatedBlocks.length > 0) {
        if (this.communityBlocks.length > 0)
            this.c.append("<br/>");
        var divCommunitiesNotValidated = OpenM_BookGUI.gen.div();
        divCommunitiesNotValidated.addClass("book-user-communities-not-validated");
        divCommunitiesNotValidated.append($("communities > label-not-validated", OpenM_BookGUI.user.cst).text() + " :");
        this.c.append(divCommunitiesNotValidated);
        var community = {name: ""};
        this.sort(this.communityNotValidatedBlocks).each(function(k, v) {
            if (v.category !== undefined) {
                if (community.name !== v.category.name) {
                    divCommunitiesNotValidated.append("<br/>");
                    community = v.category;
                    divCommunitiesNotValidated.append(OpenM_BookGUI.gen.div()
                            .addClass("book-user-community-categorie")
                            .append(v.category.content()));
                }
                divCommunitiesNotValidated.append(v.content());
            }
        });
    }
    return this.c;
};

OpenM_BookGUI.user.Communities.prototype.update = function() {
    this.content();
};

OpenM_BookGUI.user.CommunityBlock = function(community) {
    this.communities = new Array();
    this.category = community;
};

OpenM_BookGUI.user.CommunityBlock.prototype.content = function() {
    var div = OpenM_BookGUI.gen.div();
    var c = OpenM_BookGUI.gen.div()
            .addClass("book-user-community-block");
    div.append(c);
    var first = true;
    for (var i in this.communities) {
        c.append(this.communities[i].content());
    }
    return div;
};

OpenM_BookGUI.user.Community = function(name) {
    this.name = name;
    this.click = undefined;
    this.c = OpenM_BookGUI.gen.a();
};

OpenM_BookGUI.user.Community.prototype.content = function() {
    this.c.empty();
    this.c.addClass($("communities > class", OpenM_BookGUI.user.cst).text() + " book-user-community");
    this.c.text(this.name);
    this.c.click(this.click);
    return this.c;
};

OpenM_BookGUI.user.Community.prototype.updateName = function(newName) {
    this.name = newName;
    this.content();
};