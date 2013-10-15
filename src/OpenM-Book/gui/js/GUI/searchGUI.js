if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.search === undefined)
    OpenM_BookGUI.search = {};

OpenM_BookGUI.search.cst = undefined;

OpenM_BookGUI.search.Page = function() {
    this.page = OpenM_BookGUI.gen.div();
    this.click = undefined;
    this.input = OpenM_BookGUI.gen.input();    
};

OpenM_BookGUI.search.Page.prototype.content = function() {
    this.page.empty();
    this.page.addClass("row-fluid book-search-page");
    var div = OpenM_BookGUI.gen.div().addClass("row10 well book-search-page-content");
    var divSearch = OpenM_BookGUI.gen.div().addClass("book-search-input-block");
    divSearch.append(this.input);
    div.append(divSearch);
    this.page.append(div);
    return this.page;
};

OpenM_BookGUI.search.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());

};