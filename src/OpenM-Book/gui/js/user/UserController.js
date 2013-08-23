OpenM_BookController.user = {};

OpenM_BookController.user.Pages = {
    'AllUserPagesControlers': new Array(),
    'defaultUserId': '',
    'userPage': function(userId, reload) {
        var user = null;
        if (reload === false)
            return this.allCommunities[userId];
        if (!userId && this.defaultUserId === '') {
            //todo : check if me is present, return me 
            if (OpenM_BookDAO.user.DAO.me !== '')
                user = OpenM_BookDAO.user.DAO.me;
            else {
                user = OpenM_BookDAO.user.DAO.get(userId, true, true);
                OpenM_BookDAO.user.DAO.me = user;
            }

            this.defaultUserId = user.id;
        } else if (!userId)
            user = OpenM_BookDAO.user.DAO.get(this.defaultUserId, true);
        else
            user = OpenM_BookDAO.user.DAO.get(userId, true);

        var userControler = this.AllUserPagesControlers[user.id];
        if (!userControler) {
            userControler = new OpenM_BookController.user.Page(user);
            this.AllUserPagesControlers[user.id] = userControler;
        }
        return userControler;
    }
};

OpenM_BookController.user.Page=function (user) {
    this.user = user;
    this.gui = new OpenM_BookGUI.user.Page();

    this.buttonModification = new OpenM_BookController.user.button.modification(this.user, this);
    this.gui.buttonModification = this.buttonModification.gui;

    this.fields = new OpenM_BookController.user.Fields(this.user);
    this.gui.fields = this.fields.gui;
    this.fields.addField(new OpenM_BookController.user.Field(this.user, "firstName"));
    this.fields.addField(new OpenM_BookController.user.Field(this.user, "lastName"));
    this.fields.addField(new OpenM_BookController.user.Field(this.user, "otherProperties[0]"));

    /*this.fieldFirstName = new OpenM_BookController.user.Field(this.user, "firstName");
     this.gui.fieldFirstName = this.fieldFirstName.gui;    
     this.fieldLastName = new OpenM_BookController.user.Field(this.user,"lastName");
     this.gui.fieldLastName = this.fieldLastName.gui;*/

    this.display = function() {
        this.gui.display();
    };
};

OpenM_BookController.user.button = {};

OpenM_BookController.user.button.modification=function (user, pageControler, inModification) {
    if (inModification === undefined || inModification === false) {
        inModification = false;
    } else
        inModification = true;

    this.user = user;
    this.page = pageControler;
    this.inModification = inModification;
    this.gui = new OpenM_BookGUI.user.button.Modification(this.inModification);

    var controller = this;
    this.gui.click = function(e) {
        //alert('TODO : tous les champs en modification')
        /*  controller.inModification = (!controller.inModification);
         controller.page.fields.updateInModification(controller.inModification);
         controller.gui.inModification = controller.inModification;
         controller.gui.content();*/
        e.preventDefault();
    };
};

OpenM_BookController.user.Fields=function (user) {
    this.user = user;
    this.fields = new Array();
    this.gui = new OpenM_BookGUI.user.Fields();

    this.addField = function(field) {
        this.fields.push(field);
        this.gui.addField(field.gui);
    };

    this.updateInModification = function(inModification) {
        for (var i in this.fields) {
            //maj la modif
            this.fields[i].updateInModification(inModification);
        }
        this.gui.content();
    };

    /*this.updateFields = function(){
     
     } */
};

OpenM_BookController.user.Field=function (user, field, inModification) {
    if (inModification === undefined || inModification === false) {
        inModification = false;
    } else
        inModification = true;

    this.user = user;
    this.field = field;
    this.inModification = inModification;
    this.gui = new OpenM_BookGUI.user.Field(user, field, this.inModification);
//    this.gui.fieldValue =this.user[this.field];
//    this.gui.fieldName = this.user.fieldsNames[this.field]; 

    this.updateInModification = function(inModification) {
        this.inModification = inModification;
        this.gui.inModification = this.inModification;
    };
};