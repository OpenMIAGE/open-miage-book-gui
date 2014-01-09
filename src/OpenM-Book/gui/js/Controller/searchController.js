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
        this.search = OpenM_BookDAO.search.DAO.get(search, undefined, undefined, undefined, false);
    this.gui = new OpenM_BookGUI.search.Page(search);
    this.results = new OpenM_BookController.search.Results(this.search);
    this.gui.results = this.results.gui;
    var controller = this;
    this.gui.click = function(event) {
        OpenM_BookController.commons.URL.clickToSearch(controller.gui.getSearsh());
        event.stopPropagation();
    };
};

OpenM_BookController.search.Page.prototype.display = function(enabled) {
    this.gui.display(enabled);
    if (this.search !== undefined)
        this.search.reload();
};

OpenM_BookController.search.Results = function(search) {
    this.search = search;
    this.gui = new OpenM_BookGUI.search.Results();
    this.users = new OpenM_BookGUI.search.ResultUsers();
    this.gui.users = this.users.gui;
    this.communities = new OpenM_BookGUI.search.ResultCommunities();
    this.gui.communities = this.communities.gui;
    this.groups = new OpenM_BookGUI.search.ResultGroups();
    this.gui.groups = this.groups.gui;
};

OpenM_BookController.search.ResultUsers = function(search) {
    this.search = search;
    this.gui = new OpenM_BookGUI.search.ResultUsers();
};

OpenM_BookController.search.ResultCommunities = function(search) {
    this.search = search;
    this.gui = new OpenM_BookGUI.search.ResultCommunities();
};

OpenM_BookController.search.ResultGroups = function(search) {
    this.search = search;
    this.gui = new OpenM_BookGUI.search.ResultGroups();
};