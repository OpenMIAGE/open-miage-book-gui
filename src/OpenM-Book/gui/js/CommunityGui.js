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


function OpenM_Book_CommunityPageGui(div_id, div_Parent){
    this.treeGui = null;
    this.actionsGui = null;
    this.childsGui = null;
    this.usersGui = null;
    this.usersNotValidGui = null;
    this.div_id = div_id;
    this.div_parent = div_Parent; 
    this.pageHTML = undefined;
    
    this.display = function(enabled){
        if(enabled===true || enabled === undefined){
            //on affiche
            
            //on vide l'affichage'
            $("#"+this.div_parent).empty();
          //  if (this.pageHTML){
                
                //$("#"+this.div_parent).append()
                
           // }else{
                
                //On génére la page html
                var cadre = "<div id='"+this.div_id +"'></div>";            
                $("#"+this.div_parent).append(cadre); 
                //le tree
                var rowTree = "<div id='"+this.treeGui.cadre_id+"' class='row-fluid'></div>";
                $("#"+this.div_id).append(rowTree);
                $("#"+this.treeGui.cadre_id).append(this.treeGui.htmlGenerated);
                
                //Les action
                 var rowAction = "<div id='"+this.actionsGui.cadre_id+"' class='row-fluid'></div>";
                $("#"+this.div_id).append(rowAction);
                $("#"+this.actionsGui.cadre_id).append(this.actionsGui.htmlGenerated); 
                
                //les subCommunities
                var rowChilds = "<div id='"+this.childsGui.cadre_id+"' class='row-fluid'></div>";
                $("#"+this.div_id).append(rowChilds);
                $("#"+this.childsGui.cadre_id).append(this.childsGui.htmlGenerated);
                
               
                //on active les toolTip
                $("[rel='tooltip']").tooltip();
                
                this.pageHTML = $("#"+this.div_id).html();
           // }    
        }else{
            //on chache
            $("#"+this.div_id).remove();
        } 
    }
    
    this.update = function(){
        this.pageHTML = undefined;
    }
}

function OpenM_Book_CommunityTreeGui(community){    
    this.community = community;
    this.htmlGenerated = "";
    this.cadre_id = this.community.id + "-tree-cadre";
    this.container_id = this.community.id + "tree-containers";
      
      
    //génére l'html pour la navigation
    this.html = function(){
        if(!this.community){
            return false;
        }
        var html = "<div class='span10 well'><span>Communauté en cours :</span><br><br>";
            html += "<ul id='"+this.container_id+"' class='breadcrumb'>";
         if (this.community.loaded){
             var ancestors = this.community.getAncestor();
             if (ancestors.length != 0){
                 for (var i in ancestors){
                     html +=  "<li><a href='#' >"+ ancestors[i].name+"</a> <span class='divider'>/</span></li>";  
                 }
             }                    
            html += "<li class='active'>"+ this.community.name +"</li>"                             
            html += "</ul>";
        }else{
            html += "<img src='"+ OpenM_Book_CommunityPagesGui.ressource_dir +  OpenM_Book_CommunityPagesGui.ressource_loader +"' >"
        }
        html +="</div>";
        this.htmlGenerated = html;
        return html;
    }   
}

function OpenM_Book_CommunityChildGui(community){ 
    this.community=community;
    this.htmlGenerated = "";
    this.cadre_id = this.community.id + "-Childs-cadre";
    this.container_id = this.community.id + "-Childs-Container";
    this.AllSubCommunitiesGui = new Array();
    
    
    this.html = function(){
        if(!this.community){
            throw "there is no community on OpenM_Book_Gui_SubCommunity"
        }
        var html = "";
        if (this.AllSubCommunitiesGui.length != 0){
            html = "<div class='span10'><p>Les sous-communautées :</p><div id='"+this.container_id+"' class='row-fluid'>";
            for (var i in this.AllSubCommunitiesGui){
                html += this.AllSubCommunitiesGui[i].htmlGenerated;
            }
            html += "</div></div>";
        }else{
            //pas d'enfant pour la commu 
        }     
        this.htmlGenerated = html;
        return html;
    } 
}

function OpenM_Book_SubCommunityGui(community){
    this.community = community;
    this.id = community.id + "-subCommunity"
    this.htmlGenerated = "";    
    
    this.html = function(){
        //TODO : changer l'evenement OnClick ....'
        var html = "<div id='"+this.id+"' class='community span3' onclick='select_community("+ this.community.id +");' >"+ this.community.name +"</div>";  
        this.htmlGenerated = html;
        return html;
    };
}

function OpenM_Book_CommunityActionsGui(community) {
    this.community=community;
    this.htmlGenerated = "";
    this.cadre_id = this.community.id + "-Action-cadre";
    this.container_id = this.community.id + "-Action-Container";
    this.AllButtonsGui = new Array();
    
    
    
    this.html = function(){
        if(!this.community){
            throw "there is no community on OpenM_Book_Gui_Action"
            }
        var html = "";
        if ( this.AllButtonsGui.length != 0){
             html = "<div class='span10 well'><p>Les actions possible :</p><div id='"+this.container_id+"' class='row-fluid'>";
             for (var i in this.AllButtonsGui){
                 html += "<div class='span2'>" + this.AllButtonsGui[i].htmlGenerated + "</div>";
             }
             html += "</div></div>";
        }
            
         
        /*var html = "<div class='span10 well'><p>Action Possible :</p><div id='action_container' class='row-fluid'>";
        var texte = "";
        var texteToolTip = "";
        if (this.community.usrCanAddSubCommu){
            texte = "Ajouter une sous communauté";
            texteToolTip = "Ajouter une sous communauté à "+this.community.name;
            html += "<div class='span2'><a href='#' class='btn btn-inverse' rel='tooltip' data-placement='top' data-toggle='tooltip' data-original-title='"+texteToolTip+"'><i class='icon-white icon-plus'></i>&nbsp;"+texte+"</a></div>";    
        }
        if (this.community.usrCanRegisterInto){
            texte = "S'enregistrer";
            texteToolTip = "S&apos;enregistrer dans cette communauté";
            html += "<div class='span2'><a href='#' class='btn btn-inverse' rel='tooltip' data-placement='top' data-toggle='tooltip' data-original-title='"+texteToolTip+"'><i class='icon-white icon-ok'></i>&nbsp;"+texte+"</a></div>";          
        }
          
        html += "</div></div>";*/
        this.htmlGenerated = html;
        return html;
    }
    
}

function OpenM_Book_CommunityButtonGui(id, text){
    this.id = id;
    this.text = text;
    this.toolTipText = '';
    
    this.style = 'btn-inverse';
    this.tooltipPlacement = 'top';
    this.iconColor = '';
    this.iconStyle = '';
    
    
    this.htmlGenerated = '';
        
    this.html = function() {
        var html = "<a id='"+ this.id +"' href='#' class='btn "+this.style+"'";
        if (this.toolTipText)
            html +=  "rel='tooltip' data-placement='"+this.tooltipPlacement+"' data-toggle='tooltip' data-original-title='"+this.toolTipText+"'>";
         else     
            html += " >";
         if (this.iconStyle)    
            html += "<i class='"+ this.iconColor +" "+ this.iconStyle +"'></i>&nbsp;";

        html += this.text+"</a>";  
        this.htmlGenerated = html
        return html;
    }
    
    /*this.attachToolTip = function(){
        //attache la toolTip
        
    }*/
   
}


function OpenM_Book_CommunityUserGui(id){
    this.id = id;
}

function OpenM_Book_CommunityUserNotValidated(id){
    this.id = id;

}

function OpenM_Book_CommunityGui(id){
    this.id = id;    
}