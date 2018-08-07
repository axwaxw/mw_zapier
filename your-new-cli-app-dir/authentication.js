module.exports = {
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
    }
  ],

  connectionLabel: (z, bundle) => {
    return bundle.inputData.document;
  }
};
