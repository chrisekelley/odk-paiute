window.PatientRecordView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
		_.bindAll(this, "render", "addOne");
		return this;
	},      
	render: function() {
		//console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		thisHtml = this.template(this.model.toJSON());
		$(this.el).html(thisHtml);
		this.model.Records.each(this.addOne);
		return this;
	},
	addOne : function(record){
		//console.log("add one in PatientRecordView:" + JSON.stringify(record));
		this.view = new RecordListItemView({model: record});
		this.rendered = view.render().el;
		$(this.$("#records")).append(this.rendered);	
	}
});

var RecordListItemView = Backbone.View.extend({
	tagName : "li",
	template: Handlebars.compile($("#record-template").html()),
	initialize : function(){
	},

	render : function(){ 
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		$(this.el).html(this.html);
		//console.log("render RecordListItemView: "+ JSON.stringify(content));
		return this;
	}
});
