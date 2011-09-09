
//This allows us to have separate template files
var loadWidgetTemplates = function(){
	//console.log("filename in config: " + filename);
	//var templateFunction;
	$.ajax("app/templates/templates.html",{
		dataType: "html",
		async:false, // make sure we pause execution until this template is loaded
		success: function(result){
			console.log("loaded templates.html: " + result);
			$("head").append(result);
		},
		error: function(error){
			console.log("Error loaded templates.html: " + JSON.stringify(error));
		}
	});
	console.log("Loading templates.html");
};

loadWidgetTemplates();

inputTextWidgetCompiledHtml = Handlebars.compile($("#inputTextWidget").html());
datepickerWidgetCompiledHtml = Handlebars.compile($("#datepickerWidget").html());
checkboxWidgetCompiledHtml = Handlebars.compile($("#checkboxWidget").html());
dropdownWidgetCompiledHtml = Handlebars.compile($("#dropdownWidget").html());
textareaWidgetCompiledHtml = Handlebars.compile($("#textareaWidget").html());
displayTableWidgetCompiledHtml = Handlebars.compile($("#displayTableWidget").html());
displayHeaderWidgetCompiledHtml = Handlebars.compile($("#displayHeaderWidget").html());
displaySubHeaderWidgetCompiledHtml = Handlebars.compile($("#displaySubHeaderWidget").html());
displayInfotextWidgetCompiledHtml = Handlebars.compile($("#displayInfotextWidget").html());
yesnoWidgetCompiledHtml = Handlebars.compile($("#yesnoWidget").html());
genderWidgetCompiledHtml = Handlebars.compile($("#genderWidget").html());
hiddenWidgetCompiledHtml = Handlebars.compile($("#hiddenWidget").html());
buttonWidgetCompiledHtml = Handlebars.compile($("#buttonWidget").html());

Handlebars.registerHelper("renderWidget", function(context) {
	//console.log("renderWidget:" + JSON.stringify(context));
	var template;
	var html = "";
	var useTemplate = true;
	var datatype = this.datatype;
	var inputType = this.inputType;
	var visible = this.visible;
	var tblCols = this.tblCols;
	var closeRow = this.closeRow;
	var identifier = this.identifier;
	var size = this.size;
	var maxlength = this.maxlength;
	var beginElement = "";
	var endElement = "";
	if (closeRow == "true") {
		//endElement = "</td></tr>\n<tr>\n";
	}
	if (inputType == 'text') {
		if (size == null || size == 0) {
			this.size = 20;
		}
		if (maxlength == null || maxlength == 0) {
			this.maxlength = 255;
		}
		template = inputTextWidgetCompiledHtml;
	} else if (inputType == 'patientid') {
			template = inputTextWidgetCompiledHtml;
	} else if (inputType == 'birthdate') {
		template = datepickerWidgetCompiledHtml;
	} else if (inputType == 'emptyDate') {
		template = datepickerWidgetCompiledHtml;
	} else if (inputType == 'checkbox') {
		template = checkboxWidgetCompiledHtml;
	} else if (inputType == 'dropdown-add-one') {
		template = dropdownWidgetCompiledHtml;
	} else if (inputType == 'dropdown') {
		template = dropdownWidgetCompiledHtml;
	} else if (inputType == 'select') {
		template = dropdownWidgetCompiledHtml;
	} else if (inputType == 'textarea') {
		template = textareaWidgetCompiledHtml;
	} else if (inputType == 'yesno_br') {
		template = yesnoWidgetCompiledHtml;
	} else if (inputType == 'Yes/No') {
		template = yesnoWidgetCompiledHtml;
	} else if (inputType == 'gender') {
		template = genderWidgetCompiledHtml;
//	} else if (inputType == 'display-tbl-begin') {
//		template = displayTableWidgetCompiledHtml;
	} else if (inputType == 'display-header') {
		template = displayHeaderWidgetCompiledHtml;
	} else if (inputType == 'display-sub-header') {
		template = displaySubHeaderWidgetCompiledHtml;
	} else if (inputType == 'infotext') {
		template = displayInfotextWidgetCompiledHtml;
	} else if (inputType == 'hidden') {
		template = hiddenWidgetCompiledHtml;
	} else if (inputType == 'button') {
		template = buttonWidgetCompiledHtml;
	} else {
		useTemplate = false; 
	};
	  if (useTemplate) {
		  if (datatype == "display") {
			  html = beginElement + template(this) + endElement;  
		  } else if (inputType == 'hidden') {
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

Handlebars.registerHelper('dropdown', function(items) {
	  var out = "";
	  var arry = items.split(',');
	  out = out + "<option value=\"\">--Select--</option>";
	  for(var i=0, l=arry.length; i<l; i++) {
	    out = out + "<option value=\"" + arry[i] + "\">" + arry[i] + "</option>";
	  }

	  return out;
	});

Handlebars.registerHelper('dateFormat', function(item) {
	var out = "";
	var d1 = new Date(item);
	//out = d1.toString('yyyy-MM-dd hh:mm');
	out = $.format.date(d1, "yyyy-MM-dd hh:mm:ss");
	return out;
});