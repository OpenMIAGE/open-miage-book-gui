
var OpenM_Book_CommunityPagesGui = {
    'div_id': '', 
    'ressource_dir': '',
    'ressource_loader': "OpenM-Book/gui/img/ajax-loader.gif",
    'showPageLoading': function(){ 
        $("#"+this.div_id).empty().append("<img src='"+ this.ressource_dir + this.ressource_loader +"' >");           
    },
    'showJSON': function(data){
        if ($("#cadreRetourJSON").size() == 0){
            var row = '<div id="cadreRetourJSON" class="row-fluid"><div class="span12">Le retour JSON : <br><pre><code id="retourJSON">  </code></pre></div></div>';
            $("#"+this.div_id).before(row);                        
        }
        $("#retourJSON").append(JSON.stringify(data)).append("<br>");                        
    },
    'removeJSON':function(){
        $("#cadreRetourJSON").remove();
    },
    'showError': function(message){
        
        $("#div_alert").append("<div class='alert alert-error alert-block span4 offset4' style='display: none;'><button type='button' class='close'>x</button><h4>Erreur :</h4>" +message+ "</div>");      
        $(".close").on("click", function(event){  
            $('.alert').hide('slow').remove();     
        });
        $(".alert").show("slow");         
    }   
}


function OpenM_Book_CommunityPageGui(divParentId){
    this.tree = null;
    this.actions = null;
    this.childs = null;
    this.users = null;
    this.usersNotValid = null;
    this.divParentId = divParentId;
    
    this.display = function(enabled){
        if(enabled===true || enabled === undefined){
            var cadre = $(document.createElement('div'));           
            
            //le tree
            var tree = $(document.createElement('div')).addClass("row-fluid");
            cadre.append(tree);
            tree.append(this.tree.html());
            
            //            //Les actions
            //            var actions = $(document.createElement('div'));
            //            cadre.append(actions);
            //            actions.append(this.actions.html()); 
            //                
            //            //les childs
            //            var childs = $(document.createElement('div'));
            //            cadre.append(childs);
            //            childs.append(this.childs.html());
            
            //on active les toolTip
            $("[rel='tooltip']").tooltip();
            
            $("#"+this.divParentId).html(cadre.html());
        }else{
            //on chache
            $("#"+this.divParentId).remove();
        }
    }
}

function OpenM_Book_CommunityTreeGui(communityId){    
    this.id = communityId;
    this.communities = new Array();
    
    this.html = function(){
        var cadre = $(document.createElement('div'));
        var div = $(document.createElement('div'));
        div.addClass("span10 well");
        div.append("<span>Navigation</span>");
        cadre.append(div);
        var tree = $(document.createElement('ul')).addClass("breadcrumb");
        div.append(tree);
        var first = true;
        $.each(this.communities, function(key, value) {
            if(first==true)
                first = false;
            else
                tree.append(" <span class='divider'>/</span> ")
            
            tree.append(value.html());
        });
        return cadre.html();
    }
}

function OpenM_Book_CommunityInTreeGui(communityId, name){    
    this.id = communityId;
    this.name = name;
    
    this.html = function(){
        var div = $(document.createElement('div'));
        var li = $(document.createElement('li'));
        li.addClass("active");
        li.append("<a href='#'>"+ this.name+"</a>");
        div.append(li);
        return div.html();
    }
}

//
//function OpenM_Book_CommunityChildGui(community){ 
//    this.community=community;
//    this.htmlGenerated = "";
//    this.cadre_id = this.community.id + "-Childs-cadre";
//    this.container_id = this.community.id + "-Childs-Container";
//    this.AllSubCommunitiesGui = new Array();
//    
//    
//    this.html = function(){
//        if(!this.community){
//            throw "there is no community on OpenM_Book_Gui_SubCommunity"
//        }
//        var html = "";
//        if (this.AllSubCommunitiesGui.length != 0){
//            html = "<div class='span10'><p>Les sous-communautées :</p><div id='"+this.container_id+"' class='row-fluid'>";
//            for (var i in this.AllSubCommunitiesGui){
//                html += this.AllSubCommunitiesGui[i].htmlGenerated;
//            }
//            html += "</div></div>";
//        }else{
//        //pas d'enfant pour la commu 
//        }     
//        this.htmlGenerated = html;
//        return html;
//    } 
//}
//
//function OpenM_Book_SubCommunityGui(community){
//    this.community = community;
//    this.id = community.id + "-subCommunity"
//    this.htmlGenerated = "";    
//    
//    this.html = function(){
//        //TODO : changer l'evenement OnClick ....'
//        var html = "<div id='"+this.id+"' class='community span3' onclick='select_community("+ this.community.id +");' >"+ this.community.name +"</div>";  
//        this.htmlGenerated = html;
//        return html;
//    };
//}
//
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
//function OpenM_Book_CommunityUserGui(id){
//    this.id = id;
//}
//
//function OpenM_Book_CommunityUserNotValidated(id){
//    this.id = id;
//
//}
//
//function OpenM_Book_CommunityGui(id){
//    this.id = id;    
//}