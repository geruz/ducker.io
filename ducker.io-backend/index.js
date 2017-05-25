var express = require('express');

var DuckerDB = require('./db');
var SHA256 = require("crypto-js/sha256");

var path = require('path');
var jmespath = require('jmespath');

var bodyParser = require('body-parser');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


var ABSTRACTIONS = require('./parts/abstractions');
var LOGGER = require('./parts/logger');
var PAGES = require('./parts/pages');

var app = express();

var _CalendarItems;
var _CalendarTaglist;


app.use(allowCrossDomain);
app.use(bodyParser.json());

app.use('/abstractions/', ABSTRACTIONS.router);
app.use('/logger/', LOGGER.router);


//// AUTH

app.post('/auth/login/:slug', function(req, res) {
	
	var action = req.body.action;
	var username = req.params.slug;
	var password = req.body.pass;

	if(action) {

		DuckerDB.DuckerDB.all("SELECT * FROM `users_list` WHERE `login` LIKE '"+username+"' ORDER BY `id`", 
		function(e,r) {

			let size = [];
			size = r;
			size = size.length;
			
			if(size > 0) {
				if(r[0]['pass'] == SHA256(password)) {
					console.log('>>>>>> TRUE'); 
					let exit = {
						id: r[0]['id'],
						name: r[0]['login'],
						avatar: r[0]['avatar'],
						role: r[0]['role']
					}
					res.json(exit);
				} else { 
					console.log('>>>>>> false'); 
					res.json('false');
				}				
			} else {
				res.json('404');
			}
		});
		
	} else {
		res.json('NO');
	}

});



// RUN SERVER & DB IMPORT

app.listen(4200, function () {

	console.log(' ');
	console.log('\x1b[44m DUCKER SERVER \x1b[0m BACKEND ON\x1b[36m 4200 \x1b[0m / #  Сервер запущен...');
	console.log(' ');	
	console.log('\x1b[32mИмпорт хранилищ:\x1b[0m');
	console.log(' ');	

	ABSTRACTIONS.getAbstractions();
	LOGGER.getLogger();

});


//// F U N C T I O N S

// >>>>>> A U T H

function authGuard(username, password) {
	console.log('username: ' + username);
	console.log('pass: ' + password);
	console.log('SHA256: ' + SHA256(password));
	console.log('-----------------');

	let exit;
	DuckerDB.DuckerDB.all("SELECT * FROM `users_list` WHERE `login` LIKE '"+username+"' ORDER BY `id`", 
	function(e,r) {
		console.log('pass from db: ' + r[0]['pass']);

		if(r[0]['pass'] == SHA256(password)) {
			console.log('>>>>>> TRUE'); 
			return true;
		} else { 
			console.log('>>>>>> false'); 
			return false;
		}
	});
	
}


// >>>>>> C A L E N D A R

function setCalendarItems() {

	if(!_CalendarItems) {
		DuckerDB.DuckerDB.all("SELECT * FROM `calendar_list` ORDER BY `id`", 
			function(e,r) {

					_CalendarItems = r;
					
					_CalendarItems.forEach(function(element, index) {
						var _TEMP = [];

						element['tags_id'] = element['tags_id'].split(',');
						element['tags_id'].forEach(function(elem, ind) {
							_TEMP[ind] = findTagByID(elem);							
						});
						// console.log('TAGS:ID: ' + JSON.stringify(_TEMP));
						element['tags_id'] = _TEMP;
					});	
									
					
					console.log('[! DB -> CACHE] >> CALENDAR LIST  — `calendar_list`');
		});			
	} else {
		console.log('BY CACHE / CALENTAR LIST >>    SELECT <ALL> FROM `calendar_list` ORDER BY `id`');
	}

}

function setCalendarTagsList() {

	if(!_CalendarTaglist) {
		DuckerDB.DuckerDB.all("SELECT * FROM `calendar_tags` ORDER BY `id`", 
		function(e,r) {
			_CalendarTaglist = r;
			console.log('[! DB -> CACHE] >> CALENDAR TAGS  — `calendar_tags`');
		});	
	} else {
		console.log('BY CACHE / CALENDAR TAGS >>   SELECT <ALL> FROM `calendar_tags` ORDER BY `id`');
	}

}

function findTagByID(id) {
	var exit;
	
	_CalendarTaglist.forEach(function(element, index) {
		if(element['id'] == id) exit = {
			slug: element['slug'],
			title: element['title']
		}
		
	});

	return exit;
}

function findTagIdByTitle(title) {
	var exit;
	
	_CalendarTaglist.forEach(function(element, index) {
		if(element['title'] == title) exit = element['id'];
	});

	return exit;
}

function findCalendarItemsByTagId(_slug) {
	var _exit = [];

	return _exit;
}


// >>>>>> P A G E S

function setPagesItems() {

	if(!_PagesItems) {
		DuckerDB.DuckerDB.all("SELECT * FROM `pages_list` ORDER BY `date_lastedit` DESC", 
			function(e,r) {

					_PagesItems = r;

					// console.log('R: ' + JSON.stringify(_PagesItems));
					
					_PagesItems.forEach(function(element, index) {
						var _TEMP = [];

						element['tags_id'] = element['tags_id'].split(',');
						element['tags_id'].forEach(function(elem, ind) {
							_TEMP[ind] = findTagByID(elem);							
						});
						// console.log('TAGS:ID: ' + JSON.stringify(_TEMP));
						element['tags_id'] = _TEMP;
					});	
					// console.log('R AFTER: ' + JSON.stringify(_PagesItems));
									
					
					console.log('[! DB -> CACHE] >> PAGE LIST  — `page_list`');
		});			
	} else {
		console.log('BY CACHE / CALENTAR LIST >>    SELECT <ALL> FROM `calendar_list` ORDER BY `id`');
	}
}


// >>>>>>>>> C O M M O N

function updateDataBase() {
		DuckerDB.all("SELECT * FROM `calendar_list` ORDER BY `id`", 
			function(e,r) {

					_CalendarItems = r;
					
					_CalendarItems.forEach(function(element, index) {
						var _TEMP = [];

						element['tags_id'] = element['tags_id'].split(',');
						element['tags_id'].forEach(function(elem, ind) {
							_TEMP[ind] = findTagByID(elem);							
						});
						// console.log('TAGS:ID: ' + JSON.stringify(_TEMP));
						element['tags_id'] = _TEMP;
					});	
									
					
					console.log('[!] [UPDATE: DB -> CACHE] >> CALENDAR LIST  t: `calendar_list`');
		});	
		DuckerDB.DuckerDB.all("SELECT * FROM `pages_list` ORDER BY `id`", 
			function(e,r) {

					_PagesItems = r;
					
					_PagesItems.forEach(function(element, index) {
						var _TEMP = [];

						element['tags_id'] = element['tags_id'].split(',');
						element['tags_id'].forEach(function(elem, ind) {
							_TEMP[ind] = findTagByID(elem);							
						});
						// console.log('TAGS:ID: ' + JSON.stringify(_TEMP));
						element['tags_id'] = _TEMP;
					});	
									
					
					console.log('[!] [UPDATE: DB -> CACHE] >> PAGES LIST  t: `pages_list`');
		});	
}

function getPagesViewGrid() {

	if(!_PagesViewGrid) {
		DuckerDB.DuckerDB.all("SELECT `PagesGridView` FROM `user_settings`", 
		function(e,r) {
			_PagesViewGrid = r[0]['PagesGridView'];
			// console.log('PAGE VIEW: ' + _PagesViewGrid);
			console.log('[! DB -> CACHE] >> PAGE VIEW GRID  — `user_settings`');
		});	
	} else {
		console.log('BY CACHE / PAGE VIEW GRID >>   SELECT `PageGridView` FROM `user_settings`');
	}

}