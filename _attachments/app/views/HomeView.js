var HomeView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("home.template.html"),

	initialize: function() {
		//_.bindAll(this, "render", "addOne");
		this.Patients = new PatientsList();
		this.Patients.bind('add',   this.addOne, this);
		//Patients.bind('reset', this.addAll, this);
		this.Patients.bind('all',   this.render, this);
		this.Patients.fetch();
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
		this.Patients.each(this.addOne);
	},

	render: function() {
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		console.log("rendering HomeView");
		$(this.el).html(this.html);
		//if(Patients.length > 0){
		this.Patients.each(this.addOne);
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
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		$(this.el).html(this.html);
		//console.log("render PatientListItemView: "+ JSON.stringify(html));
		return this;
	}
});