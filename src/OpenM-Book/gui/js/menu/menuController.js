if (OpenM_BookController === undefined)
    var OpenM_BookController = {};

if (OpenM_BookController.menu === undefined)
    OpenM_BookController.menu = {};

OpenM_BookController.menu.Left = function(buttonMobile) {
    this.left = new OpenM_BookGUI.menu.Left(OpenM_BookDAO.user.DAO.me.firstName, OpenM_BookDAO.user.DAO.me.lastName);
    this.leftMobile = new OpenM_BookGUI.menu.Left(OpenM_BookDAO.user.DAO.me.firstName, OpenM_BookDAO.user.DAO.me.lastName, buttonMobile);
    this.left.clickUser = function() {
        OpenM_BookController.commons.URL.clickToUser();
    };
    this.left.clickCommunity = function() {
        OpenM_BookController.commons.URL.clickToCommunity();
    };
    this.left.clickLogout = function() {
        OpenM_BookController.commons.URL.clickToLogout();
    };
    this.leftMobile.clickUser = function() {
        OpenM_BookController.commons.URL.clickToUser();
    };
    this.leftMobile.clickCommunity = function() {
        OpenM_BookController.commons.URL.clickToCommunity();
    };
    this.leftMobile.clickLogout = function() {
        OpenM_BookController.commons.URL.clickToLogout();
    };
    this.left.content();
    this.leftMobile.content();
};

OpenM_BookController.menu.Left.prototype.selectUser = function() {
    this.left.selectUser();
    this.leftMobile.selectUser();
};

OpenM_BookController.menu.Left.prototype.selectCommunity = function() {
    this.left.selectCommunity();
    this.leftMobile.selectCommunity();
};