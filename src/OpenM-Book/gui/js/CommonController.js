var OpenM_URLController = {
    'communitySelector': '/community/',
    'community': function(community){
        return "#"+this.communitySelector+community.id+"/"+community.name.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/ /g,"-");
    },
    'clickToCommunity': function(community){
        return "window.location.href='"+this.community(community)+"';return false";
    },
    'getCommunityId': function(){
        return ;
    },
    'user': function(userId){
        return "#/user/"+userId;
    },
    'getUserId': function(){
        return ;
    },
    'onhashchange': function(){
        this.load(); 
    },
    'load': function(){
        var hash = window.location.hash;
        if(hash.slice(1, this.communitySelector.length + 1)==this.communitySelector){
            var community = hash.slice(this.communitySelector.length + 1);
            if(community.indexOf("/")!=-1)
                OpenM_Book_CommunityPagesController.communityPage(community.slice(0, community.indexOf("/"))).display()
            else
                OpenM_Book_CommunityPagesController.communityPage().display();
        } 
    },
    'storedHash': window.location.hash
}

if ("onhashchange" in window) {
    window.onhashchange = function () {
        OpenM_URLController.onhashchange();
    }
}
else {
    window.setInterval(function () {
        if (window.location.hash != OpenM_URLController.storedHash) {
            OpenM_URLController.storedHash = window.location.hash;
            OpenM_URLController.onhashchange();
        }
    }, 100);
}