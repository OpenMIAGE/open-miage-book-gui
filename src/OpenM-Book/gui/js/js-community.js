//lorsqu'on vient de selectionner une communauté via la Zone Communauté'
function select_community(communityId){
    var community = AllCommunities[communityId];
    if (community){
        showLoading();
        OpenM_Book.getCommunity(community.id, retourGetCommunityChilds);                        
    }else{
        showError("community id : " + communityId + " est inconnu ...");
    }  
    return false;
}
//lorsqu'on vient de selectionner une communauté via la navigation'
function select_community_navigation(communityId){
    var community = AllCommunities[communityId];
    if (community){
        addBranchCommunity(community, community.child);
    }else{
       showError("community id : " + communityId + " est inconnu ...");     
    }
    return false;
}

function addCommunityAJAX(idInput,idCommunity){
    $("#"+bt_addCommunity).popover("hide");
    var newName = $("#"+input_NewCommunityName).val()
    $("#"+bt_addCommunity).hide();
    alert("La nouvelle communauté : " + newName);
}


//Ajoute une communauté (graphique) à la div ZONE
function addCommunity(community){
   $(divId_community_container).append(community.ToZoneHTML());
    return false;
}

//Navige dans une banche de communauté
function addBranchCommunity(community, communityChilds){
   //on supprime le contenu de la Zone COMmunity
   $(divId_community_container).empty();   
   if (!communityChilds && community.nbAncestor ==0 ){
       //1er communauté. pas de navigation
       $(divId_navigation_div).hide();
       addCommunity(community);
   }else{       
       //if (community.nbChild != 0){
           //la navigation       
        $(divId_navigation_div).show();
        $(divId_navigation_community).empty();
        $(divId_divCommunity_container).show();
        if (community.nbAncestor != 0){
            //on utilise ces propres ancetre
            for (i in community.ancestor){
                $(divId_navigation_community).append(community.ancestor[i].ToNavigationHTML());
            }           
        }      
        $(divId_navigation_community).append(community.ToNavigationHTML(true));
        //LA zone community
        for (idarray in communityChilds){ 
            addCommunity(communityChilds[idarray]);
        }
        if (community.usrCanAddSubCommu){
           //le bouton dans les sous communautés
           
           var ajout = "<div class='span3'><a href='#' id='"+bt_addCommunity+"' class='btn btn-inverse btn-large'><i class='icon-white icon-plus'></i>&nbsp;Ajout communauté</a></div>";
            $(divId_community_container).append(ajout);
            var option={placement:'bottom', title: 'Nouvelle communauté',
              content: '<div class="control-group"><label class="control-label" for="'+input_NewCommunityName+'">Name</label><div class="controls"><input type="text" class="input-large" id="'+input_NewCommunityName+'" placeholder="Nom ?"></div><a href="#" onclick="addCommunityAJAX()" class="btn btn-primary btn-small"><i class="icon-white icon-ok-circle"></i> Enregistrer</a></div>',
              html: true
            };
            $('#'+bt_addCommunity).popover(option);
            
        }else{
            if (communityChilds.length ==0){
                $(divId_divCommunity_container).hide();
            }
        }        
          
          var actionsHTML = community.generateActions();
          if (actionsHTML){
              $(divId_action).show();
              $(divid_action_container).empty()
                                       .append(actionsHTML);
              //activation toolTip
              $("[rel='tooltip']").tooltip();
              
              //activation popover             
              /* var option={title: 'Nouvelle sous communauté',
                          content: '<div class="control-group"><label class="control-label" for="'+input_NewCommunityName+'">Name</label><div class="controls"><input type="text" class="input-large" id="'+input_NewCommunityName+'" placeholder="Nom ?"></div><a href="#" onclick="addCommunityAJAX()" class="btn btn-primary btn-small"><i class="icon-white icon-ok-circle"></i> Enregistrer</a></div>',
                          html: true,
                          placement: 'bottom'};       
                $('a[id*="'+bt_addCommunity+'"]').popover(option);  
              */
              
          }else{
             $(divId_action).hide(); 
          }
      // }
       //else{           
           //pas d'enfant donc on laisse la communauté'
           //addCommunity(community);
       //    addBranchCommunity(community.lastAncestor,community.lastAncestor.child );
       // }       
   }
   return false;
}

 
 //transforme l'obj JSON rettourner par GetCommunityChild en objet javaScript community
 function castJsonToCommunity(data){
     try
  {
  data = JSON.parse(data);         
     if (data.STATUS == OpenM_Book.RETURN_STATUS_OK_VALUE){
      //Création communauté en cours
      var commuEnCour;
      
       if (!AllCommunities[data.CID]){
              commuEnCour = new Community(data.CID, data.CNA);
              AllCommunities[commuEnCour.id] = commuEnCour; 
          }else{
            commuEnCour = AllCommunities[data.CID];
          }          
          commuEnCour.name = data.CNA;
          commuEnCour.usrCanAddSubCommu = (data.UCAC == "1")?true:false;
          commuEnCour.usrCanRegisterInto = (data.UCR == "1" )?true:false;
          commuEnCour.loaded = true;
      

      for (var i=0;i<data.CCP.length;i++)
      {           
          var community = AllCommunities[data.CCP[i].CID];
          if (!community){
              community = new Community(data.CCP[i].CID, data.CCP[i].CNA);
              community.ancestor = commuEnCour.ancestorClone(); 
              AllCommunities[community.id] = community; 
          }
          community.addAncestor(commuEnCour);
          commuEnCour.addChild(community); 
      }
       return commuEnCour;    
     }else{
         var message = data.ERROR_MESSAGE;
         var str ="Une erreur c'est produit lors du chargement des communautées...";
         str += (message)?", message : "+message:"";
        showError(str); 
        return false; 
     } 
  }
catch(err)
  {
     var message = "Une erreur est survenu lors du chargement des données. message :" + err;
     showError(message);
     return false; 
  } 
 }

//Est executer au retour de la fonction GetCommunityChilds
 function retourGetCommunityChilds(data){
    $("#retourJSON").html(data);
    var commuEnCour = castJsonToCommunity(data);
    if (commuEnCour){
         OpenM_Book_Gui_Community_Page.setCommunity(commuEnCour);
         OpenM_Book_Gui_Community_Page.html(commuEnCour);
        //if (commuEnCour.child)
        //    addBranchCommunity(commuEnCour, commuEnCour.child);
    }        
 }

function showError(message){
    $(divId_alert).append("<div class='alert alert-error alert-block span4 offset4'><button type='button' class='close'>x</button><h4>Erreur :</h4>" +message+ "</div>");      
    $(".close").on("click", function(event){  
        $('.alert').hide('slow');
    });
}

function showLoading(){
    $(divId_community_container).empty(); 
    $(divId_community_container).html("<img src='"+ressources_dir+"OpenM-Book/gui/img/ajax-loader.gif'>");
} 

//Class Community   
function Community(id, name, usrCanAddSubCommu, usrCanRegisterInto ,url) { 
    if (!url) { url ="#"; } 
    if (!name) { name ="Community : "+id; } 
    if (!usrCanAddSubCommu){ usrCanAddSubCommu = false;}
    if (!usrCanRegisterInto){usrCanRegisterInto = false;}
    
    this.id = id; 
    this.name = name;
    this.url = url;
    this.child = new Array();
    this.ancestor = new Array();
    this.usrCanAddSubCommu = usrCanAddSubCommu; 
    this.usrCanRegisterInto = usrCanRegisterInto;
    this.nbChild = 0;
    this.nbAncestor = 0;
    this.lastAncestor=undefined;
    this.loaded = false;
     
     
    this.addChild = function(community){
        this.child[community.id]= community;
        this.nbChild++;
    } 
    
    this.addAncestor = function(community){
        this.ancestor[community.id]= community;
        this.nbAncestor++;
        this.lastAncestor = community;
    }
     
    this.ToZoneHTML = function() { 
        var str = "";
        if (!this.loaded){            
           str="<div id='community-"+ this.id +"' class='community span3' onclick='select_community("+ this.id +");' >"+ this.name +"</div>"; 
        }else
        {
           if (this.usrCanAddSubCommu){
               str="<div id='community-"+ this.id +"' class='community span3' onclick='select_community("+ this.id +");' >"+ this.name +"</div>";         
           /*}else{
               if (this.nbChild >0){
                   str="<div id='community-"+ this.id +"' class='community span3' onclick='select_community("+ this.id +");' >"+ this.name +"</div>";                    
               }else{
                   str="<div id='community-"+ this.id +"' class='community span3' onclick='alert("+ this.id +");' >"+ this.name +"</div>";                    
               }*/
           }           
        }
        return str;
    }
    
    this.ToNavigationHTML = function(active){
        if (!active) { active =false; } 
        if (active){
            return "<li class='active'>"+ this.name +"</li>";
        }else{
            return "<li><a href='#' onclick='select_community_navigation("+ this.id +");'  >"+ this.name+"</a> <span class='divider'>/</span></li>";                
        }    
   }
   
   this.childSortedByName = function(){
       var childSorted = this.child.sort(function (a,b){
           return a.name.localeCompare(b.name);
       });
       return childSorted;
   }
   
   this.ancestorClone = function(){
       var clone = new Array();
       for (var i in this.ancestor){
           clone[i] = this.ancestor[i];
       }
       return clone;
   }
   
   this.generateActions = function(){
       var boutons = "";
       var texte ="";
       var texteToolTip_usrAddInto = "S&apos;enregistrer dans cette communauté";
       if (this.usrCanRegisterInto){
          texte = "S'enregistrer";
          boutons += "<div class='span2'><a href='#' class='btn btn-inverse' rel='tooltip' data-placement='top' data-toggle='tooltip' data-original-title='"+texteToolTip_usrAddInto+"'><i class='icon-white icon-ok'></i>&nbsp;"+texte+"</a></div>";          
      }
       /*if (this.usrCanAddSubCommu){
          texte = "Ajouter une sous communauté";
          texteToolTip_usrAddSubCommunity = "Ajouter une sous communauté à "+this.name;
          boutons += "<div class='span2'><a href='#' id='bt_addCommunity"+nb_bt_addCommunity+"' class='btn btn-inverse' rel='tooltip' data-placement='top' data-toggle='tooltip' data-original-title='"+texteToolTip_usrAddSubCommunity+"'><i class='icon-white icon-plus'></i>&nbsp;"+texte+"</a></div>";    
          nb_bt_addCommunity ++;
       }*/
       
       return boutons;
   }
   
} 

divId_community_container = "#community_container";
/**  Variable Globale   **/
/*
*
divId_divCommunity_container = "#div_community_container";
divId_navigation_community = "#navigation_community";    
divId_navigation_div = "#navigation_div";
divId_alert = "#div_alert";
divId_action = "#action";
divid_action_container = "#action_container";
bt_addCommunity = 'bt_addCommunity';
nb_bt_addCommunity =0;
input_NewCommunityName = 'inputNameCommunity';
*/

AllCommunities = new Array();