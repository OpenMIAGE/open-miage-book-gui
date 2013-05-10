function OpenM_Book_UserPageGUI(){
    this.buttonModification = undefined;
    this.fieldFirstName = undefined;
    this.fieldLastName = undefined;
    this.div = undefined;
    
    this.display = function(enabled){
         cadre = $("#"+OpenM_Book_PagesGui.divParentId);
         
         if(enabled===true || enabled === undefined){             
                
                this.div = $(document.createElement('div')).addClass("row-fluid");
                cadre.append(this.div);
                
                var span10 = $(document.createElement('div')).addClass("span10");
                var span2 = $(document.createElement('div')).addClass("span2");
                this.div.append(span10);
                this.div.append(span2);
                
                span2.append(this.buttonModification.content());
                
                
               span10.append(this.fieldFirstName.content());
                span10.append(this.fieldLastName.content());
                
                
         }else{
             cadre.empty();  
         }  
    }    
}

function OpenM_Book_UserButtonModificationGui(){
    this.text = "Modifier";
    this.style = 'btn-inverse';
    this.iconColor = "icon-white";
    this.iconStyle = "icon-pencil";
    this.a = $(document.createElement('a'));
    this.click = undefined;
     
     this.content = function(){
         this.a.remove();
         this.a = $(document.createElement('a')).addClass("btn "+this.style);        
         var icon = $(document.createElement("i"));
         icon.addClass(this.iconColor + " " + this.iconStyle);
         this.a.append(icon); 
         this.a.append('&nbsp;'+this.text);
         this.a.click(this.click);
        
        return this.a;
     } 
}

function OpenM_Book_UserFieldGui(user, field){
    this.user = user;
    this.field = field;
    this.isInModification = false;
    this.fieldName = this.field;
    this.fieldValue = "";
    this.c = $(document.createElement("div"));
    this.input = undefined;
    
    
    this.content = function(){
        if (!this.isInModification){
            //display
            this.c.empty();
            this.c = $(document.createElement("div"));
            this.c.addClass("span2");
            this.c.addClass("user-field");
            var label = $(document.createElement("label"));
            label.text(this.fieldName);
            this.c.append(label);
            var labelVal = $(document.createElement("label"));
            labelVal.text(this.fieldValue);
            this.c.append(labelVal);
            return this.c
        }else{
            //modif
            this.c.empty();
            this.c = $(document.createElement("div"));
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