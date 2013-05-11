function OpenM_Book_UserExchangeObject (){
    this.id = '';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.isAdmin =false;
    this.loaded = false;
    this.validIn = new Array();
    this.notValidIn = new Array();
    this.fieldsNames = OpenM_Book_UserDAO.fieldsNames();
    
}

var OpenM_Book_UserDAO = {
    'initMe': function(callBack){
        var user = new OpenM_Book_UserExchangeObject();
        var callBackFunction = callBack;
        if(callBack==undefined){
            this.parseAndLoad(OpenM_Book_User.getUserProperties(), user);
            if(user.loaded){
                this.me = user;
                return true;
            }
            else{
                return false;
            }
        }
        else{
            OpenM_Book_User.getUserProperties(function(data){
                OpenM_Book_UserDAO.parseAndLoad(data, user);
                OpenM_Book_UserDAO.me = user;
                callBackFunction();
            });
        }        
    },
    'me': undefined,
    'allUsers': new Array(),
    'get': function(userId, synchro, reload){
        var user;
        user = this.allUsers[userId];  
        if(!user){
            user = new OpenM_Book_UserExchangeObject();
            this.allUsers[userId] = user;
        }
        
        if (userId)
            user.id = userId;
        
        if(reload===true || reload === undefined){
            if(!synchro)
                OpenM_Book_User.getUserProperties(userId, function(data){
                    OpenM_Book_UserDAO.parseAndLoad(data, user)
                });
            else
                this.parseAndLoad(OpenM_Book_User.getUserProperties(userId), user); 
        }
        return user;
    },
    'parseAndLoad': function(data, user){        
        OpenM_Book_PagesGui.showJSON(data);
        if (data[OpenM_Book_User.RETURN_STATUS_PARAMETER] == OpenM_Book_User.RETURN_STATUS_OK_VALUE){
            if (! this.allUsers[data[OpenM_Book_User.RETURN_USER_ID_PARAMETER]])
                this.allUsers[data[OpenM_Book_User.RETURN_USER_ID_PARAMETER]] = user;
            
            user.id = data[OpenM_Book_User.RETURN_USER_ID_PARAMETER];           
            user.firstName = data[OpenM_Book_User.RETURN_USER_FIRST_NAME_PARAMETER];
            user.lastName = data[OpenM_Book_User.RETURN_USER_LAST_NAME_PARAMETER];
            user.name = this.firstName + " " + user.lastName;
            user.isAdmin = (data[OpenM_Book_User.RETURN_USER_IS_ADMIN_PARAMETER]==OpenM_Book_User.TRUE_PARAMETER_VALUE)?true:false;
            user.loaded = true;
        }else{
            if (data[OpenM_Book.RETURN_ERROR_PARAMETER]){
                OpenM_Book_CommunityPagesGui.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
            }else{
                OpenM_Book_CommunityPagesGui.showError("une erreur inattendue s'est produite. Impossible de chager les données d'une communauté (id: "+community.id+") :(");
            }  
             
        } 
    },
    'fieldsNames': function(){
        var array = new Array();
        array['name'] = "nom long";
        array['firstName'] = "prénom";
        array['lastName'] = "nom";
        return array;
    }
}