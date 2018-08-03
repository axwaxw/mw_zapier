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

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [],

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
