OpenM_BookGUI.menu = {};

OpenM_BookGUI.menu.Left = {
    menuId: '',
    userEntry: $(document.createElement('li')),
    userEntryMobile: $(document.createElement('li')),
    communityEntry: $(document.createElement('li')),
    communityEntryMobile: $(document.createElement('li')),
    init: function() {
        var menu = $("#" + this.menuId);
        menu.css("position", "fixed");
        menu.css("top", 40).css("bottom", 0);
        menu.addClass("visible-desktop");
        menu.css("background-color","white");
        var div3 = $(document.createElement('div')).addClass("tabbable tabs-left");
        menu.append(div3);
        var ul2 = $(document.createElement('ul')).addClass("nav nav-tabs nav-tabs-menunavigation");
        div3.append(ul2);
        var li = $(document.createElement('li')).addClass("cadre-nom");
        ul2.append(li);
        var firstName = $(document.createElement("h3"));
        firstName.css("cursor", "pointer")
                .append(OpenM_BookDAO.user.DAO.me.firstName)
                .click(function() {
            OpenM_BookController.commons.URL.clickToUser();
        });
        var LastName = $(document.createElement("h3"));
        LastName.css("cursor", "pointer")
                .append(OpenM_BookDAO.user.DAO.me.lastName)
                .click(function() {
            OpenM_BookController.commons.URL.clickToUser();
        });
        li.append(firstName)
                .append(LastName);
        ul2.append("<hr>");
        ul2.append(this.userEntry.append('<a href="' + OpenM_BookController.commons.URL.user() + '">Profil</a>'));
        ul2.append(this.communityEntry.append('<a href="' + OpenM_BookController.commons.URL.community() + '">Communauté</a>'));
    },
    selectUser: function() {
        this.userEntry.addClass("active");
        this.userEntryMobile.addClass("active");
        this.communityEntry.removeClass("active");
        this.communityEntryMobile.removeClass("active");
    },
    selectCommunity: function() {
        this.communityEntry.addClass("active");
        this.communityEntryMobile.addClass("active");
        this.userEntry.removeClass("active");
        this.userEntryMobile.removeClass("active");
    }
};