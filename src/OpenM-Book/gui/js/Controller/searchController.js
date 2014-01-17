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
    this.gui = new OpenM_BookGUI.search.Page(search);
    if (search !== undefined && search.length > 0) {
        this.search = OpenM_BookDAO.search.DAO.get(search, undefined, undefined, undefined, false);
        this.results = new OpenM_BookController.search.Results(this.search);
        this.gui.results = this.results.gui;
    }
    else
        this.search = new OpenM_BookDAO.search.ExchangeObject("");
    var controller = this;
    this.gui.click = function(event) {
        event.stopPropagation();
        if ((controller.search.search !== ""
                && controller.search.search !== controller.gui.getSearsh())
                ||
                controller.search.search === ""
                && controller.gui.getSearsh() !== "")
            OpenM_BookController.commons.URL.clickToSearch(controller.gui.getSearsh());
        else if (controller.search.search !== "")
            controller.search.reload();
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
    this.users = new OpenM_BookController.search.ResultUsers();
    this.gui.users = this.users.gui;
    this.communities = new OpenM_BookController.search.ResultCommunities();
    this.gui.communities = this.communities.gui;
    this.groups = new OpenM_BookController.search.ResultGroups();
    this.gui.groups = this.groups.gui;

    var controller = this;
    this.update = function() {
        controller.users.users = new Array();
        controller.gui.users.users = new Array();
        if (controller.search.users !== undefined) {
            for (var n in controller.search.users) {
                var u = OpenM_BookController.community.User.from(controller.search.users[n]);
                controller.gui.users.users.push(u.gui);
                controller.users.users.push(u);
            }
        }
        controller.communities.communities = new Array();
        controller.gui.communities.communities = new Array();
        if (controller.search.communities !== undefined) {
            for (var n in controller.search.communities) {
                var c = OpenM_BookController.community.Child.from(controller.search.communities[n]);
                controller.gui.communities.communities.push(c.gui);
                controller.communities.communities.push(c);
            }
        }
        controller.groups.groups = new Array();
        controller.gui.groups.groups = new Array();
        if (controller.search.groups !== undefined) {
            for (var n in controller.search.groups) {
                var c = OpenM_BookController.search.ResultGroup.from(controller.search.groups[n]);
                controller.gui.groups.groups.push(c.gui);
                controller.groups.groups.push(c);
            }
        }
        controller.gui.content();
    };
    this.update();
    this.search.addUpdateCallBack(this.update);
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

OpenM_BookController.search.ResultGroup = function(group) {
    this.group = group;
    this.gui = new OpenM_BookGUI.search.ResultGroup();
};

OpenM_BookController.search.ResultGroup.all = new Array();
OpenM_BookController.search.ResultGroup.from = function(group) {
    if (OpenM_BookController.search.ResultGroup.all[group.id] !== undefined)
        return OpenM_BookController.search.ResultGroup.all[group.id];

    var c = new OpenM_BookController.search.ResultGroup(group);
    OpenM_BookController.search.ResultGroup.all[group.id] = c;
    return c;
};