/** Configure the database **/
Backbone.couch_connector.config.db_name = "odk";
Backbone.couch_connector.config.ddoc_name = "app";
Backbone.couch_connector.config.global_changes = false;

//This allows us to have separate template files
var loadTemplate = function(filename){
	//console.log("filename in config: " + filename);
var templateFunction;
$.ajax("app/templates/" + filename,{
  async:false, // make sure we pause execution until this template is loaded
  success: function(result){
	  //console.log("result: " + result);
    templateFunction = Handlebars.compile(result);
  }
})
    // console.log("templateFunction: " + templateFunction);
return templateFunction;
}