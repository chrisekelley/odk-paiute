//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
form = new Form({_id: "ArrestDocket"});
form.fetch({
  success: function(model){
   // (new FormView({model: model})).render();
	  //console.log("model:" + JSON.stringify(model.get("form_elements")));
	 // (new FormView({collection: new FormElements(model.get("form_elements"))})).render();
	 (new FormView({model: model})).render(); 
  }
})



// Download the form document from couch (sample_form.json is in _docs)
//$.couch.db("odk").openDoc("ArrestDocket", {
//  success: function(doc) {
//    (new FormView({collection: new Form(doc.form_elements)})).render();
//  }
//});

//subtest = new Subtest({_id: "ArrestDocket"});
//subtest.fetch({
//  success: function(model){
//	  //console.log("model:" + JSON.stringify(model));
//    (new SubtestView({model: model})).render();
//  }
//})


