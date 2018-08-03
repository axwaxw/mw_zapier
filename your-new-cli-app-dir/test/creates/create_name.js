require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Creates - Create Name', () => {
  zapier.tools.env.inject();

  it('should create an object', done => {
    const bundle = {
      authData: {
        // TODO: Put your custom auth data here
      },

      inputData: {
        // TODO: Pulled from input fields' default values. Edit if necessary.
        colour: '0',
        creditor_terms: '-20',
        cust_prompt_payment_discount: '0',
        cust_prompt_payment_terms: '0',
        debtor_terms: '-20',
        document: null,
        hold: '0',
        name: null,
        product_pricing: 'A',
        receipt_method: '0',
        supp_prompt_payment_discount: '0',
        supp_prompt_payment_terms: '0'
      }
    };

    appTester(App.creates['create_name'].operation.perform, bundle)
      .then(result => {
        result.should.not.be.an.Array();
        done();
      })
      .catch(done);
  });
});
