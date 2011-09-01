var HomeView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("home.template.html"),

	initialize: function() {
		//_.bindAll(this, "render", "addOne");
		_.bindAll(this, 'addOne', 'reseted', 'render');
		//Patients = new PatientsList();
		FORMY.Patients.bind('add',   this.addOne, this);
		FORMY.Patients.bind('reset', this.reseted, this);
		FORMY.Patients.bind('all',   this.render, this);
		FORMY.Patients.fetch();
		return this;
	}, 
	addOne : function(patient){
		this.view = new PatientListItemView({model: patient});
		this.rendered = this.view.render().el;
		//console.log("add one in HomeView:" + JSON.stringify(patient));
		$(this.$("#patients")).append(this.rendered);
	},
	reseted: function() {
		console.log("reseted; Patients count: " + FORMY.Patients.length);
		$(this.el).html("");
		FORMY.Patients.each(this.addOne);
	},

	render: function() {
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		//this.content = this.model.toJSON();
		var homeViewHtml = this.template(this.model.toJSON());
		console.log("rendering HomeView");
		$(this.el).html(homeViewHtml);
		//if(FORMY.Patients.length > 0){
		FORMY.Patients.each(this.addOne);
		//}
		return this;
	},
});

var PatientListItemView = Backbone.View.extend({
	tagName : "li",
	template: Handlebars.compile($("#patient-template").html()),
	initialize : function(){
		//this.model.bind('change', this.render, this);
		// from backbone-couch.js chat example:
		 _.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},

	render : function(){ 
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		$(this.el).html(this.html);
		//console.log("render PatientListItemView: "+ JSON.stringify(html));
		return this;
	}
});