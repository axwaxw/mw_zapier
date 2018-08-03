// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
const { replaceVars } = require('../utils');

const makeRequest = (z, bundle) => {
  const scripting = require('../scripting');
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting);

  bundle._legacyUrl = '{{url}}:{{port}}/REST/';
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle);

  // Do a _pre_write() from scripting.
  const preWriteEvent = {
    name: 'create.pre',
    key: 'create_transaction'
  };
  return legacyScriptingRunner
    .runEvent(preWriteEvent, z, bundle)
    .then(preWriteResult => z.request(preWriteResult))
    .then(response => {
      response.throwForStatus();
      return z.JSON.parse(response.content);
    });
};

module.exports = {
  key: 'create_transaction',
  noun: 'transaction',

  display: {
    label: 'Create Transaction',
    description: 'Creates a new transaction',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'colour',
        label: 'Colour',
        helpText: 'A number representing the display colour in MoneyWorks',
        type: 'integer',
        required: false,
        choices: { '1': 'orange', '2': 'red', '3': 'magenta', '4': 'cyan', '5': 'blue', '6': 'green', '7': 'brown' }
      },
      {
        key: 'contra',
        label: 'Contra',
        helpText:
          'For CP and CR transactions, this contains the a bank account. For invoices this is the accounts payable/receivable control account.',
        type: 'string',
        required: false,
        dynamic: 'account.code.description'
      },
      {
        key: 'delivery_address',
        label: 'Delivery Address',
        helpText: 'The delivery address for this transaction. Blank if default from name.',
        type: 'text',
        required: false
      },
      {
        key: 'description',
        label: 'Description (Transaction)',
        helpText: 'The description of the transaction.',
        type: 'text',
        required: false
      },
      {
        key: 'detail_account',
        label: 'Account (Detail)',
        helpText: 'A text string containing the account code- (or accountdepartment code) from the detail line',
        type: 'string',
        required: false
      },
      {
        key: 'detail_credit',
        label: 'Credit (Detail)',
        helpText:
          'The credit value of the detail line. This is the amount by which the account is credited when the transaction gets posted. It corresponds to the Net or Extension for a CP or CI.',
        type: 'number',
        required: false
      },
      {
        key: 'detail_debit',
        label: 'Debit (Detail)',
        helpText:
          'The debit value of the detail line. This is the amount by which the account is debited when the transaction gets posted. It corresponds to the Net or Extension for a CR or DI.',
        type: 'number',
        required: false
      },
      {
        key: 'detail_description',
        label: 'Description (Detail)',
        helpText: 'The description for the detail line.',
        type: 'text',
        required: false
      },
      {
        key: 'detail_gross',
        label: 'Gross (Detail)',
        helpText: 'The gross value of the detail line',
        type: 'number',
        required: false
      },
      {
        key: 'detail_jobcode',
        label: 'Job Code (Detail)',
        helpText: 'This is the job code for the detail line.',
        type: 'string',
        required: false
      },
      {
        key: 'detail_orderqty',
        label: 'Order Quantity (Detail)',
        helpText: 'The original order quantity for an order',
        type: 'number',
        required: false
      },
      {
        key: 'detail_stockcode',
        label: 'Stock Code (Detail)',
        helpText:
          'The product code for the detail line. This will be blank if the transaction is a service-type transaction.',
        type: 'string',
        required: false
      },
      {
        key: 'detail_stockqty',
        label: 'Stock Quantity (Detail)',
        helpText: 'The quantity to be shipped from this order',
        type: 'number',
        required: false
      },
      {
        key: 'detail_tax',
        label: 'Tax (Detail)',
        helpText: 'The GST amount of the detail line.',
        type: 'number',
        required: false
      },
      {
        key: 'detail_taxrate',
        label: 'Tax Rate (Detail)',
        helpText: 'The tax code of the account default is G',
        type: 'string',
        required: false,
        dynamic: 'tax.tax_code.rate_name'
      },
      {
        key: 'detail_unitprice',
        label: 'Unit Price (Detail)',
        helpText:
          'For a purchase, this is the same as the cost price. For a sale, this is the unit selling price of the product exclusive of GST and discount.',
        type: 'number',
        required: false
      },
      {
        key: 'document',
        label: 'Document',
        type: 'string',
        required: true,
        dynamic: 'document.document.document'
      },
      {
        key: 'freight_amount',
        label: 'Freight Amount',
        helpText: 'Freight amount of order',
        type: 'number',
        required: false
      },
      {
        key: 'freight_code',
        label: 'Freight Code',
        helpText: 'Freight code used for orders',
        type: 'string',
        required: false
      },
      {
        key: 'freightdetails',
        label: 'Freight Details',
        helpText: 'Details of freight for order',
        type: 'string',
        required: false
      },
      {
        key: 'gross',
        label: 'Gross (Transaction)',
        helpText: 'The gross value of the transaction.',
        type: 'string',
        required: false
      },
      {
        key: 'mailing_address',
        label: 'Mailing Address',
        helpText: 'Transaction’s mailing address. Blank if default from name.',
        type: 'text',
        required: false
      },
      {
        key: 'name_code',
        label: 'Name Code',
        helpText:
          "Customer or Supplier Code (11 characters max)\n\n- If this is always the same code (e.g. 'CASH'), enter it here.\n\n- Otherwise, you should first use *'Search or Create Name*' to find an existing name, or create one if it does not exist.",
        type: 'string',
        required: true
      },
      {
        key: 'our_ref',
        label: 'Our Reference',
        helpText:
          'The reference number of the transaction. For Cash Payments, this is the cheque number. For Cash Receipts it is the receipt number. For Debtor Invoices, it is the invoice number and for Creditor Invoices it is your order number. For Journals,  it is the Journal number, prefixed with the type of journal (JN for general journal, JS for stock journal, BK for banking journal).',
        type: 'string',
        required: false
      },
      {
        key: 'prod_price_code',
        label: 'Product Price Code',
        helpText: 'Pricing code (A—F)',
        type: 'string',
        required: false,
        default: 'A',
        choices: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', H: 'H' }
      },
      {
        key: 'salesperson',
        label: 'Salesperson',
        helpText:
          'The salesperson for the transaction. If the transaction involves any products with the “Append Salesperson” attribute set, the value of this field will be appended to that products sales and/or cost of goods account code.',
        type: 'string',
        required: false
      },
      {
        key: 'their_ref',
        label: 'Their Reference',
        helpText:
          'For debtor invoices, the customer’s Order No. For creditor invoices, the supplier’s invoice number. For receipts, the cheque number',
        type: 'string',
        required: false
      },
      {
        key: 'to_from',
        label: 'To / From',
        helpText: 'For a payment, the To field. For a receipt, the From field.',
        type: 'string',
        required: false
      },
      {
        key: 'type',
        label: 'Transaction Type',
        helpText: 'The transaction type.  See MoneyWorks documentation for full list of transaction types.',
        type: 'string',
        required: true,
        choices: {
          CIC: 'CIC',
          CII: 'CII',
          CP: 'CP',
          CPC: 'CPC',
          CPD: 'CPD',
          CR: 'CR',
          CRC: 'CRC',
          CRD: 'CRD',
          DIC: 'DIC',
          DII: 'DII',
          JN: 'JN',
          JNS: 'JNS',
          POC: 'POC',
          POI: 'POI',
          QU: 'QU',
          SOC: 'SOC',
          SOI: 'SOI'
        }
      },
      {
        key: 'user1',
        label: 'User 1',
        helpText: 'User defined',
        type: 'string',
        required: false
      },
      {
        key: 'user2',
        label: 'User 2',
        helpText: 'User defined',
        type: 'string',
        required: false
      },
      {
        key: 'user3',
        label: 'User 3',
        helpText: 'User defined',
        type: 'string',
        required: false
      }
    ],
    outputFields: [],
    perform: makeRequest,
    sample: null
  }
};
