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
    this.page.addClass("row-fluid book-search-page");
    var div = OpenM_BookGUI.gen.div().addClass("row10 well book-search-page-content");
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
    this.page.append(this.results.content());
    return this.page;
};

OpenM_BookGUI.search.Page.prototype.getSearsh = function() {
    return this.input.val();
};

OpenM_BookGUI.search.Results = function() {
    this.c = OpenM_BookGUI.gen.div();
    this.users = undefined;
    this.communities = undefined;
    this.groups = undefined;
};

OpenM_BookGUI.search.Results.prototype.content = function() {
    this.c.empty();
    return this.c;
};

OpenM_BookGUI.search.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());

};

OpenM_BookGUI.search.ResultUsers = function() {
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.search.ResultCommunities = function() {
    this.c = OpenM_BookGUI.gen.div();
};

OpenM_BookGUI.search.ResultGroups = function() {
    this.c = OpenM_BookGUI.gen.div();
};