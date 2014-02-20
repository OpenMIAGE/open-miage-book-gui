if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.search === undefined)
    OpenM_BookGUI.search = {};

OpenM_BookGUI.search.cst = undefined;

OpenM_BookGUI.search.Page = function(search) {
    this.search = search;
    this.page = OpenM_BookGUI.gen.div();
    this.click = undefined;
    this.input = OpenM_BookGUI.gen.input();
    this.results = undefined;
};

OpenM_BookGUI.search.Page.prototype.content = function() {
    this.page.empty();
    this.page.addClass("row-fluid");
    var div = OpenM_BookGUI.gen.div().addClass("row10 well book-search-page");
    var divSearch = OpenM_BookGUI.gen.div().addClass("book-search-input-block");
    var gui = this;
    divSearch
            .append(this.input.addClass($("search > input > class", OpenM_BookGUI.search.cst).text())
            .val(this.search)
            .keyup(function(e) {
        if (e.keyCode === 13)
            gui.click(e);
        e.stopPropagation();
    }))
            .append(" ")
            .append(OpenM_BookGUI.gen.a()
            .append(OpenM_BookGUI.gen.i().addClass($("search > btn > icon", OpenM_BookGUI.search.cst).text()))
            .addClass($("search > btn > class", OpenM_BookGUI.search.cst).text())
            .append($("search > btn > label", OpenM_BookGUI.search.cst).text())
            .click(this.click));
    div.append(divSearch);
    this.page.append(div);
    if (this.results !== undefined)
        div.append("</br>").append(this.results.content());
    var input = this.input;
    setTimeout(function() {
        input.focus();
    }, 500);
    return this.page;
};

OpenM_BookGUI.search.Page.prototype.getSearsh = function() {
    return this.input.val();
};

OpenM_BookGUI.search.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());
};

OpenM_BookGUI.search.Results = function() {
    this.c = OpenM_BookGUI.gen.div();
    this.users = undefined;
    this.communities = undefined;
    this.groups = undefined;
};

OpenM_BookGUI.search.Results.prototype.content = function() {
    this.c.empty();
    this.c.append(this.users.content());
    this.c.append(this.communities.content());
    this.c.append(this.groups.content());
    return this.c;
};

OpenM_BookGUI.search.ResultUsers = function() {
    this.users = new Array();
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.search.ResultUsers.prototype.content = function() {
    this.c.empty();
    if (this.users.length > 0) {
        var div = OpenM_BookGUI.gen.div().addClass("book-search-results-users");
        div.append($("results > users > title", OpenM_BookGUI.search.cst).text())
                .append("</br>");
        this.c.append(div);
        for (var u in this.users) {
            div.append(this.users[u].content());
        }
    }
    return this.c;
};

OpenM_BookGUI.search.ResultCommunities = function() {
    this.communities = new Array();
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.search.ResultCommunities.prototype.content = function() {
    this.c.empty();
    if (this.communities.length > 0) {
        var div = OpenM_BookGUI.gen.div().addClass("book-search-results-communities");
        div.append($("results > communities > title", OpenM_BookGUI.search.cst).text())
                .append("</br>");
        this.c.append(div);
        for (var i in this.communities) {
            div.append(this.communities[i].content());
        }
    }
    return this.c;
};

OpenM_BookGUI.search.ResultCommunity = function(name) {
    this.name = name;
    this.a = OpenM_BookGUI.gen.a();
    this.click = undefined;
};

OpenM_BookGUI.search.ResultCommunity.prototype.content = function() {
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

OpenM_BookGUI.search.ResultGroups = function() {
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.search.ResultGroups.prototype.content = function() {
    this.c.empty();

    return this.c;
};

OpenM_BookGUI.search.ResultGroup = function() {
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.search.ResultGroup.prototype.content = function() {
    this.c.empty();

    return this.c;
};