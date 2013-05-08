
var OpenM_Book_CommunityPagesController = {
    'AllCommunitiesPagesControlers': new Array(),
    'defaultCommunityId': '',
    'userActivated': true,
    'userNotValidActivated': true,
    'communityPage': function(communityId, reload){
        var community = null;       
        if(reload===false)
            return this.AllCommunitiesPagesControlers[communityId];
        
        if(!communityId && this.defaultCommunityId==''){
            community = OpenM_Book_CommunityDAO.get(communityId, true);
            this.defaultCommunityId = community.id;
        }
        else if(!communityId)
            community = OpenM_Book_CommunityDAO.get(this.defaultCommunityId);
        else
            community = OpenM_Book_CommunityDAO.get(communityId);
        
        if(this.userActivated)
            OpenM_Book_CommunityDAO.getUsers(community);
        if(this.userNotValidActivated)
            OpenM_Book_CommunityDAO.getUsersNotValid(community);
                 
        var communityControler = this.AllCommunitiesPagesControlers[community.id];
        if (!communityControler){
            communityControler = new OpenM_Book_CommunityPageController(community);
            this.AllCommunitiesPagesControlers[community.id] = communityControler;
        }
        else
            communityControler = this.AllCommunitiesPagesControlers[community.id];

        return communityControler;
    }        
}

function OpenM_Book_CommunityPageController(community){
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
        
    this.display= function(enabled){
        this.gui.display(enabled);
    }
}

function OpenM_Book_CommunityTreeController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityTreeGui(community.id);
    this.ancestors = new Array();
    
    var ancestors = this.community.getAncestors();
    
    var commintyInTree;
    for (var i in ancestors){
        commintyInTree = new OpenM_Book_CommunityInTreeController(ancestors[i]);
        this.ancestors[ancestors[i].id] = commintyInTree;
        this.gui.communities.push(commintyInTree.gui);
    }
    
    commintyInTree = new OpenM_Book_CommunityInTreeController(this.community, false);
    this.ancestors[this.community.id] = commintyInTree;
    this.gui.communities.push(commintyInTree.gui);
}

function OpenM_Book_CommunityInTreeController(community, active){
    if(active===true || active === undefined)
        this.active = true;
    else
        this.active = false;
    this.community = community;
    
    this.update = function(community){
        OpenM_Book_CommunityPagesController.communityPage(community.id, false).tree.ancestors[community.id].gui.updateName(community.name);
    }
    this.community.addUpdateCallBack(this.update);
    
    this.gui = new OpenM_Book_CommunityInTreeGui(community.id, community.name, this.active);
    if(this.active){
        this.gui.click = OpenM_URLController.clickToCommunity(this.community);
    }
}

function OpenM_Book_CommunityChildsController(community){
    this.community = community;
    this.communities = new Array();    
    this.gui = new OpenM_Book_CommunityChildsGui(this.community.id);    
    
    this.updateChilds = function(){
        var commintyChild;
        for (var i in this.community.childs){
            var child = this.community.childs[i];
            if(this.communities[this.community.childs[i].id]===undefined){
                commintyChild = new OpenM_Book_CommunityChildController(child);
                this.communities[this.community.childs[i].id] = commintyChild;
                this.gui.communities.push(commintyChild.gui);
            }
        }
        this.gui.content();
    }
    
    this.updateChilds();
    
    this.update = function(community){
        OpenM_Book_CommunityPagesController.communityPage(community.id, false).childs.updateChilds();
    }
    this.community.addUpdateCallBack(this.update);
}


function OpenM_Book_CommunityChildController(community){
    this.community = community;
    
    this.update = function(community){
        var child = OpenM_Book_CommunityPagesController.communityPage(community.id, false).childs.communities[community.id];
        if(child !== undefined)
            child.gui.updateName(community.name);
    }
    this.community.addUpdateCallBack(this.update);
    this.gui = new OpenM_Book_CommunityChildGui(this.community.id, this.community.name);
    this.gui.click = OpenM_URLController.clickToCommunity(this.community);
}

function OpenM_Book_CommunityUsersController(community){
    this.community = community;
    this.users = new Array();    
    this.gui = new OpenM_Book_CommunityUsersGui(this.community.id);    
           
    this.updateUsers = function(){
        var user;
        this.users = new Array();
        this.gui.users = new Array();
        for(var i in this.community.users){
            user = new OpenM_Book_CommunityUserController(this.community.users[i]);
            this.users[this.community.users[i].id] = user;
            this.gui.users.push(user.gui);
        }
        this.gui.content();
    }
    
    this.update = function(community){
        OpenM_Book_CommunityPagesController.communityPage(community.id, false).users.updateUsers();
    }
    
    this.community.addUpdateUsersCallBack(this.update);    
    this.updateUsers();
}

function OpenM_Book_CommunityUserController(user){
    this.user = user;
    this.gui = new OpenM_Book_CommunityUserGui(this.user.id, this.user.name);
}

function OpenM_Book_CommunityUsersNotValidController(community){
    this.community = community;
    this.users = new Array();    
    this.gui = new OpenM_Book_CommunityUsersNotValidGui(this.community.id);    
           
    this.updateUsers = function(){
        var user;
        this.users = new Array();
        this.gui.users = new Array();
        for(var i in this.community.usersNotValid){
            user = new OpenM_Book_CommunityUserNotValidController(this.community.usersNotValid[i]);
            this.users[this.community.usersNotValid[i].id] = user;
            this.gui.users.push(user.gui);
        }
        this.gui.content();
    }
    
    this.update = function(community){
        OpenM_Book_CommunityPagesController.communityPage(community.id, false).usersNotValid.updateUsers();
    }
    
    this.community.addUpdateUsersNotValidCallBack(this.update);    
    this.updateUsers();
}

function OpenM_Book_CommunityUserNotValidController(user){
    this.user = user;
    this.gui = new OpenM_Book_CommunityUserNotValidGui(this.user.id, this.user.name);
}

function OpenM_Book_CommunityActionsController(community){
    this.community = community;
    this.register = null;
    this.add = null;
    this.rename = null;
    this.deleteBt = null;
    
    this.gui = new OpenM_Book_CommunityActionsGui(this.community.id);
    
    this.updateActions = function(){
        if (this.community.userCanMakeAction()){
            
            this.buttons = new Array();
            this.gui.buttons = new Array();
            
            if (this.community.userCanRegister){
                this.register = new OpenM_Book_CommunityButtonRegisterController(this.community); 
                this.gui.buttons.push(this.register.gui);
            }
            
            if (this.community.userCanAddSubCommunity){
                this.add = new OpenM_Book_CommunityButtonAddCommunityController(this.community); 
                this.gui.buttons.push(this.add.gui);
            }
        
            //si on est moderateur OU admin
            if (this.community.userIsModerator || OpenM_Book_UserDAO.me.isAdmin){                 
                this.rename = new OpenM_Book_CommunityButtonRenameController(this.community);
                this.gui.buttons.push(this.rename.gui);                 
                 
                if (!this.community.cantBeRemoved){
                    this.deleteBt = new OpenM_Book_CommunityButtonDeleteController(this.community);
                    this.gui.buttons.push(this.deleteBt.gui);                     
                }
            }
        
            this.gui.content();
        }
    }    
    
    this.updateActions();
    this.update = function(community){
        OpenM_Book_CommunityPagesController.communityPage(community.id, false).actions.updateActions();
    }
    this.community.addUpdateCallBack(this.update);
}

function OpenM_Book_CommunityButtonRegisterController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonRegisterGui(this.community.id);
    this.gui.active = !this.community.userAlreadyRegistred;
    this.gui.click = "OpenM_Book_CommunityDAO.allCommunities["+this.community.id+"].registerMe();return false;";
}

function OpenM_Book_CommunityButtonAddCommunityController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonAddCommunityGui(this.community.id, this.community.name);
    this.gui.active = this.community.userCanAddSubCommunity;
    this.popover = new OpenM_Book_CommunityPopOverAddCommunityController(this.community);
    this.gui.popover = this.popover.gui;
    
    
//this.gui.click = "OpenM_Book_CommunityDAO.allCommunities["+this.community.id+"].registerMe();return false;";
}


function OpenM_Book_CommunityButtonRenameController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonRenameGui(this.community.id, this.community.name);
    
}

function OpenM_Book_CommunityButtonDeleteController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonDeleteGui(this.community.id, this.community.name);
      
}

function OpenM_Book_CommunityPopOverAddCommunityController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityPopOverAddCommunityGui(this.community.id);
    this.gui.submit = "OpenM_Book_CommunityDAO.addCommunity(OpenM_Book_CommunityPagesController.communityPage("+this.community.id+", false).actions.add.popover.gui.getName(), "+this.community.id+");return false;";
}