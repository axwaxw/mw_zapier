const getList = (z, bundle) => {

  var XML = require('pixl-xml');
  var url = bundle.authData.url;
  var document = bundle.authData.document;

  url += encodeURIComponent(document);
  url += "/export/";

  var params = {
    table: "transaction",
    search: "transdate>today()-10",
    limit: 50,
    sort: "transdate",
    direction: "descending",
    format: "xml-verbose"
  }

  const responsePromise = z.request({
    url: url,
    params: params
  })

  return responsePromise
    .then(response => {
      var transactions = XML.parse(response.content, { preserveAttributes: true, preserveDocumentNode: true });
      console.log(trasactions.table.transaction);

      var transactions_array = doc.table.transaction

      console.log(JSON.stringify(transactions_array))

      transactions_array.forEach(transaction => {

        var details = transaction.subfile.detail
        delete transaction.subfile

        if (Array.isArray(details)) {
          transaction.details = details
        } else {
          transaction.details = []
          transaction.details.push(details)
        }
        return z.JSON.parse(transactions_array);
      });
    });
}

module.exports = {
  key: 'new_transaction',
  noun: 'transaction',

  display: {
    label: 'New Transaction',
    description: 'Triggered when a new transaction (credit, receipt, order, invoice, quote, or journal) is entered. ',
    hidden: false,
    important: true
  },

  operation: {
    inputFields: [
      {
        key: 'document',
        label: 'Document',
        helpText: 'Your Moneyworks document',
        type: 'string',
        required: true,
        dynamic: 'document.document.document'
      }
    ],
    outputFields: [
      {
        key: 'aging ',
        type: 'string',
        label: 'Aging'
      },
      {
        key: 'amt_paid ',
        type: 'string',
        label: 'Amount Paid'
      },
      {
        key: 'amt_written_off ',
        type: 'string',
        label: 'Amount Written-Off'
      },
      {
        key: 'analysis',
        type: 'string',
        label: 'Analysis'
      },
      {
        key: 'bank_jn_seq ',
        type: 'string'
      },
      {
        key: 'colour',
        type: 'string',
        label: 'Colour'
      },
      {
        key: 'contra',
        type: 'string',
        label: 'Contra Account'
      },
      {
        key: 'currency',
        type: 'string',
        label: 'Currency'
      },
      {
        key: 'currency_transfer_seq ',
        type: 'string'
      },
      {
        key: 'date_paid ',
        type: 'string',
        label: 'Date paid'
      },
      {
        key: 'delivery_address',
        type: 'string',
        label: 'Delivery Address'
      },
      {
        key: 'description',
        type: 'string',
        label: 'Transaction Description'
      },
      {
        key: 'detail__account',
        type: 'string',
        label: 'Account (Detail)'
      },
      {
        key: 'detail__back_order_qty ',
        type: 'string',
        label: 'Back Order Quantity (Detail)'
      },
      {
        key: 'detail__base_currency_net ',
        type: 'string',
        label: 'Base Currency Net (Detail)'
      },
      {
        key: 'detail__cost_price',
        type: 'string',
        label: 'Cost Price (Detail)'
      },
      {
        key: 'detail__credit ',
        type: 'string',
        label: 'Credit (Detail)'
      },
      {
        key: 'detail__debit ',
        type: 'string',
        label: 'Debit (Detail)'
      },
      {
        key: 'detail__dept ',
        type: 'string',
        label: 'Department (Detail)'
      },
      {
        key: 'detail__description',
        type: 'string',
        label: 'Description (Detail)'
      },
      {
        key: 'detail__discount',
        type: 'string',
        label: 'Discount (Detail)'
      },
      {
        key: 'detail__expensed_tax ',
        type: 'string',
        label: 'Expensed Tax (Detail)'
      },
      {
        key: 'detail__flags ',
        type: 'string',
        label: 'Flags (Detail)'
      },
      {
        key: 'detail__gross',
        type: 'string',
        label: 'Gross (Detail)'
      },
      {
        key: 'detail__jobcode',
        type: 'string',
        label: 'Job Code (Detail)'
      },
      {
        key: 'detail__last_modified_time ',
        type: 'string',
        label: 'Last Modified Time (Detail)'
      },
      {
        key: 'detail__net',
        type: 'string',
        label: 'Net (Detail)'
      },
      {
        key: 'detail__order_qty',
        type: 'string',
        label: 'Order Quantity (Detail)'
      },
      {
        key: 'detail__order_status ',
        type: 'string',
        label: 'Order Status (Detail)'
      },
      {
        key: 'detail__parent_seq ',
        type: 'string',
        label: 'Parent Sequence Number (Detail)'
      },
      {
        key: 'detail__period ',
        type: 'string',
        label: 'Period (Detail)'
      },
      {
        key: 'detail__posted_qty ',
        type: 'string',
        label: 'Posted Quantity (Detail)'
      },
      {
        key: 'detail__prev_ship_qty ',
        type: 'string',
        label: 'Previously Shipped Quantity (Detail)'
      },
      {
        key: 'detail__sale_unit',
        type: 'string',
        label: 'Sale Unit (Detail)'
      },
      {
        key: 'detail__sequence_number ',
        type: 'string',
        label: 'Sequence Number / ID (Detail)'
      },
      {
        key: 'detail__sort ',
        type: 'string',
        label: 'Sort (Detail)'
      },
      {
        key: 'detail__statement ',
        type: 'string',
        label: 'Statement (Detail)'
      },
      {
        key: 'detail__stock_code',
        type: 'string',
        label: 'Stock Code (Detail)'
      },
      {
        key: 'detail__stock_qty',
        type: 'string',
        label: 'Stock Quantity (Detail)'
      },
      {
        key: 'detail__tax',
        type: 'string',
        label: 'Tax (Detail)'
      },
      {
        key: 'detail__tax_code',
        type: 'string',
        label: 'Tax Code (Detail)'
      },
      {
        key: 'detail__transaction_type ',
        type: 'string',
        label: 'Transaction Type (Detail)'
      },
      {
        key: 'detail__unit_price',
        type: 'string',
        label: 'Unit Price (Detail)'
      },
      {
        key: 'due_date',
        type: 'string',
        label: 'Due Date'
      },
      {
        key: 'enter_date ',
        type: 'string',
        label: 'Enter Date'
      },
      {
        key: 'entered_by ',
        type: 'string',
        label: 'Entered By'
      },
      {
        key: 'exchange_rate',
        type: 'string',
        label: 'Exhcange Rate'
      },
      {
        key: 'flag',
        type: 'string',
        label: 'Flag'
      },
      {
        key: 'flags ',
        type: 'string',
        label: 'Flags (system)'
      },
      {
        key: 'freight_amount',
        type: 'string',
        label: 'Freight Amount'
      },
      {
        key: 'freight_code',
        type: 'string',
        label: 'Freight Code'
      },
      {
        key: 'freight_details',
        type: 'string',
        label: 'Freight Details'
      },
      {
        key: 'gross',
        type: 'string',
        label: 'Gross'
      },
      {
        key: 'hold',
        type: 'string',
        label: 'Hold?'
      },
      {
        key: 'id',
        type: 'string',
        label: 'ID'
      },
      {
        key: 'last_modified_time ',
        type: 'string',
        label: 'Last Modified Time'
      },
      {
        key: 'mailing_address',
        type: 'string',
        label: 'Mailing Address'
      },
      {
        key: 'name_code',
        type: 'string',
        label: 'Name Code'
      },
      {
        key: 'order_shipped ',
        type: 'string',
        label: 'Order Shipped'
      },
      {
        key: 'orderdeposit ',
        type: 'string',
        label: 'Order Deposit'
      },
      {
        key: 'ordertotal ',
        type: 'string',
        label: 'Order Total'
      },
      {
        key: 'originating_order_seq ',
        type: 'string',
        label: 'Originating Order Sequence Number'
      },
      {
        key: 'our_ref',
        type: 'string',
        label: 'Our Ref'
      },
      {
        key: 'pay_amount ',
        type: 'string',
        label: 'Pay Amount'
      },
      {
        key: 'payment_method',
        type: 'string',
        label: 'Payment Method'
      },
      {
        key: 'period ',
        type: 'string',
        label: 'Period'
      },
      {
        key: 'postedby ',
        type: 'string',
        label: 'Posted By'
      },
      {
        key: 'printed ',
        type: 'string',
        label: 'Printed?'
      },
      {
        key: 'prod_price_code',
        type: 'string',
        label: 'Product Price Code'
      },
      {
        key: 'prompt_payment_amt',
        type: 'string',
        label: 'Prompt Payment Amount'
      },
      {
        key: 'prompt_payment_date',
        type: 'string',
        label: 'Prompt Payment Date'
      },
      {
        key: 'prompt_payment_disc ',
        type: 'string',
        label: 'Prompt Payment Discount'
      },
      {
        key: 'prompt_payment_terms ',
        type: 'string',
        label: 'Prompt Payment Terms'
      },
      {
        key: 'recurring',
        type: 'string',
        label: 'Recurring?'
      },
      {
        key: 'sales_person',
        type: 'string',
        label: 'Salesperson'
      },
      {
        key: 'special_account',
        type: 'string',
        label: 'Special Account'
      },
      {
        key: 'special_bank',
        type: 'string',
        label: 'Special Bank'
      },
      {
        key: 'special_branch',
        type: 'string',
        label: 'Special Branch'
      },
      {
        key: 'status ',
        type: 'string',
        label: 'Status'
      },
      {
        key: 'tax_amount ',
        type: 'string',
        label: 'Tax Amount'
      },
      {
        key: 'tax_cycle ',
        type: 'string',
        label: 'Tax CYcle'
      },
      {
        key: 'tax_processed ',
        type: 'string',
        label: 'Tax Processed'
      },
      {
        key: 'their_ref',
        type: 'string',
        label: 'Their Ref'
      },
      {
        key: 'time_posted ',
        type: 'string',
        label: 'Time Posted'
      },
      {
        key: 'to_from',
        type: 'string',
        label: 'To / From'
      },
      {
        key: 'trans_date',
        type: 'string',
        label: 'Transaction Date'
      },
      {
        key: 'type',
        type: 'string',
        label: 'Transaction Type (CRD, DIC, DII, QU etc.)'
      },
      {
        key: 'user1',
        type: 'string',
        label: 'User 1'
      },
      {
        key: 'user2',
        type: 'string',
        label: 'User 2'
      },
      {
        key: 'user3',
        type: 'string',
        label: 'User 3'
      }
    ],
    perform: getList,
    sample: {
      'aging ': '0',
      'amt_paid ': '100',
      'amt_written_off ': '0',
      analysis: '',
      'bank_jn_seq ': '0',
      colour: '1',
      contra: '6500',
      currency: '',
      'currency_transfer_seq ': '0',
      'date_paid ': '20161125',
      delivery_address: '',
      description: 'A Transaction',
      detail: {
        account: '1000',
        'back_order_qty ': '',
        'base_currency_net ': '100',
        cost_price: '50',
        'credit ': '0',
        'debit ': '100',
        'dept ': '',
        description: 'Widget',
        discount: '0',
        'expensed_tax ': '0',
        'flags ': '',
        gross: '100',
        jobcode: '',
        'last_modified_time ': '201610251000',
        net: '100',
        order_qty: '',
        'order_status ': '0',
        'parent_seq ': '1',
        'period ': '100',
        'posted_qty ': '0',
        'prev_ship_qty ': '',
        sale_unit: '',
        'sequence_number ': '1',
        'sort ': '1',
        'statement ': '0',
        stock_code: 'WIDGET',
        stock_qty: '1',
        tax: '0',
        tax_code: 'G',
        'transaction_type ': 'CI',
        unit_price: '100'
      },
      due_date: '20161125',
      'enter_date ': '20161025',
      'entered_by ': 'A',
      exchange_rate: '0',
      flag: '',
      'flags ': '524288',
      freight_amount: '',
      freight_code: '',
      freight_details: '',
      gross: '100',
      hold: '0',
      id: '1234',
      'last_modified_time ': '201610251000',
      mailing_address: '',
      name_code: 'ANAME',
      'order_shipped ': '0',
      'orderdeposit ': '0',
      'ordertotal ': '0',
      'originating_order_seq ': '0',
      our_ref: '3456',
      'pay_amount ': '0',
      payment_method: '0',
      'period ': '100',
      'postedby ': 'A',
      'printed ': '0',
      prod_price_code: 'A',
      prompt_payment_amt: '',
      prompt_payment_date: '',
      'prompt_payment_disc ': '0',
      'prompt_payment_terms ': '0',
      recurring: '0',
      sales_person: 'A',
      special_account: '',
      special_bank: '',
      special_branch: '',
      'status ': 'P',
      'tax_amount ': '0',
      'tax_cycle ': '-1',
      'tax_processed ': '0',
      their_ref: '567',
      'time_posted ': '201610251000',
      to_from: 'A Name',
      trans_date: '20161025',
      type: 'CIC',
      user1: 'user1',
      user2: 'user2',
      user3: 'user3'
    }
  }
};
