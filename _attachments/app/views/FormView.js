//var currentParent;

var FormView = Backbone.View.extend({
  //el: "body",
  //el: "#formRenderingView",
  //el: $("#formRenderingView"),
  template: loadTemplate("form.template.html"),
  //initialize: function (model){
	initialize: function (){
	  //window.FormView.make("div", {id: "formRenderingView"});
//	  $("#homePageView").remove();
//	  $("#patientRecordView").remove();
	  //$("#formRenderingView").remove();
	  //$("#views").append("<div id=\"formRenderingView\"></div>");
	  //this.el = $("#formRenderingView");
	  //model = this.options.model;
	  //console.log("init this.model:" + JSON.stringify(this.model));
	  //this.model = model;
	  this.recordSaved = false;

	  //console.log("init this.form:" + JSON.stringify(this.form));
	  //console.log("init this.form:" + JSON.stringify(this.options.currentForm.get("form_elements")));
	  //this.formElements = new FormElements(this.form.get("form_elements"), { view: this });
	  
	  //this.formCollection = this.model.get("formCollection");


	  
	  _.bindAll(this, "render", "addOne", "saveRecord", "remove");   
	  //this.bind("saveRecord", this.saveRecord, this);
	  this.bind("reset", this.updateView);
	  //this.model.bind('destroy', this.remove, this);
	  return this;
  },
  remove: function() {
	  console.log("remove the view in FormView");
	  $(this.el).remove();
  },
  clear: function() {
	  console.log("clear(destroy) the view");
	  this.model.destroy();
  },
  updateView: function() {
	  console.log("updateView");
	  this.remove();
	  this.render();
	},
	render: function(){
		console.log("view cid: " + this.cid);
		
		this.form = this.options.currentForm;
		var currentId = $(this.el).attr('id');
		var formRenderingViewId = $("#formRenderingView").attr('id');
		console.log("currentId from FormView: " + currentId + " formRenderingViewId: " + formRenderingViewId);
		var renderedHtml = this.template(this.form.toJSON());
		//$(this.el).html(this.template(this.form.toJSON()));
		$(this.el).html(renderedHtml);
		//$(this.el).html("test 123");
		console.log("view el: " + this.el.html());
		//$("#formRenderingView").html(this.template(this.form.toJSON()));
		//console.log("view formRenderingView html: " + $("#formRenderingView").html());
		//console.log("render patientId:: " + this.model.get("patientId"));
		//this.formElements.each(this.addOne);
		//console.log("render this.form:" + JSON.stringify(this.options.currentForm.get("form_elements")));
	
		var flow = this.options.currentForm.get("flow");
		var flowId = flow.id;
		var formId = this.options.currentForm.get("_id");
		this.patientId = this.options.currentForm.patientId;
		var formElements = new FormElements(this.options.currentForm.get("form_elements"), { view: this });
		//var formElements = new FormElements(this.options.currentForm.get("form_elements"));
		var patientIdWidget = {"label": "patientIdWidget","value":this.patientId,"identifier": "patientId","inputType": "hidden"};
		var flowIdWidget = {"label": "flowIdWidget","value": flowId,"identifier": "flowId","inputType": "hidden"};
		var formIdWidget = {"label": "formIdWidget","value": formId,"identifier": "formId","inputType": "hidden"};
		formElements.add(patientIdWidget,{at: 0});
		formElements.add(flowIdWidget,{at: 1});
		formElements.add(formIdWidget,{at: 2}); 

		formElements.each(this.addOne);
		//var renderedHtml = this.template(this.form.toJSON());
		//console.log("render renderedHtml: " + renderedHtml);
		//$("#formRenderingView").html(renderedHtml);
		return this;
	},
  recordSaved: false,
  currentParentName: "formElements",
  currentParent: $(this.currentParentName),
  addOne: function(formElement){
//	console.log("add one:" + JSON.stringify(formElement));
	var inputType = formElement.get("inputType");
	var closeRow = formElement.get("closeRow");
	var identifier = formElement.get("identifier");
	var tblCols = formElement.get("cols");
	if (tblCols == null) {
		tblCols = 3;	
	}
	if (inputType == 'display-tbl-begin') {
		template = displayTableWidgetCompiledHtml;
		html = template(formElement.toJSON());	
		 //$(this.$("#formElements")).append(html);
		 $("#formElements").append(html);
		 currentParentName = "#beginTableRow" + identifier;
		 currentParent = $(currentParentName);
	} else if (inputType == 'display-tbl-end') {
	} else if (inputType == 'hidden-empty') {
	    html = "<input id='" + identifier + "'name='" + identifier + "' type='hidden'></input>";
	    $(this.$("#formElements")).append(html);
	} else if (inputType == 'hidden-preset') {
		html = "<input id='" + identifier + "'name='" + identifier + "' type='hidden'></input>";
		$(this.$("#formElements")).append(html);
	} else if (inputType == 'display-header') {
		formElement.set({"tblCols" : tblCols});
		currentParent.append((new FormElementView({model: formElement})).render().el);
	} else if (inputType == 'hidden') {
		currentParentName = "#theForm";
		currentParent = $(currentParentName);
		closeRow == "true";
		$(this.$("#formElements")).append((new FormElementView({model: formElement})).render().el);
	} else {
	    currentParent.append((new FormElementView({model: formElement})).render().el);
	}
	if (closeRow == "true") {
		$("table").append("<tr id=\"row" + identifier + "\"></tr>");
		currentParentName = "#row" + identifier;
		currentParent = $(currentParentName);
	}
	 //log("Element: " + identifier + " currentParentName: " + currentParentName);
  },
  events: {
    "click #form-save" : "saveRecord",
  },
  saveRecord: function(e){
	  console.log("this.recordSaved: " + this.recordSaved);
	  if (!this.recordSaved) {
		  //alert("Saving New Record.");
		  console.log("******");
		  console.log("*** saveRecord ***");
		  console.log("view cid: " + this.cid);
		  e.preventDefault();
		  //console.log("saving this.model:" + JSON.stringify(this.model));
		  var validationErrors = [];
		  
			var formElements = new FormElements(this.options.currentForm.get("form_elements"), { view: this });
			//var formElements = new FormElements(this.options.currentForm.get("form_elements"));
			var patientIdWidget = {"label": "patientIdWidget","value":this.patientId,"identifier": "patientId","inputType": "hidden"};
			var flowIdWidget = {"label": "flowIdWidget","value": flowId,"identifier": "flowId","inputType": "hidden"};
			var formIdWidget = {"label": "formIdWidget","value": formId,"identifier": "formId","inputType": "hidden"};
			formElements.add(patientIdWidget,{at: 0});
			formElements.add(flowIdWidget,{at: 1});
			formElements.add(formIdWidget,{at: 2}); 
		  
		  
		  formElements.each(function(formElement){
			  var datatype = formElement.get("datatype");
			  if (datatype != "display") {
				  var inputValue = $("#" + formElement.get("identifier")).val();
				  //console.log("validate:" + formElement.get("label") + " field value:" + formElement.get("value") + " inputValue:" + inputValue);
				  validationErrors.push(formElement.validate({value:inputValue}));	
			  }
		  });
		  //console.log("validationErrors: " + validationErrors);
		  var errors = _.compact(validationErrors);
		  //this.formCollection = $("#formCollection").val();
		  //console.log("this.formCollection: " + this.formCollection);
		  var formId = $("#formId").val();
		  console.log("formId: " + formId);
		  var flowId = $("#flowId").val();
		  console.log("flowId: " + flowId);
		  //var thisForm = FORMY.forms.get(this.formId);
		  //var thisForm = this.form;
//		  if (typeof thisForm === "undefined") {
//			  console.log("thisForm is undefined:");
//		  } else {
//			  // did not work on arrestdocket:
//			  //console.log(" we have the thisForm _id:" + thisForm.get("_id"));
//			  // also did not work the second time submitting PatientRegistration.
//			  //console.log(" we have the thisForm _id:" + thisForm._id);
//			  console.log("thisForm is available.");
//		  }
		  //this.model = new Form(thisForm);
		  //this.model = thisForm;
		  //console.log("this.model.get(\"formId\"):" + thisForm.get("formId"));
		  //console.log("model.get(\"formId\"):" + model.get("formId"));
		  if (errors.length == 0) {
			  console.log("Ready to save");
			  //var formData = $(this.$("form")).toObject();
			  var formData = $("#theForm").toObject();
			  //this.model.save(this.model, formData);
			  console.log("formData: " + JSON.stringify(formData));
			  //console.log("this.collection: " + formData.collection + "; this.collection: " + this.collection);
			  formData.created =  new Date();
			  formData.lastModified =  formData.created;
			  console.log("formData.patientId: " + formData.patientId + ";data: " + JSON.stringify(formData));
			  //if (formData.collection === 9) {
			  if (flowId === "9") {
				  console.log("FORMY.Patients.create(formData);" + JSON.stringify(formData));
				  FORMY.Patients.create(formData,{
					  success: function(model, resp){
						  //ids = resp.id;
						  nextModel = model;
						  console.log("saveDoc nextModel.");
						  FORMY.sessionPatient = model;
//						  var success = options.success;
//						  if (success) {
//						  console.log("moving to the success callback using nextModel.");
//						  success(nextModel);
//						  }
//						  options.error = wrapError(options.error, name, options);
						  inspectModelAndGo(model);
					  },
					  error: function() { 
						  console.log("Error saving: " + arguments); 
					  }
				  });
			  } else {
				  console.log("Saving the record.");
//				  console.log("FORMY.sessionPatient: " + JSON.stringify(FORMY.sessionPatient));
//				  console.log("FORMY.sessionPatient.records: " + JSON.stringify(FORMY.sessionPatient.records));
				  //var record = new Form(formData);
				  //record.save(formData);
				  FORMY.sessionPatient.records.create(formData,{
					  success: function(model, resp){
						  //ids = resp.id;
						  //nextModel = model;
						  console.log("added new record to FORMY.sessionPatient.records.");
//						  var success = options.success;
//						  if (success) {
//						  console.log("moving to the success callback using nextModel.");
//						  success(nextModel);
//						  }
//						  options.error = wrapError(options.error, name, options);
						  inspectModelAndGo(model);
					  },
					  error: function() { 
						  console.log("Error saving: " + arguments); 
					  }
				  });
//				  var success = options.success;
//				  success(formData);
				  //model.clear;
			  }
			  this.recordSaved = true;
			  this.options.currentForm = null;
			  this.form = null;
			  
			  $("#formRenderingView").remove();

			  //this.removeModel();
			  //$(this.el).remove();
			  //this.model.clear();
			  //this.remove();
			  //router.navigate('home', true);
			  //$(this.$("form")).remove();
		  } else {
			  console.log("Errors:" + JSON.stringify(errors));
			  alert(errors);
		  }
	  } else {
		  console.log("Record has already been saved.");
	  }
  },
//  removeModel: function() {
//	  console.log("removing this.model: " + this.model)
//      //$(this.el).remove();
//      //this.model.container.remove(this.model);
//      this.model.remove(this.model);
//  }
});

function inspectModelAndGo(newRecord) {
	var queryId = null;
		var formId = null;
		var identifier = null;
		var patientId = null;
		if ((typeof newRecord.get !== "undefined") && (typeof newRecord.get("formId") !== "undefined")) {
			formId =  newRecord.get("formId");
		} else {
			formId =  newRecord.formId;		
		}
		if ((typeof newRecord.get !== "undefined") && (typeof newRecord.get("_id") !== "undefined")) {
			identifier =  newRecord.get("_id");
		} else {
			identifier =  newRecord._id;	
		}
		if ((typeof newRecord.get !== "undefined") && (typeof newRecord.get("patientId") !== "undefined")) {
			patientId =  newRecord.get("patientId");  					
		} else {
			patientId =  newRecord.patientId;		
		}
		
		if (formId === "PatientRegistration") {
			queryId =  identifier;
			console.log("identifier is queryId: " + queryId + "for formId: " + formId);					
		 } else {
			queryId = patientId;
			console.log("patientId is queryId: " + queryId + "for formId: " + formId);
		 }
		router.navigate('patientRecords/' + queryId, true);
}
