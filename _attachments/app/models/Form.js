window.Form = Backbone.Model.extend({
  initialize: function(){
	  this.formElements = new FormElements;
	  _.bindAll(this, "save", "clear");
	  //this.bind("reset", this.updateView);
  },
  url: "/form",
  save: function(formObject, formData, options){
	  options || (options = {});
	  //console.log("saving this.model:" + JSON.stringify(formObject));
	  this.formCollection = formObject.get("formCollection");
	  console.log("this.formCollection: " + this.formCollection);
	  formData.collection = this.formCollection;
	  formData.created =  new Date();
	  formData.lastModified =  formData.created;
	  console.log("save formData.collection:" + formData.collection + " formData.patientId: " + formData.patientId + ";data: " + JSON.stringify(formData));
	  if (formData.collection == "patients") {
		  console.log("FORMY.Patients.create(formData);");
		  FORMY.Patients.create(formData,{
  			success: function(model, resp){
  				//ids = resp.id;
  				nextModel = model;
  				console.log("saveDoc nextModel: " + JSON.stringify(nextModel));
  				FORMY.newPatient = model;
  				var success = options.success;
  				if (success) {
  					console.log("moving to the success callback.");
					success(model);
				}
  				options.error = wrapError(options.error, name, options);
			},
			error: function() { 
				console.log("Error saving: " + arguments); 
			}
		});
	  } else {
		  $.couch.db("odk").saveDoc(formData);
		  //model.clear;
	  }
  },
});
