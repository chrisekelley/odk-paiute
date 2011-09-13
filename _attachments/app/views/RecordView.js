window.RecordView = Backbone.View.extend({
	el: $("#patientRecordView"),
	template: loadTemplate("record.template.html"),
	initialize: function() {
		_.bindAll(this, "render");
		return this;
	},      
	render: function() {
		if (window.orientation == -90) {
			this.orientation = "vert";
			this.template =  loadTemplate("record.vert.template.html");
		} else {
			this.orientation = "horiz";
			this.template =  loadTemplate("record.vert.template.html");
			//this.template =  loadTemplate("home.template.html");
		}
		console.log("this.model: "+ JSON.stringify(this.model.toJSON()));
		this.form = this.options.currentForm;
		//console.log("form: " + JSON.stringify(this.form));
		
		this.formElements = new FormElements(this.form.get("form_elements"), { view: this });
		this.formElements.each(this.addOne);

		
		thisHtml = this.template(this.model.toJSON());
		//$(this.el).html(thisHtml);
		$("#patientRecordView").html(thisHtml);
		return this;
	},
	 addOne: function(formElement){
//			console.log("add one:" + JSON.stringify(formElement));
			 this.currentRow ++;
			 //console.log("currentRow: " + this.currentRow);
			var inputType = formElement.get("inputType");
			var closeRow = formElement.get("closeRow");
			var identifier = formElement.get("identifier");
			var tblCols = formElement.get("cols");
			var size = formElement.get("size");
			if (this.orientation === "vert") {
				tblCols = 2;
				if (this.currentRow % 2) {
					closeRow = "false";
				} else {
					closeRow = "true";
					//console.log("Setting closeRow to true; currentRow: " + this.currentRow);
				}
				if (inputType == 'button') {
					closeRow = "true";
					formElement.set({"width":"450"});
				} else if (inputType == 'text') {
					if (size > 25) {
						console.log("Size: " + size);
						closeRow = "true";
						formElement.set({"colspan":"2"});
					}
				} else if (inputType == 'textarea') {
						closeRow = "true";
						formElement.set({"colspan":"2"});
				} else {
					formElement.set({"colspan":"1"});
				}
			}
			if (tblCols == null) {
				if (this.orientation === "vert") {
					tblCols = 2;
				} else {
					tblCols = 3;
				}
			}
			//console.log("add one:" + JSON.stringify(formElement));
			if (inputType == 'display-tbl-begin') {
				template = displayTableWidgetCompiledHtml;
				html = template(formElement.toJSON());	
				 //$(this.$("#formElements")).append(html);
				 $("#formElements").append(html);
				 currentParentName = "#beginTableRow" + identifier;
				 currentParent = $(currentParentName);
				 currentTableName = "#beginTableRow" + identifier;;
			} else if (inputType == 'display-tbl-end') {
			} else if (inputType == 'hidden-empty') {
			    html = "<input id='" + identifier + "'name='" + identifier + "' type='hidden'></input>";
			    $(this.$("#formElements")).append(html);
			} else if (inputType == 'hidden-preset') {
				html = "<input id='" + identifier + "'name='" + identifier + "' type='hidden'></input>";
				$(this.$("#formElements")).append(html);
			} else if (inputType == 'display-header') {
				formElement.set({"tblCols" : tblCols});
				currentParent.append((new FormElementView({model: formElement})).render().el);
			} else if (inputType == 'hidden') {
				currentParentName = "#theForm";
				currentParent = $(currentParentName);
				closeRow = "false";
				$(this.$("#formElements")).append((new FormElementView({model: formElement})).render().el);
				console.log("Hidden Element: " + identifier + " currentParentName: " + currentParentName);
			} else {
			    currentParent.append((new FormElementView({model: formElement})).render().el);
			}
			if (closeRow == "true") {
				//$("table").append("<tr id=\"row" + identifier + "\"></tr>");
				$(currentTableName).append("<tr id=\"row" + identifier + "\"></tr>");
				currentParentName = "#row" + identifier;
				currentParent = $(currentParentName);
				console.log("CloseRow currentParentName: " + currentParentName);
			}
			 console.log("Element: " + identifier + " currentParentName: " + currentParentName);
		  },
});

