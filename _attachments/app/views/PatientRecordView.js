var PatientRecordView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
	},      
    render: function() {
    	//var json = {"content": "This is a test."};
    	//var json = {"_id":"6857e31aa71f998c907d57b25e199cf2","date":1314113870471,"_rev":"2-3174d588be5ee4767de088549bbec2e9","forenames":"test","middle_name":"a","surname":"person","sex":"1","collection":"patients"};
    	 //$(this.el).html(this.template(this.model.toJSON()));
    	patient.fetch();
    	thisHtml = this.template(this.model.toJSON());
    	console.log("rendering PatientRecordView html: " + JSON.stringify(this.model.toJSON()));
    	//console.log("rendering PatientRecordView html: " + JSON.stringify(json));
    	 $(this.el).html(thisHtml);
    	 return this;
      },
});

var RecordListItemView = Backbone.View.extend({
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
      //console.log("render PatientListItemView: "+ JSON.stringify(html));
      return this;
    }
  });
	