window.Form = Backbone.Model.extend({
  initialize: function(){
	  this.formElements = new FormElements;
	  //this.formCollection = "";
	  //this.patientId = "";
	  _.bindAll(this, "save", "clear");
	  //this.bind("reset", this.updateView);
  },
  url: "/form",
//  clear: function() {
//      //this.view.remove();
//      this.clear();
//  },
  save: function(formObject, formData){
	  //console.log("saving this.model:" + JSON.stringify(formObject));
	  //var obj = $(this.$("form")).toObject();
	  this.formCollection = formObject.get("formCollection");
	  console.log("this.formCollection: " + this.formCollection);
	  //var patientId = this.model.get("patientId");

	  formData.collection = this.formCollection;
	  //var patientId = this.patientId;
//	  if (this.patientId != null) {
//		  formData.patientId = this.patientId;
//	  }

	  //obj.created =  new Date().getTime();
	  formData.created =  new Date();
	  formData.lastModified =  formData.created;
	  //console.log("saving formCollection: " + formCollection + "; patientId: " + patientId + ";data: " + JSON.stringify(formData));
	  console.log("save formData.collection:" + formData.collection + " formData.patientId: " + formData.patientId + ";data: " + JSON.stringify(formData));
	  if (formData.collection == "patients") {
		  console.log("FORMY.Patients.create(formData);");
//		  opts = { 
//				  success : function(){ console.log("success: " + JSON.stringify(nextModel));},
//				  error : function(){ alert("could no create the doc"); }};
		  FORMY.Patients.create(formData,{
  			success: function(model, resp){
  				 ids = resp.id;
  				//console.log("resp id: " + resp.get("id")); 
  				nextModel = model;
  				console.log("saveDoc nextModel: " + JSON.stringify(nextModel));
  				FORMY.newPatient = model;
			},
			error: function() { 
				console.log("Error saving: " + arguments); 
			}
		});

		  
		  //console.log("new record info: " + JSON.stringify(newRecord));
		  //this.clear();
		  //this.model.clear;
		  //updateView();
		  //this.remove;
		  //FORMY.Patients.fetch();
	  } else {
		  $.couch.db("odk").saveDoc(formData);
		  //model.clear;
	  }
  },
//  updateView: function() {
//	  console.log("updateView");
//	  view.remove();
//	  view.render();
//	}
});
