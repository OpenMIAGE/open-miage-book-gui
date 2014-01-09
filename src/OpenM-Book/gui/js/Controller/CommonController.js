if (OpenM_BookController === undefined)
    var OpenM_BookController = {};

if (OpenM_BookController.commons === undefined)
    OpenM_BookController.commons = {};

OpenM_BookController.commons.URL = {
    homeSelector: '/home',
    login: "",
    logout: "",
    menu: {left: {selectCommunity: function() {
            }, selectUser: function() {
            }, selectSearch: function() {
            }}},
    clickToLogout: function() {
        window.location.href = this.logout;
    },
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
    clickToSearch: function(search) {
        window.location.href = this.search(search);
    },
    searchSelector: '/search',
    search: function(search) {
        var url = "#" + this.searchSelector;
        if (search)
            return url + "/" + search.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/ /g, "+");
        else
            return url;
    },
    isSearchHash: function() {
        return (window.location.hash.slice(1, this.searchSelector.length + 1) === this.searchSelector);
    },
    getSearch: function() {
        var hash = window.location.hash;
        if (this.isSearchHash())
            return hash.slice(this.searchSelector.length + 2).replace(/\+/g, " ");
        else
            return undefined;
    },
    onhashchange: function() {
        this.load();
    },
    reload: function() {
        this.load();
    },
    load: function() {
        if (this.isCommunityHash()) {
            this.menu.left.selectCommunity();
            OpenM_BookController.community.Pages.communityPage(this.getCommunityId()).display();
        } else if (this.isUserHash()) {
            this.menu.left.selectUser();
            OpenM_BookController.user.Pages.userPage(this.getUserId()).display();
        } else if (this.isSearchHash()) {
            this.menu.left.selectSearch();
            OpenM_BookController.search.Pages.searchPage(this.getSearch()).display();
        } else {
            this.menu.left.selectCommunity();
            OpenM_BookController.community.Pages.communityPage().display();
        }
        if (this.loader !== '')
            $("#" + this.loader).remove();
        $('html body').animate({scrollTop: 0});
    },
    storedHash: window.location.hash,
    loader: '',
    jsLoaderPipe: new Array(),
    jsLoad: function(jsPath) {
        var jsLoadedTarget = this.jsLoaderPipe.length;
        this.jsLoaderPipe[jsLoadedTarget] = jsPath;
        var controller = this;
        $.get(jsPath, function() {
            controller.jsLoaderPipe[jsLoadedTarget] = true;
            setTimeout(function() {
                var finished = true;
                for (var i in controller.jsLoaderPipe) {
                    if (controller.jsLoaderPipe[i] !== true) {
                        finished = false;
                        break;
                    }
                }
                if (finished)
                    OpenM_BookController.commons.URL.jsLoadFinished();
            }, 10);
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