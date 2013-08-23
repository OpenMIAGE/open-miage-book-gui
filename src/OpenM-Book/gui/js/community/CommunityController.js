OpenM_BookController.community = {};

OpenM_BookController.community.Pages = {
    'AllCommunitiesPagesControlers': new Array(),
    'defaultCommunityId': '',
    'userActivated': true,
    'userNotValidActivated': true,
    'communityPage': function(communityId, reload) {
        var community = null;
        if (reload === false)
            return this.AllCommunitiesPagesControlers[communityId];

        if (!communityId && this.defaultCommunityId === '') {
            community = OpenM_BookDAO.community.DAO.get(communityId, true);
            this.defaultCommunityId = community.id;
        }
        else if (!communityId)
            community = OpenM_BookDAO.community.DAO.get(this.defaultCommunityId);
        else
            community = OpenM_BookDAO.community.DAO.get(communityId);

        if (this.userActivated)
            OpenM_BookDAO.community.DAO.getUsers(community);
        if (this.userNotValidActivated)
            OpenM_BookDAO.community.DAO.getUsersNotValid(community);

        var communityControler = this.AllCommunitiesPagesControlers[community.id];
        if (!communityControler) {
            communityControler = new OpenM_BookController.community.Page(community);
            this.AllCommunitiesPagesControlers[community.id] = communityControler;
        }

        return communityControler;
    }
};

OpenM_BookController.community.Page = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.community.Pages();
    this.tree = new OpenM_BookController.community.Tree(community);
    this.gui.tree = this.tree.gui;
    this.childs = new OpenM_BookController.community.Childs(community);
    this.gui.childs = this.childs.gui;
    this.users = new OpenM_BookController.community.Users(community);
    this.gui.users = this.users.gui;
    this.actions = new OpenM_BookController.community.Actions(community);
    this.gui.actions = this.actions.gui;
    this.usersNotValid = new OpenM_BookController.community.UsersNotValid(community);
    this.gui.usersNotValid = this.usersNotValid.gui;
};

OpenM_BookController.community.Page.prototype.display = function(enabled) {
    this.gui.display(enabled);
};

OpenM_BookController.community.Tree = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.community.Tree(community.id);
    this.ancestors = new Array();
    var ancestors = this.community.getAncestors();

    var commintyInTree;
    for (var i in ancestors) {
        commintyInTree = new OpenM_BookController.community.InTree(ancestors[i]);
        this.ancestors[ancestors[i].id] = commintyInTree;
        this.gui.communities.push(commintyInTree.gui);
    }

    commintyInTree = new OpenM_BookController.community.InTree(this.community, false);
    this.ancestors[this.community.id] = commintyInTree;
    this.gui.communities.push(commintyInTree.gui);
};

OpenM_BookController.community.InTree = function(community, active) {
    if (active === true || active === undefined)
        this.active = true;
    else
        this.active = false;
    this.community = community;

    var controller = this;
    this.update = function() {
        controller.gui.updateName(controller.community.name);
    };
    this.community.addUpdateCallBack(this.update);

    this.gui = new OpenM_BookGUI.community.InTree(community.id, community.name, this.active);
    if (this.active) {
        this.gui.click = function() {
            OpenM_BookController.commons.URL.clickToCommunity(controller.community);
        };
    }
};

OpenM_BookController.community.Childs = function(community) {
    this.community = community;
    this.communities = new Array();
    this.gui = new OpenM_BookGUI.community.Childs(this.community.id);

    var controller = this;
    this.update = function() {
        controller.updateChilds();
    };

    this.updateChilds();
    this.community.addUpdateCallBack(this.update);
};

OpenM_BookController.community.Childs.prototype.updateChilds = function() {
    var commintyChild;
    var communityChildControllers = new Array();
    var communityChildGuis = new Array();
    for (var i in this.community.childs) {
        var child = this.community.childs[i];
        if (this.communities[this.community.childs[i].id] === undefined) {
            commintyChild = new OpenM_BookController.community.Child(child);
            communityChildControllers[this.community.childs[i].id] = commintyChild;
            communityChildGuis.push(commintyChild.gui);
        } else {
            communityChildControllers[this.community.childs[i].id] = this.communities[this.community.childs[i].id];
            communityChildGuis.push(this.communities[this.community.childs[i].id].gui);
        }
    }
    this.communities = communityChildControllers;
    this.gui.communities = communityChildGuis;
    this.gui.content();
};

OpenM_BookController.community.Child = function(community) {
    this.community = community;

    var controller = this;
    this.update = function() {
        controller.gui.updateName(controller.community.name);
    };
    this.community.addUpdateCallBack(this.update);
    this.gui = new OpenM_BookGUI.community.Child(this.community.id, this.community.name);
    this.gui.click = function() {
        OpenM_BookController.commons.URL.clickToCommunity(controller.community);
    };
};

OpenM_BookController.community.Users = function(community) {
    this.community = community;
    this.users = new Array();
    this.gui = new OpenM_BookGUI.community.Users(this.community.id);

    var controller = this;
    this.update = function() {
        controller.updateUsers();
    };

    this.community.addUpdateUsersCallBack(this.update);
    this.updateUsers();
};

OpenM_BookController.community.Users.prototype.updateUsers = function() {
    var user;
    this.users = new Array();
    this.gui.users = new Array();
    for (var i in this.community.users) {
        user = new OpenM_BookController.community.User(this.community.users[i]);
        this.users[this.community.users[i].id] = user;
        this.gui.users.push(user.gui);
    }
    this.gui.content();
};

OpenM_BookController.community.User = function(user) {
    this.user = user;
    this.gui = new OpenM_BookGUI.community.User(this.user.id, this.user.name);
    var controller = this;
    this.gui.click = function() {
        OpenM_BookController.commons.URL.clickToUser(controller.user);
    };
};

OpenM_BookController.community.UsersNotValid = function(community) {
    this.community = community;
    this.users = new Array();
    this.gui = new OpenM_BookGUI.community.UsersNotValid(this.community.id);


    var controller = this;

    this.community.addUpdateUsersNotValidCallBack(function() {
        controller.updateUsers();
    });
    this.updateUsers();
};

OpenM_BookController.community.UsersNotValid.prototype.updateUsers = function() {
    var user;
    this.users = new Array();
    this.gui.users = new Array();
    var userController;
    for (var i in this.community.usersNotValidTree) {
        user = OpenM_BookDAO.user.DAO.get(i, false, false, false);
        for (var j in this.community.usersNotValidTree[i]) {
            userController = new OpenM_BookController.community.UserNotValid(user, this.community.usersNotValidTree[i][j]);
            this.users.push(userController);
            this.gui.users.push(userController.gui);
        }
    }
    this.gui.content();
};

OpenM_BookController.community.UserNotValid = function(user, community) {
    this.user = user;
    this.community = community;
    this.gui = new OpenM_BookGUI.community.UserNotValid(this.user.id, this.user.name, this.community.name);
    this.buttonValidate = new OpenM_BookController.community.button.Validate(this.user);
    this.gui.buttonValidate = this.buttonValidate.gui;
    this.buttonDisplayProfil = new OpenM_BookController.community.button.DisplayProfile(this.user);
    this.gui.buttonDisplayProfil = this.buttonDisplayProfil.gui;

    var controller = this;

    this.gui.click = function() {
        OpenM_BookController.commons.URL.clickToUser(controller.user);
    };
    this.buttonValidate.gui.click = function(e) {
        alert(controller.user.name);
        e.preventDefault();
    };
    this.buttonDisplayProfil.gui.click = function() {
        OpenM_BookController.commons.URL.clickToUser(controller.user);
    };
};

OpenM_BookController.community.button = {};

OpenM_BookController.community.button.Validate = function(user) {
    this.user = user;
    this.gui = new OpenM_BookGUI.community.button.Validate();
};

OpenM_BookController.community.button.DisplayProfile = function(user) {
    this.user = user;
    this.gui = new OpenM_BookGUI.community.button.DisplayProfile(this.user.name);
};

OpenM_BookController.community.Actions = function(community) {
    this.community = community;
    this.register = null;
    this.add = null;
    this.rename = null;
    this.deleteBt = null;
    this.gui = new OpenM_BookGUI.community.Actions(this.community.id);

    var controller = this;
    this.update = function() {
        controller.updateActions();
    };

    this.updateActions();
    this.community.addUpdateCallBack(this.update);
};

OpenM_BookController.community.Actions.prototype.updateActions = function() {
    this.buttons = new Array();
    this.gui.buttons = new Array();

    if (this.community.userCanRegister) {
        this.register = new OpenM_BookController.community.button.Register(this.community);
        this.gui.buttons.push(this.register.gui);
    }

    if (this.community.userCanAddSubCommunity) {
        this.add = new OpenM_BookController.community.button.Add(this.community);
        this.gui.buttons.push(this.add.gui);
    }

    if (this.community.userIsModerator || OpenM_BookDAO.user.DAO.me.isAdmin) {
        this.rename = new OpenM_BookController.community.button.Rename(this.community);
        this.gui.buttons.push(this.rename.gui);

        if (!this.community.cantBeRemoved) {
            this.deleteBt = new OpenM_BookController.community.button.Delete(this.community);
            this.gui.buttons.push(this.deleteBt.gui);
        }
    }

    this.gui.content();
};

OpenM_BookController.community.button.Register = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.community.button.Register(this.community.id);
    this.gui.active = !this.community.userAlreadyRegistred;
    var controller = this;
    this.gui.click = function() {
        controller.community.registerMe();
    };
};

OpenM_BookController.community.button.Add = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.community.button.AddCommunity(this.community.id, this.community.name);
    this.gui.active = this.community.userCanAddSubCommunity;
    this.popover = new OpenM_BookController.community.popover.Name(this.community);
    this.gui.popover = this.popover.gui;

    var controller = this;

    this.popover.gui.submit = function(e) {
        var name = controller.popover.gui.getName();
        if (name) {
            OpenM_BookDAO.community.DAO.addCommunity(name, controller.community.id);
            controller.gui.a.popover('hide');
        } else
            alert("Il manque le nom de la communauté");
        e.preventDefault();
    };
};

OpenM_BookController.community.popover = {};

OpenM_BookController.community.popover.Name = function(community, value) {
    this.community = community;
    this.value = value;
    this.gui = new OpenM_BookGUI.community.popover.Name(this.community.id, value);
};

OpenM_BookController.community.button.Rename = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.community.button.Rename(this.community.id, this.community.name);
    this.popover = new OpenM_BookController.community.popover.Name(this.community, this.community.name);
    this.popover.gui.text = 'Nouveau nom';
    this.gui.popover = this.popover.gui;

    //le click
    var controller = this;
    this.popover.gui.submit = function(e) {
        var name = controller.popover.gui.getName();
        if (name) {
            controller.community.rename(name);
            controller.gui.a.popover('hide');
        } else
            alert("Il manque le nouveau nom de la communauté");
        e.preventDefault();
    };
};

OpenM_BookController.community.button.Delete = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.community.button.Delete(this.community.id, this.community.name);
    var controller = this;
    this.gui.click = function(e) {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment supprimer la communauté : ' + controller.community.name)) {
            OpenM_BookDAO.community.DAO.removeCommunity(controller.community.id);
        }
    };
};