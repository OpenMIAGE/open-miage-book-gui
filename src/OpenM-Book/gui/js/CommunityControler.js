
var OpenM_Book_CommunityPagesControler = {
    'AllCommunitiesPagesControlers': new Array(),
    'divParent': '',
    'current': null,
    'init': function(divParentId){
        if (!divParentId){
            throw "divParent is null"
        }
        this.divParent = divParentId;
    },
    'communityPage': function(communityId){
        if (this.divParent == ''){
            throw "you must call init first"
        }
    
        var community
        if(!communityId)
            community = OpenM_Book_CommunityDAO.get(communityId, true);
        
        var communityControler = this.AllCommunitiesPagesControlers[communityId];
        if (!communityControler){
            communityControler = new OpenM_Book_CommunityPageController(this.divParent);
            this.AllCommunitiesPagesControlers[communityId] = communityControler;
        }
        else
            communityControler = this.AllCommunitiesPagesControlers[communityId];

        return communityControler;
    }
}

/**
 * Gére le control de la communauté (en data et en rendu HTML)
 */
function OpenM_Book_CommunityPageController(divParentId){
    this.divParentId = divParentId;
    this.community = null;
    
    this.treeControler = null;
    this.subCommunityControler = null;
    this.actionControler = null;
   
    var data = OpenM_Book.getCommunity(communityId);
        
    //TODO : supprimer les 2 ligne suivantes 
    $("#retourJSON").empty();
    $("#retourJSON").append(JSON.stringify(data));
        
        
    if (data.STATUS != OpenM_Book.RETURN_STATUS_OK_VALUE){
    //Traitement Erreur page ....
    //TODO
    }
    var commu = new OpenM_Book_Community(data.CID);
    commu.parseJSON(data);
    this.community = commu;
        
    //init des controlerGui
    this.treeControler = new OpenM_Book_CommunityTreeController(); 
    this.treeControler.init(this.community);
        
    this.subCommunityControler = new OpenM_Book_CommunitySubCommunityController();
    this.subCommunityControler.init(this.community);
        
    this.actionControler = new OpenM_Book_CommunityActionController();
    this.actionControler.init(this.community);    
    
    
    this.display= function(){
        //on vide la page
        $("#"+ this.divParentId).empty();
        //affichage de tree, dans la divParent
        this.treeControler.display(this.divParentId);
        this.actionControler.display(this.divParentId);
        this.subCommunityControler.display(this.divParentId); 
          
        $("[rel='tooltip']").tooltip();
    }
    
    this.update = function(){
    //
    }
}





/**
 * Gére le control pour le Tree, event et HTML
 */
function OpenM_Book_CommunityTreeController(){
    this.tree = null;
    this.community = null;
    this.zoneTree = "zoneTree";
    
    this.init = function(community){
        this.community = community;
        this.tree = new OpenM_Book_Gui_Tree(this.community);  
        this.tree.init();
    }
    
    this.display = function(divParentId){
        this.tree.display(divParentId);
        
        
        //génére une row
        var rowTree = "<div id='"+this.zoneTree+"' class='row-fluid'></div>";
        $("#"+ divParentId).append(rowTree);
        var html = this.tree.htmlGenerated;
        if (html != ''){
            //on insére le Tree dans la nouvelle row
            $("#" + this.zoneTree).append(html);   
        }else{
            $("#" + this.zoneTree).hide();
        }   
    }
}

function OpenM_Book_CommunitySubCommunityController(){
    this.subCommunity = null;
    this.community = null;
    this.zoneSubCommunity = "zoneSubCommunity";
    
    this.init = function(community){
        this.community = community;
        this.subCommunity = new OpenM_Book_Gui_SubCommunity(community);
        this.subCommunity.init();
    }
    
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

function OpenM_Book_CommunityActionController(){
    this.actionGui = null;
    this.community = null;
    this.zoneAction = "zoneAction";
    
    this.init = function(community){
        this.community = community;
        this.actionGui = new OpenM_Book_Gui_Action(community);
        this.actionGui.init();
    }
    
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