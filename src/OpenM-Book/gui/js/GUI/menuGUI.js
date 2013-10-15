if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.menu === undefined)
    OpenM_BookGUI.menu = {};

OpenM_BookGUI.menu.Left = function(firstName, lastName, buttonMobile) {
    this.isMobile = (buttonMobile === undefined) ? false : true;
    this.buttonMobile = buttonMobile;
    this.menuMobileOpened = false;
    this.menu = OpenM_BookGUI.gen.div();
    $("body").append(this.menu);
    this.firstName = firstName;
    this.lastName = lastName;
    this.userEntry = OpenM_BookGUI.gen.li();
    this.communityEntry = OpenM_BookGUI.gen.li();
    this.searchEntry = OpenM_BookGUI.gen.li();
    this.clickUser = undefined;
    this.clickCommunity = undefined;
    this.clickLogout = undefined;
    this.clickSearch = undefined;
    this.logout = undefined;
};

OpenM_BookGUI.menu.Left.prototype.content = function() {
    if (!this.isMobile)
        this.menu.addClass("visible-desktop book-commons-menu-left");
    else
        this.menu.addClass("hidden-desktop book-commons-menu-left-mobile");

    var div3 = OpenM_BookGUI.gen.div().addClass("tabbable tabs-left");
    this.menu.append(div3);
    var ul2 = OpenM_BookGUI.gen.ul().addClass("nav nav-tabs nav-tabs-menunavigation");
    div3.append(ul2);
    var li = OpenM_BookGUI.gen.li().addClass("book-commons-menu-left-cadre-nom");
    ul2.append(li);
    li.append(OpenM_BookGUI.gen.h3()
            .addClass("book-commons-menu-left-first-name")
            .append(this.firstName)
            .click(this.clickUser))
            .append(OpenM_BookGUI.gen.h3()
            .addClass("book-commons-menu-left-last-name")
            .append(this.lastName)
            .click(this.clickUser));
    ul2.append("<hr>");
    ul2.append(this.userEntry.append(OpenM_BookGUI.gen.a()
            .append($("connected > menu > left > profile > label", OpenM_BookGUI.commons.cst).text())
            .click(this.clickUser))
            .addClass($("connected > menu > left > profile > class", OpenM_BookGUI.commons.cst).text()));
    ul2.append(this.communityEntry.append(OpenM_BookGUI.gen.a()
            .append($("connected > menu > left > community > label", OpenM_BookGUI.commons.cst).text())
            .click(this.clickCommunity))
            .addClass($("connected > menu > left > community > class", OpenM_BookGUI.commons.cst).text()));
    ul2.append(this.searchEntry.append(OpenM_BookGUI.gen.a()
            .append($("connected > menu > left > search > label", OpenM_BookGUI.commons.cst).text())
            .click(this.clickSearch))
            .addClass($("connected > menu > left > search > class", OpenM_BookGUI.commons.cst).text()));
    this.logout = OpenM_BookGUI.gen.a()
            .append("<i class='icon-off'></i> Logout")
            .addClass("btn book-commons-menu-left-logout")
            .click(this.clickLogout);
    if (this.isMobile)
        this.logout.css("left", -200);
    div3.append(this.logout);
    var controller = this;
    if (this.isMobile) {
        this.buttonMobile.click(function() {
            if (controller.menuMobileOpened) {
                controller.menu.hide().animate({left: "-200px"}, 200);
                controller.logout.hide().animate({left: "-185px"}, 200);
                controller.menuMobileOpened = false;
            }
            else {
                controller.menu.show().animate({left: "0px"}, 200);
                controller.logout.show().animate({left: "15px"}, 200);
                controller.menuMobileOpened = true;
            }
        });
    }
};

OpenM_BookGUI.menu.Left.prototype.selectUser = function() {
    this.userEntry.addClass("active");
    this.communityEntry.removeClass("active");
    this.searchEntry.removeClass("active");
};

OpenM_BookGUI.menu.Left.prototype.selectCommunity = function() {
    this.communityEntry.addClass("active");
    this.userEntry.removeClass("active");
    this.searchEntry.removeClass("active");
};

OpenM_BookGUI.menu.Left.prototype.selectSearch = function() {
    this.searchEntry.addClass("active");
    this.communityEntry.removeClass("active");
    this.userEntry.removeClass("active");
};