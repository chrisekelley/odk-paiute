var PatientRecordView = Backbone.View.extend({
	el: $("body"),
	template: loadTemplate("patient.template.html"),
	initialize: function() {
		//_.bindAll(this, 'render');
		_.bindAll(this, "render", "addOne");
		

//		patient.Records.fetch({
//			success : function(){
//				console.log("Records:" + JSON.stringify(this.patient.Records));
//				//console.log("this:" + JSON.stringify(this.patient));
//				this.patient.Records.each(this.addOne);
//			},
//			error : function(){
//				console.log("error");
//			}
//		});
		return this;
	},      
	render: function() {
		//patient.fetch();
		//var Records = new PatientRecordList();
		//Patients.fetch();
		//patient.Records.fetch(); 
		//this.model.Records = new PatientRecordList(this.model.Records);
		//console.log("this.model: "+ JSON.stringify(this.Records));
		//console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		//patient = new Patient(this.model);
		thisHtml = this.template(this.model.toJSON());
		$(this.el).html(thisHtml);
		this.model.Records.each(this.addOne);
		return this;
	},
	addOne : function(record){
		console.log("add one in PatientRecordView:" + JSON.stringify(record));
		var view = new RecordListItemView({model: record});
		var rendered = view.render().el;
		$(this.$("#records")).append(rendered);
	}
});

var RecordListItemView = Backbone.View.extend({
    tagName : "li",
    template: Handlebars.compile($("#record-template").html()),
     initialize : function(){
      //_.bindAll(this, 'render');
      //this.model.bind('change', this.render);
    },
    
    render : function(){ 
      var content = this.model.toJSON();
      html = this.template(content);
      $(this.el).html(html);
      console.log("render RecordListItemView: "+ JSON.stringify(html));
      return this;
    }
  });
	