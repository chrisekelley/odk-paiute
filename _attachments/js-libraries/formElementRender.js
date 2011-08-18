function createTableBegin(pageItem) {
	var output = "";
	if ((pageItem.visible == false)) {
		styleText = " style=\"display:none; border:none;\"";
		output = "<table border=\"0\" cellpadding=\"4\" cellspacing=\"2\" width=\"95%\"  id=\"tbl" + pageItem.identifier + "\"" + styleText + ">\n";
	} else {
		output = "<table border=\"0\" cellpadding=\"4\" cellspacing=\"2\" width=\"95%\"  id=\"tbl" + pageItem.identifier + "\" class=\"formTable\">\n";
	}
//	if ((pageItem.getCols() != null) && (pageItem.getCols() > 1)) {
//		tblCols = pageItem.getCols();
//	} else {
//		tblCols = 1;
//	}
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

inputTextWidgetCompiledHtml = Handlebars.compile($("#inputTextWidget").html());
datepickerWidgetCompiledHtml = Handlebars.compile($("#datepickerWidget").html());
checkboxWidgetCompiledHtml = Handlebars.compile($("#checkboxWidget").html());

Handlebars.registerHelper("renderWidget", function(context) {
	//console.log("this:" + JSON.stringify(this));
	var template;
	var html = "";
	var useTemplate = true;
	var datatype = this.datatype;
	var inputType = this.inputType;
	var visible = this.visible;
	var tblCols = this.tblCols;
	var closeRow = this.closeRow;
	var identifier = this.identifier;
//	var beginElement = "<td>";
//	var endElement = "</td>";
	var beginElement = "";
	var endElement = "";
	if (closeRow == "true") {
		//endElement = "</td></tr>\n<tr>\n";
	}
//	if (inputType == 'display-tbl-begin') {
//		useTemplate = false; 
////		html = createTableBegin(this);
////		console.log("useTemplate: " + useTemplate + " inputType: " + inputType + " html: " + html);
//		tableBegin = document.createElement('table');
//		return tableBegin;
//	} else if (inputType == 'display-tbl-end') {
//		useTemplate = false; 
//		html = "</table>";
//		console.log("useTemplate: " + useTemplate + " inputType: " + inputType + " html: " + html);
//		return html;
//	} else 
		if (inputType == 'text') {
		template = inputTextWidgetCompiledHtml;
	} else if (inputType == 'emptyDate') {
		template = datepickerWidgetCompiledHtml;
	} else if (inputType == 'checkbox') {
		template = checkboxWidgetCompiledHtml;
	} else {
		useTemplate = false; 
	};
	  if (useTemplate) {
		  if (datatype == "Display") {
			  html = beginElement + template(this) + endElement;  
		  } else {
			  var labelHtml = "<label for='" + identifier + "'>" + this.label + "</label>: ";
			  var errorHtml = " <span class='error-message' style='display:none'></span>";
			  html = beginElement + labelHtml + template(this) + errorHtml + endElement; 
			  //console.log("useTemplate: " + useTemplate + " inputType: " + inputType + " closeRow: " + closeRow + " html: "+ html);
		  }
	  } else {
		  if (html == "") {
			  html = beginElement + "No template- inputType: " + inputType + endElement; 
		  }
		  console.log("html: " + html);
	  }
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