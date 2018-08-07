const getList = (z, bundle) => {

  var XML = require('pixl-xml');
  var url = bundle.authData.url;
  var document = bundle.inputData.document;

  url += encodeURIComponent(document);
  url += "/export/";

  var params = {
    table: "tax-rate",
    format: "xml-verbose"
  }

  const responsePromise = z.request({
    url: url,
    params: params
  })

  return responsePromise
    .then(response => {

      var tax_rates = XML.parse(response.content, { preserveAttributes: true, preserveDocumentNode: true });

      var tax_array = tax_rates.map(tax_rate => (
        {
          id: tax_rate.sequencenumber,
          tax_code: tax_rate.code,
          rate_name: tax_rate.ratename + " (" + Number(tax_rate.rate2).toFixed(2) + "%)",
          rate: tax_rate.rate2
        }
      ));

      console.log(tax_array);
      return z.JSON.parse(tax_array);

    });
};

module.exports = {
  key: 'tax',
  noun: 'tax',

  display: {
    label: 'Tax',
    description: 'Tax Rates Lookup',
    hidden: true,
    important: false
  },

  operation: {
    inputFields: [],
    outputFields: [],
    perform: getList,
    sample: {
      id: 1234,
      tax_code: "G",
      rate_name: "GST (15%)",
      rate: 15
    }
  }
};
