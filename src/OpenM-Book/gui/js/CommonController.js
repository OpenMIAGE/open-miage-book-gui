var OpenM_BookController = {};

OpenM_BookController.commons = {};

OpenM_BookController.commons.URL = {
    homeSelector: '/home',
    home: function() {
        return "#" + this.homeSelector;
    },
    clickToHome: function() {
        window.location.href = this.home();
    },
    communitySelector: '/community',
    community: function(community) {
        var url = "#" + this.communitySelector;
        if (community)
            return url + "/" + community.id + "/" + community.name.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/ /g, "-");
        else
            return url;
    },
    clickToCommunity: function(community) {
        window.location.href = this.community(community);
    },
    getCommunityId: function() {
        var hash = window.location.hash;
        if (this.isCommunityHash()) {
            var community = hash.slice(this.communitySelector.length + 2);
            if (community.indexOf("/") !== -1)
                return community.slice(0, community.indexOf("/"));
            else
                return undefined;
        }
        else
            return undefined;
    },
    isCommunityHash: function() {
        return (window.location.hash.slice(1, this.communitySelector.length + 1) === this.communitySelector);
    },
    clickToUser: function(user) {
        if (user === undefined)
            user = OpenM_BookDAO.user.DAO.me;
        window.location.href = this.user(user);
    },
    userSelector: '/user',
    user: function(user) {
        var url = "#" + this.userSelector;
        if (user)
            return url + "/" + user.id + "/" + user.name.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/ /g, "-");
        else
            return url;
    },
    getUserId: function() {
        var hash = window.location.hash;
        if (this.isUserHash()) {
            var user = hash.slice(this.userSelector.length + 2);
            if (user.indexOf("/") !== -1)
                return user.slice(0, user.indexOf("/"));
            else
                return undefined;
        }
        else
            return undefined;
    },
    isUserHash: function() {
        return (window.location.hash.slice(1, this.userSelector.length + 1) === this.userSelector);
    },
    onhashchange: function() {
        this.load();
    },
    reload: function() {
        this.load();
    },
    load: function() {
        if (this.isCommunityHash()) {
            OpenM_BookGUI.menu.Left.selectCommunity();
            OpenM_BookController.community.Pages.communityPage(this.getCommunityId()).display();
        }
        else if (this.isUserHash()) {
            OpenM_BookGUI.menu.Left.selectUser();
            OpenM_BookController.user.Pages.userPage(this.getUserId()).display();

        } else {
            OpenM_BookGUI.menu.Left.selectCommunity();
            OpenM_BookController.community.Pages.communityPage().display();
        }
        if (this.loader !== '')
            $("#" + this.loader).remove();
    },
    storedHash: window.location.hash,
    loader: '',
    jsLoadedNumber: 0,
    jsLoadedTarget: 0,
    jsLoad: function(jsPath) {
        this.jsLoadedTarget++;
        $.post(jsPath, function() {
            OpenM_BookController.commons.URL.jsLoadedNumber++;
            if (OpenM_BookController.commons.URL.jsLoadedTarget === OpenM_BookController.commons.URL.jsLoadedNumber)
                OpenM_BookController.commons.URL.jsLoadFinished();
        }, 'script');
    },
    jsLoadFinished: function() {
        this.load();
    }
};

if ("onhashchange" in window) {
    window.onhashchange = function() {
        OpenM_BookController.commons.URL.onhashchange();
    };
}
else {
    window.setInterval(function() {
        if (window.location.hash !== OpenM_BookController.commons.URL.storedHash) {
            OpenM_BookController.commons.URL.storedHash = window.location.hash;
            OpenM_BookController.commons.URL.onhashchange();
        }
    }, 100);
}