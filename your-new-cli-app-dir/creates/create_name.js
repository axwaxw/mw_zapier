// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!
const { replaceVars } = require('../utils');

const makeRequest = (z, bundle) => {
  const scripting = require('../scripting');
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting);

  bundle._legacyUrl = ' {{url}}:{{port}}/REST/';
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle);

  // Do a _pre_write() from scripting.
  const preWriteEvent = {
    name: 'create.pre',
    key: 'create_name'
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
  key: 'create_name',
  noun: 'name',

  display: {
    label: 'Create Name',
    description: 'Creates a new name (customer, supplier, debtor, creditor)',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'account_name',
        label: 'Bank Account Name',
        helpText: 'The bank account name (e.g. XYZ Trading Company)',
        type: 'string',
        required: false
      },
      {
        key: 'address1',
        label: 'Address 1',
        helpText: 'Mailing Address 1',
        type: 'string',
        required: false
      },
      {
        key: 'address2',
        label: 'Address 2',
        helpText: 'Mailing Address 2',
        type: 'string',
        required: false
      },
      {
        key: 'address3',
        label: 'Address 3',
        helpText: 'Mailing Address 3',
        type: 'string',
        required: false
      },
      {
        key: 'address4',
        label: 'Address 4',
        helpText: 'Mailing Address 4',
        type: 'string',
        required: false
      },
      {
        key: 'address_country',
        label: 'Country',
        type: 'string',
        required: false
      },
      {
        key: 'after_hours',
        label: 'After Hours Phone (Contact)',
        helpText: 'After hours phone number for contact 1',
        type: 'string',
        required: false
      },
      {
        key: 'after_hours2',
        label: 'After Hours (Contact 2)',
        helpText: 'After hours phone number for contact 2',
        type: 'string',
        required: false
      },
      {
        key: 'bank',
        label: 'Bank',
        helpText: "Name of Customer's Bank",
        type: 'string',
        required: false
      },
      {
        key: 'bank_account_number',
        label: 'Bank Account Number',
        helpText: 'The bank account number of the name, as supplied by their bank',
        type: 'string',
        required: false
      },
      {
        key: 'bank_branch',
        label: 'Bank Branch',
        helpText: 'The bank branch (e.g. Main St.)',
        type: 'string',
        required: false
      },
      {
        key: 'category1',
        label: 'Category 1',
        helpText: 'Category field 1',
        type: 'string',
        required: false
      },
      {
        key: 'category2',
        label: 'Category 2',
        helpText: 'Category field 2',
        type: 'string',
        required: false
      },
      {
        key: 'category3',
        label: 'Category 3',
        helpText: 'Category field 3',
        type: 'string',
        required: false
      },
      {
        key: 'category4',
        label: 'Category 4',
        helpText: 'Category field 4',
        type: 'string',
        required: false
      },
      {
        key: 'code',
        label: 'Code / Name Code',
        helpText:
          "You can select a memorable name code, or else leave this field blank - a code will be generated automatically based on the *name* field and ending in '#'",
        type: 'string',
        required: false
      },
      {
        key: 'colour',
        label: 'Colour',
        helpText: 'Colour code',
        type: 'integer',
        required: false,
        default: '0',
        choices: { '0': 'None', '1': 'Orange', '2': 'Red', Megenta: '3', Cyan: '4', Blue: '5', Green: '6', Brown: '7' }
      },
      {
        key: 'comment',
        label: 'Comment',
        helpText: 'A Commentt',
        type: 'text',
        required: false
      },
      {
        key: 'contact',
        label: 'Contact',
        helpText: 'Name of main contact',
        type: 'string',
        required: false
      },
      {
        key: 'contact2',
        label: 'Contact 2',
        helpText: 'Name of contact person 2',
        type: 'string',
        required: false
      },
      {
        key: 'credit_card_expiry',
        label: 'Credit Card Expiry Date',
        helpText: 'Expiry date of credit card (e.g. 10/06)',
        type: 'string',
        required: false
      },
      {
        key: 'credit_card_name',
        label: 'Credit Card Name',
        helpText: 'Name on credit card',
        type: 'string',
        required: false
      },
      {
        key: 'credit_card_num',
        label: 'Credit Card Number',
        helpText: 'Credit card number',
        type: 'string',
        required: false
      },
      {
        key: 'credit_limit',
        label: 'Credit Limit (Debtor)',
        helpText: 'The credit limit for a debtor',
        type: 'number',
        required: false
      },
      {
        key: 'creditor_terms',
        label: 'Creditor Terms (Creditor)',
        helpText: 'If > 0, within N days; if < 0, Nth day of month following',
        type: 'integer',
        required: false,
        default: '-20'
      },
      {
        key: 'currency',
        label: 'Currency',
        helpText: 'Currency of customer/supplier (blank if local)',
        type: 'string',
        required: false
      },
      {
        key: 'cust_prompt_payment_discount',
        label: 'Prompt Paymt Discount (Customer)',
        helpText: 'Prompt payment discount percentage',
        type: 'number',
        required: false,
        default: '0'
      },
      {
        key: 'cust_prompt_payment_terms',
        label: 'Prompt Payment Terms (Customer)',
        helpText: '0 for no prompt payment; > 0 for within N days; < 0 for by Nth date of following month',
        type: 'integer',
        required: false,
        default: '0'
      },
      {
        key: 'custom1',
        label: 'Custom 1',
        helpText: 'Custom field 1',
        type: 'string',
        required: false
      },
      {
        key: 'custom2',
        label: 'Custom 2',
        helpText: 'Custom field 2',
        type: 'string',
        required: false
      },
      {
        key: 'custom3',
        label: 'Custom 3',
        helpText: 'Custom field 3',
        type: 'string',
        required: false
      },
      {
        key: 'custom4',
        label: 'Custom 4',
        helpText: 'Custom field 4',
        type: 'string',
        required: false
      },
      {
        key: 'customertype',
        label: 'Customer Type',
        helpText: 'Customer Type (0 = not a customer, 1 = customer, 2 = debtor)',
        type: 'string',
        required: false,
        choices: { '0': 'not a customer', '1': 'customer', '2': 'debtor' }
      },
      {
        key: 'ddi',
        label: 'DDI (Contact)',
        helpText: 'DDI of main contact',
        type: 'string',
        required: false
      },
      {
        key: 'ddi2',
        label: 'DDI (Contact 2)',
        helpText: 'Direct dial number for contact 2',
        type: 'string',
        required: false
      },
      {
        key: 'debtor_terms',
        label: 'Debtor Terms (Debtor)',
        helpText: 'If > 0, within N days; if < 0, Nth day of month following',
        type: 'integer',
        required: false,
        default: '-20'
      },
      {
        key: 'delivery1',
        label: 'Delivery Address 1',
        helpText: 'Delivery Address 1',
        type: 'string',
        required: false
      },
      {
        key: 'delivery2',
        label: 'Delivery Address 2',
        helpText: 'Delivery Address 2',
        type: 'string',
        required: false
      },
      {
        key: 'delivery3',
        label: 'Delivery Address 3',
        helpText: 'Delivery Address 3',
        type: 'string',
        required: false
      },
      {
        key: 'delivery4',
        label: 'Delivery Address 4',
        helpText: 'Delivery Address 4',
        type: 'string',
        required: false
      },
      {
        key: 'delivery_country',
        label: 'Delivery Country',
        helpText: 'Delivery Country',
        type: 'string',
        required: false
      },
      {
        key: 'deliverypostcode',
        label: 'Delivery Postcode',
        helpText: 'Delivery Postcode',
        type: 'string',
        required: false
      },
      {
        key: 'deliverystate',
        label: 'Delivery State',
        helpText: 'Delivery State',
        type: 'string',
        required: false
      },
      {
        key: 'discount',
        label: 'Discount',
        helpText: 'Discount field for a customer',
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
        key: 'email',
        label: 'Email (Contact)',
        helpText: 'Email address of main contact',
        type: 'string',
        required: false
      },
      {
        key: 'email2',
        label: 'Email (Contact 2)',
        helpText: 'Email address for contact 2',
        type: 'string',
        required: false
      },
      {
        key: 'fax',
        label: 'Fax',
        helpText: 'Fax',
        type: 'string',
        required: false
      },
      {
        key: 'hold',
        label: 'Hold?',
        helpText: '“True” if the debtor is on hold (“False” otherwise)',
        type: 'boolean',
        required: false,
        default: '0',
        choices: { '0': 'False', '1': 'True' }
      },
      {
        key: 'mobile',
        label: 'Mobile (Contact)',
        helpText: 'Mobile/Cell of main contact',
        type: 'string',
        required: false
      },
      {
        key: 'mobile2',
        label: 'Mobile (Contact 2)',
        helpText: 'Mobile phone number for contact 2',
        type: 'string',
        required: false
      },
      {
        key: 'name',
        label: 'Name',
        helpText: 'Full name of individual or company\nLeave blank and a name will be automatically generated',
        type: 'string',
        required: true
      },
      {
        key: 'pay_account',
        label: 'Payables Account (Creditor)',
        helpText: 'The Accounts Payable control account code for a creditor.',
        type: 'string',
        required: false,
        dynamic: 'account.code.description'
      },
      {
        key: 'payment_method',
        label: 'Payment Method',
        helpText: 'Payment method (0 = None, 1 = Cash, 2 = Cheque, 3 =Electronic, etc).',
        type: 'integer',
        required: false,
        choices: {
          '1': 'Cash',
          '2': 'Cheque',
          '3': 'Electronic',
          '4': 'Credit Card',
          '5': 'Online',
          '6': 'User Defined',
          '7': 'User Defined',
          '8': 'User Defined',
          '9': 'User Defined'
        }
      },
      {
        key: 'phone',
        label: 'Phone',
        helpText: 'Phone number of main contact',
        type: 'string',
        required: false
      },
      {
        key: 'position',
        label: 'Position (Contact 1)',
        helpText: 'Position of Contact 1',
        type: 'string',
        required: false
      },
      {
        key: 'position2',
        label: 'Position (Contact 2)',
        helpText: 'Position of contact 2',
        type: 'string',
        required: false
      },
      {
        key: 'postcode',
        label: 'Postcode / ZIP',
        helpText: 'Mailing Address Postcode',
        type: 'string',
        required: false
      },
      {
        key: 'product_pricing',
        label: 'Product Pricing',
        helpText: 'Pricing level for customer. (A-F)',
        type: 'string',
        required: false,
        default: 'A',
        choices: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', H: 'H' }
      },
      {
        key: 'rec_account',
        label: 'Receivables Account (Debtor)',
        helpText: 'The Accounts Receivable control account code for a debtor.',
        type: 'string',
        required: false,
        dynamic: 'account.code.description'
      },
      {
        key: 'receipt_method',
        label: 'Receipt Method',
        helpText: 'Preferred payment method of customers. 1 = Cash, 2 = Cheque etc.',
        type: 'integer',
        required: false,
        default: '0',
        choices: {
          '1': 'Cash',
          '2': 'Cheque',
          '3': 'Electronic',
          '4': 'Credit Card',
          '5': 'Online',
          '6': 'User Defined',
          '7': 'User Defined',
          '8': 'User Defined',
          '9': 'User Defined'
        }
      },
      {
        key: 'salesperson',
        label: 'Salesperson',
        helpText: 'Code for salesperson for client—automatically copied to the transaction.salesperson field.',
        type: 'string',
        required: false
      },
      {
        key: 'split_acct1',
        label: 'Split Account 1',
        helpText: 'Account code for first split account',
        type: 'string',
        required: false,
        dynamic: 'account.code.description'
      },
      {
        key: 'split_acct2',
        label: 'Split Account 2',
        helpText: 'Account code for remainder split account',
        type: 'string',
        required: false,
        choices: { 'account.code.description': 'Account Code Description' }
      },
      {
        key: 'split_percent',
        label: 'Split Percent',
        helpText: 'Percent of allocation to be put into Split Account 1',
        type: 'number',
        required: false
      },
      {
        key: 'state',
        label: 'State',
        helpText: 'Mailing Address State',
        type: 'string',
        required: false
      },
      {
        key: 'supp_prompt_payment_discount',
        label: 'Prompt Paymt Discount (Supplier)',
        helpText: 'Percentage amount of prompt payment discount offered by supplier',
        type: 'number',
        required: false,
        default: '0'
      },
      {
        key: 'supp_prompt_payment_terms',
        label: 'Prompt Payment Terms (Supplier)',
        helpText: '0 for no prompt payment; > 0 for within N days; < 0 for by Nth date of following month',
        type: 'integer',
        required: false,
        default: '0'
      },
      {
        key: 'suppliertype',
        label: 'Supplier Type',
        helpText: 'Supplier Type (0 = not a supplier, 1 = supplier, 2 = creditor)',
        type: 'string',
        required: false,
        choices: { '0': 'not a supplier', '1': 'supplier', '2': 'creditor' }
      },
      {
        key: 'tax_number',
        label: 'Tax Number',
        helpText: 'Their tax number (GST#, VAT#, ABN etc, depending on country)',
        type: 'string',
        required: false
      },
      {
        key: 'taxcode',
        label: 'Tax Code',
        helpText: 'Tax code override',
        type: 'string',
        required: false,
        dynamic: 'tax.tax_code.rate_name'
      },
      {
        key: 'their_ref',
        label: 'Their Ref',
        helpText: 'The reference code by which the supplier or customer refers to your company.',
        type: 'string',
        required: false
      },
      {
        key: 'user_num',
        label: 'User Number',
        helpText: 'User defined number',
        type: 'number',
        required: false
      },
      {
        key: 'user_text',
        label: 'User Text',
        helpText: 'User defined text',
        type: 'string',
        required: false
      },
      {
        key: 'weburl',
        label: 'Website',
        helpText: 'Website',
        type: 'string',
        required: false
      }
    ],
    outputFields: [],
    perform: makeRequest,
    sample: null
  }
};
