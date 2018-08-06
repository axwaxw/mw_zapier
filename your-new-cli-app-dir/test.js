var XML = require('pixl-xml');

var xml_string = `<?xml version="1.0"?>
<table name="Transaction" count="1" start="0" found="1">
	<transaction>
		<ourref>2121</ourref>
		<transdate>20151225</transdate>
		<duedate>20160120</duedate>
		<type>DII</type>
		<theirref>3433</theirref>
		<namecode>WHITE</namecode>
		<description>Widget Sales</description>
		<gross>1009.12</gross>
		<contra>1500</contra>
		<tofrom>White Contractors</tofrom>
		<prodpricecode>A</prodpricecode>
		<subfile name="Detail">
			<detail>
				<detail.account>4000-</detail.account>
				<detail.taxcode>G</detail.taxcode>
				<detail.gross>779.62</detail.gross>
				<detail.tax>101.69</detail.tax>
				<detail.net>677.93</detail.net>
				<detail.description>Chrome Taper Widget Extra-large</detail.description>
				<detail.stockqty>7.000000</detail.stockqty>
				<detail.stockcode>CB200</detail.stockcode>
				<detail.costprice>34.239167</detail.costprice>
				<detail.unitprice>99.000000</detail.unitprice>
				<detail.saleunit>ea</detail.saleunit>
			</detail>
			<detail>
				<detail.account>4000-</detail.account>
				<detail.taxcode>G</detail.taxcode>
				<detail.gross>193.50</detail.gross>
				<detail.tax>25.24</detail.tax>
				<detail.net>168.26</detail.net>
				<detail.description>Bronze Taper Widget Medium</detail.description>
				<detail.stockqty>8.000000</detail.stockqty>
				<detail.stockcode>BC200</detail.stockcode>
				<detail.costprice>7.825875</detail.costprice>
				<detail.unitprice>21.500000</detail.unitprice>
				<detail.saleunit>ea</detail.saleunit>
			</detail>
			<detail>
				<detail.account>4000-</detail.account>
				<detail.taxcode>G</detail.taxcode>
				<detail.gross>36.00</detail.gross>
				<detail.tax>4.70</detail.tax>
				<detail.net>31.30</detail.net>
				<detail.description>Chrome Widget Medium</detail.description>
				<detail.stockqty>2.000000</detail.stockqty>
				<detail.stockcode>CA200</detail.stockcode>
				<detail.costprice>6.848462</detail.costprice>
				<detail.unitprice>16.000000</detail.unitprice>
				<detail.saleunit>ea</detail.saleunit>
			</detail>
		</subfile>
	</transaction>
</table>`

xml_string = xml_string.replace(/detail[.]/g, "")

console.log(xml_string)

var doc = XML.parse(xml_string, { preserveAttributes: true, preserveDocumentNode: true });

var details = doc.table.transaction.subfile.detail
delete doc.table.transaction.subfile
doc.table.transaction.details = details

console.log(JSON.stringify(doc.table.transaction))