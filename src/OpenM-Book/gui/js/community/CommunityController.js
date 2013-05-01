
var OpenM_Book_CommunityPagesController = {
    'AllCommunitiesPagesControlers': new Array(),
    'communityPage': function(communityId, reload){
        var community = null;       
        if(reload===false)
            return this.AllCommunitiesPagesControlers[communityId];
        
        if(!communityId)
            community = OpenM_Book_CommunityDAO.get(communityId, true);
        else
            community = OpenM_Book_CommunityDAO.get(communityId);
                 
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
  this.actions = new OpenM_Book_CommunityActionController(community);
  this.gui.actions = this.actions.gui;
    //    this.usersNotValid = new OpenM_Book_CommunityUsersNotValidController(community);
    //    this.gui.usersNotValid = this.usersNotValid.gui;
        
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
    var users = this.community.getUsers();
    var user;
    for(var i in users){
        user = new OpenM_Book_CommunityUserController(users[i]);
        this.ancestors[users[i].id] = user;
        this.gui.users.push(user.gui);
    }
}

function OpenM_Book_CommunityUserController(user){
    this.user = user;
    this.gui = new OpenM_Book_CommunityUserGui(this.user.id, this.user.name);
}

//
//function OpenM_Book_CommunityUsersNotValidController(community){
//    this.community = community;
//    this.gui = new OpenM_Book_CommunityUserNotValidated();
//}

function OpenM_Book_CommunityActionController(community){
    this.community = community;
    this.AllButtonsControllers = undefined;
    
    this.gui = new OpenM_Book_CommunityActionsGui(community);
    
    this.updateActions = function(){
            //on genere les boutons
        this.AllButtonsControllers = new Array();
        this.gui.AllButtonsGui = new Array();
        
        if (this.community.userCanMakeAction()){
            //on cherche les actions a générer
            var buttonControler;
            //action 1
            if (this.community.userCanRegister){
                buttonControler = new OpenM_Book_CommunityButtonController(community, "S'enregistrer");            
                buttonControler.gui.toolTipText = "S'enregistrer dans cette communauté";
                buttonControler.gui.iconColor = "icon-white";
                buttonControler.gui.iconStyle = "icon-ok";
                buttonControler.gui.active =this.community.userAlreadyRegistred;
                
                this.AllButtonsControllers.push(buttonControler);
                this.gui.AllButtonsGui.push(buttonControler.gui);
                
            }
            //action 2
            // todo
            
            
            this.gui.content();
        }   
    }    
    this.updateActions();
    
     this.update = function(community){
        OpenM_Book_CommunityPagesController.communityPage(community.id, false).actions.updateActions();
    }
    this.community.addUpdateCallBack(this.update);
}
//
//
function OpenM_Book_CommunityButtonController(community, text){
    this.community = community;
    this.gui = new OpenM_Book_CommunityButtonGui(text);
    
    
    this.gui.click = function(e) {
        e.preventDefault(); 
        alert("plop");
    }
    
}
//
