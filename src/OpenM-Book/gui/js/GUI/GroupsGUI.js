if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.group === undefined)
    OpenM_BookGUI.group = {};

OpenM_BookGUI.group.VisibilityOnOffButtons = {
    defaultClass: "btn btn-default btn-xs",
    defaultClassUnload: "",
    defaultIcon: "glyphicon glyphicon-info-sign",
    defaultIconShared: "glyphicon glyphicon-eye-open",
    defaultIconNotShared: "glyphicon glyphicon-eye-close",
    defaultText: "",
    defaultTooltip: "Download visibility...",
    defaultTooltipShared: "Shared to all",
    defaultTooltipNotShared: "Not Shared"
};

OpenM_BookGUI.group.VisibilityOnOffButton = function() {
    this.class = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultClass;
    this.classUnload = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultClassUnload;
    this.icon = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultIcon;
    this.iconShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultIconShared;
    this.iconNotShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultIconNotShared;
    this.text = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultText;
    this.tooltip = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultTooltip;
    this.tooltipShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultTooltipShared;
    this.tooltipNotShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultTooltipNotShared;
    this.c = OpenM_BookGUI.gen.span();
    this.click = undefined;
    this.shared = false;
    this.initialized = false;
    this.mouseover = undefined;
};

OpenM_BookGUI.group.VisibilityOnOffButton.prototype.content = function() {
    this.c.empty();
    var a = OpenM_BookGUI.gen.a();
    var gui = this;
    if (this.initialized) {

        a.addClass(this.class);
        if (this.shared)
            a.append(OpenM_BookGUI.gen.span()
                    .addClass(this.iconShared)
                    );
        else
            a.append(OpenM_BookGUI.gen.span()
                    .addClass(this.iconNotShared)
                    );

    }
    else {
        a.addClass(this.classUnload);
        a.append(OpenM_BookGUI.gen.span()
                .addClass(this.icon));
    }
    a.append(OpenM_BookGUI.gen.span()
            .append(this.text)
            );
    a.attr("rel", "tooltip");
    a.attr("data-placement", "top");
    a.attr("data-toggle", "tooltip");
    if (!this.initialized)
        a.attr("data-original-title", this.tooltip);
    else if (this.shared)
        a.attr("data-original-title", this.tooltipShared);
    else
        a.attr("data-original-title", this.tooltipNotShared);
    a.tooltip();
    if (typeof this.click === "function")
        a.click(this.click);
    if (typeof this.mouseover === "function")
        a.mouseover(this.mouseover);

    this.c.append(a);
    return this.c;
};