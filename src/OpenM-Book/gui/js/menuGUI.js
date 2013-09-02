OpenM_BookGUI.menu = {};

OpenM_BookGUI.menu.Left = {
    menuMobileId: '',
    menuId: '',
    userEntry: $(document.createElement('li')),
    userEntryMobile: $(document.createElement('li')),
    communityEntry: $(document.createElement('li')),
    communityEntryMobile: $(document.createElement('li')),
    init: function() {
        if (this.menuMobileId !== '') {
            var menuMobile = $("#" + this.menuMobileId);
            menuMobile.addClass("navbar navbar menunavigation-phone hidden-desktop");
            var div = $(document.createElement('div')).addClass("navbar-inner");
            menuMobile.append(div);
            var a = $(document.createElement('a')).addClass("btn btn-navbar");
            a.attr('data-toggle', "collapse");
            a.attr('data-target', "#subMenuMenuMobile");
            a.append('<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>');
            div.append(a);
            div.append('<a href="' + OpenM_BookController.commons.URL.user() + '">'
                    + OpenM_BookDAO.user.DAO.me.firstName
                    + '<br>'
                    + OpenM_BookDAO.user.DAO.me.lastName + '</a>');
            var div2 = $(document.createElement('div')).addClass("nav-collapse collapse");
            div2.attr("id", "subMenuMenuMobile");
            div.append(div2);
            var ul = $(document.createElement('ul')).addClass("nav");
            div2.append(ul);
            ul.append($(document.createElement('li')).addClass("divider-vertical"));
            ul.append(this.userEntryMobile.append('<a href="' + OpenM_BookController.commons.URL.user() + '">Mon Profil</a>'));
            ul.append(this.communityEntryMobile.append('<a href="' + OpenM_BookController.commons.URL.community() + '">Communauté</a>'));
        }
        if (this.menuId !== '') {
            var menu = $("#" + this.menuId);
            menu.addClass("visible-desktop");
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
        }
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