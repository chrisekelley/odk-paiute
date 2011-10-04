function(doc) {
  if (doc.formBuilder) {
	  emit(doc.formBuilder, doc);
  }
};
