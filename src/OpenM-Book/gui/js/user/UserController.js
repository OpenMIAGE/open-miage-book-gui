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

    var controller = this;
    this.update = function() {
        controller.gui.name = controller.user.name;
        controller.gui.firstName = controller.user.firstName;
        controller.gui.lastName = controller.user.lastName;
    };

    if (user.id === OpenM_BookDAO.user.DAO.me.id) {
        this.modification = new OpenM_BookController.user.button.Modification(this.user, this);
        this.gui.modification = this.modification.gui;
    }

    this.fields = new OpenM_BookController.user.Fields(this.user);
    this.gui.fields = this.fields.gui;

    this.communities = new OpenM_BookController.user.Communities(this.user);
    this.gui.communities = this.communities.gui;

    this.user.addUpdateCallBack(this.update);
    this.update();
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
        alert("TODO");
    };
};

OpenM_BookController.user.button.Save = function(user, page) {
    this.user = user;
    this.page = page;
    this.gui = new OpenM_BookGUI.user.button.Save();
    var controller = this;
    this.gui.click = function() {
        alert("TODO");
    };
};

OpenM_BookController.user.Fields = function(user) {
    this.user = user;
    this.fieldBlocks = new Array();
    this.gui = new OpenM_BookGUI.user.Fields();

    var controller = this;
    this.update = function() {
        for (var i in controller.user.otherProperties) {
            var v = controller.user.otherProperties[i]["var"];
            var block = controller.fieldBlocks[v.id];
            if (!block) {
                block = new OpenM_BookController.user.FieldBlock(v.name);
                controller.fieldBlocks[v.id] = block;
                controller.gui.fieldBlocks.push(block.gui);
            }
            for (var j in controller.user.otherProperties[i].values) {
                var value = controller.user.otherProperties[i].values[j];
                var field = block.fields[value.id];
                if (!field) {
                    field = new OpenM_BookController.user.Field(v.name, value.id, value.value);
                    block.fields[value.id] = field;
                    block.gui.fields.push(field.gui);
                }
            }
        }
        controller.gui.update();
    };

    this.user.addUpdateCallBack(this.update);
    this.update();

};

OpenM_BookController.user.FieldBlock = function(name) {
    this.name = name;
    this.fields = new Array();
    this.gui = new OpenM_BookGUI.user.FieldBlock(this.name);

};

OpenM_BookController.user.Field = function(name, id, value) {
    this.id = id;
    this.gui = new OpenM_BookGUI.user.Field(name, value);
};

OpenM_BookController.user.Communities = function(user) {
    this.user = user;
    this.communityBlocks = new Array();
    this.gui = new OpenM_BookGUI.user.Communities();

    var controller = this;
    this.update = function() {
        function ancestors(community, block) {
            var c = block.communities[community.id];
            if (!c) {
                c = new OpenM_BookController.user.Community(community);
                block.communities[community.id] = c;
            }
            if (community.parent !== undefined)
                ancestors(community.parent, block);
            block.gui.communities.push(c.gui);
        }

        for (var i in controller.user.communities) {
            var c = controller.user.communities[i];
            var block = controller.communityBlocks[c.id];
            if (!block) {
                block = new OpenM_BookController.user.CommunityBlock();
                controller.communityBlocks[c.id] = block;
                controller.gui.communityBlocks.push(block.gui);
                ancestors(c, block);
            }
        }
        controller.gui.update();
    };

    this.user.addUpdateCommunitiesCallBack(this.update);
    this.update();

};

OpenM_BookController.user.CommunityBlock = function() {
    this.communities = new Array();
    this.gui = new OpenM_BookGUI.user.CommunityBlock();
};

OpenM_BookController.user.Community = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.user.Community(this.community.name);

    var controller = this;
    this.gui.click = function() {
        OpenM_BookController.commons.URL.clickToCommunity(controller.community);
    };

    this.update = function() {
        controller.gui.updateName(controller.community.name);
    };

    this.community.addUpdateCallBack(this.update);
};