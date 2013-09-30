if (OpenM_BookGUI === undefined)
    var OpenM_BookGUI = {};

if (OpenM_BookGUI.commons === undefined)
    OpenM_BookGUI.commons = {};

OpenM_BookGUI.commons.initConst = function(stub, url, async) {
    if(async===undefined)
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
    ressource_loader: '',
    userPhotoDefault: '',
    divJSON: 'divJSON',
    divJSONContent: '',
    divJSONInitialized: false,
    divJSONcount: 1,
    divJSONactivated: false,
    showPageLoading: function() {
        $("#" + this.div_id).empty().append("<img src='" + this.ressource_dir + this.ressource_loader + "' >");
    },
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

        this.divJSONContent.prepend("<span id='" + this.divJSON + "-" + this.divJSONcount + "'>" + this.divJSONcount + " - " + JSON.stringify(data) + "<br></span>");
        $("#" + this.divJSON + "-" + (this.divJSONcount - 20), this.divJSONfloatingWindow).remove();
        this.divJSONcount++;
    },
    removeJSON: function() {
        this.divJSONfloatingWindow.remove();
    },
    showError: function(message) {
        $("#div_alert").empty();
        $("#div_alert").append("<div class='alert alert-error alert-block span4 offset4' style='display: none;'><button type='button' class='close'>x</button><h4>Erreur :</h4>" + message + "</div>");
        $(".close").on("click", function(event) {
            $('.alert').hide('slow');
        });
        $(".alert").show("slow");
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