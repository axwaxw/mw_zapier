// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!
const { replaceVars } = require('../utils');

const getList = (z, bundle) => {
  const scripting = require('../scripting');
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting);

  bundle._legacyUrl = '{{url}}:{{port}}/REST//list';
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle);

  // Do a _pre_poll() from scripting.
  const prePollEvent = {
    name: 'trigger.pre',
    key: 'document'
  };
  return legacyScriptingRunner
    .runEvent(prePollEvent, z, bundle)
    .then(prePollResult => z.request(prePollResult))
    .then(response => {
      response.throwForStatus();

      // Do a _post_poll() from scripting.
      const postPollEvent = {
        name: 'trigger.post',
        key: 'document',
        response
      };
      return legacyScriptingRunner.runEvent(postPollEvent, z, bundle);
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
