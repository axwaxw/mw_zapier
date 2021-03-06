require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Triggers - Account', () => {
  zapier.tools.env.inject();

  it('should get an array', done => {
    const bundle = {
      authData: {
        // TODO: Put your custom auth data here
      },

      inputData: {}
    };

    appTester(App.triggers['account'].operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
