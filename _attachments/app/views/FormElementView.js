var FormElementView = Backbone.View.extend({
  tagName: "td",
  template: Handlebars.compile($("#form-element-template").html()),
  initialize: function (){
    this.model.bind('change', this.render, this);
    this.model.bind('validationError', this.showErrorMessages, this);
    this.model.view = this;
  },
  events: {
    "change" : "validate",
  },
  validate: function() {
    // clear old error messages before validation occurs
	
    this.$(".error-message").html("").hide();
    console.log("inputType: " + this.model.get("inputType"));
    var inputType = this.model.get("inputType");
    var currentValue = this.$("input").val();
    if (inputType == "dropdown") {
    	currentValue = this.$("select").val();
    } else if (inputType == "dropdown-add-one") {
    	currentValue = this.$("select").val();
    } else if (inputType == "checkbox") {
    	currentValue = this.$("checkbox").val();
    }
    console.log("FormElementView validate currentValue: " + currentValue);
    var validationResult = this.model.validate({value:currentValue });
    if (validationResult == null) {
    } else {
        console.log("validation error: " + validationResult);
    }
    return validationResult;
  },
  render: function(){
	  var colspan = this.model.get("colspan");
	  //console.log("colspan: " + colspan);
	  if (colspan == null) {
		  colspan = 1;
	  }
	  $(this.el).attr('colspan',colspan);
	  $(this.el).html(this.template(this.model.toJSON())); 
	  return this;
  },
  showErrorMessages: function (error){
    this.$(".error-message").html(error.join(". ")).show();
  }
});
