
var OpenM_Book_CommunityPagesControler = {
    'AllCommunitiesPagesControlers': new Array(),
    'divParentId': '',
    'current': null,
    'init': function(divParentId){
        if (!divParentId){
            throw "divParent is null"
        }
        this.divParentId = divParentId;
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
    this.gui = new OpenM_Book_CommunityPageGui(this.id);
    
    
    
    this.treeController = new OpenM_Book_CommunityTreeController(this.id+'-tree',community);   
    this.gui.treeGui = this.treeController.tree;
    this.communityChildsController = new OpenM_Book_CommunityCommunityChildsController(this.id+'-childs',community);
    this.gui.childsGui = this.communityChildsController.childsGui;
    this.actionController = new OpenM_Book_CommunityActionController(this.id+'-actions',community);
    this.gui.actionGui = this.actionController.actionGui;
    this.usersController = new OpenM_Book_CommunityUsersController(this.id+'-users',community);
    this.gui.usersGui = this.usersController.usersGui;
    this.usersNotValidController = new OpenM_Book_CommunityUsersNotValidController(this.id+'-users-not-valid',community);
    this.gui.usersNotValidGui = this.usersNotValidController.usersNotValidGui;
    
    this.community.addUpdateCallBack(function(){
        this.update();
    });
    
    this.display= function(enabled){
        this.gui.display(enabled);
    }
    
    this.update = function(){
        this.treeController.update();
        this.actionController.update();
        this.communityChildsController.update();
    }
}

/**
 * Gére le control pour le Tree, event et HTML
 */
function OpenM_Book_CommunityTreeController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.divParent = '';
    this.tree = new OpenM_Book_CommunityTreeGui(community);
    
    this.update = function(){
        
    }
}

function OpenM_Book_CommunityCommunityChildsController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.childsGui = new OpenM_Book_CommunityChildGui(div_id);
    this.update = function(){
        
    }    
    
    //passer coté gui
    this.display = function(divParentId){
        var rowSubCommu = "<div id='"+this.zoneSubCommunity+"' class='row-fluid'></div>";
        $("#"+ divParentId).append(rowSubCommu);
        var html = this.subCommunity.htmlGenerated;
        if (html != ''){
            //on insére le Tree dans la nouvelle row
            $("#" + this.zoneSubCommunity).append(html);   
        }else{
            $("#" + this.zoneSubCommunity).hide();
        }    
    }
}

function OpenM_Book_CommunityActionController(div_id, community){
    this.div_id = div_id;
    this.community = community;
    this.actionGui = new OpenM_Book_CommunityActionsGui(div_id);
    this.update = function(){
        
    }    
    
    //passer du coté gui    
    this.display = function(divParentId){
        var rowAction = "<div id='"+this.zoneAction+"' class='row-fluid'></div>";
        $("#"+ divParentId).append(rowAction);
        if (this.community.userCanMakeAction()){
            var html = this.actionGui.htmlGenerated;
            $("#" + this.zoneAction).append(html);
        }else{
            $("#" + this.zoneAction).hide();
        }   
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