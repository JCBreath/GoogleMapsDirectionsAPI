const phantom = require('phantom');
 
(async function() {
	const instance = await phantom.create();
	const page = await instance.createPage();
	await page.on('onResourceRequested', function(requestData) {
		console.info('Requesting', requestData.url);
	});

	var keywords = ['umall','woodland','target'];
	var url = 'https://www.google.com/maps/dir/' + keywords[0] + '/' + keywords[1] + '/' + keywords[2];
	const status = await page.open(url);
	const content = await page.property('content');
	//console.log(content);

	await instance.exit();

	let regex = /\"(.{0,10}min)\\\"\]/g;
	let m;

	if ((m = regex.exec(content)) !== null) {
    	console.log('Time: ' + m[1]);
	}

	regex = /\"(.{0,10}miles)\\\",1\]/g;

	if ((m = regex.exec(content)) !== null) {
    	console.log('Distance: ' + m[1]);
	}
})();
	
	


