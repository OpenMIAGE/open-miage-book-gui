var OpenM_URLController = {
    'communitySelector': '/community/',
    'community': function(community){
        return "#"+this.communitySelector+community.id+"/"+community.name.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/ /g,"-");
    },
    'clickToCommunity': function(community){
        return "window.location.href='"+this.community(community)+"';return false";
    },
    'getCommunityId': function(){
        var hash = window.location.hash;
        if(this.isCommunityHash()){
            var community = hash.slice(this.communitySelector.length + 1);
            if(community.indexOf("/")!=-1)
                return community.slice(0, community.indexOf("/"));
            else
                return undefined;
        }
        else return undefined;
    },
    'isCommunityHash': function(){
        return (window.location.hash.slice(1, this.communitySelector.length + 1)==this.communitySelector);
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
    'reload': function(){
        this.load();
    },
    'load': function(){
        if(this.isCommunityHash())
            OpenM_Book_CommunityPagesController.communityPage(this.getCommunityId()).display()
        
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