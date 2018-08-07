const getList = (z, bundle) => {

  var XML = require('pixl-xml');
  var url = bundle.authData.url;
  var document = bundle.authData.document;

  url += encodeURIComponent(document);
  url += "/export/";

  var params = {
    table: "name",
    search: "LastModifiedTime>today()-10",
    limit: 50,
    sort: "LastModifiedTime",
    direction: "descending",
    format: "xml-verbose"
  }

  const responsePromise = z.request({
    url: url,
    params: params
  })

  return responsePromise
    .then(response => {
      var names = XML.parse(response.content, { preserveAttributes: true, preserveDocumentNode: true, forceArrays: true });
      console.log(names.table.name);
      return z.JSON.parse(names.table.name);
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
        key: 'address_1',
        type: 'string',
        label: 'Address 1'
      },
      {
        key: 'address_2',
        type: 'string',
        label: 'Address 2'
      },
      {
        key: 'address_3',
        type: 'string',
        label: 'Address 3'
      },
      {
        key: 'address_4',
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
        key: 'after_hours_2',
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
        key: 'category_1',
        type: 'string',
        label: 'Category 1'
      },
      {
        key: 'category_2',
        type: 'string',
        label: 'Category 2'
      },
      {
        key: 'category_3',
        type: 'string',
        label: 'Category 3'
      },
      {
        key: 'category_4',
        type: 'string',
        label: 'Category 4'
      },
      {
        key: 'c_current',
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
        key: 'contact_2',
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
        key: 'custom_1',
        type: 'string',
        label: 'Custom 1'
      },
      {
        key: 'custom_2',
        type: 'string',
        label: 'Custom 2'
      },
      {
        key: 'custom_3',
        type: 'string',
        label: 'Custom 3'
      },
      {
        key: 'custom_4',
        type: 'string',
        label: 'Custom 4'
      },
      {
        key: 'custom_5',
        type: 'string',
        label: 'Custom 5'
      },
      {
        key: 'custom_6',
        type: 'string',
        label: 'Custom 6'
      },
      {
        key: 'custom_7',
        type: 'string',
        label: 'Custom 7'
      },
      {
        key: 'custom_8',
        type: 'string',
        label: 'Custom 8'
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
        key: 'd_balance',
        type: 'string',
        label: 'Debtor Balance'
      },
      {
        key: 'd_current',
        type: 'string',
        label: 'Debtor Current Balance'
      },
      {
        key: 'ddi',
        type: 'string',
        label: 'DDI (Contact 1)'
      },
      {
        key: 'ddi_2',
        type: 'string',
        label: 'DDI (Contact 2)'
      },
      {
        key: 'debtor_terms',
        type: 'string',
        label: 'Debtor Terms'
      },
      {
        key: 'delivery_1',
        type: 'string',
        label: 'Delivery Address 1'
      },
      {
        key: 'delivery_2',
        type: 'string',
        label: 'Delivery Address 2'
      },
      {
        key: 'delivery_3',
        type: 'string',
        label: 'Delivery Address 3'
      },
      {
        key: 'delivery_4',
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
        key: 'email_2',
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
        key: 'memo',
        type: 'string',
        label: 'Memo / Notes (Contact 1)'
      },
      {
        key: 'memo_2',
        type: 'string',
        label: 'Memo / Notes (Contact 2)'
      },
      {
        key: 'mobile_2',
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
        key: 'position_2',
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
        key: 'role',
        type: 'string',
        label: 'Role (Contact 1)'
      },
      {
        key: 'role_2',
        type: 'string',
        label: 'Role (Contact 2)'
      },
      {
        key: 'salutation',
        type: 'string',
        label: 'Salutation (Contact 1)'
      },
      {
        key: 'salutation_2',
        type: 'string',
        label: 'Salutation (Contact 2)'
      },
      {
        key: 'split_percent',
        type: 'string',
        label: 'Split Percent'
      },
      {
        key: 'splitacct_1',
        type: 'string',
        label: 'Split Account 1'
      },
      {
        key: 'splitacct_2',
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
      address_1: '1 Willow Street',
      address_2: 'Pleasantville',
      address_3: 'address3',
      address_4: 'address4',
      address_country: 'NZ',
      after_hours: '0441 212 456',
      after_hours_2: '',
      bank: 'First National',
      bank_account_number: '232-2828-8484',
      bank_branch: 'Pleasantville',
      category_1: 'category1',
      category_2: 'category2',
      category_3: 'category3',
      category_4: 'category4',
      ccurrent: '0',
      code: 'ANAME',
      colour: '1',
      comment: 'comment',
      contact: 'Mr A Name',
      contact_2: '',
      credit_card_expiry: '',
      credit_card_name: '',
      credit_card_num: '',
      credit_limit: '0',
      creditor_terms: '',
      currency: '0',
      cust_prompt_payment_discount: '',
      cust_prompt_payment_terms: '',
      custom_1: 'custom1',
      custom_2: 'custom2',
      custom_3: 'custom3',
      custom_4: 'custom4',
      custom_5: 'custom5',
      custom_6: 'custom6',
      custom_7: 'custom7',
      custom_8: 'custom8',
      customer_type: '2',
      d30plus: '0',
      d60plus: '0',
      d90plus: '0',
      date_of_last_sale: '',
      dbalance: '0',
      dcurrent: '0',
      ddi: '212 1236',
      ddi_2: '',
      debtor_terms: '',
      delivery_1: '1 Willow Street',
      delivery_2: 'Pleasantville',
      delivery_3: 'delivery3',
      delivery_4: 'delivery4',
      delivery_country: 'NZ',
      delivery_postcode: '1001',
      delivery_state: 'NA',
      discount: '0',
      email: 'a@name.com',
      email_2: '',
      fax: '212 1235',
      flags: '',
      hold: '0',
      id: '1234',
      kind: '',
      last_modified_time: '20161025',
      last_payment_method: '',
      memo: 'memo',
      memo_2: 'memo2',
      mobile: '0441 212 456',
      mobile_2: '',
      name: 'A Name',
      pay_account: '6550',
      payment_method: '',
      phone: '212 1234',
      position: 'Director',
      position_2: '',
      postcode: '1001',
      productpricing: 'A',
      rec_account: '4550',
      receipt_method: '',
      role: 'role',
      role_2: 'role2',
      sales_person: 'AN',
      salutation: 'salutation',
      salutation_2: 'salutation2',
      split_percent: '',
      splitacct_1: '',
      splitacct_2: '',
      state: 'NA',
      supp_prompt_payment_discount: '',
      supp_prompt_payment_terms: '',
      supplier_type: '',
      tax_code: 'G',
      tax_number: '',
      their_ref: '454',
      user_num: '123456',
      user_text: 'usertext',
      weburl: 'aname.com'
    }
  }
};
