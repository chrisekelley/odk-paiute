var currentParent;

var FormView = Backbone.View.extend({
  el: $("body"),
  template: loadTemplate("form.template.html"),
  initialize: function (){
	this.formElements = new FormElements(this.model.get("form_elements"));
    _.bindAll(this, "render", "addOne");
    return this;
  },
  render: function(){
	$(this.el).html(this.template(this.model.toJSON()));
	this.formElements.each(this.addOne); // don't understand syntax - I think bindAll created default parameters for the addOne function
    return this;
  },
  addOne: function(formElement){
	//console.log("add one:" + JSON.stringify(formElement));
	var inputType = formElement.get("inputType");
	var closeRow = formElement.get("closeRow");
	var identifier = formElement.get("identifier");
	var tableCols = 3;
	if (closeRow == "true") {
		$("table").append("<tr id=\"" + identifier + "\"></tr>");
		currentParent = $("#" + identifier);
	}
	if (inputType == 'display-tbl-begin') {
		useTemplate = false; 
		html = createTableBegin(this);
		 $(this.$("#formElements")).append(html);
		 $("table").append("<tr id=\"beginTableRow\"></tr>");
		 currentParent = $("#beginTableRow");
		 tblCols = formElement.get("cols");
	} else if (inputType == 'display-tbl-end') {
	} else if (inputType == 'display-header') {
		formElement.set({"tblCols" : tblCols});
		html = createDisplayHeader(formElement);
		$("tbody").append(html);
	} else {
	    currentParent.append((new FormElementView({model: formElement})).render().el);
	}
  },
  events: {
    "click #form-save " : "save",
  },
  save: function(){
	var validationErrors = [];
    this.formElements.each(function(formElement){
    	var datatype = formElement.get("datatype");
    	if (datatype != "display") {
    	    var inputValue = $("#" + formElement.get("identifier")).val();
    	    console.log("validate:" + formElement.get("label") + " field value:" + formElement.get("value") + " inputValue:" + inputValue);
    	    validationErrors.push(formElement.validate({value:inputValue}));	
    	}
    });
    console.log("validationErrors: " + validationErrors);
    var errors = _.compact(validationErrors);
    if (errors.length == 0) {
    	console.log("Ready to save");
    	var obj = $(this.$("form")).toObject();
    	console.log("saving: "+ JSON.stringify(obj));
    	//this.model.save(obj);
    	//formElements.create(obj);
      $.couch.db("odk").saveDoc(obj);
    } else {
    	console.log("Errors:" + JSON.stringify(errors));
    	alert(errors);
    }
  }
});
