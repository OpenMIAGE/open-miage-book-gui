
function OpenM_Book_CommunityPageGui(div_id){
    this.treeGui = null;
    this.actionsGui = null;
    this.communityChildsGui = null;
    this.usersGui = null;
    this.usersNotValidGui = null;
    this.div_parent = div_id;    
    this.display = function(enabled){
        if(enabled===true || enabled === undefined){
            //on affiche
             
        }else{
            //on chache
            
        }
        
        
    }
}

function OpenM_Book_CommunityTreeGui(community){    
    this.community = community;
    this.htmlGenerated = ""; 
      
      
    //génére l'html pour la navigation
    this.html = function(){
        if(!this.community){
            return false;
        }
        var html = "<div class='span10 well'><span>Communauté en cours :</span><br><br>";
        html += "<ul id='navigation_community_container' class='breadcrumb'>";

        if (this.community.lastAncestor){
            
        //for (var i in this.community.ancestor){
        //Todo : changer l'evenementiel, sur le Onclick'
        //   html +=  "<li><a href='#' onclick='select_community_navigation("+ this.community.ancestor[i].id +");'  >"+ this.community.ancestor[i].name+"</a> <span class='divider'>/</span></li>";                
        //}            
        }
        html += "<li class='active'>"+ this.community.name +"</li>"                     
        html += "</ul></div>"
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