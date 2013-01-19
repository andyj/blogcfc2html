// BlogCFC2Html
// EDIT config.js first!
//
var mysql = require('mysql');
var fs = require('fs');
var dateFormat = require('dateformat');
var config = require('./config');

// MySQL conncetion details
var connection = mysql.createConnection(config.mysql);
connection.connect();
connection.query(config.sql, processData);
connection.end();



function processData(err, rows, fields) {
	var i = 0;
	if (err) throw err;

	// Loop over the rows
	for (i = 0; i < rows.length; i++) {

		var fileName = rows[i].htmlFileName + '.html';
		var filePath = config.outPath + fileName;

		fs.writeFileSync(filePath, createHTMLContent( rows[i],i ));
	}
}

function createHTMLContent( row, pageorder ){

	// Create meta data first, make sure
	// layout/title/date/pageOrder are at the top
	var meta = ['---',
				'layout: blog',
				'title: "' + escape(row.title) +'"',
				'date: ' + row.posted,
				'pageOrder: ' + pageorder,
				'alias: ' + row.alias,
				'dateTime: ' + row.posted,
				'---'];
	// Add the content
	meta.push(row.fullbody);

	// Output the htmlFileName we are processing
	console.log(row.htmlFileName);
	return meta.join('\n');
}