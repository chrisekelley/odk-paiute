 var AppRouter = Backbone.Router.extend({
        routes: {
        	"home":                 "home",    // #home
        	"newPatient":                 "newPatient",    // #newPatient
        	"arrestDocket":                 "arrestDocket",    // #arrestDocket
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        },
        defaultRoute: function( actions ){
            // The variable passed in matches the variable in the route definition "actions"
            //alert( actions ); 
        	newPatient;
        },
        home: function () {
        	home = new Form({_id: "PatientRegistration"});
        	home.fetch({
        		success: function(model){
        			(new PageView({model: model})).render(); 
        		}
        	});
        },
        newPatient: function () {
        	registration = new Form({_id: "PatientRegistration"});
        	registration.fetch({
        		success: function(model){
        			(new FormView({model: model})).render(); 
        		}
        	});
        },
        arrestDocket: function () {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	form = new Form({_id: "ArrestDocket"});
        	form.fetch({
        	  success: function(model){
        		 (new FormView({model: model})).render(); 
        	  }
        	});
        }
    });
    // Initiate the router
    var app_router = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();

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


