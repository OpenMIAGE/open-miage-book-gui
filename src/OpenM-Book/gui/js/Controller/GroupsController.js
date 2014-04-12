if (OpenM_BookController === undefined)
    var OpenM_BookController = {};

if (OpenM_BookController.group === undefined)
    OpenM_BookController.group = {};

OpenM_BookController.group.VisibilityOnOffButton = function(group, user) {
    this.user = user;
    this.group = group;
    this.setVisibility;
    this.gui = new OpenM_BookGUI.group.VisibilityOnOffButton();
    var controller = this;
    this.gui.click = function(e) {
        if (typeof controller.setVisibility === "function") {
            controller.setVisibility(!controller.gui.shared);
            controller.gui.shared = !controller.gui.shared;
            controller.gui.content();
        }
    };
};

OpenM_BookController.group.VisibilityOnOffButton.all = {};
OpenM_BookController.group.VisibilityOnOffButton.from = function(id) {
    if (OpenM_BookController.group.VisibilityOnOffButton.all[id] !== undefined)
        return OpenM_BookController.group.VisibilityOnOffButton.all[id];

    var visibilityButton = new OpenM_BookController.group.VisibilityOnOffButton();
    OpenM_BookController.group.VisibilityOnOffButton.all[id] = visibilityButton;
    return visibilityButton;
};