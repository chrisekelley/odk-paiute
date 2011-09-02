//var currentParent;

window.FormView = Backbone.View.extend({
  el: $("body"),
  template: loadTemplate("form.template.html"),
  initialize: function (){
	//model = this.options.model;
	//this.model = new Form(model);
	//console.log("init this.model:" + JSON.stringify(this.model));
	this.formElements = new FormElements(this.model.get("form_elements"), { view: this });
	this.formCollection = this.model.get("formCollection");
	this._id = this.model.get("_id");
	this.patientId = this.model.patientId;
	var patientIdWidget = {
		"label": "patientIdWidget",
		"value":this.patientId,
		"identifier": "patientId",
		"inputType": "hidden"
	};
	var formCollectionWidget = {
			"label": "formCollectionWidget",
			"value":this.formCollection,
			"identifier": "formCollection",
			"inputType": "hidden"
	};
	var formIdWidget = {
			"label": "formIdWidget",
			"value":this._id,
			"identifier": "formId",
			"inputType": "hidden"
	};
	this.formElements.add(patientIdWidget,{at: 0});
	this.formElements.add(formCollectionWidget,{at: 1});
	this.formElements.add(formIdWidget,{at: 2});
	console.log("init this.formCollection:" + this.formCollection + " this.patientId: " + this.patientId);
    _.bindAll(this, "render", "addOne", "saveRecord", "remove");   
    //this.model.bind("saveRecord", this.model)
    return this;
  },
  render: function(){
	$(this.el).html(this.template(this.model.toJSON()));
	//console.log("render patientId:: " + this.model.get("patientId"));
	this.formElements.each(this.addOne);
	return this;
  },
  currentParentName: "body",
  currentParent: $(this.currentParentName),
  addOne: function(formElement){
	//console.log("add one:" + JSON.stringify(formElement));
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
		 $(this.$("#formElements")).append(html);
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
	 //console.log("Element: " + identifier + " currentParentName: " + currentParentName);
  },
  events: {
    "click #form-save " : "saveRecord",
  },
  saveRecord: function(){
	  //console.log("saving this.model:" + JSON.stringify(this.model));
	  var validationErrors = [];
	  this.formElements.each(function(formElement){
		  var datatype = formElement.get("datatype");
		  if (datatype != "display") {
			  var inputValue = $("#" + formElement.get("identifier")).val();
			  //console.log("validate:" + formElement.get("label") + " field value:" + formElement.get("value") + " inputValue:" + inputValue);
			  validationErrors.push(formElement.validate({value:inputValue}));	
		  }
	  });
	  //console.log("validationErrors: " + validationErrors);
	  var errors = _.compact(validationErrors);
	  this.formCollection = $("#formCollection").val();
	  console.log("this.formCollection: " + this.formCollection);
	  this.formId = $("#formId").val();
	  console.log("this.formId: " + this.formId);
	  var thisForm = FORMY.forms.get(this.formId);
	  if (typeof thisForm === "undefined") {
		  console.log("thisForm is undefined:");
	  } else {
		  // did not work on arrestdocket:
		  //console.log(" we have the thisForm _id:" + thisForm.get("_id"));
		  // also did not work the second time submitting PatientRegistration.
		  //console.log(" we have the thisForm _id:" + thisForm._id);
		  console.log(" we have the thisForm _id");
	  }
	  //this.model = new Form(thisForm);
	  this.model = thisForm;
	  console.log("this.model.label:" + this.model.get("label"));
	  if (errors.length == 0) {
		  console.log("Ready to save");
		  //var formData = $(this.$("form")).toObject();
		  var formData = $("#theForm").toObject();
		  //this.model.save(this.model, formData);
		  this.model.save(this.model, formData,{
  			success: function(model){
  				console.log("_id: " + model._id);
  				router.navigate('patientRecords/' + model._id, true);
			},
			error: function() { 
				console.log("Error saving form: " + arguments); 
			}
		  });
		  //this.removeModel();
		  //$(this.el).remove();
		  //this.model.clear();
		  //this.remove();
		  router.navigate('home', true);
		  //$(this.$("form")).remove();
	  } else {
		  console.log("Errors:" + JSON.stringify(errors));
		  alert(errors);
	  }
  },
//  removeModel: function() {
//	  console.log("removing this.model: " + this.model)
//      //$(this.el).remove();
//      //this.model.container.remove(this.model);
//      this.model.remove(this.model);
//  }
});
