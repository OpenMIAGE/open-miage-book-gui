function OpenM_Book_Gui_Action(community) {
    this.community = community;

}
function OpenM_Book_Gui_Tree(community){
    this.community = community;

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
        //this.trees
        //init new object or load existing obj
    },
    'html': function(){
        //call html methode on evry containsers
        
    },
    'trees':  new Array(),
    'actions': new Array(),
    'communitiesChilds' :new Array(),
    'communitiesUsers' : new Array(),
    'communitiesUsersNotValidated':new Array()
};