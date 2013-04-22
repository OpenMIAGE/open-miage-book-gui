//Contiens les obj qui génére le rendu html

function OpenM_Book_Page_Community_Gui(divParent){
    this.divParent = divParent;
    
    this.divAction = "divAction";
    this.divSubCommunity = "divSubCommunity";
    this.community = null;
    this.tree = null;
    
    
    
    
    this.init = function(community){
        this.community = community;
        this.tree = new OpenM_Book_Gui_Tree(this.community);
    }
    
    
    
    
}




function OpenM_Book_Gui_Tree(community){    
    this.community = community;
    this.id = this.community.id;
    this.htmlGenerated = '';
    this.ancestor = new Array();
    
    this.init = function(){        
        this.html();
    }
    
    
    //génére l'html pour la navigation
    this.html = function(){
        if(!this.community){ return false;}
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

function OpenM_Book_Gui_SubCommunity(community){ 
    this.community = community;
    this.id = this.community.id;
    this.htmlGenerated = '';
    
    this.init = function(){
       this.html();
    }
    
    this.html = function(){
        if(!this.community){throw "there is no community on OpenM_Book_Gui_SubCommunity"}
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

function OpenM_Book_Gui_Action(community) {
    this.community = community;
    this.id = this.community.id;
    this.htmlGenerated = '';
    
    
    this.init = function(){
       this.html();
    }
    
    this.html = function(){
         if(!this.community){throw "there is no community on OpenM_Book_Gui_Action"}
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




function OpenM_Book_Gui_Button_Register(){
    
    this.display = function(){
        
    }
    
    this.click=null;
  
    
}




function OpenM_Book_Gui_Community_Childs(community){
    this.community = community;

}
function OpenM_Book_Gui_Community_Users(community){
    this.community = community;

}

function OpenM_Book_Gui_Community_Not_Validated(community){
    this.community = community;

}

function OpenM_Book_Gui_Community_Display(community){
    this.community = community;    
}




var OpenM_Book_Gui_Community_Page = {
    
    
    'setCommunity': function(community){
        //init new object or load existing obj
        this.AllCommunities[community.id] = community;
        
        var tree = new OpenM_Book_Gui_Tree(community);
        this.trees[tree.id] = tree;         
    },
    //quel communauté à afficher 
    'html': function(community){
        
        //la navigation
        var html = this.trees[community.id].html();
        if (html){
            $("#"+this.divId_navigation_community).show();
            $("#"+this.divId_navigation_community_container).empty();
            $("#"+this.divId_navigation_community_container).append(html);
        }

    },
    'AllCommunities': new Array(),
    'trees':  new Array(),
    'actions': new Array(),
    'communitiesChilds' :new Array(),
    'communitiesUsers' : new Array(),
    'communitiesUsersNotValidated':new Array(),
    
    'divId_navigation_community': 'navigation_community',
    'divId_navigation_community_container': 'navigation_community_container'
};