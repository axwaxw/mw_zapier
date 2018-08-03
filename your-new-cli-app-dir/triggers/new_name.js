// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!
const { replaceVars } = require('../utils');

const getList = (z, bundle) => {
  const scripting = require('../scripting');
  const legacyScriptingRunner = require('zapier-platform-legacy-scripting-runner')(scripting);

  bundle._legacyUrl = '{{url}}:{{port}}/REST/';
  bundle._legacyUrl = replaceVars(bundle._legacyUrl, bundle);

  // Do a _pre_poll() from scripting.
  const prePollEvent = {
    name: 'trigger.pre',
    key: 'new_name'
  };
  return legacyScriptingRunner
    .runEvent(prePollEvent, z, bundle)
    .then(prePollResult => z.request(prePollResult))
    .then(response => {
      response.throwForStatus();

      // Do a _post_poll() from scripting.
      const postPollEvent = {
        name: 'trigger.post',
        key: 'new_name',
        response
      };
      return legacyScriptingRunner.runEvent(postPollEvent, z, bundle);
    });
};

module.exports = {
  key: 'new_name',
  noun: 'Name',

  display: {
    label: 'New Name',
    description: 'Triggered when a new name is entered.',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'document',
        label: 'Document',
        helpText: 'Your MoneyWorks Document',
        type: 'string',
        required: true,
        dynamic: 'document.document.document'
      }
    ],
    outputFields: [
      {
        key: 'abuid',
        type: 'string',
        label: 'ABUID'
      },
      {
        key: 'account_name',
        type: 'string',
        label: 'Bank Account Name'
      },
      {
        key: 'address1',
        type: 'string',
        label: 'Address 1'
      },
      {
        key: 'address2',
        type: 'string',
        label: 'Address 2'
      },
      {
        key: 'address3',
        type: 'string',
        label: 'Address 3'
      },
      {
        key: 'address4',
        type: 'string',
        label: 'Address 4'
      },
      {
        key: 'address_country',
        type: 'string',
        label: 'Country'
      },
      {
        key: 'after_hours',
        type: 'string',
        label: 'After Hours Phone (Contact)'
      },
      {
        key: 'after_hours2',
        type: 'string',
        label: 'After Hours Phone (Contact 2)'
      },
      {
        key: 'bank',
        type: 'string',
        label: 'Bank'
      },
      {
        key: 'bank_account_number',
        type: 'string',
        label: 'Bank Account Number'
      },
      {
        key: 'bank_branch',
        type: 'string',
        label: 'Bank Branch'
      },
      {
        key: 'category1',
        type: 'string',
        label: 'Category 1'
      },
      {
        key: 'category2',
        type: 'string',
        label: 'Category 2'
      },
      {
        key: 'category3',
        type: 'string',
        label: 'Category 3'
      },
      {
        key: 'category4',
        type: 'string',
        label: 'Category 4'
      },
      {
        key: 'ccurrent',
        type: 'string',
        label: 'Current Balance (Creditor)'
      },
      {
        key: 'code',
        type: 'string',
        label: 'Name Code'
      },
      {
        key: 'colour',
        type: 'string',
        label: 'Colour Code'
      },
      {
        key: 'comment',
        type: 'string',
        label: 'Comment'
      },
      {
        key: 'contact',
        type: 'string',
        label: 'Contact Name'
      },
      {
        key: 'contact2',
        type: 'string',
        label: 'Contact Name 2'
      },
      {
        key: 'credit_card_expiry',
        type: 'string',
        label: 'Credit Card Expiry Date'
      },
      {
        key: 'credit_card_name',
        type: 'string',
        label: 'Name on Credit Card'
      },
      {
        key: 'credit_card_num',
        type: 'string',
        label: 'Credit Card Number'
      },
      {
        key: 'credit_limit',
        type: 'string',
        label: 'Credit Limit'
      },
      {
        key: 'creditor_terms',
        type: 'string',
        label: 'Credit Terms'
      },
      {
        key: 'currency',
        type: 'string',
        label: 'Currency'
      },
      {
        key: 'cust_prompt_payment_discount',
        type: 'string',
        label: 'Prompt Payment Discount (Customer)'
      },
      {
        key: 'cust_prompt_payment_terms',
        type: 'string',
        label: 'Prompt Payment Terms (Customer)'
      },
      {
        key: 'custom1',
        type: 'string',
        label: 'Custom 1'
      },
      {
        key: 'custom2',
        type: 'string',
        label: 'Custom 2'
      },
      {
        key: 'custom3',
        type: 'string',
        label: 'Custom 3'
      },
      {
        key: 'custom4',
        type: 'string',
        label: 'Custom 4'
      },
      {
        key: 'customer_type',
        type: 'string',
        label: 'Customer Type'
      },
      {
        key: 'd30plus',
        type: 'string',
        label: 'Debtor 30 day balance'
      },
      {
        key: 'd60plus',
        type: 'string',
        label: 'Debtor 60 day balance'
      },
      {
        key: 'd90plus',
        type: 'string',
        label: 'Debtor 90 day balance'
      },
      {
        key: 'date_of_last_sale',
        type: 'string',
        label: 'Date of Last Sale'
      },
      {
        key: 'dbalance',
        type: 'string',
        label: 'Debtor Balance'
      },
      {
        key: 'dcurrent',
        type: 'string',
        label: 'Debtor Current Balance'
      },
      {
        key: 'ddi',
        type: 'string',
        label: 'DDI (Contact 1)'
      },
      {
        key: 'ddi2',
        type: 'string',
        label: 'DDI (Contact 2)'
      },
      {
        key: 'debtor_terms',
        type: 'string',
        label: 'Debtor Terms'
      },
      {
        key: 'delivery1',
        type: 'string',
        label: 'Delivery Address 1'
      },
      {
        key: 'delivery2',
        type: 'string',
        label: 'Delivery Address 2'
      },
      {
        key: 'delivery3',
        type: 'string',
        label: 'Delivery Address 3'
      },
      {
        key: 'delivery4',
        type: 'string',
        label: 'Delivery Address 4'
      },
      {
        key: 'delivery_country',
        type: 'string',
        label: 'Delivery Country'
      },
      {
        key: 'delivery_postcode',
        type: 'string',
        label: 'Delivery Postcode'
      },
      {
        key: 'delivery_state',
        type: 'string',
        label: 'Delivery State'
      },
      {
        key: 'discount',
        type: 'string',
        label: 'Discount'
      },
      {
        key: 'email',
        type: 'string',
        label: 'Email (Contact 1)'
      },
      {
        key: 'email2',
        type: 'string',
        label: 'Email (Contact 2)'
      },
      {
        key: 'fax',
        type: 'string',
        label: 'Fax'
      },
      {
        key: 'flags',
        type: 'string',
        label: 'Flags (system)'
      },
      {
        key: 'hold',
        type: 'string',
        label: 'On Hold?'
      },
      {
        key: 'id',
        type: 'string',
        label: 'ID / Sequence Number'
      },
      {
        key: 'kind',
        type: 'string',
        label: 'Kind (system)'
      },
      {
        key: 'last_modified_time',
        type: 'string',
        label: 'Last Modified Time'
      },
      {
        key: 'last_payment_method',
        type: 'string',
        label: 'Last Payment Method'
      },
      {
        key: 'mobile',
        type: 'string',
        label: 'Mobile/Cell (Contact 1)'
      },
      {
        key: 'mobile2',
        type: 'string',
        label: 'Mobile/Cell (Contact 2)'
      },
      {
        key: 'name',
        type: 'string',
        label: 'Name'
      },
      {
        key: 'pay_account',
        type: 'string',
        label: 'Accounts Payable Account'
      },
      {
        key: 'payment_method',
        type: 'string',
        label: 'Payment Method'
      },
      {
        key: 'phone',
        type: 'string',
        label: 'Phone'
      },
      {
        key: 'position',
        type: 'string',
        label: 'Position Held (Contact 1)'
      },
      {
        key: 'position2',
        type: 'string',
        label: 'Position Held (Contact 2)'
      },
      {
        key: 'postcode',
        type: 'string',
        label: 'Postcode / ZIP'
      },
      {
        key: 'productpricing',
        type: 'string',
        label: 'Pricing level for customer. (A-F)'
      },
      {
        key: 'rec_account',
        type: 'string',
        label: 'Accounts Receivable Account'
      },
      {
        key: 'receipt_method',
        type: 'string',
        label: 'Receipt Method'
      },
      {
        key: 'sales_person',
        type: 'string',
        label: 'Salesperson'
      },
      {
        key: 'split_percent',
        type: 'string',
        label: 'Split Percent'
      },
      {
        key: 'splitacct1',
        type: 'string',
        label: 'Split Account 1'
      },
      {
        key: 'splitacct2',
        type: 'string',
        label: 'Split Account 2'
      },
      {
        key: 'state',
        type: 'string',
        label: 'State'
      },
      {
        key: 'supp_prompt_payment_discount',
        type: 'string',
        label: 'Prompt Payment Discount (Supplier)'
      },
      {
        key: 'supp_prompt_payment_terms',
        type: 'string',
        label: 'Prompt Payment Terms (Supplier)'
      },
      {
        key: 'supplier_type',
        type: 'string',
        label: 'Supplier Type'
      },
      {
        key: 'tax_code',
        type: 'string',
        label: 'Tax Code'
      },
      {
        key: 'tax_number',
        type: 'string',
        label: 'Tax Number'
      },
      {
        key: 'their_ref',
        type: 'string',
        label: 'Their Ref'
      },
      {
        key: 'user_num',
        type: 'string',
        label: 'User Number'
      },
      {
        key: 'user_text',
        type: 'string',
        label: 'User Text'
      },
      {
        key: 'weburl',
        type: 'string',
        label: 'Website'
      }
    ],
    perform: getList,
    sample: {
      abuid: '',
      account_name: 'A Name',
      address1: '1 Willow Street',
      address2: 'Pleasantville',
      address3: 'address3',
      address4: 'address4',
      address_country: 'NZ',
      after_hours: '0441 212 456',
      after_hours2: '',
      bank: 'First National',
      bank_account_number: '232-2828-8484',
      bank_branch: 'Pleasantville',
      category1: 'category1',
      category2: 'category2',
      category3: 'category3',
      category4: 'category4',
      ccurrent: '0',
      code: 'ANAME',
      colour: '1',
      comment: 'comment',
      contact: 'Mr A Name',
      contact2: '',
      credit_card_expiry: '',
      credit_card_name: '',
      credit_card_num: '',
      credit_limit: '0',
      creditor_terms: '',
      currency: '0',
      cust_prompt_payment_discount: '',
      cust_prompt_payment_terms: '',
      custom1: 'custom1',
      custom2: 'custom2',
      custom3: 'custom3',
      custom4: 'custom4',
      customer_type: '2',
      d30plus: '0',
      d60plus: '0',
      d90plus: '0',
      date_of_last_sale: '',
      dbalance: '0',
      dcurrent: '0',
      ddi: '212 1236',
      ddi2: '',
      debtor_terms: '',
      delivery1: '1 Willow Street',
      delivery2: 'Pleasantville',
      delivery3: 'delivery3',
      delivery4: 'delivery4',
      delivery_country: 'NZ',
      delivery_postcode: '1001',
      delivery_state: 'NA',
      discount: '0',
      email: 'a@name.com',
      email2: '',
      fax: '212 1235',
      flags: '',
      hold: '0',
      id: '1234',
      kind: '',
      last_modified_time: '20161025',
      last_payment_method: '',
      mobile: '0441 212 456',
      mobile2: '',
      name: 'A Name',
      pay_account: '6550',
      payment_method: '',
      phone: ' 212 1234',
      position: 'Director',
      position2: '',
      postcode: '1001',
      productpricing: 'A',
      rec_account: '4550',
      receipt_method: '',
      sales_person: 'AN',
      split_percent: '',
      splitacct1: '',
      splitacct2: '',
      state: 'NA',
      supp_prompt_payment_discount: '',
      supp_prompt_payment_terms: '',
      supplier_type: '',
      tax_code: 'G',
      tax_number: '',
      their_ref: '454',
      user_num: '',
      user_text: '',
      weburl: 'aname.com'
    }
  }
};
