
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
            childs.append(this.users.content());
            
            //on active les toolTip
            $("[rel='tooltip']").tooltip();
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
        div.append("<span>Navigation</span>");
        var tree = $(document.createElement('ul')).addClass("breadcrumb");
        div.append(tree);
        var first = true;
        $.each(this.communities, function(key, value) {
            if(first==true)
                first = false;
            else
                tree.append(" <span class='divider'>/</span> ")
            
            tree.append(value.content());
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
        var li = $(document.createElement('li'));
        if(this.active){
            this.a = $(document.createElement('a'));
            li.append(this.a);
            this.a.attr("href", "#");
            this.a.attr("onclick", this.click);
        }
        else
            this.a = $(li);
        this.a.text(this.name);
        return li;
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
        this.c = $(document.createElement('div'));
        this.c.addClass("community span3");
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
        this.c.remove();
        this.c = $(document.createElement('div'));
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
    
    this.c = undefined;
    
    this.content = function(){
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
                divButton = $(document.createElement('div')); 
                divButton.addClass("span2");
                divButton.append(this.buttons[i].content());  
                div.append(divButton);
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
        if (this.toolTipText){
            this.a.attr("rel","tooltip");
            this.a.attr("data-placement",this.tooltipPlacement);
            this.a.attr("data-toggle","tooltip");
            this.a.attr("data-original-title",this.toolTipText);           
        }
        if (this.iconStyle){
            var icon = $(document.createElement("i"));
            icon.addClass(this.iconColor + " " + this.iconStyle);
            this.a.append(icon);            
        }
        if (this.active){
            this.a.attr("onclick","$(this).addClass('disabled');"+this.click);
            this.a.tooltip();
        }else{
            this.a.addClass("disabled");
        }        
        
        this.a.text(this.text);
        return this.a;
    }   
}