var http = require('http');

var lookup = function( license, ip, callback ) {
	http.get({ host: 'geoip3.maxmind.com', port: 80, path: '/f?l='+ license +'&i='+ ip }, function( result ) {
		result.setEncoding('utf8');
		result.on('data', function( data ) {
			var data = ip +','+ data;
			callback( parseResult( data ) );
		});
	});
}
exports.lookup = lookup;

var parseResult = function( str ) {
	var result = [];
	var head = ['target', 'countryCode', 'regionCode', 'city', 'postalCode', 'latitude', 'longitude', 'metroCode', 'areaCode', 'isp', 'org', 'extra'];
	var str = str.split(',');
	for( i=0; i<str.length; i++ ) {
		if( str[i].substr(0,1) == '"' && str[i].substr(-1,1) == '"' ) {
			str[i] = str[i].substr( 1, str[i].length -2 );
		}
		result[ head[i] ] = str[i];
	}
	return result;
}
exports.parseResult = parseResult;