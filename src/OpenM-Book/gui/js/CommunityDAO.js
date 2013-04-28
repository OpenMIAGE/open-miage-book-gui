/**
 * La classe Community, gere data de la commu
 */
function OpenM_Book_Community(){
    
    this.id = ''; 
    this.name = '';
    this.url = '';
    this.child = new Array();
    this.nbChild = 0;
    this.userCanAddSubCommunity = false; 
    this.userCanRegister = false;
    this.userIsBanned = false;

    this.parent = undefined;
    this.ancestors = new Array();
    this.nbAncestor = 0;
    this.ancestorsLoaded = false;
    
    this.loaded = false;
     
    this.addChild = function(community){
        //TODO => check if community already exist in child
        
        this.child[community.id]= community;
        this.nbChild++;
    } 
        
    //permet de savoir si il y a des actions a effectuer sur la communauté
    this.userCanMakeAction = function(){
        var retour = false;
        if (this.userCanAddSubCommunity){
            retour = true
        }
        if (this.userCanRegister){
            retour = true
        }
        
        return retour;   
    }
    
    //par récurcivité, récupérent les ancetres, si on n'a pas d'ancetre, on fait une requete au srv'
    this.getAncestors = function(tabAncestor){
        if(!this.ancestorsLoaded){
            if (!tabAncestor)
                tabAncestor = new Array();

            if (!this.parent){
                if (!this.ancestorsLoaded){
                    var ancestors = OpenM_Book_CommunityDAO.getAncestors(this, true);
                    tabAncestor =  tabAncestor.concat(ancestors);
                }
            }else{
                tabAncestor.push(this.parent);
                this.parent.getAncestor(tabAncestor);
            }  
            this.ancestors = tabAncestor;
        }
       
        return this.ancestors;
    }

    //update listener
        
    this.AllCallBack = new Array();
    this.usersArray = new Array();
    this.AllUsersCallBack = new Array();
    this.usersNotValidArray = new Array();
    this.AllUsersNotValidCallBack = new Array();
    
    this.addUpdateCallBack = function(c){
        this.AllCallBack.push(c);
    }
    
    this.addUpdateUsersCallBack = function(c){
        this.AllUsersCallBack.push(c);
    } 
    
    this.addUpdateUsersCallBack = function(c){
        this.AllUsersNotValidCallBack.push(c);
    }    
    
    this.update = function(){
        //lancer tous les callback
        for(var i in this.AllCallBack){
            this.AllCallBack[i]();            
        }            
    }          
    this.updateUsers = function(){
    //lancer tous les callback
    }     
    this.updateUsersNotValid = function(){
    //lancer tous les callback
    }     
    
    this.getUsers = function (){       
        OpenM_Book.getCommunityUsers(communtyId, function(data){
            
            this.updateUsers();
        });     
    }
    
    this.getUsersNotValid = function(){       
        OpenM_Book.getCommunityNotValidUsers(this.id, function(data){
            
            this.updateUsersNotValid();
        });
    }
}

function OpenM_Book_CommunityUser (id, name){
    this.id = id;
    this.name = name;
}

//Tab qui gére tt les instances de Community
var OpenM_Book_CommunityDAO = {
    'allCommunities': new Array(),
    'get': function(communityId, synchro){
        var community;
        community = this.allCommunities[communityId];  
        if(!community){
            community = new OpenM_Book_Community();            
            if (communityId)
                community.id = communityId;
            
            if(!synchro)
                OpenM_Book.getCommunity(communityId, function(data){
                    OpenM_Book_CommunityDAO.parseAndLoad(data, community)
                });
            else
                this.parseAndLoad(OpenM_Book.getCommunity(communityId), community); 
        }         
        return community;     
    },
    'getAncestors': function(community, synchro){
        if(!synchro)
            OpenM_Book.getCommunity(communityId, function(data){
                OpenM_Book_CommunityDAO.parseAndLoadAncestors(data, community)
            });
        else
            return this.parseAndLoadAncestors(OpenM_Book.getCommunityAncestors(community.id), community);   
    },
    'parseAndLoad': function(data, community){
        OpenM_Book_CommunityPagesGui.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
            if (!this.allCommunities[data.CID])
                this.allCommunities[data.CID] = community;
        
            community.id = data.CID;
            community.name = data.CNA;
            community.userCanAddSubCommunity = (data.UCAC == "1")?true:false;
            community.userCanRegister =  (data.UCR == "1" )?true:false; 
            community.userIsBanned = (data.YAB == "1")?true:false;
            if(data.CCP){
                for (var i=0;i<data.CCP.length;i++) {           
                    var subCommunity = this.allCommunities[data.CCP[i].id];
                
                    if (!subCommunity){
                        subCommunity = new OpenM_Book_Community();
                        subCommunity.id = data.CCP[i].CID;
                        subCommunity.name = data.CCP[i].CNA;
                        this.allCommunities[subCommunity.id] = subCommunity;
                    }
                    subCommunity.parent = community;
                    community.addChild(subCommunity); 
                }
            }
            community.loaded = true;
            community.update();
        }else{
            if (data[OpenM_Book.RETURN_ERROR_PARAMETER]){
                OpenM_Book_CommunityPagesGui.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
            }else{
                OpenM_Book_CommunityPagesGui.showError("une erreur inattendue s'est produite. Impossible de chager les données d'une communauté (id: "+community.id+") :(");
            }  
        }

       
    },    
    'parseAndLoadAncestors': function(data,community){
        var ancestors = new Array();
        OpenM_Book_CommunityPagesGui.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
           
            if (data[community.id]){
                var Idparent = data[community.id][OpenM_Book.RETURN_COMMUNITY_PARENT_PARAMETER];
                var communityTmp = community;
           
                for (var i in data){
                    if (i != OpenM_Book.RETURN_STATUS_PARAMETER){
                        var parentCommunity = this.allCommunities[Idparent];
                        if (!parentCommunity){
                            parentCommunity = new OpenM_Book_Community();
                            parentCommunity.id = Idparent;
                            parentCommunity.name = data[communityTmp.id][OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                            this.allCommunities[parentCommunity.id] = parentCommunity;
                        }
                        communityTmp.parent = parentCommunity;
                        ancestors.push(parentCommunity);
                        if (data[Idparent]){
                            Idparent = data[Idparent][OpenM_Book.RETURN_COMMUNITY_PARENT_PARAMETER];
                            communityTmp = parentCommunity;
                        }else{                         
                            // la commu parent est introuvable ds le tableau on sort
                            break;
                        }
                    }                   
                }                             
            }
            community.ancestorsLoaded = true;
        }else{
            if (data[OpenM_Book.RETURN_ERROR_PARAMETER]){
                OpenM_Book_CommunityPagesGui.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
            }else{
                OpenM_Book_CommunityPagesGui.showError("une erreur inattendue s'est produite. Impossible de chager les données des ancetres d'une communauté (id: "+community.id+") :(");
            }  
        }
        return ancestors.reverse();
    }
}