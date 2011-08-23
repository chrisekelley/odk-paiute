 var Patient = Backbone.Model.extend({
    initialize : function(){
    	//console.log("init Patient: ");
      if(!this.get("date")){
        this.set({"date": new Date().getTime()});
      }
    }
  });