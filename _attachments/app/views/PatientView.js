var PatientView = Backbone.View.extend({
    tagName : "li",
    template: Handlebars.compile($("#patient-template").html()),
     initialize : function(){
      //_.bindAll(this, 'render');
      //this.model.bind('change', this.render);
    },
    
    render : function(){ 
      var content = this.model.toJSON();
      html = this.template(content);
      $(this.el).html(html);
      //console.log("render PatientView: "+ JSON.stringify(html));
      return this;
    }
  });