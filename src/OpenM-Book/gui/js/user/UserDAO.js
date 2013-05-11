function OpenM_Book_UserExchangeObject (){
    this.id = '';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.validIn = new Array();
    this.notValidIn = new Array();
    this.isAdmin = false;
}

var OpenM_Book_UserDAO = {
    'initMe': function(){
        var user = new OpenM_Book_UserExchangeObject();
        this.parseAndLoad(OpenM_Book_User.getUserProperties(), user);
        this.me = user;
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
        OpenM_Book_CommunityPagesGui.showJSON(data);
        if (data[OpenM_Book_User.RETURN_STATUS_PARAMETER] == OpenM_Book_User.RETURN_STATUS_OK_VALUE){
            user.id = data[OpenM_Book_User.RETURN_USER_ID_PARAMETER];
            user.firstName = data[OpenM_Book_User.RETURN_USER_FIRST_NAME_PARAMETER];
            user.lastName = data[OpenM_Book_User.RETURN_USER_LAST_NAME_PARAMETER];
            user.name = user.firstName + " "+ user.lastName;
            user.isAdmin = (data[OpenM_Book_User.RETURN_USER_IS_ADMIN_PARAMETER]==OpenM_Book_User.TRUE_PARAMETER_VALUE)?true:false;
        }else{
            if (data[OpenM_Book.RETURN_ERROR_PARAMETER]){
                OpenM_Book_CommunityPagesGui.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
            }else{
                OpenM_Book_CommunityPagesGui.showError("une erreur inattendue s'est produite. Impossible de chager les données d'une communauté (id: "+community.id+") :(");
            }  
        }
    }
}