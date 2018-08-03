'use strict';

// START: HEADER -- AUTOMATICALLY ADDED FOR COMPATIBILITY - v1.2.0
const _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
const crypto = require('crypto');
const async = require('async');
const moment = require('moment-timezone');
const { DOMParser, XMLSerializer } = require('xmldom');
const atob = require('zapier-platform-legacy-scripting-runner/atob');
const btoa = require('zapier-platform-legacy-scripting-runner/btoa');
const z = require('zapier-platform-legacy-scripting-runner/z');
const $ = require('zapier-platform-legacy-scripting-runner/$');
const {
  ErrorException,
  HaltedException,
  StopRequestException,
  ExpiredAuthException,
  RefreshTokenException,
  InvalidSessionException,
} = require('zapier-platform-legacy-scripting-runner/exceptions');
// END: HEADER -- AUTOMATICALLY ADDED FOR COMPATIBILITY - v1.2.0

var Zap = {

  custom_headers: function(bundle) {

    console.log("auth header function");
    
    var custom_headers = {};

    var auth_fields = bundle.auth_fields;

    var datacentre_username = auth_fields.datacentre_username;
    var datacentre_password = auth_fields.datacentre_password;
    var document_username = auth_fields.document_username;
    var document_password = auth_fields.document_password;

    var auth_header = "";

    if (datacentre_username || datacentre_password) {
      auth_header = "Basic " + btoa(datacentre_username + ":Datacentre:" + datacentre_password) + ", Basic " + btoa(document_username + ":Document:" + document_password);
    } else {
      auth_header = "Basic " + btoa(document_username + ":Document:" + document_password);    
    }

    console.log(auth_header);

    custom_headers['Content-Type'] = "application/xml; charset=utf-8";
    custom_headers['Accept'] = "application/xml";
    custom_headers['Authorization'] = auth_header;

    console.log(custom_headers);
    
    return custom_headers;
    
  },
  
  // =============================================================================      


  document_pre_poll: function(bundle) {  
    
    bundle.request.headers = Zap.custom_headers(bundle);

    return bundle.request;
  },

  // =============================================================================      

  document_post_poll: function(bundle) {
  
    console.log(bundle.response.status_code);

    var content = bundle.response.content;
    var xml = $($.parseXML(content)).find('document');

    var documents = _.map(xml, function(element, index) {
      return {
        id: index,
        document: $(element).text()
      };
    });

    return documents;
  },
  
  // =============================================================================  

  account_pre_poll: function(bundle) {

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.trigger_fields.document;

    url += encodeURIComponent(document);
    url += "/export/";
    url += "table=account&";    
    url += "format=xml-verbose";

    bundle.request.url = url;

    return bundle.request;
  },

  // =============================================================================  


  account_post_poll: function(bundle) {

    var content = bundle.response.content;
    var xml = $($.parseXML(content)).find('account'); 
    
    var accounts = _.map(xml, function(element){
      return {
        id: $(element).find('sequencenumber').text(),
        code: $(element).find('code').text(),
        description: $(element).find('description').text()
      };
    });   
    
    return accounts;
  },  
  
  // =============================================================================  

  tax_pre_poll: function(bundle) {
   
    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.trigger_fields.document;

    url += encodeURIComponent(document);
    url += "/export/";
    url += "table=taxrate&";    
    url += "format=xml-verbose";

    bundle.request.url = url;

    return bundle.request;
  },

  // =============================================================================  


  tax_post_poll: function(bundle) {

    var content = bundle.response.content;
    var xml = $($.parseXML(content)).find('taxrate'); 
    
    var taxrates = _.map(xml, function(element){
      return {
        id: $(element).find('sequencenumber').text(),
        tax_code: $(element).find('taxcode').text(),
        rate_name: $(element).find('ratename').text() + " (" + Number($(element).find('rate2').text()).toFixed(2) + "%)",
        rate: $(element).find('rate2').text()
      };
    });   
    console.log(taxrates);

    return taxrates;
  },

  // =============================================================================  

  new_transaction_pre_poll: function(bundle) {

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.trigger_fields.document;

    url += encodeURIComponent(document);
    url += "/export/";

    url += "table=transaction&";
    url += "search=" + encodeURI("LastModifiedTime>today()") + "&";
    url += "limit=5&";
    url += "sort=transdate&";
    url += "direction=descending&";
    url += "format=xml-verbose";

    bundle.request.url = url;

    return bundle.request;
  },

  // =============================================================================  

  new_transaction_post_poll: function(bundle) {

    var details = {};
    var content = bundle.response.content;
    var details_xml = $($.parseXML(content)).find('detail');
    var j;
    
    console.log(details_xml);

    for (j = 0; j < details_xml.length; j++) {
      var d = details_xml[j];

      var id = $(d).find('detail\\.parentseq').text();

      console.log(id);

      var detail = {
        account: $(d).find('detail\\.account').text(),
        stock_code: $(d).find('detail\\.stockcode').text(),
        job_code: $(d).find('detail\\.jobcode').text(),
        description: $(d).find('detail\\.description').text(),
        credit: $(d).find('detail\\.credit').text(),
        debit: $(d).find('detail\\.debit').text(),
        sale_unit: $(d).find('detail\\.salesunit').text(),
        stock_qty: $(d).find('detail\\.stockqty').text(),
        order_qty: $(d).find('detail\\.orderqty').text(),
        prev_ship_qty: $(d).find('detail\\.prevshipqty').text(),
        back_order_qty: $(d).find('detail\\.backorderqty').text(),
        unit_price: $(d).find('detail\\.unitprice').text(),
        cost_price: $(d).find('detail\\.costprice').text(),
        discount: $(d).find('detail\\.discount').text(),
        tax_rate: $(d).find('detail\\.taxrate').text(),
        tax: $(d).find('detail\\.tax').text(),
        gross: $(d).find('detail\\.gross').text(),
        base_currency_net: $(d).find('detail\\.basecurrencynet').text(),
        dept: $(d).find('detail\\.dept').text(),
        expensed_tax: $(d).find('detail\\.expensedtax').text(),
        flags: $(d).find('detail\\.flags').text(),
        order_status: $(d).find('detail\\.orderstatus').text(),
        period: $(d).find('detail\\.period').text(),
        statement: $(d).find('detail\\.statement').text(),
        transaction_type: $(d).find('detail\\.transactiontype').text()
      };

      console.log(detail);

      if (details[id]) {
        details[id].push(detail);
      } else {
        details[id] = [];
        details[id].push(detail);
      }
    }

    console.log(details);

    var transaction_xml = $($.parseXML(content)).find('transaction');
    var i;
    var headers = [];

    for (i = 0; i < transaction_xml.length; i++) {
      var t = transaction_xml[i];

      var tid = $(t).find('sequencenumber').text();

      var header = {
        id: $(t).find('sequencenumber').text(),
        last_modified_time: $(t).find('lastmodifiedtime').text(),
        trans_date: $(t).find('transdate').text(),
        due_date: $(t).find('duedate').text(),
        type: $(t).find('type').text(),
        status: $(t).find('status').text(),
        hold: $(t).find('hold').text(),
        name_code: $(t).find('namecode').text(),
        to_from: $(t).find('tofrom').text(),
        our_ref: $(t).find('ourref').text(),
        their_ref: $(t).find('theirref').text(),
        description: $(t).find('description').text(),
        mailing_address: $(t).find('mailingaddress').text(),
        delivery_address: $(t).find('deliveryaddress').text(),
        sales_person: $(t).find('salesperson').text(),
        payment_method: $(t).find('paymentmethod').text(),
        prod_price_code: $(t).find('prodpricecode').text(),
        order_deposit: $(t).find('orderdeposit').text(),
        tax_amount: $(t).find('taxamount').text(),
        order_total: $(t).find('ordertotal').text(),
        gross: $(t).find('gross').text(),
        contra: $(t).find('contra').text(),
        currency: $(t).find('cunrrency').text(),
        exchange_rate: $(t).find('exchangerate').text(),
        freight_code: $(t).find('freightcode').text(),
        freight_details: $(t).find('freightdetails').text(),
        freight_amount: $(t).find('freightamount').text(),
        prompt_payment_date: $(t).find('promptpaymentdate').text(),
        prompt_paymentamt: $(t).find('promptpaymentamt').text(),
        special_bank: $(t).find('specialbank').text(),
        special_branch: $(t).find('specialbranch').text(),
        special_account: $(t).find('specialaccount').text(),
        recurring: $(t).find('recurring').text(),
        analysis: $(t).find('analysis').text(),
        flag: $(t).find('flag').text(),
        user1: $(t).find('user1').text(),
        user2: $(t).find('user2').text(),
        user3: $(t).find('user3').text(),
        colour: $(t).find('colour').text(),
        details: []
      };

      header.details = details[tid];
      headers.push(header);
    }
    return headers;
  },

  // =============================================================================    

  create_transaction_pre_write: function(bundle) {

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.action_fields.document;    

    url += encodeURIComponent(document);
    url += "/import";
    bundle.request.url = url;
    
    var transaction_xml = "";
    var detail_xml = "";
    var detail_subfile = "";
    var fields = bundle.action_fields;
    var detail_lines = bundle.action_fields.detail;
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
    transaction_xml += fields.user1 && '<User1>' + fields.user1 + '</User1>' || '';
    transaction_xml += fields.user2 && '<User2>' + fields.user2 + '</User2>' || '';
    transaction_xml += fields.user3 && '<User3>' + fields.user3 + '</User3>' || '';

    transaction_xml += '<subfile name="Detail">';
    transaction_xml += detail_subfile;
    transaction_xml += '</subfile>';

    transaction_xml += fields.gross && '<Gross>' + fields.gross + '</Gross>' || '<Gross work-it-out="true" />';

    transaction_xml += '</transaction>';
    transaction_xml += '</table>';
    
    transaction_xml = transaction_xml.replace("&", "_");
    transaction_xml = transaction_xml.replace("%", "_");
    
    console.log(transaction_xml);

    bundle.request.data = transaction_xml;

    return bundle.request;

  },
  
  // =============================================================================  

  new_name_pre_poll: function(bundle) {    

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.trigger_fields.document;

    url += encodeURIComponent(document);
    url += "/export/";

    url += "table=name&";
    url += "search=" + encodeURI("LastModifiedTime>today()-10") + "&";
    url += "limit=5&";    
    url += "sort=LastModifiedTime&";
    url += "direction=descending&";
    url += "format=xml-verbose";

    bundle.request.url = url;

    return bundle.request;
  },


  // =============================================================================  

  new_name_post_poll: function(bundle) {


    var content = bundle.response.content;

    var name_xml = $($.parseXML(content)).find('name');
    var i;
    var names = [];

    for (i = 0; i < name_xml.length; i++) {
      var t = name_xml[i];

      var name = {
        id: $(t).find('sequencenumber').text(),
        last_modified_time: $(t).find('lastmodifiedtime').text(),
        code: $(t).find('code').text(),
        name: $(t).find('name').text(),
        contact: $(t).find('contact').text(),
        position: $(t).find('position').text(),
        address1: $(t).find('address1').text(),
        address2: $(t).find('address2').text(),
        address3: $(t).find('address3').text(),
        address4: $(t).find('address4').text(),
        delivery1: $(t).find('delivery1').text(),
        delivery2: $(t).find('delivery2').text(),
        delivery3: $(t).find('delivery3').text(),
        delivery4: $(t).find('delivery4').text(),
        phone: $(t).find('phone').text(),
        fax: $(t).find('fax').text(),
        category1: $(t).find('category1').text(),
        category2: $(t).find('category2').text(),
        category3: $(t).find('category3').text(),
        category4: $(t).find('category4').text(),
        customertype: $(t).find('customertype').text(),
        d90plus: $(t).find('d90plus').text(),
        d60plus: $(t).find('d60plus').text(),
        d30plus: $(t).find('d30plus').text(),
        dcurrent: $(t).find('dcurrent').text(),
        ccurrent: $(t).find('ccurrent').text(),
        debtor_terms: $(t).find('debtorterms').text(),
        creditor_terms: $(t).find('creditorterms').text(),
        bank: $(t).find('bank').text(),
        account_name: $(t).find('accountname').text(),
        bank_branch: $(t).find('bankbranch').text(),
        their_ref: $(t).find('theirref').text(),
        hold: $(t).find('hold').text(),
        rec_account: $(t).find('recaccount').text(),
        pay_account: $(t).find('payaccount').text(),
        kind: $(t).find('kind').text(),
        credit_limit: $(t).find('creditlimit').text(),
        discount: $(t).find('discount').text(),
        comment: $(t).find('comment').text(),
        supplier_type: $(t).find('suppliertype').text(),
        colour: $(t).find('colour').text(),
        sales_person: $(t).find('salesperson').text(),
        tax_code: $(t).find('taxcode').text(),
        postcode: $(t).find('postcode').text(),
        state: $(t).find('state').text(),
        bank_account_number: $(t).find('bankaccountnumber').text(),
        currency: $(t).find('currency').text(),
        payment_method: $(t).find('paymentmethod').text(),
        dbalance: $(t).find('dbalance').text(),
        ddi: $(t).find('ddi').text(),
        email: $(t).find('email').text(),
        mobile: $(t).find('mobile').text(),
        after_hours: $(t).find('afterhours').text(),
        contact2: $(t).find('contact2').text(),
        position2: $(t).find('position2').text(),
        ddi2: $(t).find('ddi2').text(),
        email2: $(t).find('email2').text(),
        mobile2: $(t).find('mobile2').text(),
        after_hours2: $(t).find('afterhours2').text(),
        web_url: $(t).find('weburl').text(),
        product_pricing: $(t).find('productpricing').text(),
        date_of_last_sale: $(t).find('dateoflastsale').text(),
        split_acct1: $(t).find('splitacct1').text(),
        split_acct2: $(t).find('splitacct2').text(),
        split_percent: $(t).find('splitpercent').text(),
        user_num: $(t).find('usernum').text(),
        user_text: $(t).find('usertext').text(),
        cust_prompt_payment_terms: $(t).find('custpromptpaymentterms').text(),
        cust_prompt_payment_discount: $(t).find('custpromptpaymentdiscount').text(),
        supp_prompt_payment_terms: $(t).find('supppromptpaymentterms').text(),
        supp_prompt_payment_discount: $(t).find('supppromptpaymentdiscount').text(),
        last_payment_method: $(t).find('lastpaymentmethod').text(),
        credit_card_num: $(t).find('creditcardnum').text(),
        credit_card_expiry: $(t).find('creditcardexpiry').text(),
        credit_card_name: $(t).find('creditcardname').text(),
        tax_number: $(t).find('taxnumber').text(),
        custom1: $(t).find('custom1').text(),
        custom2: $(t).find('custom2').text(),
        custom3: $(t).find('custom3').text(),
        custom4: $(t).find('custom4').text(),
        delivery_postcode: $(t).find('deliverypostcode').text(),
        delivery_state: $(t).find('deliverystate').text(),
        address_country: $(t).find('addresscountry').text(),
        delivery_country: $(t).find('deliverycountry').text(),
        receipt_method: $(t).find('receiptmethod').text(),
        abuid: $(t).find('abuid').text(),
        flags: $(t).find('flags').text()
      };
      names.push(name);
    }
    return names;
  },
  

  // =============================================================================  


  create_name_pre_write: function(bundle) {

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.action_fields.document;    

    url += encodeURIComponent(document);
    url += "/import";
    bundle.request.url = url;
    
    var code;
    var name_xml = "";
    var fields = bundle.action_fields;

    name_xml = '';
    name_xml += '<?xml version="1.0"?>';
    name_xml += '<table name="Name">';
    name_xml += '<name>';    
    
    var name = fields.name;
    
    name_xml += fields.name && '<Name>' + name + '</Name>' || '';
    
    /*    
    // WE CAN NOW IMPORT NAME WITHOUT A NAME CODE
    if (fields.code) {    
      code = fields.code;
    } else {    
      code = name;
      if (code.length > 11) {
        var names = code.split(" ");
        code = names[0].substring(0,5) + names[1].substring(0,(code.length - names[0].length));  
      }
      code = code + "##########";    
      code = code.substring(0,10);
      code = code.replace(" ", "") + "#";
    }    
    
    name_xml += '<Code>' + code + '</Code>';
    */
    
    name_xml += fields.code && '<Code>' + fields.code + '</Code>' || '<Code work-it-out="true" />';

    name_xml += fields.tux_number && '<TaxNumber>' + fields.tax_number + '</TaxNumber>' || '';

    name_xml += fields.address1 && '<Address1>' + fields.address1 + '</Address1>' || '';
    name_xml += fields.address2 && '<Address2>' + fields.address2 + '</Address2>' || '';
    name_xml += fields.address3 && '<Address3>' + fields.address3 + '</Address3>' || '';
    name_xml += fields.address4 && '<Address4>' + fields.address4 + '</Address4>' || '';
    name_xml += fields.postcode && '<Postcode>' + fields.postcode + '</Postcode>' || '';
    name_xml += fields.state && '<State>' + fields.state + '</State>' || '';
    name_xml += fields.address_country && '<AddressCountry>' + fields.address_country + '</AddressCountry>' || '';


    name_xml += fields.phone && '<Phone>' + fields.phone + '</Phone>' || '';
    name_xml += fields.fax && '<Fax>' + fields.fax + '</Fax>' || '';
    name_xml += fields.web_url && '<WebUrl>' + fields.web_url + '</WebUrl>' || '';

    name_xml += fields.delivery1 && '<Delivery1>' + fields.delivery1 + '</Delivery1>' || '';
    name_xml += fields.delivery2 && '<Delivery2>' + fields.delivery2 + '</Delivery2>' || '';
    name_xml += fields.delivery3 && '<Delivery3>' + fields.delivery3 + '</Delivery3>' || '';
    name_xml += fields.delivery4 && '<Delivery4>' + fields.delivery4 + '</Delivery4>' || '';
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
    name_xml += fields.email2 && '<Email2>' + fields.email2 + '</Email2>' || '';
    name_xml += fields.mobile2 && '<Mobile2>' + fields.mobile2 + '</Mobile2>' || '';
    name_xml += fields.after_hours2 && '<AfterHours2>' + fields.after_hours2 + '</AfterHours2>' || '';

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

    name_xml += fields.split_acct1 && '<SplitAcct1>' + fields.split_acct1 + '</SplitAcct1>' || '';
    name_xml += fields.split_acct2 && '<SplitAcct2>' + fields.split_acct2 + '</SplitAcct2>' || '';
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

    name_xml += fields.category1 && '<Category1>' + fields.category1 + '</Category1>' || '';
    name_xml += fields.category2 && '<Category2>' + fields.category2 + '</Category2>' || '';
    name_xml += fields.category3 && '<Category3>' + fields.category3 + '</Category3>' || '';
    name_xml += fields.category4 && '<Category4>' + fields.category4 + '</Category4>' || '';

    name_xml += fields.custom1 && '<Custom1>' + fields.custom1 + '</Custom1>' || '';
    name_xml += fields.custom2 && '<Custom2>' + fields.custom2 + '</Custom2>' || '';
    name_xml += fields.custom3 && '<Custom3>' + fields.custom3 + '</Custom3>' || '';
    name_xml += fields.custom4 && '<Custom4>' + fields.custom4 + '</Custom4>' || '';

    name_xml += '</name>';
    name_xml += '</table>';
    
    name_xml = name_xml.replace("&", "_");
    name_xml = name_xml.replace("%", "_");

    bundle.request.data = name_xml;

    return bundle.request;

  },
  
   // =============================================================================  

  find_name_pre_search: function(bundle) {   

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.search_fields.document;

    url += encodeURIComponent(document);
    url += "/export/";
    url += "table=name&";
    
    console.log(bundle.search_fields.search_string);
    console.log(bundle.search_fields.search_string.search("@"));    
    
    if (bundle.search_fields.search_string.search("@") > 0) {
      url += "search=" + encodeURIComponent("email==\"" + bundle.search_fields.search_string + "\"") + "&";
    } else {
      url += "search=" + encodeURIComponent("code=\"" + bundle.search_fields.search_string + "\"") + "&";
    }    
    
    url += "limit=2&";
    url += "format=xml-verbose";

    bundle.request.url = url;

    return bundle.request;
  },


  // =============================================================================  
  
  
  find_name_post_search: function(bundle) {
  
    if (bundle.response.status_code != 200) {
      return [];
    }

    var content = bundle.response.content;
    var xml = $($.parseXML(content)).find('name');

    var names = _.map(xml, function(element) {
      return {       
        id: $(element).find('sequencenumber').text(),
        name_code: $(element).find('code').text()        
      };
    });
    console.log(names);
    return names;
  },  

  // =============================================================================  

  find_name_pre_read_resource: function(bundle) {

    bundle.request.headers = Zap.custom_headers(bundle);

    var url = bundle.request.url;
    var document = bundle.read_context.document;

    url += encodeURIComponent(document);
    url += "/export/";
    url += "table=name&";
    url += "search=" + encodeURIComponent("sequencenumber=" + bundle.read_fields.id) + "&";    
    url += "limit=2&";
    url += "format=xml-verbose";

    bundle.request.url = url;

    return bundle.request;
  },


  // =============================================================================  


  find_name_post_read_resource: function(bundle) {

    var content = bundle.response.content;

    var x = $($.parseXML(content)).find('name');   

    var name = {
        id: $(x).find('sequencenumber').text(),
        last_modified_time: $(x).find('lastmodifiedtime').text(),
        code: $(x).find('code').text(),
        name: $(x).find('name').text(),
        contact: $(x).find('contact').text(),
        position: $(x).find('position').text(),
        address1: $(x).find('address1').text(),
        address2: $(x).find('address2').text(),
        address3: $(x).find('address3').text(),
        address4: $(x).find('address4').text(),
        delivery1: $(x).find('delivery1').text(),
        delivery2: $(x).find('delivery2').text(),
        delivery3: $(x).find('delivery3').text(),
        delivery4: $(x).find('delivery4').text(),
        phone: $(x).find('phone').text(),
        fax: $(x).find('fax').text(),
        category1: $(x).find('category1').text(),
        category2: $(x).find('category2').text(),
        category3: $(x).find('category3').text(),
        category4: $(x).find('category4').text(),
        customer_type: $(x).find('customertype').text(),
        d90plus: $(x).find('d90plus').text(),
        d60plus: $(x).find('d60plus').text(),
        d30plus: $(x).find('d30plus').text(),
        dcurrent: $(x).find('dcurrent').text(),
        ccurrent: $(x).find('ccurrent').text(),
        debtor_terms: $(x).find('debtorterms').text(),
        creditor_terms: $(x).find('creditorterms').text(),
        bank: $(x).find('bank').text(),
        account_name: $(x).find('accountname').text(),
        bank_branch: $(x).find('bankbranch').text(),
        their_ref: $(x).find('theirref').text(),
        hold: $(x).find('hold').text(),
        rec_account: $(x).find('recaccount').text(),
        pay_account: $(x).find('payaccount').text(),
        kind: $(x).find('kind').text(),
        credit_limit: $(x).find('creditlimit').text(),
        discount: $(x).find('discount').text(),
        comment: $(x).find('comment').text(),
        supplier_type: $(x).find('suppliertype').text(),
        colour: $(x).find('colour').text(),
        sales_person: $(x).find('salesperson').text(),
        tax_code: $(x).find('taxcode').text(),
        postcode: $(x).find('postcode').text(),
        state: $(x).find('state').text(),
        bank_account_number: $(x).find('bankaccountnumber').text(),
        currency: $(x).find('currency').text(),
        payment_method: $(x).find('paymentmethod').text(),
        dbalance: $(x).find('dbalance').text(),
        ddi: $(x).find('ddi').text(),
        email: $(x).find('email').text(),
        mobile: $(x).find('mobile').text(),
        after_hours: $(x).find('afterhours').text(),
        contact2: $(x).find('contact2').text(),
        position2: $(x).find('position2').text(),
        ddi2: $(x).find('ddi2').text(),
        email2: $(x).find('email2').text(),
        mobile2: $(x).find('mobile2').text(),
        after_hours2: $(x).find('afterhours2').text(),
        weburl: $(x).find('weburl').text(),
        product_pricing: $(x).find('productpricing').text(),
        date_oflast_sale: $(x).find('dateoflastsale').text(),
        split_acct1: $(x).find('splitacct1').text(),
        split_acct2: $(x).find('splitacct2').text(),
        split_percent: $(x).find('splitpercent').text(),
        user_num: $(x).find('usernum').text(),
        user_text: $(x).find('usertext').text(),
        cust_prompt_payment_terms: $(x).find('custpromptpaymentterms').text(),
        cust_prompt_payment_discount: $(x).find('custpromptpaymentdiscount').text(),
        supp_prompt_payment_terms: $(x).find('supppromptpaymentterms').text(),
        supp_prompt_payment_discount: $(x).find('supppromptpaymentdiscount').text(),
        last_payment_method: $(x).find('lastpaymentmethod').text(),
        credit_card_num: $(x).find('creditcardnum').text(),
        credit_card_expiry: $(x).find('creditcardexpiry').text(),
        credit_card_name: $(x).find('creditcardname').text(),
        tax_number: $(x).find('taxnumber').text(),
        custom1: $(x).find('custom1').text(),
        custom2: $(x).find('custom2').text(),
        custom3: $(x).find('custom3').text(),
        custom4: $(x).find('custom4').text(),
        delivery_postcode: $(x).find('deliverypostcode').text(),
        delivery_state: $(x).find('deliverystate').text(),
        address_country: $(x).find('addresscountry').text(),
        delivery_country: $(x).find('deliverycountry').text(),
        receipt_method: $(x).find('receiptmethod').text(),
        abuid: $(x).find('abuid').text(),
        flags: $(x).find('flags').text()   
    };    
    
    return name;      
  }
};

// START: FOOTER -- AUTOMATICALLY ADDED FOR COMPATIBILITY - v1.2.0
module.exports = Zap;
// END: FOOTER -- AUTOMATICALLY ADDED FOR COMPATIBILITY - v1.2.0
