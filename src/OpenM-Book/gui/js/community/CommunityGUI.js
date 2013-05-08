
var OpenM_Book_CommunityPagesGui = {
    'divParentId': '', 
    'ressource_dir': '',
    'ressource_loader': '',
    'divJSON': '',
    'divJSONContent':'',
    'divJSONInitialized': false,
    'divJSONcount': 1,
    'showPageLoading': function(){ 
        $("#"+this.div_id).empty().append("<img src='"+ this.ressource_dir + this.ressource_loader +"' >");           
    },
    'showJSON': function(data){
        var div = $("#"+this.divJSON);
        if (div.size() == 0)
            return;
        if(!this.divJSONInitialized){
            this.divJSONInitialized = true;
            var div2 = $(document.createElement('div'));
            div.append(div2);
            div2.text("Le retour JSON : ");
            div2.append('<br>');
            var pre = $(document.createElement('pre'));
            div.append(pre);
            this.divJSONContent = $(document.createElement('code'));
            pre.append(this.divJSONContent);
        }            
        
        this.divJSONContent.append("<span id='"+this.divJSON+"-"+this.divJSONcount+"'>"+this.divJSONcount+" - "+JSON.stringify(data)+"<br></span>");
        $("#"+this.divJSON+"-"+(this.divJSONcount - 5)).remove();
        this.divJSONcount++;
    },
    'removeJSON':function(){
        $("#"+this.divJSON).remove();
    },
    'showError': function(message){
        $("#div_alert").empty();
        $("#div_alert").append("<div class='alert alert-error alert-block span4 offset4' style='display: none;'><button type='button' class='close'>x</button><h4>Erreur :</h4>" +message+ "</div>");      
        $(".close").on("click", function(event){  
            $('.alert').hide('slow');     
        });
        $(".alert").show("slow");         
    }   
}

function OpenM_Book_CommunityPageGui(){
    this.tree = null;
    this.actions = null;
    this.childs = null;
    this.users = null;
    this.usersNotValid = null;
    
    this.display = function(enabled){
        if(enabled===true || enabled === undefined){
            var cadre = $("#"+OpenM_Book_CommunityPagesGui.divParentId);
            cadre.empty();
            
            //Les actions
            var actions = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(actions);
            actions.append(this.actions.content()); 
            
            //le tree
            var tree = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(tree);
            tree.append(this.tree.content());
            
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
            $("#"+this.divParentId).empty();
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
    this.click = '';
    
    this.content = function(){
        if(this.active){
            this.a = $(document.createElement('a'));
            this.a.addClass("btn btn-primary btn-large");
            this.a.attr("href", "#");
            this.a.attr("onclick", this.click);
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
    this.click = '';
    
    this.content = function(){
        this.c = $(document.createElement('a'));
        this.c.addClass("btn btn-primary btn-large btn-space");
        this.c.text(this.name);
        this.c.attr("onclick", this.click);
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
    
    this.c = $(document.createElement('div'));
    
    this.content = function(){
        this.c.remove();
        this.c = $(document.createElement('div'));
        this.c.addClass("community span3");
        this.c.text(this.name);
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
            this.c.append("<p>Users Not Valid :</p>");
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

function OpenM_Book_CommunityUserNotValidGui(id, name){
    this.id = id;
    this.name = name;
    this.c = $(document.createElement('div'));
    
    this.content = function(){
        this.c.remove();
        this.c = $(document.createElement('div'));
        this.c.addClass("community span3");
        this.c.text(this.name);
        return this.c;
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
    
    this.click = '';
    
    this.a = $(document.createElement('a'));
    
    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).addClass("btn "+this.style);
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon); 

        if (this.active){
            this.a.attr("onclick","$(this).addClass('disabled');"+this.click);
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
    this.text = "Ajouter";
    this.toolTipText = this.text+" une sous communauté à '"+this.communityName+"'";
    this.style = 'btn-inverse';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-ok";
    
    this.popover = '';
    this.click = '';
    
    this.a = $(document.createElement('a'));
    
    this.content = function(){
        this.a.remove();
        this.a = $(document.createElement('a')).attr("id","OpenM_Book_CommunityButtonAddCommunityGui").addClass("btn "+this.style); 
        this.a.addClass("btn-space");
        var icon = $(document.createElement("i"));
        icon.addClass(this.iconColor + " " + this.iconStyle);
        this.a.append(icon);
        
       
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
        this.a.attr("onclick","$('#OpenM_Book_CommunityPopOverAddCommunityGui_"+this.communityId+"').focus()");        
        this.a.tooltip();      
        this.a.text(this.text);
        return this.a;
    }   
}

function OpenM_Book_CommunityButtonRenameGui(){
    this.a = $(document.createElement("a"));
    this.text = "Renommer";
    this.toolTipText = this.text+" la communauté";
    this.style = 'btn-warning';
    this.tooltipPlacement = "top";
    this.iconColor = "icon-white";
    this.iconStyle = "icon-refresh";
    
    this.click = '';
    
    this.content = function(){
        this.a.remove();
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
        return this.a;        
    }
}

//A continuer
function OpenM_Book_CommunityPopOverAddCommunityGui(communityId){
    this.communityId = communityId;
    this.input = $(document.createElement("input"));
    this.popover = $(document.createElement("div"));
    this.a = $(document.createElement("a"));
    
    this.submit = '';
    
    this.content = function(){
        //création du popover
        this.input.remove();
        this.input = $(document.createElement("input")).attr("id","OpenM_Book_CommunityPopOverAddCommunityGui_"+this.communityId);
        this.input.attr("type","text").attr("placeholder","Nom ?");
        this.input.addClass("input-large");
            
        this.popover.remove();
        this.popover = $(document.createElement("div"));
        this.popover.addClass("control-group");
        var label = $(document.createElement("label"));
        label.addClass("control-label").attr("for","inputNameCommunity").text("Nom");
        this.popover.append(label);
        var subdiv = $(document.createElement("div")).addClass("controls");
        subdiv.append(this.input);
        this.popover.append(subdiv);
        this.a.remove();
        this.a = $(document.createElement("a"));
        this.a.addClass("btn").addClass("btn-primary").addClass("btn-small");
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
        cancel.attr('onclick',"$('#OpenM_Book_CommunityButtonAddCommunityGui').popover('hide')");
        this.a.attr("onclick",this.submit);
        return this.popover;
    }  

    this.getName = function(){
        return this.input.val();
    }
}

