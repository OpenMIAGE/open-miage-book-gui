function OpenM_Book_CommunityPagesGui(div_id){
    this.div_id = div_id;
    
    this.showPageLoading = function(){ 
        $("#"+this.div_id).empty().append("<img src='"+ OpenM_Book_CommunityPagesControler.ressource_loader +"' >");           
    }
    
    
}


function OpenM_Book_CommunityPageGui(div_id, div_Parent){
    this.treeGui = null;
    this.actionsGui = null;
    this.communityChildsGui = null;
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
                var rowTree = "<div id='"+this.treeGui.cadre_id+"' class='row-fluid'></div>";
                $("#"+this.div_id).append(rowTree);
                $("#"+this.treeGui.cadre_id).append(this.treeGui.htmlGenerated);
                
                
                $this.pageHTML = $("#"+this.div_id).html();
           // }    
        }else{
            //on chache
            $("#"+this.div_id).remove();
        } 
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
           /* for (var i in ancestors){
            //Todo : changer l'evenementiel, sur le Onclick' onclick='select_community_navigation("+ this.community.ancestor[i].id +");'
             html +=  "<li><a href='#' >"+ this.community.ancestor[i].name+"</a> <span class='divider'>/</span></li>";                
            }*/                     
            html += "<li class='active'>"+ this.community.name +"</li>"                             
            html += "</ul>";
        }else{
            html += "<img src='"+ OpenM_Book_CommunityPagesControler.ressource_loader +"' >"
        }
        html +="</div>";
        this.htmlGenerated = html;
        return html;
    }   
}

function OpenM_Book_CommunityChildGui(id){ 
    this.id = id;
 
    this.html = function(){
        if(!this.community){
            throw "there is no community on OpenM_Book_Gui_SubCommunity"
            }
        if (community.nbChild !=0){
            var html = "<div class='span10'><p>Les sous-communautées :</p><div id='community_container' class='row-fluid'>";
            if (this.community.nbChild != 0){
                for (var i in this.community.child){
                    //ToDo : changer evenementiel
                    html += "<div id='community-"+ this.community.child[i].id +"' class='community span3' onclick='select_community("+ this.community.child[i].id +");' >"+ this.community.child[i].name +"</div>";  
                }
            }
            html += "</div></div>";           
        }
        else{
            html = false;
        }
        this.htmlGenerated = html;
        return html;
    }
    
}

function OpenM_Book_CommunityActionsGui(id) {
    this.id = id;  
    
    this.html = function(){
        if(!this.community){
            throw "there is no community on OpenM_Book_Gui_Action"
            }
        var html = "<div class='span10 well'><p>Action Possible :</p><div id='action_container' class='row-fluid'>";
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
          
        html += "</div></div>";
        this.htmlGenerated = html;
        return html;
    }
    
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