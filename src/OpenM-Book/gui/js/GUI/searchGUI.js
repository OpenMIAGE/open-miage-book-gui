if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.search === undefined)
    OpenM_BookGUI.search = {};

OpenM_BookGUI.search.cst = undefined;

OpenM_BookGUI.search.Page = function() {
    this.page = $(document.createElement("div"));
    this.click = undefined;
};

OpenM_BookGUI.search.Page.prototype.content = function() {
    this.page.empty();
    this.page.addClass("row-fluid book-user-page");
    
    return this.page;
};

OpenM_BookGUI.search.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());

};