var OpenM_Book_UsersPagesController = {
    'AllUserPagesControlers': new Array(),
    'defaultUserId': '',
    'userPage' : function(userId, reload){
        var user = null;
        if(reload==false)
            return this.allCommunities[userId];
        if (!userId && this.defaultUserId == ''){
            //todo : check if me is present, return me 
            
            user = OpenM_Book_UserDAO.get(userId,true);
            this.defaultUserId = user.id;
        }else if(!userId)
            user = OpenM_Book_UserDAO.get(this.defaultUserId);
        else
            user = OpenM_Book_UserDAO.get(userId);
                
        var userControler = this.AllUserPagesControlers[user.id];
        if (!userControler){
            userControler = new OpenM_Book_UserPageController(user);
            this.AllUserPagesControlers[user.id] = userControler;   
        }        
        return userControler;
    }
}


function OpenM_Book_UserPageController(user){
    this.user = user;
    this.gui = new OpenM_Book_UserPageGUI();
    
    this.buttonModification = new OpenM_Book_UserButtonModificationController(this.user);
    this.gui.buttonModification = this.buttonModification.gui;
    
    this.fieldFirstName = new OpenM_Book_UserFieldController(this.user, "firstName");
    this.gui.fieldFirstName = this.fieldFirstName.gui;
    
    this.fieldLastName = new OpenM_Book_UserFieldController(this.user,"lastName");
    this.gui.fieldLastName = this.fieldLastName.gui;
    
    this.display = function(){
         this.gui.display();
    }
}

function OpenM_Book_UserButtonModificationController(user){
    this.user = user;
    this.gui = new OpenM_Book_UserButtonModificationGui();
    
    var controller = this;
    this.gui.click = function(e){
        alert('TODO : tous les champs en modification')
        
        e.preventDefault();
    }    
}

function OpenM_Book_UserFieldController(user,field){
    this.user = user;
    this.field = field;
    this.gui = new OpenM_Book_UserFieldGui(user, field);
    this.gui.fieldValue =this.user[this.field];
    this.gui.fieldName = this.user.fieldsNames[this.field]; 
}


