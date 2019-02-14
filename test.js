const http = require('http');
const https = require('https');
var url = require('url');
const async = require('async');

//var locList = [];
var queryPath = '';

var GenerateQuery = function(locList) {
	var qs = []; // Query Stack

	qs.push('/maps/preview/directions?');
	qs.push('authuser=0');
	qs.push('&');
	qs.push('hl=en');
	qs.push('&');
	qs.push('gl=us');
	qs.push('&');
	qs.push('pb=');


	// Text location mode
	if(locList.length == 2) {
		qs.push('!1m6!1s' + locList[0] + '!2s!3m2!3d0!4d0!6e0');
		qs.push('!1m6!1s' + locList[1] + '!2s!3m2!3d0!4d0!6e0');
	}

	if(locList.length > 2) {
		qs.push('!1m6!1s' + locList[0] + '!2s!3m2!3d0!4d0!6e0');
		qs.push('!1m6!1s' + locList[1] + '!2s!3m2!3d0!4d0!6e0');
		for(let i=2;i<locList.length;i++) {
			qs.push('!1m5!1s' + locList[i] + '!2s!3m2!3d0!4d0');
		}
	}

	qs.push('!3m12!1m3!1d0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1760!2i639!4f13.1!6m18!2m3!5m1!6e2!20e3!6m8!4b1!7i1!23b1!26i1!27i1!41i2!45b1!49b1!10b1!16b1!20m2!1e0!2e3!8m1!1e0!15m4!1sHwNkXJ_cIpm_0PEPytyJgA8!4m1!2i10147!7e81!20m28!1m6!1m2!1i0!2i0!2m2!1i458!2i639!1m6!1m2!1i1710!2i0!2m2!1i1760!2i639!1m6!1m2!1i0!2i0!2m2!1i1760!2i20!1m6!1m2!1i0!2i619!2m2!1i1760!2i639!27b1!28m0');

	return(qs.join(''));
};

var options = {
	host: 'www.google.com',
	port: 443,
	path: '',
	method: 'GET',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0',
		'Accept': '*/*',
		'Accept-Language': 'en-US,en;q=0.5',
		'Referer': 'https://www.google.com/',
		'Connection': 'keep-alive'
	}
};



var ProcessQueryText = function(text) {
	return(text.split(' ').join('+'));
};

function FixLocationList(locList, jsonData) {
	for(let i=0; i<locList.length; i++) {
		if(jsonData[0][0][i][1] != null) {
			locList[i] = jsonData[0][0][i][1][0][0][0].replace(/\s/g, '+').replace(/\(.*\)/g, '').replace(/\&\+|\+\&/g, '');
		}
	}
	return locList;
}

var DEMO = function() {
	locList = ['a', 'b', 'c', 'd'];
	queryPath = GenerateQuery(locList);
	options.path = queryPath;

	https.get(options, function(response) {
		var data = "";
		response.on('data', function(chunk) {
			data += chunk;
		});

		response.on('end', function() {
			var processedData = data.split('\n').slice(1).join('\n');
			var jsonData = JSON.parse(processedData);

			//console.log(jsonData[0][0][2][1][0][0][0])



			if(jsonData[0][1] == null) {
				RequestRoute(FixLocationList(locList, jsonData));
			}

			// console.log('Start Point: ' + jsonData[0][0][0][0][0][0]);
			// for(let i=1; i<locList.length; i++) {
			// 	console.log('Destination ' + i + ': ' + jsonData[0][0][i][0][0][0]);
			// }
			if(jsonData[0][1] != null) {
				console.log('Fastest Route: ' + jsonData[0][1][0][0][1]);
				console.log('Distance: ' + jsonData[0][1][0][0][2][1]);
				console.log('Duration: ' + jsonData[0][1][0][0][3][1]);
			}
		});
	});
};

DEMO();

var RequestRoute = function(locList, origRes) {
	queryPath = GenerateQuery(locList);
	options.path = queryPath;
	//console.log(queryPath);
	
	https.get(options, function(response) {

		var data = "";
		response.on('data', function(chunk) {
			data += chunk;
		});

		response.on('end', function() {

			var processedData = data.split('\n').slice(1).join('\n');
			var jsonData = JSON.parse(processedData);
			var oRes = origRes;
			
			if(jsonData[0][1] == null) {
				RequestRoute(FixLocationList(locList, jsonData), origRes);
			} else {
				
				var resStack = [];
				resStack.push('{"routes":[{');
				resStack.push('"legs":[{"distance":{"text":"' + jsonData[0][1][0][0][2][1] + '","value":0},');
				resStack.push('"duration":{"text":"' + jsonData[0][1][0][0][3][1] + '","value":0}');
				resStack.push('}]}]}');

				var resJSONstr = resStack.join('')

				//console.log(resJSONstr);

				console.log('Start Point: ' + jsonData[0][0][0][0][0][0]);
				for(let i=1; i<locList.length; i++) {
					console.log('Destination ' + i + ': ' + jsonData[0][0][i][0][0][0]);
					//console.log(jsonData[0][0][i]);
				}
				console.log('Fastest Route: ' + jsonData[0][1][0][0][1]);
				console.log('Distance: ' + jsonData[0][1][0][0][2][1]);
				console.log('Duration: ' + jsonData[0][1][0][0][3][1]);
				
				if(origRes != null) {
					origRes.write(resJSONstr);
					origRes.end();
				}
				
			}
		});
	});
}

var InitServer = function() {
	var ServerHandler = function(request, response) {
		var URL = request.url;
		var rawURL = request.url;
		var pathname = url.parse(request.url).pathname;

		console.log("New request " + URL + " from " + request.connection.remoteAddress);

		// request query
		if(/^\/maps/.test(pathname)) {
			if(/^\/maps\/dir/.test(pathname)) {
				locList = pathname.split('/')
				locList.splice(0, 3);
				//console.log(locList);
				//console.log(response);
				var resStr = '';
				resStr = RequestRoute(locList, response);
				console.log(resStr);
				response.writeHead(200, {"Content-Type": "application/json"});
				
			}
		} else {
			response.writeHead(200, {"Content-Type": "application/json"});
			response.write('[null]');
			response.end();
		}
	};

	server = http.createServer(ServerHandler);
	server.listen(80);
}

var server;

InitServer();