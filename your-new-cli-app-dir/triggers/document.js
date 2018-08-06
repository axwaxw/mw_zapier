const getList = (z, bundle) => {

  var XML = require('pixl-xml');
  var url = bundle.authData.url;
  var document = bundle.authData.document;

  url += "/list/";

  const responsePromise = z.request({ url: url });
  return responsePromise
    .then(response => {

      var documents = XML.parse(response.content, { preserveAttributes: true, preserveDocumentNode: true });

      id: index,
        document: $(element).text()

      var documents_array = documents.map(document, index => (
        {
          id: index,
          document: document.text
        }
      ));

      console.log(documents_array);
      return z.JSON.parse(documents_array);

    });
};








module.exports = {
  key: 'document',
  noun: 'document',

  display: {
    label: 'Document',
    description: 'Moneyworks document',
    hidden: true,
    important: false
  },

  operation: {
    inputFields: [],
    outputFields: [],
    perform: getList,
    sample: null
  }
};