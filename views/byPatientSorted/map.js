function(doc) {
  if (doc.collection === "patients") {
    emit([doc.lastModified], doc);
  }
}
