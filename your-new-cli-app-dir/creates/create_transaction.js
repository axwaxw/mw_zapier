const createTransaction = (z, bundle) => {

  var url = bundle.authData.url;
  var document = bundle.action_fields.document;

  url += encodeURIComponent(document);
  url += "/import";

  var transaction_xml = "";
  var detail_xml = "";
  var detail_subfile = "";
  var fields = bundle.inputFields;
  var detail_lines = fields.detail;
  var d;

  //  ASSEMBLE DETAIL LINES

  for (d = 0; d < detail_lines.length; d++) {
    var details = detail_lines[d];

    detail_xml = '';
    detail_xml += '<detail>';
    detail_xml += details.detail_stockcode && '<detail.StockCode>' + details.detail_stockcode + '</detail.StockCode>' || '';
    detail_xml += details.detail_stockqty && '<detail.StockQty>' + details.detail_stockqty + '</detail.StockQty>' || '';
    detail_xml += details.detail_orderqty && '<detail.OrderQty>' + details.detail_orderqty + '</detail.OrderQty>' || '';

    detail_xml += details.description && '<detail.Description>' + details.description + '</detail.Description>' || '<detail.description work-it-out="true" />';
    detail_xml += details.unit_price && '<detail.UnitPrice>' + details.unit_price + '</detail.UnitPrice>' || '<detail.unitprice work-it-out="true" />';
    detail_xml += details.net && '<detail.Net>' + details.net + '</detail.Net>' || '<detail.net work-it-out="true" />';
    detail_xml += details.tax_code && '<detail.TaxCode>' + details.tax_code + '</detail.TaxCode>' || '<detail.taxcode work-it-out="true" />';
    detail_xml += details.tax && '<detail.Tax>' + details.tax + '</detail.Tax>' || '<detail.tax work-it-out="true" />';
    detail_xml += details.gross && '<detail.Gross>' + details.gross + '</detail.Gross>' || '<detail.gross work-it-out="true" />';
    detail_xml += details.discount && '<detail.Discount>' + details.discount + '</detail.Discount>' || '<detail.discount work-it-out="true" />';
    detail_xml += details.account && '<detail.Account>' + details.account + '</detail.Account>' || '<detail.Account work-it-out="true" />';

    detail_xml += details.sale_unit && '<detail.SaleUnit>' + details.sale_unit + '</detail.SaleUnit>' || '<detail.Account work-it-out="true" />';
    detail_xml += details.cost_price && '<detail.CostPrice>' + details.cost_price + '</detail.CostPrice>' || '<detail.Account work-it-out="true" />';
    detail_xml += details.job_code && '<detail.JobCode>' + details.job_code + '</detail.JobCode>' || '';
    detail_xml += details.job_code && '<detail.UserText>' + details.user_text + '</detail.UserText>' || '';

    detail_xml += '</detail>';

    detail_subfile += detail_xml;
  }

  console.log(detail_subfile);

  transaction_xml = '';
  transaction_xml += '<?xml version="1.0"?>';
  transaction_xml += '<table name="Transaction">';
  transaction_xml += '<transaction>';

  transaction_xml += '<TransDate work-it-out="true" />';
  transaction_xml += '<Type>' + fields.type + '</Type>';
  transaction_xml += '<NameCode>' + fields.name_code + '</NameCode>';

  transaction_xml += '<OurRef work-it-out="true" />';
  transaction_xml += '<Contra work-it-out="true" />';

  transaction_xml += fields.to_from && '<ToFrom>' + fields.to_from + '</ToFrom>' || '<ToFrom work-it-out="true" />';
  transaction_xml += fields.their_ref && '<TheirRef>' + fields.their_ref + '</TheirRef>' || '<TheirRef work-it-out="true" />';
  transaction_xml += fields.description && '<Description>' + fields.description + '</Description>' || '<Description work-it-out="true" />';

  transaction_xml += fields.mailing_address && '<MailingAddress>' + fields.mailing_address + '</MailingAddress>' || '';
  transaction_xml += fields.delivery_address && '<DeliveryAddress>' + fields.delivery_address + '</DeliveryAddress>' || '';
  transaction_xml += fields.freight_code && '<FreightCode>' + fields.freight_code + '</FreightCode>' || '';
  transaction_xml += fields.freight_amount && '<FreightAmount>' + fields.freight_amount + '</FreightAmount>' || '';

  transaction_xml += fields.currency && '<Currency>' + fields.currency + '</Currency>' || '';
  transaction_xml += fields.exchange_rate && '<ExchangeRate>' + fields.exchange_rate + '</ExchangeRate>' || '';

  transaction_xml += fields.prod_price_code && '<ProdPriceCode>' + fields.prod_price_code + '</ProdPriceCode>' || '<ProdPriceCode work-it-out="true" />';

  transaction_xml += fields.payment_method && '<PaymentMethod>' + fields.payment_method + '</PaymentMethod>' || '';

  transaction_xml += fields.prompt_payment_date && '<PromptPaymentDate>' + fields.prompt_payment_date + '</PromptPaymentDate>' || '<PromptPaymentDate work-it-out="true" />';
  transaction_xml += fields.prompt_payment_amt && '<PromptPaymentAmt>' + fields.prompt_payment_amt + '</PromptPaymentAmt>' || '<PromptPaymentAmt work-it-out="true" />';

  transaction_xml += fields.special_bank && '<SpecialBank>' + fields.special_bank + '</SpecialBank>' || '';
  transaction_xml += fields.special_branch && '<SpecialBranch>' + fields.special_branch + '</SpecialBranch>' || '';
  transaction_xml += fields.special_account && '<SpecialAccount>' + fields.special_account + '</SpecialAccount>' || '';

  transaction_xml += fields.flag && '<Flag>' + fields.flag + '</Flag>' || '';
  transaction_xml += fields.analysis && '<Analysis>' + fields.analysis + '</Analysis>' || '';

  transaction_xml += fields.colour && '<Colour>' + fields.colour + '</Colour>' || '';
  transaction_xml += fields.user1 && '<User1>' + fields.user_1 + '</User1>' || '';
  transaction_xml += fields.user2 && '<User2>' + fields.user_2 + '</User2>' || '';
  transaction_xml += fields.user3 && '<User3>' + fields.user_3 + '</User3>' || '';

  transaction_xml += '<subfile name="Detail">';
  transaction_xml += detail_subfile;
  transaction_xml += '</subfile>';

  transaction_xml += fields.gross && '<Gross>' + fields.gross + '</Gross>' || '<Gross work-it-out="true" />';

  transaction_xml += '</transaction>';
  transaction_xml += '</table>';

  transaction_xml = transaction_xml.replace("&", "_");
  transaction_xml = transaction_xml.replace("%", "_");

  console.log(transaction_xml);

  const responsePromise = z.request({
    method: 'POST',
    url: url,
    body: transaction_xml
  });

  return responsePromise
  //  .then(response => z.JSON.parse(response.content));
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
        key: 'freight_details',
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
        key: 'sales_person',
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
        key: 'user_1',
        label: 'User 1',
        helpText: 'User defined',
        type: 'string',
        required: false
      },
      {
        key: 'user_2',
        label: 'User 2',
        helpText: 'User defined',
        type: 'string',
        required: false
      },
      {
        key: 'user_3',
        label: 'User 3',
        helpText: 'User defined',
        type: 'string',
        required: false
      }
    ],
    outputFields: [],
    perform: createTransaction,
    sample: {
      ourref: "1235",
      transdate: "20180807",
      duedate: "20180807",
      type: "SOI",
      theirref: "their_ref",
      namecode: "ACME",
      description: "Widget Sale",
      gross: "293.25",
      tofrom: "Acme Limited",
      colour: "6",
      prodpricecode: "B",
      deliveryaddress: "",
      freightcode: "CP",
      details: [{
        account: "1110-",
        taxcode: "G",
        gross: "115",
        tax: "15",
        net: "100",
        description: "Widget",
        stockqty: "1.000000",
        stockcode: "WIDG",
        costprice: "50",
        unitprice: "100",
        saleunit: "ea",
        orderqty: "1.00"
      }]
    }
  }
};
