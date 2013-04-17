function OpenM_Book_Gui_Action(community) {
    this.community = community;

}
function OpenM_Book_Gui_Tree(community){    
    this.community = community;
    this.id = this.community.id;
    this.treeCommunities = new Array();
    
    //génére l'html pour la navigation
    this.html = function(){
        if(!this.community){ return false;}
        var html = "";
        if (this.community.nbAncestor!= 0){
            for (var i in community.ancestor){
                html +=  "<li><a href='#' onclick='select_community_navigation("+ this.community.ancestor[i].id +");'  >"+ this.community.ancestor[i].name+"</a> <span class='divider'>/</span></li>";                
            }            
        }
        html += "<li class='active'>"+ this.community.name +"</li>"             
        
        return html;
    }
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