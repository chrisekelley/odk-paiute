var currentParent;

var FormView = Backbone.View.extend({
  el: $("body"),
  template: Handlebars.compile($("#form-template").html()),
  initialize: function (){
    _.bindAll(this, "render", "addOne");
    return this;
  },
  render: function(){
    $(this.el).html(this.template());
    this.collection.each(this.addOne); // don't understand syntax - I think bindAll created default parameters for the addOne function
    return this;
  },
  addOne: function(formElement){
//	console.log("add one:" + JSON.stringify(formElement));
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
	    //$(this.$("table")).append((new FormElementView({model: formElement})).render().el);
	    currentParent.append((new FormElementView({model: formElement})).render().el);
	}
  },
  events: {
    "click #form-save " : "save",
  },
  save: function(){
    if(this.collection.valid()){
      $.couch.db("odk").saveDoc($(this.$("form")).toObject())
    }
  }
});
