var config = {};
// output directory
config.outPath = "blogentries/";

// SQL to grab the blog entries

config.sql =
		"SELECT " +
		"REPLACE(REPLACE(REPLACE(title,'\,',''),'''',''),':','-') AS title , " +
		"CONCAT_WS('<br>', body,morebody) AS fullbody , " +
		"alias , " +
		"lower(CONCAT_WS('-', TRIM(LEADING '0' FROM date_format(posted, '%Y')), " +
		"TRIM(LEADING '0' FROM date_format(posted, '%c')), " +
		"TRIM(LEADING '0' FROM date_format(posted, '%d')),alias)) AS htmlFileName, " +
		"views," +
		"posted " +
		"FROM tblblogentries " +
		"ORDER BY posted ASC " +
		"LIMIT 10";

config.mysql = {
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'andyjarrett'
};

module.exports = config;