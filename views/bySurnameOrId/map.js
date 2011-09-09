function(doc) {
	if(doc.surname) {
		emit(doc.surname, doc);
	}
}