function OpenM_Book_UserPageGUI(){
    
    this.display = function(enabled){
         cadre = $("#"+OpenM_BookGUI.Pages.divParentId);
         
         if(enabled===true || enabled === undefined){             
                //span10.append(this.fields.content());                
                
                cadre.empty();
                cadre.addClass("row-fluid").addClass("span10 well");
               
                cadre.append(this.fields.content());
               
                // Création du bloc "Miage et Emploi"
                var blocMiageAndSociete = $(document.createElement('div')).addClass("span5 blocMiageAndSociete");
                var conteneurMiageEtEmploi = $(document.createElement('div')).addClass("row-fluid");
                
                // Titre du bloc
                var titleMiageAndSociete = $(document.createElement("p")).addClass("titleMiageAndSociete");
                titleMiageAndSociete.text("Informations Etude & Société");
                conteneurMiageEtEmploi.append(titleMiageAndSociete);

                // Affichage de la promo Miage
                var labelPromo = $(document.createElement("p"));
                labelPromo.text("Promo : " + "2010");
                conteneurMiageEtEmploi.append(labelPromo);

                // Affichage de la société
                var labelEmployer = $(document.createElement("p"));
                labelEmployer.text("Société actuelle : Astek SO");
                conteneurMiageEtEmploi.append(labelEmployer);
                
                // Ajout de tout le contenu dans la page
                blocMiageAndSociete.append(conteneurMiageEtEmploi);
                cadre.append(blocMiageAndSociete);
                //span1.append(this.fields.content());                 
  
                  //this.div = $(document.createElement('div')).addClass("row-fluid");
                  //  cadre.append(this.div);                
         }else{
             cadre.empty();  
         }  
    }    
}

function OpenM_Book_UserButtonModificationGui(inModification){
    this.text = "Modifier";
    this.style = 'btn-info btn-large btn-space';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-pencil";
    this.a = $(document.createElement('a'));
    this.aSave = $(document.createElement('a'));
    this.click = undefined;
    this.clickSave = undefined;
    this.styleSave = 'btn-info btn-large';
    this.iconColorSave =  "icon-white";
    this.iconStyleSave = "icon-ok";
    this.inModification = inModification;
     
     this.content = function(){
         this.a.empty()
               .addClass("btn "+this.style);                              
         var icon = $(document.createElement("i"))
                    .addClass(this.iconColor + " " + this.iconStyle);
         this.a.append(icon)
               .append('&nbsp;'+this.text)
               .click(this.click)
               .removeClass("active");
        this.aSave.empty().hide();   
        
        if(this.inModification){
            this.a.addClass('active');
            this.aSave.addClass("btn "+this.style);
            var icon = $(document.createElement("i"))
                    .addClass(this.iconColorSave + " " + this.iconStyleSave);
            this.aSave.append(icon)
               .append('&nbsp;'+this.text)
               .click(this.clickSave);
            
            
        }
        
        
        return this.a;
     }     
}

function OpenM_Book_UserFieldsGui(){
    this.c = $(document.createElement("div"));
    this.allFields = new Array();
    
    this.content = function(){
        if (this.allFields.length !== 0){
            
            // On affiche le bandeau
            this.c.append(getBandeauProfil(this.allFields));
            this.c.append(getBlocInfosGenerales(this.allFields));
        }
        
        return this.c;
    }
    
    this.addField= function(field){
        this.allFields.push(field);
    }

}

function OpenM_Book_UserFieldGui(user, field, inModification){
    this.user = user;
    this.field = field;
    this.inModification = inModification;
    this.fieldName = this.field;
    this.fieldValue = "";
    this.c = $(document.createElement("div"));
    this.input = undefined;
    
    
    this.content = function(){
        if (!this.inModification){
            //display
            this.c.empty();
            //this.c = $(document.createElement("div"));
            this.c.addClass("span2");
            this.c.addClass("user-field");
            var label = $(document.createElement("span"));
            label.text(this.fieldName + " :");
            this.c.append(label);
            this.c.append("<br>");
            var labelVal = $(document.createElement("span"));
            labelVal.text(this.fieldValue);
            this.c.append(labelVal);
            return this.c
        }else{
            //modif
            this.c.empty();
           // this.c = $(document.createElement("div"));
            this.c.addClass("span2");
            this.c.addClass("user-field");
            this.c.addClass("control-group");
            var label = $(document.createElement("label")).addClass("control-label");
            label.attr("for",this.fieldName)
                .text(this.fieldName);
            this.c.append(label);
            var div = $(document.createElement("div")).addClass("controls");
            this.input = $(document.createElement("input"))
                         .attr("id",this.fieldName)
                         .attr("type","text")
                         .attr("placeholder",this.fieldName)
                         .val(this.fieldValue)
                         .addClass("input-small");
            div.append(this.input);
            this.c.append(div);
            
            //div.append(labelVal)
            //this.c.append(div);
            return this.c;
        }
        
        
    }
}

// Affichage du bandeau profil (photo + nom + prénom)
function getBandeauProfil(fields) {        
        var bandeauProfil = $(document.createElement('div'));
        
        // Photo de profil
        var photoUser = $(document.createElement("img")).attr({
                                                                alt: "Photo du Profil",
                                                                title: "Photo du profil",
                                                                src: "http://us.cdn1.123rf.com/168nwm/mikefirsov/mikefirsov1205/mikefirsov120500001/13917063-icone-illustration-profil.jpg"
                                                            }).addClass("photoCSS");
        bandeauProfil.append(photoUser);
        
        // Nom de l'utilisateur
        var titreLabel = $(document.createElement("span")).addClass("nameCSS");
        titreLabel.text(fields[0].fieldValue + " " + fields[1].fieldValue);
        bandeauProfil.append(titreLabel);

        // Bouton de modification
        /*var updateButton = $(document.createElement('span')).addClass("buttonUpdateProfil");
        updateButton.append(OpenM_Book_UserButtonModificationGui());
        bandeauProfil.append(updateButton);*/
    
        return bandeauProfil;
}

// Affichage du bloc d'information générales
function getBlocInfosGenerales(fields) { 
    // Création du bloc d'information générales
    var blocInfosGenerales = $(document.createElement('div')).addClass("span5 blocInfosGenerales"); 
    var conteneurInfosGenerales = $(document.createElement('div')).addClass("row-fluid");

    // Titre du bloc
    var titleBlocInfosGenerales = $(document.createElement("p")).addClass("titleBlocInfosGenerales");
    titleBlocInfosGenerales.text("Informations Générales");
    conteneurInfosGenerales.append(titleBlocInfosGenerales);
    // Affichage du mail
    var labelMail = $(document.createElement("p"));
    //labelMail.text(fields.otherProperties[0].value);
    //labelMail.text("Mail : " + " lerouge.sylvain@gmail.com " + fields[3].keys(0));
    conteneurInfosGenerales.append(labelMail);

    // Affichage de la ville
    var labelTown = $(document.createElement("p"));
    labelTown.text("Ville actuelle : Toulouse");
    conteneurInfosGenerales.append(labelTown);
    blocInfosGenerales.append(conteneurInfosGenerales);
    return blocInfosGenerales;
}