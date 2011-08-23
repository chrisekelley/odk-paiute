//urlPrefix= "/";
//dbName = "odk";
//
//var xhrCache = {},
//    docCache = {};

var AppRouter = Backbone.Router.extend({

        routes: {
        	"/":                 "home",    // #home
        	"home":                 "home",    // #home
        	"newPatient":                 "newPatient",    // #newPatient
        	"arrestDocket":                 "arrestDocket",    // #arrestDocket
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        },
        defaultRoute: function( actions ){
            // The variable passed in matches the variable in the route definition "actions"
            //alert( actions ); 
        	Patients.fetch();
        	(new HomeView()).render(); 
        },
        initialize: function() {
        	console.log("initing AppRouter.");
        	
            //Comments.fetch();
        },
//        home: function() {
//            //tasksView.render( tasks.inbox() );
//        	console.log("AppRouter home.");
//        	Patients.fetch();
//        	//Patients.fetch();
//        },
        home: function () {
        	//home = PatientsListView();
        	//home = new Form({_id: "PatientRegistration"});
        	//new PatientsListView();
        	//new PageView();
			//list = new PatientsList();
        	//home.fetch({
//        	Patients.fetch({
//        		success: function(model){
////        			fetch("patients",  { descending : true},function(data) {
////        			});
////        			console.log("data: " + data);
//        			(new PageView({model: model})).render(); 
//        			//(new PageView(data)).render(); 
//        		}
//        	});
        	Patients.fetch();
        	(new HomeView()).render(); 
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
    //new PatientsListView();
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();
    
//    
//    function cloneObj(obj) {
//      return jQuery.extend(true, {}, obj);
//    };
//    
//    function fetch(view, opts, callback) {
//
//        var id = view + JSON.stringify(opts),
//            url = urlPrefix + dbName + "/_design/render/_view/" + view;
//        
//        if (typeof xhrCache[id] === "undefined") {
//          opts.random = new Date().getTime();
//          $.get(url, opts, function (data) {
//            xhrCache[id] = data;
//            callback(cloneObj(xhrCache[id]));
//          }, "json");
//        } else {
//          callback(cloneObj(xhrCache[id]));
//        }
//      };

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


