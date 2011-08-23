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
  currentParentName: "body",
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
		//$(this.el).html(this.template(this.model.toJSON())); 
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
    	var formCollection = this.model.get("formCollection");
    	obj.collection = formCollection;
    	console.log("saving formCollection: " + formCollection + ";data: " + JSON.stringify(obj));
    	//this.model.save(obj);
    	//formElements.create(obj);
      $.couch.db("odk").saveDoc(obj);
      router.navigate('home', true);
    } else {
    	console.log("Errors:" + JSON.stringify(errors));
    	alert(errors);
    }
  }
});
