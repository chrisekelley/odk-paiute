var PatientRecordView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
		//_.bindAll(this, 'render');
		_.bindAll(this, "render", "addOne");
		return this;
	},      
	render: function() {
		//console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		//patient = new Patient(this.model);
		thisHtml = this.template(this.model.toJSON());
		$(this.el).html(thisHtml);
		this.model.Records.each(this.addOne);
		return this;
	},
	addOne : function(record){
		//console.log("add one in PatientRecordView:" + JSON.stringify(record));
		var view = new RecordListItemView({model: record});
		var rendered = view.render().el;
		$(this.$("#records")).append(rendered);	
	}
});

var RecordListItemView = Backbone.View.extend({
    tagName : "li",
    template: Handlebars.compile($("#record-template").html()),
     initialize : function(){
    },
    
    render : function(){ 
      var content = this.model.toJSON();
      html = this.template(content);
      $(this.el).html(html);
      //console.log("render RecordListItemView: "+ JSON.stringify(html));
      return this;
    }
  });
	