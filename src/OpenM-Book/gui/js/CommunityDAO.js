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
        this.child[community.id]= community;
        this.nbChild++;
    } 
        
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
    this.getAncestor = function(tabAncestor){
        if(!this.ancestorsLoaded){
            if (!tabAncestor)
                tabAncestor = new Array();

            if (!this.parent){
                if (!this.ancestorsLoaded){
                    //OpenM_Book_CommunityDAO(communityId, callback_function)
                    tabAncestor =  tabAncestor.concat(OpenM_Book_CommunityDAO.getAncestors(this, true));
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
        if(!communityId)
            community = new OpenM_Book_Community();
        else
            community = this.allCommunities[communityId];                      
        
        if(!synchro)
            OpenM_Book.getCommunity(communityId, function(data){
                this.parseAndLoad(data, community)
            });
        else
            this.parseAndLoad(OpenM_Book.getCommunity(communityId), community);
        
        return community;     
    },
    'getAncestors': function(community,synchro){
         if(!synchro)
            OpenM_Book.getCommunity(communityId, function(data){
                this.parseAndLoadAncestors(data, community)
            });
        else
            this.parseAndLoadAncestors(OpenM_Book.getCommunityAncestors(community.id), community);
        
    },
    'parseAndLoad': function(data, community){        
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
                }
                subCommunity.parent = community;
                community.addChild(subCommunity); 
            }
        }
        community.loaded = true;
        community.update();
    },    
    'parseAndLoadAncestors': function(data,community){
        //TODO
        var ancestors = new Array();
        
        
        community.ancestorsLoaded = true;
        return ancestors;
    }
}