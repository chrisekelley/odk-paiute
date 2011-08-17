function createTableBegin(pageItem) {
	var output = "";
	if ((pageItem.visible == false)) {
		styleText = " style=\"display:none; border:none;\"";
		output = "<table border=\"0\" cellpadding=\"4\" cellspacing=\"2\" width=\"95%\"  id=\"tbl" + pageItem.identifier + "\"" + styleText + ">\n";
	} else {
		output = "<table border=\"0\" cellpadding=\"4\" cellspacing=\"2\" width=\"95%\"  id=\"tbl" + pageItem.identifier + "\" class=\"formTable\">\n";
	}
	if ((pageItem.getCols() != null) && (pageItem.getCols() > 1)) {
		tblCols = pageItem.getCols();
	} else {
		tblCols = 1;
	}
	return output;
}

function createTableEnd() {
	return "</table>\n";
}

function createDisplayHeader(pageItem) {
	var output = "";
	if ((pageItem.isVisible() == false)) {
		styleText = " style=\"display:none; border:none;\"";
		sbufViewWidgets.append("\t<tr class=\"sectionHeader\" id=\"" + identifier + "\"" + styleText + "><td colspan=\"" + tblCols + "\">" +
				"<span class=\"sectionHeader\">" + formField.getLabel() + "</span>" +
		"</td></tr>\n");
	} else {
		sbufViewWidgets.append("\t<tr class=\"sectionHeader\" id=\"" + identifier + "\"><td colspan=\"" + tblCols + "\">" +
				"<span class=\"sectionHeader\">" + formField.getLabel() + "</span>" +
		"</td></tr>\n");
	}
	return output;
}

function createDisplaySubheader(pageItem) {
	var output = "";
	sbufViewWidgets.append("\t<tr style=\"background-color:" + tdBackgroundColor + ";\"><td colspan=\"" + tblCols + "\" style=\"background-color:#E6E6FA;\">" +
			"<span class=\"sectionSubHeader\">" + formField.getLabel() + "</span>" +
	"</td></tr>\n");
	return output;
}

Handlebars.registerHelper("renderWidget", function(context) {
	//console.log("this:" + JSON.stringify(this));
	var template;
	var html;
	var useTemplate = true;
	var datatype = this.datatype;
	 if (datatype == 'string') {
		 template = Handlebars.compile($("#inputTextWidget").html());
	  } else if (datatype == 'DateTime') {
		 template = Handlebars.compile($("#datepickerWidget").html());
	  } else if (datatype == 'bool') {
		  template = Handlebars.compile($("#checkboxWidget").html());
	  } else {
		  useTemplate = false; 
	  };
	  console.log("useTemplate: " + useTemplate + " datatype: " + datatype);
	  if (useTemplate == true) {

		  html = template(this); 
	  } else {
		  html = "No template- datatype: " + datatype;
	  }
	  //console.log("html: " + html);
	  return html;
	});

// Debug handlebars.js templates
// place {{debug}} in your template
// kudos: http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/
Handlebars.registerHelper("debug", function(optionalValue) {
	  console.log("Current Context");
	  console.log("====================");
	  console.log(this);
	 
	  if (optionalValue) {
	    console.log("Value");
	    console.log("====================");
	    console.log(optionalValue);
	  }
	});