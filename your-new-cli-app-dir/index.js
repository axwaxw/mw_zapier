// Created by 'zapier convert'. This is just a stub - you will need to edit!

const authentication = require('./authentication');
const AccountTrigger = require('./triggers/account');
const DocumentTrigger = require('./triggers/document');
const NewnameTrigger = require('./triggers/new_name');
const NewtransactionTrigger = require('./triggers/new_transaction');
const TaxTrigger = require('./triggers/tax');
const FindnameSearch = require('./searches/find_name');
const CreatenameCreate = require('./creates/create_name');
const CreatetransactionCreate = require('./creates/create_transaction');

const add_headers = (request) => {

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
  request.headers = custom_headers

  return request;
}


const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  beforeRequest: [add_headers],
  afterResponse: [],
  resources: {},
  triggers: {
    [AccountTrigger.key]: AccountTrigger,
    [DocumentTrigger.key]: DocumentTrigger,
    [NewnameTrigger.key]: NewnameTrigger,
    [NewtransactionTrigger.key]: NewtransactionTrigger,
    [TaxTrigger.key]: TaxTrigger
  },

  searches: {
    [FindnameSearch.key]: FindnameSearch
  },

  creates: {
    [CreatenameCreate.key]: CreatenameCreate,
    [CreatetransactionCreate.key]: CreatetransactionCreate
  },

  searchOrCreates: {
    find_name: {
      key: 'find_name',
      display: {
        label: 'Find or Create Name',
        description: 'Find or Create Name'
      },
      search: 'find_name',
      create: 'create_name'
    }
  }
};

module.exports = App;
