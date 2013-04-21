//obj static
var OpenM_Book_CommunityPagesControler = {
    'AllCommunitiesPagesControlers': new Array(),
    'AllCommunities': new Array(),
    'divParent': '',
    'init': function(divParentId, communityId){
        if (!divParentId){throw "divParent is null"}
        this.divParent = divParentId;
        
        var communityController = new OpenM_Book_CommunityPageController(this.divParent);
        communityController.init(communityId);
        //todo 
        //test si community Existe 
        
        this.AllCommunitiesPagesControlers[communityController.community.id] = communityController;
        
        return communityController;
    },
    'display': function(communityId){
        var communityControler = this.communityPage(communityId);
        communityControler.display();  
    },
    'communityPage': function(communityId){
        if (this.divParent == ''){throw "you must call init first"}
        
        var communityControler = this.AllCommunitiesPagesControlers[communityId];
        if (!communityControler){
            //le controler n'existe pas donc, on le crée
            this.init(divParentId, communityId);
        }
        communityControler = this.AllCommunitiesPagesControlers[communityId];
        
        return communityControler;
    }




}





//classe

/**
 * Gére le control de la communauté (en data et en rendu HTML)
 */
function OpenM_Book_CommunityPageController(divParentId){
    this.divParentId = divParentId;
    this.community = null;
    
    this.treeControler = null;
    this.subCommunityControler = null;
    this.actionControler = null;
   
    
    this.init = function(communityId){
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
             
    }
    
    this.display= function(){
          //on vide la page
          $("#"+ this.divParentId).empty();
          //affichage de tree, dans la divParent
          this.treeControler.display(this.divParentId);
          this.actionControler.display(this.divParentId);
          this.subCommunityControler.display(this.divParentId); 
          
          $("[rel='tooltip']").tooltip();
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










/**
 * La classe Community, gere data de la commu
 */
function OpenM_Book_Community(communityId){
    if (!communityId){throw "communityId must be present on OpenM_Book_Community"}
    //On s'ajoute a l'ensemble des communauté
    OpenM_Book_CommunityPagesControler.AllCommunities[communityId] = this;
    
    this.id = communityId; 
    this.name = '';
    this.url = '';
    this.child = new Array();
    this.nbChild = 0;
    this.usrCanAddSubCommu = false; 
    this.usrCanRegisterInto = false;
    this.userIsBan = false;

    this.lastAncestor=undefined;
    this.ancestor = new Array();
    this.nbAncestor = 0;
    this.haveAncestor = true;
    
    this.parseJSON = function(data){        
        this.id = data.CID;
        this.name = data.CNA;
        this.usrCanAddSubCommu = (data.UCAC == "1")?true:false;
        this.usrCanRegisterInto =  (data.UCR == "1" )?true:false;
        this.userIsBan = (data.YAB == "1")?true:false;
        //subCommu :
        if(data.CCP){
            for (var i=0;i<data.CCP.length;i++)
            {           
              var community = OpenM_Book_CommunityPagesControler.AllCommunities[data.CCP[i].CID];
              if (!community){
                  community = new OpenM_Book_Community(data.CCP[i].CID);
                  community.name = data.CCP[i].CNA;

              }
              community.lastAncestor = this;
              this.addChild(community); 
            }
        }
    } 
     
    this.addChild = function(community){
        this.child[community.id]= community;
        this.nbChild++;
    } 
    
   /* this.addAncestor = function(community){
        this.ancestor[community.id]= community;
        this.nbAncestor++;
        this.lastAncestor = community;
    }*/
    
    this.userCanMakeAction = function(){
        var retour = false;
        if (this.usrCanAddSubCommu){retour = true}
        if (this.usrCanRegisterInto){retour = true}
        
        return retour;   
    }
    
    
    this.loadAncestor = function(){
        var data = OpenM_Book.getCommunityAncestors(this.id);
        //todo : faire traitement methode
        if (data.ERROR){
            
        }
        //todo : faire traitement retour CommunityAncestors
        
        
        //todo : faire test sur data, si pas d'ancettre mettre haveAncestor a false 
        //et lanstAncestor = undefined'
        this.haveAncestor = false;
    }
    
    //par récurcivité, récupérent les ancetres, si on n'a pas d'ancetre, on fait une requete au srv'
    this.getAncestor = function(tabAncestor){
        if (!tabAncestor)
            tabAncestor = new Array();
        
        if (!this.lastAncestor){
            //il n'y a pas d ancetre, on va charger depuis le srv'
            if (this.haveAncestor){
              tabAncestor =  tabAncestor.concat(this.loadAncestor());
            }
        }else{
           tabAncestor.push(this.lastAncestor);
           this.lastAncestor.getAncestor(tabAncestor);
        }  
        return tabAncestor;
    }  
}