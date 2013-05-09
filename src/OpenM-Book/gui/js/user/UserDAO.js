function OpenM_Book_UserExchangeObject (){
    this.id = '';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.validIn = new Array();
    this.notValidIn = new Array();
}

var OpenM_Book_UserDAO = {
    'me': {
        'isAdmin':false
    },
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
        
    }
}