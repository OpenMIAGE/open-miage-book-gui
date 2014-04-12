if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.group === undefined)
    OpenM_BookGUI.group = {};

OpenM_BookGUI.group.VisibilityOnOffButtons = {
    defaultClass: "btn btn-default btn-xs",
    defaultIconShared: "glyphicon glyphicon-eye-open",
    defaultIconNotShared: "glyphicon glyphicon-eye-close",
    defaultText: "",
    defaultTooltipShared: "Shared to all",
    defaultTooltipNotShared: "Not Shared"
};

OpenM_BookGUI.group.VisibilityOnOffButton = function(shared) {
    this.class = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultClass;
    this.iconShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultIconShared;
    this.iconNotShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultIconNotShared;
    this.text = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultText;
    this.tooltipShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultTooltipShared;
    this.tooltipNotShared = OpenM_BookGUI.group.VisibilityOnOffButtons.defaultTooltipNotShared;
    this.c = OpenM_BookGUI.gen.span();
    this.click = undefined;
    this.shared = (shared !== undefined) ? shared : false;
};

OpenM_BookGUI.group.VisibilityOnOffButton.prototype.content = function() {
    this.c.empty();
    var a = OpenM_BookGUI.gen.a();
    a.addClass(this.class);
    if (this.shared)
        a.append(OpenM_BookGUI.gen.span()
                .addClass(this.iconShared)
                );
    else
        a.append(OpenM_BookGUI.gen.span()
                .addClass(this.iconNotShared)
                );
    a.append(OpenM_BookGUI.gen.span()
            .append(this.text)
            );
    a.attr("rel", "tooltip");
    a.attr("data-placement", "top");
    a.attr("data-toggle", "tooltip");
    if (this.shared)
        a.attr("data-original-title", this.tooltipShared);
    else
        a.attr("data-original-title", this.tooltipNotShared);
    a.tooltip();
    if (this.click !== undefined)
        a.click(this.click);
    this.c.append(a);
    return this.c;
};