var express = require('express');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ducker-io.db');

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

		db.all("INSERT INTO `calendar_list`(`date`,`title`,`slug`,`content`,`tags_id`) VALUES ('" + currentDate.getTime() + "','" + title + "','" + toSlug + "','','');",
			function(e,r) {
				console.log('{!} INSERT IN DB `calendar_list`');
				exit = updateDataBase();
			});
		res.json(toSlug);
});

// RUN SERVER & DB IMPORT

app.listen(4200, function () {

	console.log('--->>> Ducker.io BACKEND SERVER ON 4200');
	console.log('')

	setCalendarTagsList();
	setCalendarItems();

});

// FUNCTIONS


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
									
					
					console.log('[! DB -> CACHE] >> CALENDAR LIST  t: `calendar_list`');
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
			console.log('[! DB -> CACHE] >> CALENDAR TAGS  t: `calendar_tags`');
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

function findCalendarItemsByTagId(_slug) {
	var _exit = [];

	return _exit;
}

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
}

