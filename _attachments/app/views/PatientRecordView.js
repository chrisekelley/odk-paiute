var PatientRecordView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
	},      
    render: function() {
    	patient.fetch();
    	records = new PatientRecordList();
    	records.fetch();
    	console.log("render records: "+ JSON.stringify(records));
    	thisHtml = this.template(this.model.toJSON());
    	 $(this.el).html(thisHtml);
    	 return this;
      },
});

var PatientRecordList = Backbone.Collection.extend({
    db : {
      view : "byPatientId",
      changes : false,
      //filter : Backbone.couch_connector.config.ddoc_name + "/byPatientId",
      keys : ["6857e31aa71f998c907d57b25e199cf2"]
    },	
    url : "/patientId",
    model : Record,
//    comparator : function(patient){
//        return patient.get("surname");	
//      }
    });
//console.log("PatientsList");


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
	