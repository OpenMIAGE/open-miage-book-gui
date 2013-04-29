
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

/**
 * Gére le control de la communauté (en data et en rendu HTML)
 */
function OpenM_Book_CommunityPageController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityPageGui();
    this.tree = new OpenM_Book_CommunityTreeController(community);  
    this.gui.tree = this.tree.gui;
    this.childs = new OpenM_Book_CommunityChildsController(community);
    this.gui.childs = this.childs.gui;
    //    this.actions = new OpenM_Book_CommunityActionController(community);
    //    this.gui.actions = this.actions.gui;
    //    this.users = new OpenM_Book_CommunityUsersController(community);
    //    this.gui.users = this.users.gui;
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
    
    var ancestorsArray = this.community.getAncestors(); 
    
    var commintyInTree;
    for (var i in ancestorsArray){
        commintyInTree = new OpenM_Book_CommunityInTreeController(ancestorsArray[i]);
        this.ancestors[ancestorsArray[i].id] = commintyInTree;
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

var OpenM_URLController = {
    'community': function(community){
        return "#/community/"+community.id+"-"+community.name.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/ /g,"-");
    },
    'clickToCommunity': function(community){
        return "OpenM_Book_CommunityPagesController.communityPage("
        +community.id+").display();window.location.href='"
        +this.community(community)+"';return false";
    },
    'getCommunityId': function(){
        return ;
    },
    'user': function(userId){
        return "#/user/"+userId;
    },
    'getUserId': function(){
        return ;
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


//function OpenM_Book_CommunityActionController(community){
//    this.community = community;
//    this.AllButtonsControllers = new Array();
//    
//    this.actionsGui = new OpenM_Book_CommunityActionsGui(community);
//    //on genere les boutons
//    if (this.community.userCanMakeAction()){
//        var allButtonsGui = new Array();
//        //on cherche les actions a générer
//        var buttonControler;
//        //action 1
//        if (this.community.userCanRegister){
//            buttonControler = new OpenM_Book_CommunityButtonController(community, community.id+"-action-1", "S'enregistrer");
//            this.AllButtonsControllers.push(buttonControler);
//            buttonControler.buttonGui.toolTipText = "S&apos;enregistrer dans cette communauté";
//            buttonControler.buttonGui.iconColor = "icon-white";
//            buttonControler.buttonGui.iconStyle = "icon-ok";
//            buttonControler.buttonGui.html();
//            allButtonsGui.push( buttonControler.buttonGui);
//            
//        }
//        //action 2
//        // todo
//        
//        
//        
//        
//        
//        this.actionsGui.AllButtonsGui = allButtonsGui;
//    }
//
//    this.actionsGui.html();
//    
//    
//    
//    
//    
//    this.update = function(){
//        
//    }    
//    
//    //passer du coté gui    
//    this.display = function(divParentId){
//        var rowAction = "<div id='"+this.zoneAction+"' class='row-fluid'></div>";
//        $("#"+ divParentId).append(rowAction);
//        if (this.community.userCanMakeAction()){
//            var html = this.actionsGui.htmlGenerated;
//            $("#" + this.zoneAction).append(html);
//        }else{
//            $("#" + this.zoneAction).hide();
//        }   
//    }
//}
//
//
//function OpenM_Book_CommunityButtonController(community, id, text){
//    this.community = community;
//    this.buttonGui = new OpenM_Book_CommunityButtonGui(id, text);
//    this.buttonGui.html();
//    
//    this.id = id;
//    
//    
//    
//    this.click = function(){
//        
//    }
//    
//}
//
//function OpenM_Book_CommunityUsersController(community){
//    this.community = community;
//    this.usersGui = new OpenM_Book_CommunityUserGui();
//    
//}
//
//function OpenM_Book_CommunityUsersNotValidController(community){
//    this.community = community;
//    this.usersNotValidGui = new OpenM_Book_CommunityUserNotValidated();
//}