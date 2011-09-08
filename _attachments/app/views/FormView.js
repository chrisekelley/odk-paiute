//var currentParent;

var FormView = Backbone.View.extend({

  template: loadTemplate("form.template.html"),

  initialize: function (){
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
		this.form = this.options.currentForm;
		this.patientId = this.options.currentForm.patientId;
		$(this.el).html(this.template(this.form.toJSON()));
		var flow = this.options.currentForm.get("flow");
		var flowId = flow.id;
		var formId = this.options.currentForm.get("_id");
		this.formElements = new FormElements(this.options.currentForm.get("form_elements"), { view: this });
		var patientIdWidget = {"label": "patientIdWidget","value":this.patientId,"identifier": "patientId","inputType": "hidden"};
		var flowIdWidget = {"label": "flowIdWidget","value": flowId,"identifier": "flowId","inputType": "hidden"};
		var formIdWidget = {"label": "formIdWidget","value": formId,"identifier": "formId","inputType": "hidden"};
		this.formElements.add(patientIdWidget,{at: 0});
		this.formElements.add(flowIdWidget,{at: 1});
		this.formElements.add(formIdWidget,{at: 2}); 
		this.formElements.each(this.addOne);
		return this;
	},
  //recordSaved: false,
  currentParentName: "formElements",
  currentParent: $(this.currentParentName),
  formElements: null,
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
	  e.preventDefault();
	  console.log("validating the form submission.");
	  var validationErrors = [];
	  this.formElements.each(function(formElement){
		  var datatype = formElement.get("datatype");
		  if (datatype != "display") {
			  var inputValue = $("#" + formElement.get("identifier")).val();
			  //console.log("validate:" + formElement.get("label") + " field value:" + formElement.get("value") + " inputValue:" + inputValue);
			  validationErrors.push(formElement.validate({value:inputValue}));	
		  }
	  });
	  var errors = _.compact(validationErrors);
	  if (errors.length == 0) {
		  console.log("Ready to save");
		  var formData = $("#theForm").toObject();
		  var flowId = $("#flowId").val();
		  console.log("formData: " + JSON.stringify(formData));
		  formData.created =  new Date();
		  formData.lastModified =  formData.created;
		  if (flowId === "9") {
			  console.log("FORMY.Patients.create(formData);" + JSON.stringify(formData));
			  FORMY.Patients.create(formData,{
				  success: function(model, resp){
					  nextModel = model;
					  console.log("saveDoc nextModel.");
					  FORMY.sessionPatient = model;
					  inspectModelAndGo(model);
				  },
				  error: function() { 
					  console.log("Error saving: " + arguments); 
				  }
			  });
		  } else {
			  console.log("Saving the record using FORMY.sessionPatient.records.create");
			  FORMY.sessionPatient.records.create(formData,{
				  success: function(model, resp){
					  console.log("added new record to FORMY.sessionPatient.records.");
					  inspectModelAndGo(model);
				  },
				  error: function() { 
					  console.log("Error saving: " + arguments); 
				  }
			  });
			  //model.clear;
		  }
		  this.options.currentForm = null;
		  this.form = null;

		  //$("#formRenderingView").remove();

	  } else {
		  console.log("Errors:" + JSON.stringify(errors));
		  alert(errors);
	  }	  //}
  },
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
		FORMY.router.navigate('patientRecords/' + queryId, true);
		//FORMY.router.navigate('patientRecords/' + queryId);
}
