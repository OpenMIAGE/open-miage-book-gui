
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
            
            //            //Les actions
            //            var actions = $(document.createElement('div'));
            //            cadre.append(actions);
            //            actions.append(this.actions.html()); 
            
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

//function OpenM_Book_CommunityActionsGui(community) {
//    this.community=community;
//    this.htmlGenerated = "";
//    this.cadre_id = this.community.id + "-Action-cadre";
//    this.container_id = this.community.id + "-Action-Container";
//    this.AllButtonsGui = new Array();
//    
//    
//    
//    this.html = function(){
//        if(!this.community){
//            throw "there is no community on OpenM_Book_Gui_Action"
//        }
//        var html = "";
//        if ( this.AllButtonsGui.length != 0){
//            html = "<div class='span10 well'><p>Les actions possible :</p><div id='"+this.container_id+"' class='row-fluid'>";
//            for (var i in this.AllButtonsGui){
//                html += "<div class='span2'>" + this.AllButtonsGui[i].htmlGenerated + "</div>";
//            }
//            html += "</div></div>";
//        }
//            
//         
//        /*var html = "<div class='span10 well'><p>Action Possible :</p><div id='action_container' class='row-fluid'>";
//        var texte = "";
//        var texteToolTip = "";
//        if (this.community.usrCanAddSubCommu){
//            texte = "Ajouter une sous communauté";
//            texteToolTip = "Ajouter une sous communauté à "+this.community.name;
//            html += "<div class='span2'><a href='#' class='btn btn-inverse' rel='tooltip' data-placement='top' data-toggle='tooltip' data-original-title='"+texteToolTip+"'><i class='icon-white icon-plus'></i>&nbsp;"+texte+"</a></div>";    
//        }
//        if (this.community.usrCanRegisterInto){
//            texte = "S'enregistrer";
//            texteToolTip = "S&apos;enregistrer dans cette communauté";
//            html += "<div class='span2'><a href='#' class='btn btn-inverse' rel='tooltip' data-placement='top' data-toggle='tooltip' data-original-title='"+texteToolTip+"'><i class='icon-white icon-ok'></i>&nbsp;"+texte+"</a></div>";          
//        }
//          
//        html += "</div></div>";*/
//        this.htmlGenerated = html;
//        return html;
//    }
//    
//}
//
//function OpenM_Book_CommunityButtonGui(id, text){
//    this.id = id;
//    this.text = text;
//    this.toolTipText = '';
//    
//    this.style = 'btn-inverse';
//    this.tooltipPlacement = 'top';
//    this.iconColor = '';
//    this.iconStyle = '';
//    
//    
//    this.htmlGenerated = '';
//        
//    this.html = function() {
//        var html = "<a id='"+ this.id +"' href='#' class='btn "+this.style+"'";
//        if (this.toolTipText)
//            html +=  "rel='tooltip' data-placement='"+this.tooltipPlacement+"' data-toggle='tooltip' data-original-title='"+this.toolTipText+"'>";
//        else     
//            html += " >";
//        if (this.iconStyle)    
//            html += "<i class='"+ this.iconColor +" "+ this.iconStyle +"'></i>&nbsp;";
//
//        html += this.text+"</a>";  
//        this.htmlGenerated = html
//        return html;
//    }
//    
///*this.attachToolTip = function(){
//        //attache la toolTip
//        
//    }*/
//   
//}
//
//

//
//function OpenM_Book_CommunityUserNotValidated(id){
//    this.id = id;
//
//}
//
//function OpenM_Book_CommunityGui(id){
//    this.id = id;    
//}