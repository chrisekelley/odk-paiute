window.RecordView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("record.template.html"),
	initialize: function() {
		//_.bindAll(this, "render", "addOne");
		return this;
	},      
	render: function() {
		console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		thisHtml = this.template(this.model.toJSON());
		$(this.el).html(thisHtml);
		return this;
	},
});

