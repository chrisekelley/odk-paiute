var PatientsListView = Backbone.View.extend({
    el: $("#patients"),
  
    initialize : function(){
      _.bindAll(this, 'reseted', 'addRow');
    
      Patients.bind("reset", this.reseted);
      Patients.bind("add", this.addRow);
	  this.el.html("");
      //console.log("Patients:" + JSON.stringify(Patients));
      if(Patients.length > 0){
    	  Patients.each(this.addRow);
      }
    },  
    addRow : function(patient){
        var view = new PatientView({model: patient});
        var rendered = view.render().el;
        console.log("add one in PatientsListView:" + JSON.stringify(rendered));
        this.el.append(rendered);
      },
      reseted : function(){
    	  this.el.html("");
          if(Patients.length > 0){
        	  Patients.each(this.addRow);
          }
        }
      });