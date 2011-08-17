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

Handlebars.registerHelper('ifString', function(item, block, inverse) {
	  var selected = false;
	  console.log("Item: " + item);
	  if (item == 'string') {
		  selected = true;
	  };
	  if (item == 'DateTime') {
//		  $('#datepicker').datepicker({
//				showOn: 'button', buttonImageOnly: true, buttonImage: 'images/icon_cal.png'
//			});
		  //$('#datepicker').datepicker({showOn: 'button', buttonImageOnly: true, buttonImage: 'images/icon_cal.png'});
		  //return "<div id=\"datepicker\"></div><script>$(\"#datepicker\").datepicker();</script>";
		  return "<input id='datepicker' name='datepicker' type='text' ></input><script>$('#datepicker').datepicker({showOn: 'button', buttonImageOnly: true, buttonImage: 'images/icon_cal.png'});</script>";
	  };

	  if(selected) {
	    return block(this);
	  }
	  else {
		  return inverse(this); 
	}
	  ;
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