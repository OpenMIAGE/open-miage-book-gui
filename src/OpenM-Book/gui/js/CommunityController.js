
var OpenM_Book_CommunityPagesController = {
    'AllCommunitiesPagesControlers': new Array(),
    'divParentId':'',
    'communityPage': function(communityId){
        var community = null;       
        if(!communityId)
            community = OpenM_Book_CommunityDAO.get(communityId, true);
        else
            community = OpenM_Book_CommunityDAO.get(communityId);
                
        var communityControler = this.AllCommunitiesPagesControlers[community.id];
        if (!communityControler){
            communityControler = new OpenM_Book_CommunityPageController(community,this.divParentId);
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
function OpenM_Book_CommunityPageController(community, divParentId){
    this.community = community;
    this.divParentId = divParentId;
    this.gui = new OpenM_Book_CommunityPageGui(this.divParentId);
    this.tree = new OpenM_Book_CommunityTreeController(community);  
    this.gui.tree = this.tree.gui;
//    this.childs = new OpenM_Book_CommunityChildsController(community);
//    this.gui.childs = this.communityChildsController.gui;
//    this.actions = new OpenM_Book_CommunityActionController(community);
//    this.gui.actions = this.actionController.gui;
//    this.users = new OpenM_Book_CommunityUsersController(community);
//    this.gui.users = this.usersController.gui;
//    this.usersNotValid = new OpenM_Book_CommunityUsersNotValidController(community);
//    this.gui.usersNotValid = this.usersNotValidController.gui;
        
    this.display= function(enabled){
        this.gui.display(enabled);
    }
}

function OpenM_Book_CommunityTreeController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityTreeGui(community.id);
    this.ancestors = new Array();
    
    //remplir avec community.getAncestors qui doit être synchrone !
    
    
    //pour test:
    var c = new OpenM_Book_CommunityInTreeController(this.community);
    this.ancestors.push(c);
    this.gui.communities.push(c.gui);
    var c1 = new OpenM_Book_CommunityInTreeController(this.community);
    this.ancestors.push(c1);
    this.gui.communities.push(c1.gui);
}

function OpenM_Book_CommunityInTreeController(community){
    this.community = community;
    this.gui = new OpenM_Book_CommunityInTreeGui(community.id, community.name);
}

//function OpenM_Book_CommunityChildsController(community){
//    this.div_id = div_id;
//    this.community = community;
//    this.AllSubCommunitiesControllers = new Array();    
//    
//    this.childsGui = new OpenM_Book_CommunityChildGui(community);    
//    //gen les sub Commu
//    if (community.nbChild != 0){
//        var subCommunityController;
//        for (var i in community.child){
//            subCommunityController = new OpenM_Book_SubCommunityController(community.child[i])
//            this.AllSubCommunitiesControllers[community.child[i].id]= subCommunityController;
//            this.childsGui.AllSubCommunitiesGui.push(subCommunityController.subCommunityGui);
//        }
//    }
//    this.childsGui.html();
//    
//    
//    this.update = function(){
//        
//    }    
//}
//
//
//function OpenM_Book_SubCommunityController(community){
//    this.community = community;
//    this.subCommunityGui = new OpenM_Book_SubCommunityGui(community);
//    this.subCommunityGui.html();
//    
//    this.update = function(){
//        
//    }
//    
//    this.click= function(){
//        
//    }    
//}
//
//
//function OpenM_Book_CommunityActionController(div_id, community){
//    this.div_id = div_id;
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
//function OpenM_Book_CommunityUsersController(div_id, community){
//    this.div_id = div_id;
//    this.community = community;
//    this.usersGui = new OpenM_Book_CommunityUserGui();
//    
//}
//
//function OpenM_Book_CommunityUsersNotValidController(div_id, community){
//    this.div_id = div_id;
//    this.community = community;
//    this.usersNotValidGui = new OpenM_Book_CommunityUserNotValidated();
//}