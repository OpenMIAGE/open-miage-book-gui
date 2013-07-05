
var OpenM_Book_CommunityPagesController = {
    'AllCommunitiesPagesControlers': new Array(),
    'defaultCommunityId': '',
    'userActivated': true,
    'userNotValidActivated': true,
    'communityPage': function(communityId, reload) {
        var community = null;
        if (reload === false)
            return this.AllCommunitiesPagesControlers[communityId];

        if (!communityId && this.defaultCommunityId == '') {
            community = OpenM_Book_CommunityDAO.get(communityId, true);
            this.defaultCommunityId = community.id;
        }
        else if (!communityId)
            community = OpenM_Book_CommunityDAO.get(this.defaultCommunityId);
        else
            community = OpenM_Book_CommunityDAO.get(communityId);

        if (this.userActivated)
            OpenM_Book_CommunityDAO.getUsers(community);
        if (this.userNotValidActivated)
            OpenM_Book_CommunityDAO.getUsersNotValid(community);

        var communityControler = this.AllCommunitiesPagesControlers[community.id];
        if (!communityControler) {
            communityControler = new OpenM_Book_CommunityPageController(community);
            this.AllCommunitiesPagesControlers[community.id] = communityControler;
        }

        return communityControler;
    }
}

function OpenM_Book_CommunityPageController(community) {
    this.community = community;
    this.gui = new OpenM_Book_CommunityPageGui();
    this.tree = new OpenM_Book_CommunityTreeController(community);
    this.gui.tree = this.tree.gui;
    this.childs = new OpenM_Book_CommunityChildsController(community);
    this.gui.childs = this.childs.gui;
    this.users = new OpenM_Book_CommunityUsersController(community);
    this.gui.users = this.users.gui;
    this.actions = new OpenM_Book_CommunityActionsController(community);
    this.gui.actions = this.actions.gui;
    this.usersNotValid = new OpenM_Book_CommunityUsersNotValidController(community);
    this.gui.usersNotValid = this.usersNotValid.gui;

    this.display = function(enabled) {
        this.gui.display(enabled);
    }
}

function OpenM_Book_CommunityTreeController(community) {
    this.community = community;
    this.gui = new OpenM_Book_CommunityTreeGui(community.id);
    this.ancestors = new Array();

    var ancestors = this.community.getAncestors();

    var commintyInTree;
    for (var i in ancestors) {
        commintyInTree = new OpenM_Book_CommunityInTreeController(ancestors[i]);
        this.ancestors[ancestors[i].id] = commintyInTree;
        this.gui.communities.push(commintyInTree.gui);
    }

    commintyInTree = new OpenM_Book_CommunityInTreeController(this.community, false);
    this.ancestors[this.community.id] = commintyInTree;
    this.gui.communities.push(commintyInTree.gui);
}

function OpenM_Book_CommunityInTreeController(community, active) {
    if (active === true || active === undefined)
        this.active = true;
    else
        this.active = false;
    this.community = community;

    var controller = this;
    this.update = function() {
        controller.gui.updateName(community.name);
    }
    this.community.addUpdateCallBack(this.update);

    this.gui = new OpenM_Book_CommunityInTreeGui(community.id, community.name, this.active);
    if (this.active) {
        this.gui.click = function() {
            OpenM_URLController.clickToCommunity(controller.community)
        }
    }
}

function OpenM_Book_CommunityChildsController(community) {
    this.community = community;
    this.communities = new Array();
    this.gui = new OpenM_Book_CommunityChildsGui(this.community.id);

    this.updateChilds = function() {
        var commintyChild;
        var communityChildControllers = new Array();
        var communityChildGuis = new Array();
        for (var i in this.community.childs) {
            var child = this.community.childs[i];
            if (this.communities[this.community.childs[i].id] === undefined) {
                commintyChild = new OpenM_Book_CommunityChildController(child);
                communityChildControllers[this.community.childs[i].id] = commintyChild;
                communityChildGuis.push(commintyChild.gui);
            } else {
                communityChildControllers[this.community.childs[i].id] = this.communities[this.community.childs[i].id]
                communityChildGuis.push(this.communities[this.community.childs[i].id].gui);
            }
        }
        this.communities = communityChildControllers;
        this.gui.communities = communityChildGuis;

        this.gui.content();
    }
    this.updateChilds();

    var controller = this;
    this.update = function() {
        controller.updateChilds();
    }
    this.community.addUpdateCallBack(this.update);
}

function OpenM_Book_CommunityChildController(community) {
    this.community = community;

    var controller = this;
    this.update = function() {
        controller.gui.updateName(controller.community.name);
    }
    this.community.addUpdateCallBack(this.update);
    this.gui = new OpenM_Book_CommunityChildGui(this.community.id, this.community.name);
    this.gui.click = function() {
        OpenM_URLController.clickToCommunity(controller.community)
    };
}

function OpenM_Book_CommunityUsersController(community) {
    this.community = community;
    this.users = new Array();
    this.gui = new OpenM_Book_CommunityUsersGui(this.community.id);

    this.updateUsers = function() {
        var user;
        this.users = new Array();
        this.gui.users = new Array();
        for (var i in this.community.users) {
            user = new OpenM_Book_CommunityUserController(this.community.users[i]);
            this.users[this.community.users[i].id] = user;
            this.gui.users.push(user.gui);
        }
        this.gui.content();
    }

    var controller = this;
    this.update = function() {
        controller.updateUsers();
    }

    this.community.addUpdateUsersCallBack(this.update);
    this.updateUsers();
}

function OpenM_Book_CommunityUserController(user) {
    this.user = user;
    this.gui = new OpenM_Book_CommunityUserGui(this.user.id, this.user.name);
    var controller = this;
    this.gui.click = function() {
        OpenM_URLController.clickToUser(controller.user);
    }
}

function OpenM_Book_CommunityUsersNotValidController(community) {
    this.community = community;
    this.users = new Array();
    this.gui = new OpenM_Book_CommunityUsersNotValidGui(this.community.id);

    this.updateUsers = function() {
        var user;
        this.users = new Array();
        this.gui.users = new Array();
        var userController;
        for (var i in this.community.usersNotValidTree) {
            user = OpenM_Book_UserDAO.get(i, false, false, false);
            for (var j in this.community.usersNotValidTree[i]) {
                userController = new OpenM_Book_CommunityUserNotValidController(user, this.community.usersNotValidTree[i][j]);
                this.users.push(userController);
                this.gui.users.push(userController.gui);
            }
        }
        this.gui.content();
    }

    var controller = this;

    this.community.addUpdateUsersNotValidCallBack(function() {
        controller.updateUsers();
    });
    this.updateUsers();
}

function OpenM_Book_CommunityUserNotValidController(user, community) {
    this.user = user;
    this.community = community;
    this.gui = new OpenM_Book_CommunityUserNotValidGui(this.user.id, this.user.name, this.community.name);
    this.buttonValidate = new OpenM_Book_ButtonValidateUserController(this.user);
    this.gui.buttonValidate = this.buttonValidate.gui;
    this.buttonDisplayProfil = new OpenM_Book_ButtonDisplayProfilController(this.user);
    this.gui.buttonDisplayProfil = this.buttonDisplayProfil.gui;

    var controller = this;

    this.gui.click = function() {
        OpenM_URLController.clickToUser(controller.user);
    }
    this.buttonValidate.gui.click = function(e) {
        alert(controller.user.name);
        e.preventDefault();
    }
    this.buttonDisplayProfil.gui.click = function() {
        OpenM_URLController.clickToUser(controller.user);
    }
}

function OpenM_Book_ButtonValidateUserController(user) {
    this.user = user;
    this.gui = new OpenM_Book_ButtonValidateUserGui();
}

function OpenM_Book_ButtonDisplayProfilController(user) {
    this.user = user;
    this.gui = new OpenM_Book_ButtonDisplayProfilGui(this.user.name);

}

function OpenM_Book_CommunityActionsController(community) {
    this.community = community;
    this.register = null;
    this.add = null;
    this.rename = null;
    this.deleteBt = null;
    this.gui = new OpenM_Book_CommunityActionsGui(this.community.id);

    this.updateActions = function() {
        this.buttons = new Array();
        this.gui.buttons = new Array();

        if (this.community.userCanRegister) {
            this.register = new OpenM_Book_CommunityButtonRegisterController(this.community);
            this.gui.buttons.push(this.register.gui);
        }

        if (this.community.userCanAddSubCommunity) {
            this.add = new OpenM_Book_CommunityButtonAddCommunityController(this.community);
            this.gui.buttons.push(this.add.gui);
        }

        if (this.community.userIsModerator || OpenM_Book_UserDAO.me.isAdmin) {
            this.rename = new OpenM_Book_CommunityButtonRenameController(this.community);
            this.gui.buttons.push(this.rename.gui);

            if (!this.community.cantBeRemoved) {
                this.deleteBt = new OpenM_Book_CommunityButtonDeleteController(this.community);
                this.gui.buttons.push(this.deleteBt.gui);
            }
        }

        this.gui.content();
    }

    this.updateActions();
    var controller = this;
    this.update = function() {
        controller.updateActions();
    }
    this.community.addUpdateCallBack(this.update);
}

function OpenM_Book_CommunityButtonRegisterController(community) {
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonRegisterGui(this.community.id);
    this.gui.active = !this.community.userAlreadyRegistred;
    var controller = this;
    this.gui.click = function() {
        controller.community.registerMe();
    }
}

function OpenM_Book_CommunityButtonAddCommunityController(community) {
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonAddCommunityGui(this.community.id, this.community.name);
    this.gui.active = this.community.userCanAddSubCommunity;
    this.popover = new OpenM_Book_CommunityPopOverNameController(this.community);
    this.gui.popover = this.popover.gui;

    var controller = this;
    this.popover.gui.submit = function(e) {
        var name = controller.popover.gui.getName();
        if (name) {
            OpenM_Book_CommunityDAO.addCommunity(name, controller.community.id);
            controller.gui.a.popover('hide');
        } else
            alert("Il manque le nom de la communauté");
        e.preventDefault();
    }
}

function OpenM_Book_CommunityPopOverNameController(community, value) {
    this.community = community;
    this.value = value;
    this.gui = new OpenM_Book_CommunityPopOverNameGui(this.community.id, value);

}
function OpenM_Book_CommunityButtonRenameController(community) {
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonRenameGui(this.community.id, this.community.name);
    this.popover = new OpenM_Book_CommunityPopOverNameController(this.community, this.community.name);
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
    }
}

function OpenM_Book_CommunityButtonDeleteController(community) {
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonDeleteGui(this.community.id, this.community.name);
    var controller = this;
    this.gui.click = function(e) {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment supprimer la communauté : ' + controller.community.name)) {
            OpenM_Book_CommunityDAO.removeCommunity(controller.community.id);
        }
    }
}