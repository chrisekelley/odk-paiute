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
    var currentValue = this.$("input").val();
    console.log("FormElementView validate currentValue: " + currentValue);
    var validationResult = this.model.validate({value:currentValue });
    if (validationResult == null) {
    	//this.model.save({value: this.$("input").val()});
    	this.model.set({value: currentValue});
    	//console.log("this.model:" + JSON.stringify(this.model));
    } else {
        console.log("validation result: " + validationResult);
    }
    return validationResult;
  },
  render: function(){
	  //var type = this.model.get("datatype");
	  // console.log(type + ": " + JSON.stringify(type));
	  $(this.el).html(this.template(this.model.toJSON())); 
	  return this;
  },
  showErrorMessages: function (error){
    this.$(".error-message").html(error.join(". ")).show();
  }
});
