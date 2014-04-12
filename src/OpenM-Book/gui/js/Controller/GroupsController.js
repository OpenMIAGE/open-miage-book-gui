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

    this.listenMouseOver = true;
    this.gui.mouseover = function(e) {
        if (controller.listenMouseOver) {
            controller.listenMouseOver = false;
            controller.group.getContent();
            setTimeout(function() {
                controller.listenMouseOver = true;
            }, 2000);
        }
        else
            return;
    };

    this.update = function() {
        var initialized = controller.group.loaded;
        var shared = controller.group.groupChilds.length > 0;
        var reload = ((controller.gui.initialized !== initialized) || (controller.gui.shared !== shared));
        controller.gui.initialized = initialized;
        controller.gui.shared = shared;
        if (reload)
            controller.gui.content();
    };

    this.group.addUpdateCallBack(this.update);
};

OpenM_BookController.group.VisibilityOnOffButton.all = {};
OpenM_BookController.group.VisibilityOnOffButton.from = function(id) {
    if (OpenM_BookController.group.VisibilityOnOffButton.all[id] !== undefined)
        return OpenM_BookController.group.VisibilityOnOffButton.all[id];

    var visibilityButton = new OpenM_BookController.group.VisibilityOnOffButton();
    OpenM_BookController.group.VisibilityOnOffButton.all[id] = visibilityButton;
    return visibilityButton;
};