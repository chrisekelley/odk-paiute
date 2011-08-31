var PatientsList = Backbone.Collection.extend({
    url : "/patients",
    model : Patient
    });
this.Patients = new PatientsList();
