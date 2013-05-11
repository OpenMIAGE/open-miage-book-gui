var OpenM_Book_UsersPagesController = {
    'AllUserPagesControlers': new Array(),
    'defaultUserId': '',
    'userPage' : function(userId, reload){
        var user = null;
        if(reload==false)
            return this.allCommunities[userId];
        if (!userId && this.defaultUserId == ''){
            //todo : check if me is present, return me 
            if(OpenM_Book_UserDAO.me != '')                
                user = OpenM_Book_UserDAO.me;                
            else{
                user = OpenM_Book_UserDAO.get(userId,true); 
                OpenM_Book_UserDAO.me = user;
            }
                                       
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
        
    this.buttonModification = new OpenM_Book_UserButtonModificationController(this.user,this);
    this.gui.buttonModification = this.buttonModification.gui;    
    
    this.fields = new OpenM_Book_UserFieldsController(this.user);
    this.gui.fields = this.fields.gui;
    this.fields.addField(new OpenM_Book_UserFieldController(this.user, "firstName"));
    this.fields.addField(new OpenM_Book_UserFieldController(this.user, "lastName"));
    
    
    /*this.fieldFirstName = new OpenM_Book_UserFieldController(this.user, "firstName");
    this.gui.fieldFirstName = this.fieldFirstName.gui;    
    this.fieldLastName = new OpenM_Book_UserFieldController(this.user,"lastName");
    this.gui.fieldLastName = this.fieldLastName.gui;*/
    
    this.display = function(){
         this.gui.display();
    }
}

function OpenM_Book_UserButtonModificationController(user,pageControler, inModification){
    if(inModification===undefined || inModification === false){
        inModification = false;
    }else
        inModification = true;
    
    this.user = user;
    this.page = pageControler;    
    this.inModification = inModification;
    this.gui = new OpenM_Book_UserButtonModificationGui(this.inModification);
        
    var controller = this;
    this.gui.click = function(e){
        //alert('TODO : tous les champs en modification')
        controller.inModification = (!controller.inModification);
        controller.page.fields.updateInModification(controller.inModification);
        controller.gui.inModification = controller.inModification;
        controller.gui.content();
        e.preventDefault();
    }    
}

function OpenM_Book_UserFieldsController(user){
    this.user = user;
    this.fields = new Array();
    this.gui = new OpenM_Book_UserFieldsGui();
        
    this.addField= function(field){
        this.fields.push(field);
        this.gui.addField(field.gui);
    }
    
    this.updateInModification = function(inModification){
        for(var i in this.fields){
           //maj la modif
           this.fields[i].updateInModification(inModification);
        }
        this.gui.content();
    }
    
    /*this.updateFields = function(){
          
    } */   
}


function OpenM_Book_UserFieldController(user,field,inModification){
    if(inModification===undefined || inModification === false){
        inModification = false;
    }else
        inModification = true;
    
    this.user = user;
    this.field = field;
    this.inModification = inModification;
    this.gui = new OpenM_Book_UserFieldGui(user, field,this.inModification);
    this.gui.fieldValue =this.user[this.field];
    this.gui.fieldName = this.user.fieldsNames[this.field]; 
    
    this.updateInModification = function(inModification){
        this.inModification = inModification;
        this.gui.inModification = this.inModification;
    }
    
    
}


