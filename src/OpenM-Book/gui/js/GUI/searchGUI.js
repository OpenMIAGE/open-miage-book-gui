if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.search === undefined)
    OpenM_BookGUI.search = {};

OpenM_BookGUI.search.cst = undefined;

OpenM_BookGUI.search.Page = function() {
    this.page = $(document.createElement("div"));
    this.click = undefined;
};

OpenM_BookGUI.search.Page.prototype.content = function() {
    this.page.empty();
    this.page.addClass("row-fluid book-user-page");
    var bandeauProfil = OpenM_BookGUI.gen.div();
    var photoUser = OpenM_BookGUI.gen.div().append($(document.createElement("img")).attr({
        alt: "Photo du Profil",
        title: "Photo du profil",
        src: "http://us.cdn1.123rf.com/168nwm/mikefirsov/mikefirsov1205/mikefirsov120500001/13917063-icone-illustration-profil.jpg"
    }).addClass("book-user-photo"));
    bandeauProfil.append(photoUser);
    var userProperties = "<blockquote><p>" + this.name + "</p>";
    if (this.birthday !== undefined)
        userProperties += "<p><i class='icon-gift'></i> " + this.birthday + "<p>";
    bandeauProfil.append(userProperties + "</blockquote>");

    this.page.append(bandeauProfil);

    var div = $(document.createElement('div')).addClass("row10 well book-user-fields-communities");
    this.page.append(div);
    div.append(this.fields.content());
    div.append(this.communities.content());

    this.page.click(this.click);

    return this.page;
};

OpenM_BookGUI.search.Page.prototype.display = function(enabled) {
    $("#" + OpenM_BookGUI.Pages.divParentId).empty();
    if (enabled === true || enabled === undefined)
        $("#" + OpenM_BookGUI.Pages.divParentId).append(this.content());

};