OpenM_BookController.user = {};

OpenM_BookController.user.Pages = {
    AllUserPagesControlers: new Array(),
    defaultUserId: null,
    communitiesActivated: true,
    userPage: function(userId, reload) {
        var user = null;
        if (reload === false)
            return this.AllUserPagesControlers[userId];

        if (!userId && this.defaultUserId === null) {
            if (OpenM_BookDAO.user.DAO.me !== '') {
                user = OpenM_BookDAO.user.DAO.me;
                OpenM_BookDAO.user.DAO.get(user.id, false);
            }
            else {
                user = OpenM_BookDAO.user.DAO.get(userId, false, true);
                OpenM_BookDAO.user.DAO.me = user;
            }
            this.defaultUserId = user.id;
        } else if (!userId)
            user = OpenM_BookDAO.user.DAO.get(this.defaultUserId, false);
        else
            user = OpenM_BookDAO.user.DAO.get(userId, false);

        if (this.communitiesActivated)
            OpenM_BookDAO.user.DAO.getCommunities(user);

        var userControler = this.AllUserPagesControlers[user.id];
        if (!userControler) {
            userControler = new OpenM_BookController.user.Page(user);
            this.AllUserPagesControlers[user.id] = userControler;
        }
        return userControler;
    }
};

OpenM_BookController.user.Page = function(user) {
    this.user = user;
    this.gui = new OpenM_BookGUI.user.Page();

    this.modification = new OpenM_BookController.user.button.Modification(this.user, this);
    this.gui.modification = this.modification.gui;
        
    this.fields = new OpenM_BookController.user.Fields(this.user);
    this.gui.fields = this.fields.gui;
};

OpenM_BookController.user.Page.prototype.display = function(enabled) {
    this.gui.display(enabled);
};

OpenM_BookController.user.button = {};

OpenM_BookController.user.button.Modification = function(user, page) {
    this.user = user;
    this.page = page;
    this.gui = new OpenM_BookGUI.user.button.Modification();
    var controller = this;
    this.gui.click = function() {
        
    };
};

OpenM_BookController.user.button.Save = function(user, page) {
    this.user = user;
    this.page = page;
    this.gui = new OpenM_BookGUI.user.button.Save();
    var controller = this;
    this.gui.click = function() {
        
    };
};

OpenM_BookController.user.Fields = function(user) {
    this.user = user;
    this.fieldBloc = new Array();
    this.gui = new OpenM_BookGUI.user.Fields();
    
};

OpenM_BookController.user.FieldBloc = function(name) {
    this.name = name;
    this.fields = new Array();
    this.gui = new OpenM_BookGUI.user.FieldBloc();
};

OpenM_BookController.user.Field = function() {
    
};