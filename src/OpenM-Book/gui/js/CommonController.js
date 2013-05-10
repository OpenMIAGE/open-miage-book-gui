var OpenM_URLController = {
    'homeSelector': '/home',
    'home': function(){
        return "#"+this.homeSelector;
    },
    'clickToHome': function(){
       window.location.href=this.home();
    },
    'communitySelector': '/community',
    'community': function(community){
        var url = "#"+this.communitySelector;
        if(community)
            return url+"/"+community.id+"/"+community.name.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/ /g,"-");
        else
            return url;
    },
    'clickToCommunity': function(community){
        window.location.href=this.community(community);
    },
    'getCommunityId': function(){
        var hash = window.location.hash;
        if(this.isCommunityHash()){
            var community = hash.slice(this.communitySelector.length + 2);
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
    'clickToUser': function(user){
        window.location.href=this.user(user);
    },
    'userSelector': '/user',
    'user': function(user){
        var url = "#"+this.userSelector;
        if(user)
            return url+"/"+user.id+"/"+user.name.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/ /g,"-");
        else
            return url;
    },
    'getUserId': function(){
        var hash = window.location.hash;
        if(this.isUserHash()){
            var user = hash.slice(this.userSelector.length + 1);
            if(user.indexOf("/")!=-1)
                return user.slice(0, user.indexOf("/"));
            else
                return undefined;
        }
        else return undefined;
    },
    'isUserHash': function(){
        return (window.location.hash.slice(1, this.userSelector.length + 1)==this.userSelector);
    },
    'onhashchange': function(){
        this.load();
    },
    'reload': function(){
        this.load();
    },
    'load': function(){
        if(this.isCommunityHash()){
            OpenM_MenuGUI.selectCommunity();
            OpenM_Book_CommunityPagesController.communityPage(this.getCommunityId()).display();
        }
        else{
            OpenM_MenuGUI.selectCommunity();
            OpenM_Book_CommunityPagesController.communityPage().display();
        }            
        if(this.loader!='')
            $("#"+this.loader).remove();
    },
    'storedHash': window.location.hash,
    'loader' : '',
    'jsLoadedNumber': 0,
    'jsLoadedTarget': 0,
    'jsLoad': function (jsPath){
        this.jsLoadedTarget++;
        $.post(jsPath, function(){
            OpenM_URLController.jsLoadedNumber++;
            if(OpenM_URLController.jsLoadedTarget==OpenM_URLController.jsLoadedNumber)
                OpenM_URLController.jsLoadFinished();
        }, 'script');
    },
    'jsLoadFinished': function (){
        this.load();
    }
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