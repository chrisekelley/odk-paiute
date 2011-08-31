var HomeView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("home.template.html"),

	initialize: function() {
		//_.bindAll(this, "render", "addOne");
		var Patients = new PatientsList();
		Patients.bind('add', this.addOne, this);
		Patients.bind('all', this.render, this);
		Patients.fetch();
		return this;
	}, 
	addOne : function(patient){
		this.view = new PatientListItemView({model: patient});
		this.rendered = this.view.render().el;
		//console.log("add one in HomeView:" + JSON.stringify(patient));
		$(this.$("#patients")).append(this.rendered);
	},
	addAll: function() {
		console.log("addAll");
		Patients.each(this.addOne);
	},

	render: function() {
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		var homeHtml = this.template(this.model.toJSON());
		console.log("rendering HomeView");
		$(this.el).html(homeHtml);
		Patients.each(this.addOne);
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
		var liHtml = this.template(this.model.toJSON());
		$(this.el).html(liHtml);
		//console.log("render PatientListItemView: "+ JSON.stringify(html));
		return this;
	}
});