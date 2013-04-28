
var OpenM_Book_CommunityPagesControler = {
    'AllCommunitiesPagesControlers': new Array(),
    'divParentId': '',
    'current': null,
    'ressource_loader' : "",
    'ressource_dir': '',
    'firstLoad': true,
    'init': function(divParentId, ressources_dir){
        if (!divParentId){
            throw "divParent is null"
        }
        this.divParentId = divParentId;
        
        OpenM_Book_CommunityPagesGui.div_id = this.divParentId;
        OpenM_Book_CommunityPagesGui.ressource_dir = ressources_dir;        
        OpenM_Book_CommunityPagesGui.showPageLoading();
    },
    'communityPage': function(communityId){
        if (this.divParent == ''){
            throw "you must call init first"
        }
    
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
    this.id = community.id+'-community-'+community.id+'-page';
    this.community = community;
    this.divParentId = divParentId;
    this.gui = new OpenM_Book_CommunityPageGui(this.id, this.divParentId);
        
    
    this.treeController = new OpenM_Book_CommunityTreeController(this.id+'-tree',community);   
    this.gui.treeGui = this.treeController.treeGui;
    this.communityChildsController = new OpenM_Book_CommunityCommunityChildsController(this.id+'-childs',community);
    this.gui.childsGui = this.communityChildsController.childsGui;
    this.actionController = new OpenM_Book_CommunityActionController(this.id+'-actions',community);
    this.gui.actionsGui = this.actionController.actionsGui;
    this.usersController = new OpenM_Book_CommunityUsersController(this.id+'-users',community);
    this.gui.usersGui = this.usersController.usersGui;
    this.usersNotValidController = new OpenM_Book_CommunityUsersNotValidController(this.id+'-users-not-valid',community);
    this.gui.usersNotValidGui = this.usersNotValidController.usersNotValidGui;
    
    
    this.display= function(enabled){
        this.gui.display(enabled);
    }
    
    this.update = function(){
        this.gui.update();
        this.treeController.update();
        this.actionController.update();
        this.communityChildsController.update();
    }
    //PRobléme : toujours le mm probléme, quand cette méthode est appelé, il y  aun pb  car le this n'a pas la valeur de l'objet OpenM_Book_CommunityPageController,
    // donc il n'y a pas de méthode update '
    
    //this.community.addUpdateCallBack(OpenM_Book_CommunityPagesControler.communityPage(this.id).update());    
}

/**
 * Gére le control pour le Tree, event et HTML
 */
function OpenM_Book_CommunityTreeController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.divParent = '';
    this.treeGui = new OpenM_Book_CommunityTreeGui(community);
    this.treeGui.html();
    
    this.update = function(){
        this.treeGui.html();
    }
}



function OpenM_Book_CommunityCommunityChildsController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.AllSubCommunitiesControllers = new Array();    
    
    this.childsGui = new OpenM_Book_CommunityChildGui(community);    
    //gen les sub Commu
    if (community.nbChild != 0){
        var subCommunityController;
        for (var i in community.child){
            subCommunityController = new OpenM_Book_SubCommunityController(community.child[i])
            this.AllSubCommunitiesControllers[community.child[i].id]= subCommunityController;
            this.childsGui.AllSubCommunitiesGui.push(subCommunityController.subCommunityGui);
        }
    }
    this.childsGui.html();
    
    
    this.update = function(){
        
    }    
}


function OpenM_Book_SubCommunityController(community){
    this.community = community;
    this.subCommunityGui = new OpenM_Book_SubCommunityGui(community);
    this.subCommunityGui.html();
    
    this.update = function(){
        
    }
    
    this.click= function(){
        
    }    
}


function OpenM_Book_CommunityActionController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.AllButtonsControllers = new Array();
    
    this.actionsGui = new OpenM_Book_CommunityActionsGui(community);
    //on genere les boutons
    if (this.community.userCanMakeAction()){
        var allButtonsGui = new Array();
        //on cherche les actions a générer
        var buttonControler;
        //action 1
        if (this.community.userCanRegister){
            buttonControler = new OpenM_Book_CommunityButtonController(community, community.id+"-action-1", "S'enregistrer");
            this.AllButtonsControllers.push(buttonControler);
            buttonControler.buttonGui.toolTipText = "S&apos;enregistrer dans cette communauté";
            buttonControler.buttonGui.iconColor = "icon-white";
            buttonControler.buttonGui.iconStyle = "icon-ok";
            buttonControler.buttonGui.html();
            allButtonsGui.push( buttonControler.buttonGui);
            
        }
        //action 2
        // todo
        
        
        
        
        
        this.actionsGui.AllButtonsGui = allButtonsGui;
    }

    this.actionsGui.html();
    
    
    
    
    
    this.update = function(){
        
    }    
    
    //passer du coté gui    
    this.display = function(divParentId){
        var rowAction = "<div id='"+this.zoneAction+"' class='row-fluid'></div>";
        $("#"+ divParentId).append(rowAction);
        if (this.community.userCanMakeAction()){
            var html = this.actionsGui.htmlGenerated;
            $("#" + this.zoneAction).append(html);
        }else{
            $("#" + this.zoneAction).hide();
        }   
    }
}


function OpenM_Book_CommunityButtonController(community, id, text){
    this.community = community;
    this.buttonGui = new OpenM_Book_CommunityButtonGui(id, text);
    this.buttonGui.html();
    
    this.id = id;
    
    
    
    this.click = function(){
        
    }
    
}

function OpenM_Book_CommunityUsersController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.usersGui = new OpenM_Book_CommunityUserGui();
    
}

function OpenM_Book_CommunityUsersNotValidController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.usersNotValidGui = new OpenM_Book_CommunityUserNotValidated();
}