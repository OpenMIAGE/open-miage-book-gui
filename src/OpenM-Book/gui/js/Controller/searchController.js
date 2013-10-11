if (OpenM_BookController === undefined)
    var OpenM_BookController = {};

if (OpenM_BookController.search === undefined)
    OpenM_BookController.search = {};

OpenM_BookController.search.Pages = {
    AllSearchPagesControlers: new Array(),
    searchPage: function(search) {


        userControler = new OpenM_BookController.search.Page(search);
        this.AllSearchPagesControlers[search.id] = userControler;

    }
};

OpenM_BookController.search.Page = function(search) {

};

OpenM_BookController.search.Page.prototype.display = function(enabled) {
    this.gui.display(enabled);
};