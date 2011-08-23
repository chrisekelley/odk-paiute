var PageView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("home.template.html"),
	initialize: function() {
		var json = {"content": "This is a rather interesting test."};
		console.log("init PageView: " + json);
    },
    
    render: function() {
    	var json = {"content": "This is a test."};
    	
    	 //$(this.el).html(this.template(this.model.toJSON()));
    	html = this.template(json);
    	console.log("rendering PageView html: " + html);
    	 $(this.el).html(html);
    	 return this;
      },
});