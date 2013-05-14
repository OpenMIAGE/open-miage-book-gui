var OpenM_Book_PagesGui = {
    'divParentId': '', 
    'ressource_dir': '',
    'ressource_loader': '',
    'userPhotoDefault':'',
    'divJSON': '',
    'divJSONContent':'',
    'divJSONInitialized': false,
    'divJSONcount': 1,
    'showPageLoading': function(){ 
        $("#"+this.div_id).empty().append("<img src='"+ this.ressource_dir + this.ressource_loader +"' >");           
    },
    'showJSON': function(data){
        var div = $("#"+this.divJSON);
        if (div.size() == 0)
            return;
        if(!this.divJSONInitialized){
            this.divJSONInitialized = true;
            var div2 = $(document.createElement('div'));
            div.append(div2);
            div2.text("Le retour JSON : ");
            div2.append('<br>');
            var pre = $(document.createElement('pre'));
            div.append(pre);
            this.divJSONContent = $(document.createElement('code'));
            pre.append(this.divJSONContent);
        }            
        
        this.divJSONContent.append("<span id='"+this.divJSON+"-"+this.divJSONcount+"'>"+this.divJSONcount+" - "+JSON.stringify(data)+"<br></span>");
        $("#"+this.divJSON+"-"+(this.divJSONcount - 5)).remove();
        this.divJSONcount++;
    },
    'removeJSON':function(){
        $("#"+this.divJSON).remove();
    },
    'showError': function(message){
        $("#div_alert").empty();
        $("#div_alert").append("<div class='alert alert-error alert-block span4 offset4' style='display: none;'><button type='button' class='close'>x</button><h4>Erreur :</h4>" +message+ "</div>");      
        $(".close").on("click", function(event){  
            $('.alert').hide('slow');     
        });
        $(".alert").show("slow");         
    },
    'showSucces': function(message){        
        var divAlert = $(document.createElement("div")).addClass("alert alert-success alert-block span4 offset4").css('display','none');
        var button = $(document.createElement("button")).attr("type","button").addClass("close").text("x");
        var h4 = $(document.createElement("h4")).text("Opération réussi");        
        divAlert.append(button).append(h4).append(message);
        $("#div_alert").empty().append(divAlert);        
        $(".close").on("click", function(event){  
            $('.alert').hide('slow');     
        });
        $(".alert").show("slow"); 
    }
}