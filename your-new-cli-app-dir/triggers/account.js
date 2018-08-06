const getList = (z, bundle) => {

  var XML = require('pixl-xml');
  var url = bundle.authData.url;
  var document = bundle.authData.document;

  url += encodeURIComponent(document);
  url += "/export/";

  var params = {
    table: "account",
    format: "xml-verbose"
  }

  const responsePromise = z.request({}
    url: url,
    params: params
  });
return responsePromise
  .then(response => {

    var accounts = XML.parse(response.content, { preserveAttributes: true, preserveDocumentNode: true });

    var accounts_array = accounts.map(account => (
      {
        id: account.sequencenumber,
        name_code: account.code,
        description: account.description
      }
    ));

    console.log(accounts_array);
    return z.JSON.parse(accounts_array);

  });
};


module.exports = {
  key: 'account',
  noun: 'account',

  display: {
    label: 'Account',
    description: 'Accounts',
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
