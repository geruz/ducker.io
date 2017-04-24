var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ducker-io.db');
var SHA256 = require("crypto-js/sha256");

var jmespath = require('jmespath');

var bodyParser = require('body-parser');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var app = express();

var _CalendarItems;
var _CalendarTaglist;

var _PagesItems;

var _PagesViewGrid;

app.use(allowCrossDomain);
app.use(bodyParser.json());

// ROUTES ---------------------------------------------

// GET ITEM
app.get('/calendar/item-list', function (req, res) {

	res.json(_CalendarItems);

});

app.get('/calendar/item/:slug', function (req, res) {

	var slug = req.params.slug;
	// console.log('slug: ' + slug);
	var exit;

	exit = jmespath.search(_CalendarItems, "[?slug==`" + slug + "`]");

	res.json(exit);

});


// GET TAGS
app.get('/calendar/tag-list', function (req, res) {

	res.json(_CalendarTaglist);

});

app.get('/calendar/tag/:slug', function (req, res) {

	// [?tags_id[?slug==`statistic`]]

	var slug = req.params.slug;
	var exit;

	exit = jmespath.search(_CalendarItems, "[?tags_id[?slug==`"+slug+"`]]");

	res.json(exit);

});

app.get('/settings/pages/viewgrid', function (req, res) {

	res.json(_PagesViewGrid);

});


// POST

app.post('/calendar/item/:slug/update', function(req, res) {
	var id = req.body.target_id;
	var content = req.body.content;
	var slug = req.params.slug;

	db.all("UPDATE `calendar_list` SET `content`='" + content + "' WHERE `id`='" + id + "'",
		function(e,r) {
			console.log('>> R: ' + r);
			console.log('>> E: ' + e);
			_CalendarItems = null;
			setCalendarItems();
	});

	res.json('КЛАСС');
});

app.post('/calendar/new', function(req, res) {

		var id = req.body.tagsExit;

        let currentDate = new Date();
// month array
        let month = new Array();
        month[0] = "января";
        month[1] = "февраля";
        month[2] = "марта";
        month[3] = "апреля";
        month[4] = "мая";
        month[5] = "июня";
        month[6] = "июля";
        month[7] = "августа";
        month[8] = "сентября";
        month[9] = "октября";
        month[10] = "ноября";
        month[11] = "декабря";     

        let month_slug = new Array();
        month_slug[0] = "01";
        month_slug[1] = "02";
        month_slug[2] = "03";
        month_slug[3] = "04";
        month_slug[4] = "05";
        month_slug[5] = "06";
        month_slug[6] = "07";
        month_slug[7] = "08";
        month_slug[8] = "09";
        month_slug[9] = "10";
        month_slug[10] = "11";
        month_slug[11] = "12";  

// date
        let _Day = currentDate.getDate();
        let _Month = month[currentDate.getMonth()];
        let _Year = currentDate.getFullYear();
        let title = _Day + ' ' + _Month + ' ' + _Year;

		let toSlug = _Year + '-' + month_slug[currentDate.getMonth()] + '-' + _Day;

        // console.log('OUTPUT: ' + toSlug);	

		db.all("INSERT INTO `calendar_list`(`date`,`title`,`slug`,`content`,`tags_id`) VALUES ('" + currentDate.getTime() + "','" + title + "','" + toSlug + "','','')",
			function(e,r) {
				console.log('{!} INSERT IN DB `calendar_list`');
				exit = updateDataBase();
			});
		res.json(toSlug);
});

app.post('/calendar/item/:slug/remove', function(req, res) {
	
	var action = req.body.action;
	var slug = req.params.slug;

	if(action) {

		db.all("DELETE FROM `calendar_list` WHERE `slug`='" + slug + "';",
			function(e,r) {
				_CalendarItems = null;
				setCalendarItems();
		});

		res.json('DELETED');

	} else res.json('NO');

});

app.post('/calendar/item/updateTags', function(req, res) {
	
	var id = req.body.target_id;
	var tags_id = req.body.tags_id;

	console.log('id: ' + id + ' / tags_id: ' + tags_id[0]['title']);

	if(id) {

		let go = findTagIdByTitle(tags_id[0]['title']);

		
		db.all("UPDATE `calendar_list` SET `tags_id`='" + go + "' WHERE `id`='" + id + "'",
			function(e,r) {
				_CalendarItems = null;
				setCalendarItems();
		}); 

		res.json('UPDATED TAGS');

	} else res.json('NO UPDATED TAGS');

});


// ******************* P A G E S ************************

app.get('/pages/item-list', function (req, res) {
	res.json(_PagesItems);
});

app.get('/pages/item/:slug', function (req, res) {

	var slug = req.params.slug;
	// console.log('slug: ' + slug);
	var exit;

	exit = jmespath.search(_PagesItems, "[?slug==`" + slug + "`]");

	res.json(exit);

});

app.post('/pages/item/:slug/update', function(req, res) {
	var id = req.body.target_id;
	var content = req.body.content;
	var slug = req.params.slug;

	var date_lastedit = new Date();
	date_lastedit = date_lastedit.getTime();

	db.all("UPDATE `pages_list` SET `content`='" + content + "',`date_lastedit`='"+ date_lastedit +"' WHERE `slug`='" + slug + "'",
		function(e,r) {
			_PagesItems = null;
			setPagesItems();
			console.log('UPDATE `pages_list`' + ' content: ' + content + ' / slug: ' + slug);
	});

	res.json('Запись обновлена');
});

app.post('/pages/item/:slug/remove', function(req, res) {
	
	var action = req.body.action;
	var slug = req.params.slug;

	if(action) {

		db.all("DELETE FROM `pages_list` WHERE `slug`='" + slug + "';",
			function(e,r) {
				_PagesItems = null;
				setPagesItems();
		});

		res.json('DELETED');

	} else res.json('NO');

});

app.post('/pages/item/updateTags', function(req, res) {
	
	var id = req.body.target_id;
	var tags_id = req.body.tags_id;

	console.log('id: ' + id + ' / tags_id: ' + tags_id[0]['title']);

	if(id) {

		let go = findTagIdByTitle(tags_id[0]['title']);

		
		db.all("UPDATE `pages_list` SET `tags_id`='" + go + "' WHERE `id`='" + id + "'",
			function(e,r) {
				_PagesItems = null;
				setPagesItems();
		}); 

		res.json('UPDATED PAGES TAGS');

	} else res.json('NO UPDATED PAGES TAGS');

});

app.get('/pages/tag/:slug', function (req, res) {

	// [?tags_id[?slug==`statistic`]]

	var slug = req.params.slug;
	var exit;

	exit = jmespath.search(_PagesItems, "[?tags_id[?slug==`"+slug+"`]]");

	res.json(exit);

});

app.post('/pages/new', function(req, res) {

		var title = req.body.title;
		var toSlug = req.body.toSlug;

		console.log('toSlug: ' + toSlug + ' / title: ' + title);

        let currentDate = new Date();
		currentDate = currentDate.getTime();
		
		db.all("INSERT INTO `pages_list`(`date_created`,`date_lastedit`,`title`,`slug`,`content`,`tags_id`) VALUES ('" + currentDate + "','" + currentDate + "','" + title + "','" + toSlug + "','','')",
			function(e,r) {
				console.log('{!} INSERT IN DB `pages_list`');
				console.log('ERROR: ' + e);
				exit = updateDataBase();
			});
			
		res.json(toSlug);
});


//// AUTH

app.post('/auth/login/:slug', function(req, res) {
	
	var action = req.body.action;
	var username = req.params.slug;
	var password = req.body.pass;

	if(action) {

		db.all("SELECT * FROM `users_list` WHERE `login` LIKE '"+username+"' ORDER BY `id`", 
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

	console.log('--->>> Ducker.io BACKEND SERVER ON 4200');
	console.log('')

	setCalendarTagsList();
	setCalendarItems();
	setPagesItems();
	getPagesViewGrid();

});


//// F U N C T I O N S

// >>>>>> A U T H

function authGuard(username, password) {
	console.log('username: ' + username);
	console.log('pass: ' + password);
	console.log('SHA256: ' + SHA256(password));
	console.log('-----------------');

	let exit;
	db.all("SELECT * FROM `users_list` WHERE `login` LIKE '"+username+"' ORDER BY `id`", 
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
		db.all("SELECT * FROM `calendar_list` ORDER BY `id`", 
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
		db.all("SELECT * FROM `calendar_tags` ORDER BY `id`", 
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
		db.all("SELECT * FROM `pages_list` ORDER BY `date_lastedit` DESC", 
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
		db.all("SELECT * FROM `calendar_list` ORDER BY `id`", 
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
		db.all("SELECT * FROM `pages_list` ORDER BY `id`", 
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
		db.all("SELECT `PagesGridView` FROM `user_settings`", 
		function(e,r) {
			_PagesViewGrid = r[0]['PagesGridView'];
			// console.log('PAGE VIEW: ' + _PagesViewGrid);
			console.log('[! DB -> CACHE] >> PAGE VIEW GRID  — `user_settings`');
		});	
	} else {
		console.log('BY CACHE / PAGE VIEW GRID >>   SELECT `PageGridView` FROM `user_settings`');
	}

}