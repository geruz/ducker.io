var DuckerDB = require('../db');

var express = require('express');
var router = express.Router();
var jmespath = require('jmespath');

/* ######################################################################################
   ######################################################################################
   ###################################################################################### */


// Хранилище данных

var _PAGES;



// Роутинг. Отображение данных.

// ******************* P A G E S ************************

router.get('/', function (req, res) {
	res.json(_PAGES);
});

router.get('/:slug', function (req, res) {

	var slug = req.params.slug;
	var exit;
	exit = jmespath.search(_PagesItems, "[?id==`" + slug + "`]");
	res.json(exit);

});

router.post('/:slug/update', function(req, res) {
	var id = req.body.target_id;
	var content = req.body.content;
	var slug = req.params.slug;

	var date_lastedit = new Date();
	date_lastedit = date_lastedit.getTime();

	DuckerDB.DuckerDB.all("UPDATE `pages_list` SET `content`='" + content + "',`date_lastedit`='"+ date_lastedit +"' WHERE `slug`='" + slug + "'",
		function(e,r) {
			_PagesItems = null;
			setPagesItems();
			console.log('UPDATE `pages_list`' + ' content: ' + content + ' / slug: ' + slug);
	});

	res.json('Запись обновлена');
});

router.post('/:slug/remove', function(req, res) {
	
	var action = req.body.action;
	var slug = req.params.slug;

	if(action) {

		DuckerDB.all("DELETE FROM `pages_list` WHERE `slug`='" + slug + "';",
			function(e,r) {
				_PagesItems = null;
				setPagesItems();
		});

		res.json('DELETED');

	} else res.json('NO');

});

router.post('/item/updateTags', function(req, res) {
	
	var id = req.body.target_id;
	var tags_id = req.body.tags_id;

	console.log('id: ' + id + ' / tags_id: ' + tags_id[0]['title']);

	if(id) {

		let go = findTagIdByTitle(tags_id[0]['title']);

		
		DuckerDB.DuckerDB.all("UPDATE `pages_list` SET `tags_id`='" + go + "' WHERE `id`='" + id + "'",
			function(e,r) {
				_PagesItems = null;
				setPagesItems();
		}); 

		res.json('UPDATED PAGES TAGS');

	} else res.json('NO UPDATED PAGES TAGS');

});

router.get('/pages/tag/:slug', function (req, res) {

	// [?tags_id[?slug==`statistic`]]

	var slug = req.params.slug;
	var exit;

	exit = jmespath.search(_PagesItems, "[?tags_id[?slug==`"+slug+"`]]");

	res.json(exit);

});

router.post('/pages/new', function(req, res) {

		var title = req.body.title;
		var toSlug = req.body.toSlug;

		console.log('toSlug: ' + toSlug + ' / title: ' + title);

        let currentDate = new Date();
		currentDate = currentDate.getTime();
		
		DuckerDB.DuckerDB.all("INSERT INTO `pages_list`(`date_created`,`date_lastedit`,`title`,`slug`,`content`,`tags_id`) VALUES ('" + currentDate + "','" + currentDate + "','" + title + "','" + toSlug + "','','')",
			function(e,r) {
				console.log('{!} INSERT IN DB `pages_list`');
				console.log('ERROR: ' + e);
				exit = updateDataBase();
			});
			
		res.json(toSlug);
});

/* ######################################################################################
   ######################################################################################
   ###################################################################################### */

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

module.exports = {
    router,
    getPages: function () {
        if(!_PAGES) {
            // Импорт данных из базы данных, если соответствующее хранилище пусто
            DuckerDB.DuckerDB.all("SELECT * FROM `pages_list` ORDER BY `id`", 
            function(e,r) {

                _PAGES = r;

                let currentTime = DuckerDB.CurrentDate();
                
                console.log(currentTime +' >>> !db [ИМПОРТ]  PAGES');

            });	
        } else {
            console.log(currentTime +' [ОК]: Хранилище PAGES уже импортировано');
        }        
    },
    // Экспортирую список абстракций для остальных модулей
    _PAGES
}
