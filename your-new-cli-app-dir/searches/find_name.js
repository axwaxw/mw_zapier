
const getList = (z, bundle) => {

  var XML = require('pixl-xml');
  var url = bundle.authData.url;
  var document = bundle.authData.document;
  var search_field = bundle.inputData.search_field
  var search_value = bundle.inputData.search_value

  url += encodeURIComponent(document);
  url += "/export/";

  var params = {
    search: `${search_field}==${search_value}`,
    limit: 2,
    format: "xml-verbose"
  }

  const responsePromise = z.request({
    url: url,
    params: params
  });
  return responsePromise
    .then(response => {

      var names = XML.parse(response.content, { preserveAttributes: true, preserveDocumentNode: true });

      var names_array = names.map(name => ({ id: name.sequencenumber, name_code: name.code }));

      console.log(names_array);
      return z.JSON.parse(names_array);

    });
};

module.exports = {
  key: 'find_name',
  noun: 'Name',

  display: {
    label: 'Find Name',
    description: 'Finds an existing `name`.',
    hidden: false,
    important: false
  },

  operation: {
    inputFields: [
      {
        key: 'document',
        label: 'Document',
        type: 'string',
        required: true,
        dynamic: 'document.document.document'
      },
      {
        key: 'search_field',
        label: 'Which field should we search in?',
        helpText:
          'MoneyWorks will search for an existing _name_ based on the value of this field.',
        choices: {
          code: 'Code',
          email: 'Email',
          email2: 'Email2',
          custom1: 'Custom1',
          custom2: 'Custom2',
          custom3: 'Custom3',
          custom4: 'Custom4',
          custom5: 'Custom5',
          custom6: 'Custom6',
          custom7: 'Custom7',
          custom8: 'Custom8',
          usertext: 'UserText'
        },
        required: true
      },
      {
        key: 'search_string',
        label: 'Value to search for',
        helpText:
          'MoneyWorks will search for an existing _name_ based on this value.\nPlease note that if multiple _names_ are found, only the first _name_ will be selected, so choose a _unique_ value.',
        type: 'string',
        required: true
      }
    ],
    outputFields: [
      {
        key: 'abuid',
        type: 'string'
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
        label: 'Current Balance'
      },
      {
        key: 'code',
        type: 'string',
        label: 'Code / Name Code'
      },
      {
        key: 'colour',
        type: 'string',
        label: 'Colour'
      },
      {
        key: 'comment',
        type: 'string',
        label: 'Comment'
      },
      {
        key: 'contact',
        type: 'string',
        label: 'Contact Peron'
      },
      {
        key: 'contact2',
        type: 'string',
        label: 'Contact Person 2'
      },
      {
        key: 'credit_card_expiry',
        type: 'string',
        label: 'Credit Card Expiry Date'
      },
      {
        key: 'credit_card_name',
        type: 'string',
        label: 'Credit Card Name'
      },
      {
        key: 'credit_card_num',
        type: 'string',
        label: 'Credit Card Number'
      },
      {
        key: 'credit_limit',
        type: 'string',
        label: 'Credit LImit'
      },
      {
        key: 'creditor_terms',
        type: 'string',
        label: 'Creditor Terms'
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
        type: 'string'
      },
      {
        key: 'd60plus',
        type: 'string'
      },
      {
        key: 'd90plus',
        type: 'string'
      },
      {
        key: 'date_oflast_sale',
        type: 'string'
      },
      {
        key: 'dbalance',
        type: 'string'
      },
      {
        key: 'dcurrent',
        type: 'string'
      },
      {
        key: 'ddi',
        type: 'string'
      },
      {
        key: 'ddi2',
        type: 'string'
      },
      {
        key: 'debtor_terms',
        type: 'string'
      },
      {
        key: 'delivery1',
        type: 'string'
      },
      {
        key: 'delivery2',
        type: 'string'
      },
      {
        key: 'delivery3',
        type: 'string'
      },
      {
        key: 'delivery4',
        type: 'string'
      },
      {
        key: 'delivery_country',
        type: 'string'
      },
      {
        key: 'delivery_postcode',
        type: 'string'
      },
      {
        key: 'delivery_state',
        type: 'string'
      },
      {
        key: 'discount',
        type: 'string'
      },
      {
        key: 'email',
        type: 'string'
      },
      {
        key: 'email2',
        type: 'string'
      },
      {
        key: 'fax',
        type: 'string'
      },
      {
        key: 'flags',
        type: 'string'
      },
      {
        key: 'hold',
        type: 'string'
      },
      {
        key: 'id',
        type: 'string'
      },
      {
        key: 'kind',
        type: 'string'
      },
      {
        key: 'last_modified_time',
        type: 'string'
      },
      {
        key: 'last_payment_method',
        type: 'string'
      },
      {
        key: 'mobile',
        type: 'string'
      },
      {
        key: 'mobile2',
        type: 'string'
      },
      {
        key: 'name',
        type: 'string'
      },
      {
        key: 'pay_account',
        type: 'string'
      },
      {
        key: 'payment_method',
        type: 'string'
      },
      {
        key: 'phone',
        type: 'string'
      },
      {
        key: 'position',
        type: 'string'
      },
      {
        key: 'position2',
        type: 'string'
      },
      {
        key: 'postcode',
        type: 'string'
      },
      {
        key: 'product_pricing',
        type: 'string'
      },
      {
        key: 'rec_account',
        type: 'string'
      },
      {
        key: 'receipt_method',
        type: 'string'
      },
      {
        key: 'sales_person',
        type: 'string'
      },
      {
        key: 'split_acct1',
        type: 'string'
      },
      {
        key: 'split_acct2',
        type: 'string'
      },
      {
        key: 'split_percent',
        type: 'string'
      },
      {
        key: 'state',
        type: 'string'
      },
      {
        key: 'supp_prompt_payment_discount',
        type: 'string'
      },
      {
        key: 'supp_prompt_payment_terms',
        type: 'string'
      },
      {
        key: 'supplier_type',
        type: 'string'
      },
      {
        key: 'tax_code',
        type: 'string'
      },
      {
        key: 'tax_number',
        type: 'string'
      },
      {
        key: 'their_ref',
        type: 'string'
      },
      {
        key: 'user_num',
        type: 'string'
      },
      {
        key: 'user_text',
        type: 'string'
      },
      {
        key: 'weburl',
        type: 'string'
      }
    ],
    perform: getList,
    sample: {
      abuid: '',
      account_name: 'A Name',
      address_1: '100 Main Street',
      address_2: '',
      address_3: 'Pleasantville',
      address_4: '',
      address_country: 'New Zealand',
      after_hours: '',
      after_hours_2: '212 1234',
      bank: 'First National',
      bank_account_number: '',
      bank_branch: '',
      category_1: 'C',
      category_2: '',
      category_3: '',
      category_4: '',
      ccurrent: '0.00',
      code: 'ANAME#',
      colour: '0',
      comment: 'comment',
      contact: 'A Name',
      contact_2: '',
      credit_card_expiry: '',
      credit_card_name: '',
      credit_card_num: '',
      credit_limit: '0',
      creditor_terms: '-20',
      currency: '',
      cust_prompt_payment_discount: '0.000000',
      cust_prompt_payment_terms: '0',
      custom_1: '',
      custom_2: '',
      custom_3: '',
      custom_4: '',
      custom_5: '',
      custom_6: '',
      custom_7: '',
      custom_8: '',
      customer_type: '1',
      d30plus: '0.00',
      d60plus: '0.00',
      d90plus: '0.00',
      date_oflast_sale: '19040101',
      dbalance: '0.00',
      dcurrent: '0.00',
      ddi: '212 5678',
      ddi_2: '212 4567',
      debtor_terms: '-20',
      delivery_1: '100 Main Street',
      delivery_2: '',
      delivery_3: 'Pleasantville',
      delivery_4: '',
      delivery_country: 'New Zealand',
      delivery_postcode: '',
      delivery_state: 'NA',
      discount: '0.00',
      email: 'a@name.com',
      email2: 'a2@name.com',
      fax: '212 6789',
      flags: '0',
      hold: '0',
      id: '3584',
      kind: '1',
      last_modified_time: '20160910083035',
      last_payment_method: '0',
      memo: '',
      memo_2: '',
      mobile: '0404 2345',
      mobile_2: '0404 3456',
      name: 'A Name',
      pay_account: '6500',
      payment_method: '0',
      phone: '212 2345',
      position: 'Director',
      position_2: 'Director',
      postcode: '3456',
      product_pricing: 'A',
      rec_account: '5500',
      receipt_method: '0',
      role: '',
      role_2: '',
      sales_person: 'AN',
      salutation: '',
      salutation_2: '',
      split_acct_1: '6550',
      split_acct_2: '6560',
      split_percent: '0.000000',
      state: 'NA',
      supp_prompt_payment_discount: '0.000000',
      supp_prompt_payment_terms: '0',
      supplier_type: '0',
      tax_code: 'G',
      tax_number: '22-33-44-5678',
      their_ref: 'ANAME 123',
      user_num: '123',
      user_text: 'User Text',
      weburl: 'www.name.com'
    }
  }
};