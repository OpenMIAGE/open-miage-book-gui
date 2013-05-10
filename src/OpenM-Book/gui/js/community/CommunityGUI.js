function OpenM_Book_CommunityPageGui(){
    this.tree = null;
    this.actions = null;
    this.childs = null;
    this.users = null;
    this.usersNotValid = null;
    
    this.display = function(enabled){
        var cadre = $("#"+OpenM_Book_PagesGui.divParentId);            
        if(enabled===true || enabled === undefined){
            cadre.empty();

            //le tree
            var tree = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(tree);
            tree.append(this.tree.content());
            //Les actions
            var actions = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(actions);
            actions.append(this.actions.content()); 
            
            //les childs
            var childs = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(childs);
            childs.append(this.childs.content());
            
            //les users
            var users = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(users);
            users.append(this.users.content());
            
            //les users not valid
            var usersNotValid = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(usersNotValid);
            usersNotValid.append(this.usersNotValid.content());
            
        }else{
            //on chache
            cadre.empty();
        }
    }
}

function OpenM_Book_CommunityTreeGui(communityId){    
    this.id = communityId;
    this.communities = new Array();
    
    this.content = function(){
        var div = $(document.createElement('div'));
        div.addClass("span12 well");
        div.append("<p>Navigation:</p>");
        var first = true;
        $.each(this.communities, function(key, value) {
            if(first==true)
                first = false;
            else
                div.append(" <i class='icon-play'></i> ")
            
            div.append(value.content());
        });
        return div;
    }
}

function OpenM_Book_CommunityInTreeGui(communityId, name, active){ 
    this.id = communityId;
    this.name = name;
    this.active = active;
    this.a = undefined;
    this.click = undefined;
    
    this.content = function(){
        if(this.active){
            this.a = $(document.createElement('a'));
            this.a.addClass("btn btn-primary btn-large");
            this.a.click(this.click);
        }
        else{
            this.a = $(document.createElement('a'));
            this.a.addClass("btn btn-primary btn-large disabled");
        }
        this.a.text(this.name);
        return this.a;
    }
    
    this.updateName = function(name){
        this.name = name;
        if(this.a != undefined)
            this.a.text(this.name);
    }
}

function OpenM_Book_CommunityChildsGui(communityId){ 
    this.communityId=communityId;
    this.communities = new Array();    
    this.c = $(document.createElement('div'));
        
    this.content = function(){
        this.c.empty();
        if (this.communities.length != 0){
            this.c.addClass("span12 well");
            this.c.append("<p>Sous-communautés :</p>");
            var div = $(document.createElement('div')).addClass("row-fluid");
            this.c.append(div);
            for (var i in this.communities){
                div.append(this.communities[i].content());
            }
            return this.c;
        }else{
            //pas d'enfant pour la commu 
            return this.c;
        }      
    }
}

function OpenM_Book_CommunityChildGui(communityId, name){
    this.communityId = communityId;
    this.name = name;
    this.c = undefined;
    this.click = undefined;
    
    this.content = function(){
        this.c = $(document.createElement('a'));
        this.c.addClass("btn btn-primary btn-large btn-space");
        this.c.text(this.name);
        this.c.click(this.click);
        return this.c;
    }
    
    this.updateName = function(name){
        this.name = name;
        if(this.c != undefined)
            this.c.text(this.name);
    }
}

function OpenM_Book_CommunityUsersGui(communityId){ 
    this.communityId=communityId;
    this.users = new Array();    
    this.c = $(document.createElement('div'));
        
    this.content = function(){
        this.c.empty();
        if (this.users.length != 0){
            this.c.addClass("span12 well");
            this.c.append("<p>Users :</p>");
            var div = $(document.createElement('div')).addClass("row-fluid");
            this.c.append(div);
            for (var i in this.users){
                div.append(this.users[i].content());
            }
            return this.c;
        }else{
            return this.c;
        }      
    }
}

function OpenM_Book_CommunityUserGui(id, name){
    this.id = id;
    this.name = name;
    this.click = undefined;
    
    this.c = $(document.createElement('div'));
    
    this.content = function(){
        this.c.remove();
        this.c = $(document.createElement('div'));
        this.c.addClass("user-little span3");
        var img = $(document.createElement("img")).addClass("user-little-img");
        img.attr("src",OpenM_Book_PagesGui.ressource_dir+OpenM_Book_PagesGui.userPhotoDefault);  
        this.c.append(img);
        var a = $(document.createElement("a"));
        a.text(this.name);
        this.c.append(a);
        a.click(this.click);
        img.click(this.click);
        return this.c;
    }
}

function OpenM_Book_CommunityUsersNotValidGui(communityId){ 
    this.communityId=communityId;
    this.users = new Array();    
    this.c = $(document.createElement('div'));
        
    this.content = function(){
        this.c.empty();
        if (this.users.length != 0){
            this.c.addClass("span12 well");
            this.c.append("<p>Users Non Validé :</p>");
            this.c.append("<p>Les utilisateurs présents ici, ne sont pas valider. Cela signifie qu'ils postulent pour entrer dans la communauté. C'est a vous de valider leur adhésion. Plusieurs validation d'utilisateur sont requises pour etre accépter </p>");
            var div = $(document.createElement('div')).addClass("row-fluid");
            this.c.append(div);
            for (var i in this.users){
                div.append(this.users[i].content());
            }
            return this.c;
        }else{
            return this.c;
        }      
    }
}

function OpenM_Book_CommunityUserNotValidGui(id, name, communityName){
    this.id = id;
    this.name = name;
    this.communityName = communityName;
    this.buttonValidate = '';
    this.buttonDisplayProfil = '';
    this.c = $(document.createElement('div'));
    
    this.click = undefined;

    this.content = function(){
        this.c.remove();
        this.c = $(document.createElement('div'));
        this.c.addClass("user-little span3");
        var img = $(document.createElement("img")).addClass("user-little-img");
        img.attr("src",OpenM_Book_PagesGui.ressource_dir+OpenM_Book_PagesGui.userPhotoDefault);          
        this.c.append(img);
        img.click(this.click);
        var a = $(document.createElement("a"));
        a.text(this.name);
        a.click(this.click);        
        this.c.append(a); 
        this.c.append("<br>");
        this.c.append(" in '"+this.communityName+"'"); 
        this.c.append("<br>");
        this.c.append(this.buttonValidate.content());
       /* this.c.append("&nbsp;&nbsp;")
        this.c.append(this.buttonDisplayProfil.content());*/
        return this.c;
    }
}

function OpenM_Book_ButtonValidateUserGui(){
    this.text = "Valider";
    this.style = 'btn-inverse';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok-circle";
    this.a = $(document.createElement('a'));
    
    this.click = '';

    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).addClass("btn "+this.style);
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon); 
        this.a.append(this.text);
        this.a.click(this.click);
        
        return this.a;
    }    
}
function OpenM_Book_ButtonDisplayProfilGui(){
    this.text = "Voir";
    this.style = 'btn-inverse';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-zoom-in";
    this.a = $(document.createElement('a'));
    
    this.click = undefined;

    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).addClass("btn "+this.style);
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon); 
        this.a.append(this.text);
        this.a.click(this.click);        
        return this.a;
    }    
}

function OpenM_Book_CommunityActionsGui(communityId) {
    this.communityId = communityId;    
    this.c = $(document.createElement('div'));
    this.buttons = new Array();
        
    this.content = function(){
        this.c.empty();
        if (this.buttons.length != 0){
            this.c.addClass("span12 well");
            var p = $(document.createElement('p'));
            p.text("Les actions possibles :");
            this.c.append(p);
            var div = $(document.createElement('div')); 
            div.addClass("row-fluid");
            this.c.append(div);
            var divButton;
            for (var i in this.buttons){
                // divButton = $(document.createElement('div')); 
                // divButton.addClass("span1");
                // divButton.append(this.buttons[i].content());  
                // div.append(divButton);
                div.append(this.buttons[i].content());
            }
        }
        return this.c;
    }
}

function OpenM_Book_CommunityButtonRegisterGui(communityId){
    this.communityId = communityId;
    this.text = "S'enregistrer";
    this.toolTipText = "S'enregistrer dans cette communauté";
    this.style = 'btn-inverse';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok";
    this.active = true;
    
    this.click = undefined;
    
    this.a = $(document.createElement('a'));
    
    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).addClass("btn "+this.style);
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon); 

        if (this.active){
            var gui = this;
            this.a.click(function(){$(gui).addClass('disabled');this.click()});
            this.toolTipText = "S'enregistrer dans cette communauté";
        }else{
            this.a.addClass("disabled");
            this.toolTipText = "Vous étes déja enregistrer";
        }        
        this.a.attr("rel","tooltip");
        this.a.attr("data-placement",this.tooltipPlacement);
        this.a.attr("data-toggle","tooltip");
        this.a.attr("data-original-title",this.toolTipText); 
        this.a.tooltip();
        this.a.text(this.text);
        return this.a;
    }   
}

function OpenM_Book_CommunityButtonAddCommunityGui(communityId, communityName){
    this.communityId = communityId;
    this.communityName = communityName;
    this.id = 'OpenM_Book_CommunityButtonAddCommunityGui-'+this.communityId;
    this.text = "Ajouter";
    this.toolTipText = this.text+" une sous communauté à '"+this.communityName+"'";
    this.style = 'btn-inverse';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok";
    
    this.popover = '';
    
    this.a = $(document.createElement('a'));
    
    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).attr("id",this.id).addClass("btn "+this.style); 
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon);
        
        this.popover.parentId = this.id;
        var option = {
            title: 'Nouvelle sous communauté',
            html: true, 
            placement: 'bottom',
            content: this.popover.content().context
        };
        this.a.popover(option);
        this.toolTipText = this.text+" une sous communauté à '"+this.communityName+"'";
        
        this.a.attr("rel","tooltip");
        this.a.attr("data-placement",this.tooltipPlacement);
        this.a.attr("data-toggle","tooltip");
        this.a.attr("data-original-title",this.toolTipText); 
        //this.a.attr("onclick","$('#OpenM_Book_CommunityPopOverNameGui_"+this.communityId+"').focus()");        
        var gui = this;
        this.a.click(function(){
            gui.popover.input.focus();           
            gui.popover.popover.on("submit",gui.popover.submit);
        });
        this.a.tooltip();      
        this.a.text(this.text);
        return this.a;
    }   
}

function OpenM_Book_CommunityButtonRenameGui(communityId){
    this.communityId = communityId;
    this.id = "OpenM_Book_CommunityButtonRenameGui-" + this.communityId;
    
    
    this.a = $(document.createElement("a"));
    this.text = "Renommer";
    this.toolTipText = this.text+" la communauté";
    this.style = 'btn-warning';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-refresh";    
    
    this.popover = '';
    
    this.content = function(){
        /*this.a.remove();
        this.a = $(document.createElement('a')).addClass("btn "+this.style); 
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon);  
        this.a.attr("rel","tooltip");
        this.a.attr("data-placement",this.tooltipPlacement);
        this.a.attr("data-toggle","tooltip");
        this.a.attr("data-original-title",this.toolTipText);  
        this.a.tooltip();
        this.a.text(this.text);
        return this.a; */   
        this.a.remove();
        this.a = $(document.createElement('a')).attr("id",this.id).addClass("btn "+this.style).addClass("btn-space"); 
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon);
        this.a.attr("rel","tooltip");
        this.a.attr("data-placement",this.tooltipPlacement);
        this.a.attr("data-toggle","tooltip");
        this.a.attr("data-original-title",this.toolTipText);
        this.a.tooltip(); 
        
        
        this.popover.parentId = this.id;
        var option = {
            title: 'Renommer la communauté',
            html: true, 
            placement: 'bottom',
            content: this.popover.content().context
        };
        this.a.popover(option); 
        //this.a.attr("onclick","$('#OpenM_Book_CommunityPopOverNameGui_"+this.communityId+"').focus()");     
        var gui = this;
        this.a.click(function(){
            gui.popover.input.focus();
            
            gui.popover.popover.on("submit",gui.popover.submit);
        });
             
        this.a.text(this.text);
        return this.a;
    }
}

function OpenM_Book_CommunityButtonDeleteGui(){
    this.a = $(document.createElement("a"));
    this.text = "Supprimer";
    this.toolTipText = this.text+" la communauté (définitivement)";
    this.style = 'btn-danger';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-trash";
    
    this.click = '';
    
    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).addClass("btn "+this.style); 
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor).addClass(this.iconStyle);
        this.a.append(icon);  
        this.a.attr("rel","tooltip").attr("data-placement",this.tooltipPlacement).attr("data-toggle","tooltip").attr("data-original-title",this.toolTipText);  
        this.a.tooltip();
        this.a.text(this.text);
        this.a.on('click',this.click);
        return this.a;        
    }
}

//A continuer
function OpenM_Book_CommunityPopOverNameGui(communityId){
    this.communityId = communityId;
    
    // this.inputId = 'OpenM_Book_CommunityPopOverNameGui'
    this.input = $(document.createElement("input"));
    this.popover = $(document.createElement("form"));
    this.a = $(document.createElement("a"));
    this.parentId = '';
    this.submit = '';
    this.text = 'Nom';
    
    this.content = function(){
        //création du popover
        this.input.remove();
        this.input = $(document.createElement("input"));
        this.input.attr("type","text").attr("placeholder",this.text);
        this.input.addClass("input-large");
            
        this.popover.remove();
        this.popover = $(document.createElement("form"));
        
        
        this.popover.addClass("control-group");
        var label = $(document.createElement("label"));
        label.addClass("control-label").attr("for","inputNameCommunity").text(this.text);
        this.popover.append(label);
        var subdiv = $(document.createElement("div")).addClass("controls");
        subdiv.append(this.input);
        this.popover.append(subdiv);
        this.a.remove();
        this.a = $(document.createElement("button"));
        this.a.addClass("btn").addClass("btn-primary").addClass("btn-small");
        this.a.attr('type','submit');
        var i = $(document.createElement("i"));
        i.addClass("icon-white").addClass("icon-ok-circle");                       
        this.a.append(i);
        this.a.append(" Enregistrer"); 
      
        var cancel = $(document.createElement("a")).addClass("btn btn-primary btn-small");
        var icancel = $(document.createElement("i")).addClass("icon-white icon-remove");
        cancel.append(icancel);
        cancel.append(" Annuler");
        this.popover.append(this.a);
        this.popover.append("&nbsp;");
        this.popover.append(cancel);
        cancel.attr('onclick',"$('#"+this.parentId+"').popover('hide')");
        
        return this.popover;
    }  

    this.getName = function(){
        return this.input.val();
    }
}

