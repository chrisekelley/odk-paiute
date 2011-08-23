var HomeView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("home.template.html"),
	
	initialize: function() {
//		var PatientsList = Backbone.Collection.extend({
//			url : "/patients",
//			model : Patient,
//		});
		//var Patients = new PatientsList();
		//console.log("init HomeView: ");
		//var Patients = new PatientsList();
		//Patients.fetch();
		//console.log("more PageView: "+ JSON.stringify(Patients));
		_.bindAll(this, 'reseted', 'addRow');

		Patients.bind("reset", this.reseted);
		//Patients.bind("add", this.addRow);
		if(Patients.length > 0){
			Patients.each(this.addRow);
		}
	}, 
    addRow : function(patient){
        var view = new PatientView({model: patient});
        var rendered = view.render().el;
        //console.log("add one in HomeView:" + JSON.stringify(patient));
        $(this.$("#patients")).append(rendered);
      },
      reseted : function(){
    	  //this.el.html("");
    	  $(this.$("#patients")).html("");
          if(Patients.length > 0){
        	  Patients.each(this.addRow);
          }
        },
    
    render: function() {
    	var json = {"content": "This is a test."};
    	 //$(this.el).html(this.template(this.model.toJSON()));
    	html = this.template(json);
    	//console.log("rendering PageView html: " + html);
    	 $(this.el).html(html);
    	 return this;
      },
});