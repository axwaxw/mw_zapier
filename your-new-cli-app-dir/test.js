var XML = require('pixl-xml');

var xml_string = `<?xml version="1.0"?>
<table name="Transaction" count="2" start="0" found="2">
	<transaction>
		<ourref>32099</ourref>
		<transdate>20180807</transdate>
		<duedate>20180807</duedate>
		<type>SOI</type>
		<theirref>COAZ00000249003</theirref>
		<namecode>LOYNZ.ANZ</namecode>
		<description>Melissa Broadbent (6014352002347645)</description>
		<gross>293.25</gross>
		<tofrom>Loyalty New Zealand Ltd (Air NZ)</tofrom>
		<colour>6</colour>
		<prodpricecode>B</prodpricecode>
		<deliveryaddress>Melissa Broadbent&#13;79 Henwood Road&#13;&#13;Taupaki&#13;&#13;0782&#13;New Zealand&#13;+6421459206</deliveryaddress>
		<freightcode>CP</freightcode>
		<subfile name="Detail">
			<detail>
				<detail.account>1110-</detail.account>
				<detail.taxcode>G</detail.taxcode>
				<detail.gross>293.25</detail.gross>
				<detail.tax>38.25</detail.tax>
				<detail.net>255.00</detail.net>
				<detail.description>Ottoman Charcoal Tweed</detail.description>
				<detail.stockqty>1.000000</detail.stockqty>
				<detail.stockcode>OTMCT</detail.stockcode>
				<detail.costprice>114.337222</detail.costprice>
				<detail.unitprice>254.999988</detail.unitprice>
				<detail.saleunit>ea</detail.saleunit>
				<detail.orderqty>1.000000</detail.orderqty>
			</detail>
		</subfile>
	</transaction>
	<transaction>
		<ourref>32098</ourref>
		<transdate>20180807</transdate>
		<duedate>20180807</duedate>
		<type>SOI</type>
		<theirref>COAZ00000248997</theirref>
		<namecode>LOYNZ.ANZ</namecode>
		<description>Melissa Broadbent (6014352002347645)</description>
		<gross>482.31</gross>
		<tofrom>Loyalty New Zealand Ltd (Air NZ)</tofrom>
		<colour>6</colour>
		<prodpricecode>B</prodpricecode>
		<deliveryaddress>Melissa Broadbent&#13;79 Henwood Road&#13;&#13;Taupaki&#13;&#13;0782&#13;New Zealand&#13;+6421459206</deliveryaddress>
		<freightcode>CP</freightcode>
		<subfile name="Detail">
			<detail>
				<detail.account>1110-</detail.account>
				<detail.taxcode>G</detail.taxcode>
				<detail.gross>482.31</detail.gross>
				<detail.tax>62.91</detail.tax>
				<detail.net>419.40</detail.net>
				<detail.description>Marine Bean Chair Charcoal Tweed</detail.description>
				<detail.stockqty>1.000000</detail.stockqty>
				<detail.stockcode>MBNCHAIRCT</detail.stockcode>
				<detail.costprice>195.450476</detail.costprice>
				<detail.unitprice>419.400009</detail.unitprice>
				<detail.saleunit>ea</detail.saleunit>
				<detail.orderqty>1.000000</detail.orderqty>
			</detail>
		</subfile>
	</transaction>
</table>
`

xml_string = xml_string.replace(/detail[.]/g, "")

console.log(xml_string)

var doc = XML.parse(xml_string, { preserveAttributes: true, preserveDocumentNode: true });



var trans = doc.table.transaction

console.log(JSON.stringify(trans))

trans.forEach(transaction => {

  var details = transaction.subfile.detail
  delete transaction.subfile
  transaction.details = []
  transaction.details.push(details)

}



);

console.log(JSON.stringify(trans))


//var details = doc.table.transaction.subfile.detail
//delete doc.table.transaction.subfile
//doc.table.transaction.details = details

