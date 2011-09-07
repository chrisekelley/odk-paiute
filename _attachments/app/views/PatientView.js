window.PatientRecordView = Backbone.View.extend({
	el: $("#patientRecordView"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
//		$("#homePageView").remove();
//		$("#formRenderingView").remove();
//		$("#views").append("<div id=\"patientRecordView\"></div>");
		_.bindAll(this, "render", "addOne");
		return this;
	},      
	render: function() {
		//console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		thisHtml = this.template(this.model.toJSON());
		//$(this.el).html(thisHtml);
		$("#patientRecordView").html(thisHtml);
		FORMY.sessionPatient.records.each(this.addOne);
		return this;
	},
	addOne : function(record){
		//console.log("add one in PatientRecordView:" + JSON.stringify(record));
		this.view = new RecordListItemView({model: record});
		this.rendered = this.view.render().el;
		//$(this.$("#records")).append(this.rendered);	
		$("#records").append(this.rendered);	
	}
});

var RecordListItemView = Backbone.View.extend({
	tagName : "li",
	template: Handlebars.compile($("#record-template").html()),
	initialize : function(){
	},

	render : function(){ 
		var content = this.model.toJSON();
		var html = this.template(content);
		$(this.el).html(html);
		console.log("render RecordListItemView: "+ JSON.stringify(content));
		return this;
	}
});
