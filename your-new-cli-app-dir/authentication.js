const authentication = {
  type: 'custom',
  test: {
    url:
      'http://{{bundle.authData.url}}:{{bundle.authData.port}}/REST//list'
  },

  fields: [
    {
      key: 'connection_type',
      required: true,
      choices: { datacentre: 'Datacentre', cloud: 'MoneyWorks Cloud' },
      helpText: 'Connection type - Datacentre or MoneyWorks Cloud.'
    },
    {
      key: 'url',
      type: 'string',
      required: true,
      helpText: 'The full external url of you MoneyWorks Datacentre (e.g. http://myserver.com/datacentre).  For _MoneyWorks Cloud_, leave this field blank'
    },
    {
      key: 'port',
      type: 'string',
      required: true,
      helpText: 'The MoneyWorks Datacentre REST server runs, by default, on port 6710.'
    },
    {
      key: 'datacentre_username',
      type: 'string',
      required: true,
      helpText: 'Username for Datacentre or MoneyWorks Cloud - required for MoneyWorks Cloud, or if your datacentre is set up to require folder-level login.'
    },
    {
      key: 'datacentre_password;',
      type: 'password',
      required: true,
      helpText: 'Password for Datacentre or MoneyWorks Cloud - required for MoneyWorks Cloud, or if your datacentre is set up to require folder-level login.'
    },
    {
      key: 'document_username;',
      type: 'string',
      required: true,
      helpText: 'Your MoneyWorks Document username.'
    },
    {
      key: 'document_password;',
      type: 'password',
      required: true,
      helpText: 'Your MoneyWorks Document password.'
    },
    {
      key: 'subdomain',
      type: 'string',
      required: true,
      helpText: 'Found in your browsers address bar after logging in.'
    },
    {
      key: 'api_key',
      type: 'string',
      required: true,
      helpText: 'Found on your settings page.'
    }
  ]
};

const add_headers = (request, z, bundle) => {

  var custom_headers = {};

  var datacentre_username = bundle.authData.datacentre_username;
  var datacentre_password = bundle.authData.datacentre_password;
  var document_username = bundle.authData.document_username;
  var document_password = bundle.authData.document_password;

  var auth_header = "";

  if (datacentre_username || datacentre_password) {
    auth_header = "Basic " + btoa(datacentre_username + ":Datacentre:" + datacentre_password) + ", Basic " + btoa(document_username + ":Document:" + document_password);
  } else {
    auth_header = "Basic " + btoa(document_username + ":Document:" + document_password);
  }

  console.log(auth_header);

  custom_headers['Content-Type'] = "application/xml; charset=utf-8";
  custom_headers['Accept'] = "application/xml";
  custom_headers['Authorization'] = auth_header;

  console.log(custom_headers);

  return custom_headers;
}

const App = {
  authentication: authentication,
  beforeRequest: [add_headers]
};