if (OpenM_BookController === undefined)
    var OpenM_BookController = {};

if (OpenM_BookController.search === undefined)
    OpenM_BookController.search = {};

OpenM_BookController.search.Pages = {
    AllSearchPagesControlers: new Array(),
    home: undefined,
    searchPage: function(search) {
        var searchController = undefined;
        if (search === undefined || search.length === 0) {
            if (this.home === undefined)
                this.home = new OpenM_BookController.search.Page();
            return this.home;
        }
        if (this.AllSearchPagesControlers[search] !== undefined)
            searchController = this.AllSearchPagesControlers[search];
        else {
            searchController = new OpenM_BookController.search.Page(search);
            this.AllSearchPagesControlers[search] = searchController;
        }
        return searchController;
    }
};

OpenM_BookController.search.Page = function(search) {
    if (search !== undefined && search.length > 0)
        this.search = OpenM_BookDAO.search.DAO.get(search);
    this.gui = new OpenM_BookGUI.search.Page();
};

OpenM_BookController.search.Page.prototype.display = function(enabled) {
    this.gui.display(enabled);
    if(this.search!==undefined)
        this.search.reload();
};