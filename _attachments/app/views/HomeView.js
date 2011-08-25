var HomeView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("home.template.html"),

	initialize: function() {
		//_.bindAll(this, "render", "addOne");
		Patients.bind('add',   this.addOne, this);
		//Patients.bind('reset', this.addAll, this);
		Patients.bind('all',   this.render, this);
		Patients.fetch();
		return this;
	}, 
	addOne : function(patient){
		var view = new PatientListItemView({model: patient});
		var rendered = view.render().el;
		//console.log("add one in HomeView:" + JSON.stringify(patient));
		$(this.$("#patients")).append(rendered);
	},
	addAll: function() {
		console.log("addAll");
		Patients.each(this.addOne);
	},

	render: function() {
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		var content = this.model.toJSON();
		html = this.template(content);
		console.log("rendering HomeView");
		$(this.el).html(html);
		//if(Patients.length > 0){
			Patients.each(this.addOne);
		//}
		return this;
	},
});

var PatientListItemView = Backbone.View.extend({
	tagName : "li",
	template: Handlebars.compile($("#patient-template").html()),
	initialize : function(){
		this.model.bind('change', this.render, this);
	},

	render : function(){ 
		var content = this.model.toJSON();
		html = this.template(content);
		$(this.el).html(html);
		//console.log("render PatientListItemView: "+ JSON.stringify(html));
		return this;
	}
});