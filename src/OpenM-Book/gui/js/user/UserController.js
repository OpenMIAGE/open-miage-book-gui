OpenM_BookController.user = {};

OpenM_BookController.user.Pages = {
    AllUserPagesControlers: new Array(),
    defaultUserId: null,
    communitiesActivated: true,
    userPage: function(userId, reload) {
        OpenM_BookController.user.FieldModificationController.reinit();

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
    this.gui.click = function(event) {
        OpenM_BookController.user.FieldModificationController.reinit();
        event.stopPropagation();
    };

    var controller = this;
    this.update = function() {
        controller.gui.name = controller.user.name;
        controller.gui.firstName = controller.user.firstName;
        controller.gui.lastName = controller.user.lastName;
    };

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

OpenM_BookController.user.Fields = function(user) {
    this.user = user;
    this.fieldBlocks = new Array();
    this.gui = new OpenM_BookGUI.user.Fields();

    var controller = this;
    this.update = function() {
        controller.updateFieldBlocks();
    };

    this.user.addUpdateCallBack(this.update);
    this.update();

};

OpenM_BookController.user.Fields.prototype.updateFieldBlocks = function() {
    var properties = new Array();
    var values = new Array();
    for (var i in this.user.otherProperties) {
        var v = this.user.otherProperties[i]["var"];
        var block = this.fieldBlocks[v.id];
        if (!block) {
            block = new OpenM_BookController.user.FieldBlock(v.name);
            this.fieldBlocks[v.id] = block;
            this.gui.fieldBlocks[v.id] = block.gui;
        }
        properties[v.id] = block;
        values = new Array();
        for (var j in this.user.otherProperties[i].values) {
            var value = this.user.otherProperties[i].values[j];
            var field = block.fields[value.id];
            if (!field) {
                field = new OpenM_BookController.user.Field(this.user, v, value, this.user === OpenM_BookDAO.user.DAO.me);
                block.fields[value.id] = field;
                block.gui.fields[value.id] = field.gui;
            }
            values[value.id] = value;
        }
        for (var i in block.fields) {
            if (values[i] === undefined) {
                block.gui.fields.splice(i, 1);
                block.fields.splice(i, 1);
            }
        }
        if (this.user === OpenM_BookDAO.user.DAO.me) {
            block.add = new OpenM_BookController.user.FieldAdd(this.user, v);
            block.gui.add = block.add.gui;
        }
    }
    for (var i in this.fieldBlocks) {
        if (properties[i] === undefined) {
            this.gui.fieldBlocks.splice(i, 1);
            this.fieldBlocks.splice(i, 1);
        }
    }
    this.gui.update();
};

OpenM_BookController.user.FieldBlock = function(name) {
    this.name = name;
    this.fields = new Array();
    this.add = undefined;
    this.gui = new OpenM_BookGUI.user.FieldBlock(this.name);
};

OpenM_BookController.user.Field = function(user, field, value, isModifiable, isVirtual) {
    this.iamField = true;
    this.user = user;
    this.field = field;
    this.value = value;
    this.isModifiable = isModifiable;
    this.gui = new OpenM_BookGUI.user.Field(field.name, value.value, this.isModifiable);
    this.isVirtual = (isVirtual !== undefined) ? isVirtual : false;

    var controller = this;
    this.gui.click = function(event) {
        OpenM_BookController.user.FieldModificationController.open(controller);
        controller.gui.isInModificationMode = true;
        controller.gui.content();
        event.stopPropagation();
    };

    this.gui.remove = function(event) {
        if (!controller.isVirtual) {
            controller.user.removePropertyValue(controller.field, controller.value);
            event.stopPropagation();
        }
    };
};

OpenM_BookController.user.FieldAdd = function(user, field) {
    this.iamFieldAdd = true;
    this.user = user;
    this.field = field;
    this.f = undefined;
    this.gui = new OpenM_BookGUI.user.FieldAdd(this.field.name);

    var controller = this;
    this.gui.click = function(event) {
        controller.f = new OpenM_BookController.user.Field(controller.user, controller.field, {name: ""}, true, true);
        controller.f.gui.isInModificationMode = true;
        controller.gui.added = controller.f.gui;
        controller.gui.content();
        OpenM_BookController.user.FieldModificationController.open(controller);
        event.stopPropagation();
    };
};

OpenM_BookController.user.FieldModificationController = {};
OpenM_BookController.user.FieldModificationController.opened = null;
OpenM_BookController.user.FieldModificationController.open = function(controller) {
    OpenM_BookController.user.FieldModificationController.reinit();
    OpenM_BookController.user.FieldModificationController.opened = controller;
};

OpenM_BookController.user.FieldModificationController.reinit = function() {
    if (OpenM_BookController.user.FieldModificationController.opened === null)
        return;

    if (OpenM_BookController.user.FieldModificationController.opened.iamField === true){
        OpenM_BookController.user.FieldModificationController.opened.gui.isInModificationMode = false;
    }
    else if (OpenM_BookController.user.FieldModificationController.opened.iamFieldAdd === true) {
        if(OpenM_BookController.user.FieldModificationController.opened.gui.added.val()!==""){
            alert(OpenM_BookController.user.FieldModificationController.opened.gui.added.val());
        }
        OpenM_BookController.user.FieldModificationController.opened.f = undefined;
        OpenM_BookController.user.FieldModificationController.opened.gui.added = undefined;
    }
    OpenM_BookController.user.FieldModificationController.opened.gui.content();
    OpenM_BookController.user.FieldModificationController.opened = null;
};

OpenM_BookController.user.Communities = function(user) {
    this.user = user;
    this.communityBlocks = new Array();
    this.gui = new OpenM_BookGUI.user.Communities();

    var controller = this;
    this.update = function() {
        controller.updateCommunityBlocks();
    };

    this.user.addUpdateCommunitiesCallBack(this.update);
    this.update();

};

OpenM_BookController.user.Communities.prototype.updateCommunityBlocks = function() {
    function ancestors(community, block) {
        var communityController = block.communities[community.id];
        if (communityController === undefined) {
            communityController = new OpenM_BookController.user.Community(community);
            block.communities[community.id] = communityController;
        }
        if (community.parent !== undefined)
            ancestors(community.parent, block);
        block.gui.communities.push(communityController.gui);
    }

    var communities = new Array();

    for (var i in this.user.communities) {
        var c = this.user.communities[i];
        communities[c.id] = c;
        var b = this.communityBlocks[c.id];
        if (b === undefined) {
            b = new OpenM_BookController.user.CommunityBlock();
            this.communityBlocks[c.id] = b;
            this.gui.communityBlocks[c.id] = b.gui;
            ancestors(c, b);
        }
    }

    for (var j in this.communityBlocks) {
        if (communities[j] === undefined) {
            this.communityBlocks.splice(j, 1);
            this.gui.communityBlocks.splice(j, 1);
        }
    }

    this.gui.update();
};

OpenM_BookController.user.CommunityBlock = function() {
    this.communities = new Array();
    this.gui = new OpenM_BookGUI.user.CommunityBlock();
};

OpenM_BookController.user.Community = function(community) {
    this.community = community;
    this.gui = new OpenM_BookGUI.user.Community(this.community.name);

    var controller = this;
    this.gui.click = function(event) {
        OpenM_BookController.commons.URL.clickToCommunity(controller.community);
        event.stopPropagation();
    };

    this.update = function() {
        controller.gui.updateName(controller.community.name);
    };

    this.community.addUpdateCallBack(this.update);
};