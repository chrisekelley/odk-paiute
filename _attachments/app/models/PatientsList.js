var PatientsList = Backbone.Collection.extend({
    db : {
        changes : true,
      },
    url : "/patients",
    model : Patient
    });
FORMY.Patients = new PatientsList();
console.log("Creating Patients ");
