const createName = (z, bundle) => {

  var url = bundle.authData.url;
  var document = bundle.action_fields.document;

  url += encodeURIComponent(document);
  url += "/import";

  var name_xml = "";
  var fields = bundle.inputData;

  name_xml = '';
  name_xml += '<?xml version="1.0"?>';
  name_xml += '<table name="Name">';
  name_xml += '<name>';

  name_xml += fields.name && '<Name>' + fields.name + '</Name>' || '';
  name_xml += fields.code && '<Code>' + fields.code + '</Code>' || '<Code work-it-out="true" />';
  name_xml += fields.tux_number && '<TaxNumber>' + fields.tax_number + '</TaxNumber>' || '';
  name_xml += fields.address1 && '<Address1>' + fields.address_1 + '</Address1>' || '';
  name_xml += fields.address2 && '<Address2>' + fields.address_2 + '</Address2>' || '';
  name_xml += fields.address3 && '<Address3>' + fields.address_3 + '</Address3>' || '';
  name_xml += fields.address4 && '<Address4>' + fields.address_4 + '</Address4>' || '';
  name_xml += fields.postcode && '<Postcode>' + fields.postcode + '</Postcode>' || '';
  name_xml += fields.state && '<State>' + fields.state + '</State>' || '';
  name_xml += fields.address_country && '<AddressCountry>' + fields.address_country + '</AddressCountry>' || '';


  name_xml += fields.phone && '<Phone>' + fields.phone + '</Phone>' || '';
  name_xml += fields.fax && '<Fax>' + fields.fax + '</Fax>' || '';
  name_xml += fields.web_url && '<WebUrl>' + fields.web_url + '</WebUrl>' || '';

  name_xml += fields.delivery1 && '<Delivery1>' + fields.delivery_1 + '</Delivery1>' || '';
  name_xml += fields.delivery2 && '<Delivery2>' + fields.delivery_2 + '</Delivery2>' || '';
  name_xml += fields.delivery3 && '<Delivery3>' + fields.delivery_3 + '</Delivery3>' || '';
  name_xml += fields.delivery4 && '<Delivery4>' + fields.delivery_4 + '</Delivery4>' || '';
  name_xml += fields.delivery_state && '<DeliveryState>' + fields.delivery_state + '</DeliveryState>' || '';
  name_xml += fields.delivery_postcode && '<DeliveryPostcode>' + fields.delivery_postcode + '</DeliveryPostcode>' || '';
  name_xml += fields.delivery_country && '<DeliveryCountry>' + fields.delivery_country + '</DeliveryCountry>' || '';

  name_xml += fields.contact && '<Contact>' + fields.contact + '</Contact>' || '';
  name_xml += fields.position && '<Position>' + fields.position + '</Position>' || '';
  name_xml += fields.ddi && '<DDI>' + fields.ddi + '</DDI>' || '';
  name_xml += fields.email && '<Email>' + fields.email + '</Email>' || '';
  name_xml += fields.mobile && '<Mobile>' + fields.mobile + '</Mobile>' || '';
  name_xml += fields.after_hours && '<AfterHours>' + fields.after_hours + '</AfterHours>' || '';

  name_xml += fields.contact2 && '<Contact2>' + fields.contact2 + '</Contact2>' || '';
  name_xml += fields.position2 && '<Position2>' + fields.position2 + '</Position2>' || '';
  name_xml += fields.ddi2 && '<DDI2>' + fields.ddi2 + '</DDI2>' || '';
  name_xml += fields.email2 && '<Email2>' + fields.email_2 + '</Email2>' || '';
  name_xml += fields.mobile2 && '<Mobile2>' + fields.mobile_2 + '</Mobile2>' || '';
  name_xml += fields.after_hours2 && '<AfterHours2>' + fields.after_hours_2 + '</AfterHours2>' || '';

  name_xml += fields.customer_type && '<CustomerType>' + fields.customer_type + '</CustomerType>' || 2;
  name_xml += fields.supplier_type && '<SupplierType>' + fields.supplier_type + '</SupplierType>' || 2;
  name_xml += fields.product_pricing && '<ProductPricing>' + fields.product_pricing + '</ProductPricing>' || '';

  name_xml += fields.currency && '<Currency>' + fields.currency + '</Currency>' || '';

  name_xml += fields.receipt_method && '<ReceiptMethod>' + fields.receipt_method + '</ReceiptMethod>' || '';
  name_xml += fields.payment_method && '<PaymentMethod>' + fields.payment_method + '</PaymentMethod>' || '';

  name_xml += fields.debtor_terms && '<DebtorTerms>' + fields.debtor_terms + '</DebtorTerms>' || 20;
  name_xml += fields.creditor_terms && '<CreditorTerms>' + fields.creditor_terms + '</CreditorTerms>' || 20;

  name_xml += fields.bank && '<Bank>' + fields.bank + '</Bank>' || '';
  name_xml += fields.account_name && '<AccountName>' + fields.account_name + '</AccountName>' || '';
  name_xml += fields.bank_account_number && '<BankAccountNumber>' + fields.bank_account_number + '</BankAccountNumber>' || '';
  name_xml += fields.bank_branch && '<BankBranch>' + fields.bank_branch + '</BankBranch>' || '';
  name_xml += fields.their_ref && '<TheirRef>' + fields.their_ref + '</TheirRef>' || '';

  name_xml += fields.hold && '<Hold>' + fields.hold + '</Hold>' || 0;

  name_xml += fields.rec_account && '<RecAccount>' + fields.rec_account + '</RecAccount>' || '<RecAccount work-it-out="true" />';
  name_xml += fields.pay_account && '<PayAccount>' + fields.pay_account + '</PayAccount>' || '<PayAccount work-it-out="true" />';

  name_xml += fields.credit_limit && '<CreditLimit>' + fields.credit_limit + '</CreditLimit>' || '';
  name_xml += fields.discount && '<Discount>' + fields.discount + '</Discount>' || '';

  name_xml += fields.customer_prompt_payment_terms && '<CustomerPromptPaymentTerms>' + fields.customer_prompt_payment_terms + '</CustomerPromptPaymentTerms>' || '';
  name_xml += fields.customer_prompt_payment_discount && '<CustomerPromptPaymentDiscount>' + fields.customer_prompt_payment_discount + '</CustomerPromptPaymentDiscount>' || '';

  name_xml += fields.supp_prompt_payment_terms && '<SuppPromptPaymentTerms>' + fields.supp_prompt_payment_terms + '</SuppPromptPaymentTerms>' || '';
  name_xml += fields.supp_prompt_payment_discount && '<SuppPromptPaymentDiscount>' + fields.supp_prompt_payment_discount + '</SuppPromptPaymentDiscount>' || '';

  name_xml += fields.split_acct1 && '<SplitAcct1>' + fields.split_acct_1 + '</SplitAcct1>' || '';
  name_xml += fields.split_acct2 && '<SplitAcct2>' + fields.split_acct_2 + '</SplitAcct2>' || '';
  name_xml += fields.split_percent && '<SplitPercent>' + fields.split_percent + '</SplitPercent>' || '';

  name_xml += fields.user_num && '<UserNum>' + fields.user_num + '</UserNum>' || '';
  name_xml += fields.user_text && '<UserText>' + fields.user_text + '</UserText>' || '';

  name_xml += fields.credit_card && '<CreditCard>' + fields.cfedit_card + '</CreditCard>' || '';
  name_xml += fields.credit_card_num && '<CreditCardNum>' + fields.credit_card_num + '</CreditCardNum>' || '';
  name_xml += fields.credit_card_expiry && '<CreditCardExpiry>' + fields.cfedit_card_expiry + '</CreditCardExpiry>' || '';
  name_xml += fields.credit_card_name && '<CreditCardName>' + fields.cfedit_card_name + '</CreditCardName>' || '';

  name_xml += fields.comment && '<Comment>' + fields.comment + '</Comment>' || '';
  name_xml += fields.colour && '<Colour>' + fields.colour + '</Colour>' || '';
  name_xml += fields.sales_person && '<SalesPerson>' + fields.sales_person + '</SalesPerson>' || '';

  name_xml += fields.tax_code && '<TaxCode>' + fields.tax_code + '</TaxCode>' || '';

  name_xml += fields.category1 && '<Category1>' + fields.category_1 + '</Category1>' || '';
  name_xml += fields.category2 && '<Category2>' + fields.category_2 + '</Category2>' || '';
  name_xml += fields.category3 && '<Category3>' + fields.category_3 + '</Category3>' || '';
  name_xml += fields.category4 && '<Category4>' + fields.category_4 + '</Category4>' || '';

  name_xml += fields.custom1 && '<Custom1>' + fields.custom_1 + '</Custom1>' || '';
  name_xml += fields.custom2 && '<Custom2>' + fields.custom_2 + '</Custom2>' || '';
  name_xml += fields.custom3 && '<Custom3>' + fields.custom_3 + '</Custom3>' || '';
  name_xml += fields.custom4 && '<Custom4>' + fields.custom_4 + '</Custom4>' || '';
  name_xml += fields.custom1 && '<Custom5>' + fields.custom_5 + '</Custom5>' || '';
  name_xml += fields.custom2 && '<Custom6>' + fields.custom_6 + '</Custom6>' || '';
  name_xml += fields.custom3 && '<Custom7>' + fields.custom_7 + '</Custom7>' || '';
  name_xml += fields.custom4 && '<Custom8>' + fields.custom_8 + '</Custom8>' || '';

  name_xml += '</name>';
  name_xml += '</table>';

  name_xml = name_xml.replace(" & ", "&amp;");
  name_xml = name_xml.replace("%", "_");

  console.log(name_xml)

  const responsePromise = z.request({
    method: 'POST',
    url: url,
    body: name_xml
  });

  return responsePromise
  //  .then(response => z.JSON.parse(response.content));
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
        key: 'address_1',
        label: 'Address 1',
        helpText: 'Mailing Address 1',
        type: 'string',
        required: false
      },
      {
        key: 'address_2',
        label: 'Address 2',
        helpText: 'Mailing Address 2',
        type: 'string',
        required: false
      },
      {
        key: 'address_3',
        label: 'Address 3',
        helpText: 'Mailing Address 3',
        type: 'string',
        required: false
      },
      {
        key: 'address_4',
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
        key: 'after_hours_2',
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
        key: 'category_1',
        label: 'Category 1',
        helpText: 'Category field 1',
        type: 'string',
        required: false
      },
      {
        key: 'category_2',
        label: 'Category 2',
        helpText: 'Category field 2',
        type: 'string',
        required: false
      },
      {
        key: 'category_3',
        label: 'Category 3',
        helpText: 'Category field 3',
        type: 'string',
        required: false
      },
      {
        key: 'category_4',
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
        key: 'contact_2',
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
        key: 'custom_1',
        label: 'Custom 1',
        helpText: 'Custom field 1',
        type: 'string',
        required: false
      },
      {
        key: 'custom_2',
        label: 'Custom 2',
        helpText: 'Custom field 2',
        type: 'string',
        required: false
      },
      {
        key: 'custom_3',
        label: 'Custom 3',
        helpText: 'Custom field 3',
        type: 'string',
        required: false
      },
      {
        key: 'custom_4',
        label: 'Custom 4',
        helpText: 'Custom field 4',
        type: 'string',
        required: false
      },
      {
        key: 'custom_5',
        label: 'Custom 5',
        helpText: 'Custom field 5',
        type: 'string',
        required: false
      },
      {
        key: 'custom_6',
        label: 'Custom 6',
        helpText: 'Custom field 6',
        type: 'string',
        required: false
      },
      {
        key: 'custom_7',
        label: 'Custom 7',
        helpText: 'Custom field 7',
        type: 'string',
        required: false
      },
      {
        key: 'custom_8',
        label: 'Custom 8',
        helpText: 'Custom field 8',
        type: 'string',
        required: false
      },
      {
        key: 'customer_type',
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
        key: 'ddi_2',
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
        key: 'delivery_1',
        label: 'Delivery Address 1',
        helpText: 'Delivery Address 1',
        type: 'string',
        required: false
      },
      {
        key: 'delivery_2',
        label: 'Delivery Address 2',
        helpText: 'Delivery Address 2',
        type: 'string',
        required: false
      },
      {
        key: 'delivery_3',
        label: 'Delivery Address 3',
        helpText: 'Delivery Address 3',
        type: 'string',
        required: false
      },
      {
        key: 'delivery_4',
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
        key: 'delivery_postcode',
        label: 'Delivery Postcode',
        helpText: 'Delivery Postcode',
        type: 'string',
        required: false
      },
      {
        key: 'delivery_state',
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
        helpText: 'Email address for main contact',
        type: 'string',
        required: false
      },
      {
        key: 'email_2',
        label: 'Email (Contact 2)',
        helpText: 'Email address for contact 2',
        type: 'string',
        required: false
      },
      {
        key: 'fax',
        label: 'Fax',
        helpText: 'Fax Number',
        type: 'string',
        required: false
      },
      {
        key: 'hold',
        label: 'Hold?',
        helpText: '_True_ if the debtor is on hold (_False_ otherwise)',
        type: 'integer',
        required: false,
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
        key: 'mobile_2',
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
        key: 'position_2',
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
        key: 'split_acct_1',
        label: 'Split Account 1',
        helpText: 'Account code for first split account',
        type: 'string',
        required: false,
        dynamic: 'account.code.description'
      },
      {
        key: 'split_acct_2',
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
        key: 'supplier_type',
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
        key: 'tax_code',
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
        label: 'Website Address',
        helpText: 'Enter the full URL',
        type: 'string',
        required: false
      }
    ],
    outputFields: [],
    perform: createName,
    sample: {
      name: "Fred Jones",
      email: "fred@acme.co.nz"
    }
  }
};
