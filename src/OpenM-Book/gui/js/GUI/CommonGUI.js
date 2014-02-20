if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.commons === undefined)
    OpenM_BookGUI.commons = {};

OpenM_BookGUI.commons.cst = undefined;

OpenM_BookGUI.commons.initConst = function(stub, url, async) {
    if (async === undefined)
        async = true;
    $.ajax({
        async: async,
        url: url,
        success: function(data) {
            stub.cst = $(data.documentElement);
        },
        dataType: "xml"
    });
};

OpenM_BookGUI.Pages = {
    divParentId: '',
    ressource_dir: '',
    userPhotoDefault: '',
    divJSON: 'divJSON',
    divJSONContent: '',
    divJSONInitialized: false,
    divJSONcount: 1,
    divJSONactivated: false,
    divJSONfloatingWindow: undefined,
    floatingWindow: undefined,
    showJSON: function(data) {
        if (!this.divJSONactivated)
            return;
        if (this.divJSONfloatingWindow === undefined) {
            this.floatingWindow = window.open("", "popup", "toolbar=0, location=0, directories=0, status=0, resizable=0, copyhistory=0, height=400, width=500");
            var body = this.floatingWindow.document.body;
            body.innerHTML = "<div id='JSON'></div>";
            this.divJSONfloatingWindow = $("#JSON", this.floatingWindow.document.body);
        }
        if (!this.divJSONInitialized) {
            this.divJSONInitialized = true;
            var div2 = $(this.floatingWindow.document.createElement('div'));
            this.divJSONfloatingWindow.append(div2);
            div2.text("Le retour JSON : ");
            div2.append('<br>');
            var pre = $(this.floatingWindow.document.createElement('pre'));
            this.divJSONfloatingWindow.append(pre);
            this.divJSONContent = $(this.floatingWindow.document.createElement('code'));
            pre.append(this.divJSONContent);
        }
        if (typeof(JSON) !== "undefined")
            this.divJSONContent.prepend("<span id='" + this.divJSON + "-" + this.divJSONcount + "'>" + this.divJSONcount + " - " + JSON.stringify(data) + "</span><br>");
        else
            this.divJSONContent.prepend("<span>No JSON.stringify on this browser</span><br>");
        $("#" + this.divJSON + "-" + (this.divJSONcount - 20), this.divJSONfloatingWindow).remove();
        this.divJSONcount++;

    },
    removeJSON: function() {
        this.divJSONfloatingWindow.remove();
    },
    showSucces: function(message) {
        var divAlert = $(document.createElement("div")).addClass("alert alert-success alert-block span4 offset4").css('display', 'none');
        var button = $(document.createElement("button")).attr("type", "button").addClass("close").text("x");
        var h4 = $(document.createElement("h4")).text("Opération réussi");
        divAlert.append(button).append(h4).append(message);
        $("#div_alert").empty().append(divAlert);
        $(".close").on("click", function(event) {
            $('.alert').hide('slow');
        });
        $(".alert").show("slow");
    }
};

OpenM_BookGUI.error = {
    error: undefined,
    timer: undefined,
    showError: function(message) {
        if (this.error === undefined)
            this.error = OpenM_BookGUI.gen.div();
        clearTimeout(this.timer);
        this.error.empty();
        this.error.append(OpenM_BookGUI.gen.div()
                .addClass("book-div-parent-error")
                .append(OpenM_BookGUI.gen.div()
                .addClass("alert  alert-danger book-error")
                .append(OpenM_BookGUI.gen.a().addClass("close").append("&times;"))
                .append("<h4>Erreur :</h4>" + message)));
        var c = this;
        $(c.error, ".close").click(function(e) {
            c.error.hide('slow');
            clearTimeout(c.timer);
        });
        c.error.show("slow");
        this.timer = setTimeout(function() {
            c.error.hide("slow");
        }, 40 * 1000);
        $("body").prepend(c.error);
    }
};

OpenM_BookGUI.gen = {};

OpenM_BookGUI.gen.create = function(e) {
    return $(document.createElement(e));
};

OpenM_BookGUI.gen.div = function() {
    return OpenM_BookGUI.gen.create("div");
};

OpenM_BookGUI.gen.a = function() {
    return OpenM_BookGUI.gen.create("a");
};

OpenM_BookGUI.gen.i = function() {
    return OpenM_BookGUI.gen.create("i");
};

OpenM_BookGUI.gen.span = function() {
    return OpenM_BookGUI.gen.create("span");
};

OpenM_BookGUI.gen.ul = function() {
    return OpenM_BookGUI.gen.create("ul");
};

OpenM_BookGUI.gen.li = function() {
    return OpenM_BookGUI.gen.create("li");
};

OpenM_BookGUI.gen.h3 = function() {
    return OpenM_BookGUI.gen.create("h3");
};

OpenM_BookGUI.gen.img = function() {
    return OpenM_BookGUI.gen.create("img");
};

OpenM_BookGUI.gen.input = function() {
    return OpenM_BookGUI.gen.create("input");
};