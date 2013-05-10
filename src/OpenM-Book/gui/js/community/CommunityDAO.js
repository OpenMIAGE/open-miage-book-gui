/**
 * La classe Community, gere data de la commu
 */
function OpenM_Book_CommunityExchangeObject(){
    
    this.id = ''; 
    this.name = '';
    this.url = '';
    this.childs = new Array();
    this.nbChild = 0;
    this.userCanAddSubCommunity = false; 
    this.userCanRegister = false;
    this.userIsBanned = false;
    this.userAlreadyRegistred = false;
    this.userIsModerator = false;
    this.forbidenToAddSubCommunity = false;
    this.cantBeRemoved = true;
    this.parent = undefined;
    this.ancestors = new Array();
    this.nbAncestor = 0;
    this.ancestorsLoaded = false;
    this.users = new Array();
    this.usersNotValidTree = new Array();
    
    this.loaded = false;
     
    this.addChild = function(community){
        if(this.childs[community.id]===undefined){
            this.childs[community.id]= community;
            community.parent = this;
            this.nbChild++;
        }
    } 
    
    this.removeChild = function(community){
        if(this.childs[community.id]){
            delete this.childs[community.id];
            this.nbChild--;
        }        
    }
        
    //permet de savoir si il y a des actions a effectuer sur la communauté
    this.userCanMakeAction = function(){
        var retour = false;
        if (this.userCanAddSubCommunity)
            retour = true        
        if (this.userCanRegister)
            retour = true         
        return retour;   
    }
    
    //par récurcivité, récupérent les ancetres, si on n'a pas d'ancetre, on fait une requete au srv'
    this.getAncestors = function(ancestorsArray){
        if (ancestorsArray===undefined)
            ancestorsArray = new Array();

        if(!this.ancestorsLoaded && this.parent && this.parent.ancestorsLoaded)
            this.ancestorsLoaded = true;
            
        if (!this.ancestorsLoaded){
            OpenM_Book_CommunityDAO.getAncestors(this, true);
            this.ancestorsLoaded = true;
        }
            
        if (this.parent===undefined)
            return ancestorsArray;
            
        this.parent.getAncestors(ancestorsArray);
        ancestorsArray.push(this.parent);
        
        return ancestorsArray;
    }

    //update listener
        
    this.AllCallBack = new Array();
    this.AllUsersCallBack = new Array();
    this.AllUsersNotValidCallBack = new Array();
    
    this.addUpdateCallBack = function(c){
        this.AllCallBack.push(c);
    }
    
    this.addUpdateUsersCallBack = function(c){
        this.AllUsersCallBack.push(c);
    } 
    
    this.addUpdateUsersNotValidCallBack = function(c){
        this.AllUsersNotValidCallBack.push(c);
    }    
    
    this.update = function(community){
        for(var i in this.AllCallBack){
            this.AllCallBack[i](community);            
        }            
    }          
    
    var community = this;
    this.updateUsers = function(){
        for(var i in this.AllUsersCallBack){
            this.AllUsersCallBack[i](community);            
        }
    }     
    this.updateUsersNotValid = function(){
        for(var i in this.AllUsersNotValidCallBack){
            this.AllUsersNotValidCallBack[i](community);            
        }
    }         
    this.registerMe = function(){
        var community = this;
        OpenM_Book.registerMeIntoCommunity(this.id, function(data){
            if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
                community.userAlreadyRegistred = true;
                community.updateUsersNotValid();
            }
        })
    }
}

var OpenM_Book_CommunityDAO = {
    'allCommunities': new Array(),
    'get': function(communityId, synchro){
        var community;
        community = this.allCommunities[communityId];  
        if(!community)
            community = new OpenM_Book_CommunityExchangeObject();            
        
        if (communityId)
            community.id = communityId;
            
        if(!synchro)
            OpenM_Book.getCommunity(communityId, function(data){
                OpenM_Book_CommunityDAO.parseAndLoad(data, community)
            });
        else
            this.parseAndLoad(OpenM_Book.getCommunity(communityId), community); 
             
        return community;     
    },
    'getAncestors': function(community, synchro){
        if(!synchro){
            OpenM_Book.getCommunity(communityId, function(data){
                OpenM_Book_CommunityDAO.parseAndLoadAncestors(data, community)
            });
            return null;
        }
        else
            return this.parseAndLoadAncestors(OpenM_Book.getCommunityAncestors(community.id), community);   
    },
    'getUsers': function (community, synchro){
        if(synchro===undefined || synchro==true){
            var c = community;
            OpenM_Book.getCommunityUsers(c.id, function(data){
                OpenM_Book_CommunityDAO.parseUsers(data, c);
                c.updateUsers();
            });
        }
        return community.users;
    },
    'getUsersNotValid': function(community, synchro){       
        if(synchro===undefined || synchro==true){
            var c = community;
            OpenM_Book.getCommunityNotValidUsers(c.id, function(data){
                OpenM_Book_CommunityDAO.parseUsersNotValid(data, c);
                c.updateUsersNotValid();
            });
        }
        return community.usersNotValidTree;
    },
    
    'addCommunity': function(name, communityId){
        var community = this.allCommunities[communityId];
        var n = name;
        if(community){
            OpenM_Book.addCommunity(name, communityId, function(data){
                OpenM_Book_CommunityPagesGui.showJSON(data);
                if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
                    OpenM_Book_CommunityPagesGui.showSucces("Sous communauté ajouté");
                    var c = new OpenM_Book_CommunityExchangeObject();
                    c.id = data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
                    c.parent = community;
                    c.name = n;
                    c.ancestorsLoaded = community.ancestorsLoaded;
                    OpenM_Book_CommunityDAO.allCommunities[c.id] = c;
                    community.addChild(c);
                    community.update();
                }else{
                    if (data.hasOwnProperty(OpenM_Book.RETURN_ERROR_PARAMETER)){                     
                      OpenM_Book_CommunityPagesGui.showError("Ajout de la sous communauté impossible : "+ data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]); 
                   }
                   else{
                       OpenM_Book_CommunityPagesGui.showError("Une erreur inattendu c'est produites, veuillez nous excuser");
                   }
                }
                
            });
        }
    },
    'removeCommunity': function(communityId){
        var community = this.allCommunities[communityId];
        if(community){
            OpenM_Book_Moderator.removeCommunity(community.id,function(data){
                OpenM_Book_CommunityPagesGui.showJSON(data);
               if (data[OpenM_Book_Moderator.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
                  var parent = community.parent;
                  parent.removeChild(community);                  
                  delete OpenM_Book_CommunityDAO.allCommunities[community.id];
                  OpenM_Book_CommunityPagesGui.showSucces("Communauté supprimée");
                  eval(OpenM_URLController.clickToCommunity(parent).split(";")[0]);                 
               }else{
                   if (data.hasOwnProperty(OpenM_Book_Moderator.RETURN_ERROR_PARAMETER)){                     
                      OpenM_Book_CommunityPagesGui.showError("Une erreur c'est produites lors de la suppression de la communauté : "+ data[OpenM_Book_Moderator.RETURN_ERROR_MESSAGE_PARAMETER]); 
                   }
                   else{
                       OpenM_Book_CommunityPagesGui.showError("Une erreur inattendu c'est produites, veuillez nous excuser");
                   }
               }               
            });
        }
        
        
    },
    
    'parseAndLoad': function(data, community){
        OpenM_Book_CommunityPagesGui.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
            if (!this.allCommunities[data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]])
                this.allCommunities[data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]] = community;
        
            community.id = data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
            community.name = data[OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
            community.userCanAddSubCommunity = (data[OpenM_Book.RETURN_USER_CAN_ADD_COMMUNITY_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE)?true:false;
            community.forbidenToAddSubCommunity = (data[OpenM_Book.RETURN_FORBIDDEN_TO_ADD_COMMUNITY_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE )?true:false;
            community.userCanRegister =  (data[OpenM_Book.RETURN_USER_CAN_REGISTER_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE )?true:false;
            community.userIsBanned = (data[OpenM_Book.RETURN_YOU_ARE_BANNED_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE)?true:false;
            community.userAlreadyRegistred = (data[OpenM_Book.RETURN_USER_ALREADY_REGISTERED_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE)?true:false;
            community.userIsModerator = (data[OpenM_Book.RETURN_YOU_ARE_COMMUNITY_MODERATOR_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE)?true:false;
            community.cantBeRemoved = (data[OpenM_Book.RETURN_COMMUNITY_CANT_BE_REMOVED_PARAMETER] == OpenM_Book.TRUE_PARAMETER_VALUE)?true:false;
            
            if(data.CCP){
                for (var i=0;i<data.CCP.length;i++) {           
                    var subCommunity = this.allCommunities[data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER][i][OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]];
                
                    if (!subCommunity){
                        subCommunity = new OpenM_Book_CommunityExchangeObject();
                        subCommunity.id = data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER][i][OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
                        this.allCommunities[subCommunity.id] = subCommunity;
                    }
                    
                    subCommunity.name = data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER][i][OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                    subCommunity.parent = community;
                    if(!community.ancestorsLoaded && community.parent && community.parent.ancestorsLoaded)
                        community.ancestorsLoaded = true;
                    if(community.ancestorsLoaded)
                        subCommunity.ancestorsLoaded = true;
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
                            parentCommunity = new OpenM_Book_CommunityExchangeObject();
                            parentCommunity.id = Idparent;
                            parentCommunity.name = data[communityTmp.id][OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                            parentCommunity.ancestorsLoaded = true;
                            this.allCommunities[parentCommunity.id] = parentCommunity;
                        }
                        communityTmp.parent = parentCommunity;
                        communityTmp.ancestorsLoaded = true;
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
            for(var k in community.childs){
                community.childs[k].ancestorsLoaded = true;
            }
        }else{
            if (data[OpenM_Book.RETURN_ERROR_PARAMETER]){
                OpenM_Book_CommunityPagesGui.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
            }else{
                OpenM_Book_CommunityPagesGui.showError("une erreur inattendue s'est produite. Impossible de chager les données des ancetres d'une communauté (id: "+community.id+") :(");
            }  
        }
    },    
    'parseUsers': function(data, community){
        OpenM_Book_CommunityPagesGui.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
            var user;
            var users = new Array();
            var i;
            var u;
            for(i in data[OpenM_Book.RETURN_USER_LIST_PARAMETER]){
                u = data[OpenM_Book.RETURN_USER_LIST_PARAMETER][i];
                user = OpenM_Book_UserDAO.get(u[OpenM_Book.RETURN_USER_ID_PARAMETER], false, false);
                user.name = u[OpenM_Book.RETURN_USER_NAME_PARAMETER];
                users[user.id] = user;
                user.validIn[community.id] = community;
            }
            for(i in community.users){
                u = community.users[i];
                if(users[u.id]===undefined)
                    community.users[i] = undefined;
            }
            for(i in users){
                u = users[i];
                if(community.users[u.id]===undefined)
                    community.users[u.id] = u;
            }
            community.updateUsers();
        }
    },
    'parseUsersNotValid': function(data, community){
        OpenM_Book_CommunityPagesGui.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] == OpenM_Book.RETURN_STATUS_OK_VALUE){
            var user;
            var users = new Array();
            var i;
            var u;
            var communityId;
            var communityTemp;
            community.usersNotValidTree = new Array();
            for(i in data[OpenM_Book.RETURN_USER_LIST_PARAMETER]){
                u = data[OpenM_Book.RETURN_USER_LIST_PARAMETER][i];
                user = OpenM_Book_UserDAO.get(u[OpenM_Book.RETURN_USER_ID_PARAMETER], false, false);
                user.name = u[OpenM_Book.RETURN_USER_NAME_PARAMETER];
                users[user.id] = user;
                communityId = u[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
                communityTemp = OpenM_Book_CommunityDAO.allCommunities[communityId];
                if(communityTemp===undefined){
                    communityTemp = new OpenM_Book_CommunityExchangeObject();
                    communityTemp.id = communityId;
                    communityTemp.name = u[OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                }
                if(community.usersNotValidTree[user.id]===undefined)
                    community.usersNotValidTree[user.id] = new Array();
                community.usersNotValidTree[user.id][communityTemp.id] = communityTemp;             
            }
            community.updateUsersNotValid();
        }
    }
}