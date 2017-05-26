var DuckerDB = require('../db');

var express = require('express');
var router = express.Router();
var jmespath = require('jmespath');

var _ABSTRACTIONS = require('./abstractions');

/* ######################################################################################
   ######################################################################################
   ###################################################################################### */


// Хранилище данных

var _LOGGER;

// Роутинг. Отображение данных.

router.get('/', function (req, res) {
	res.json(_LOGGER);
});

router.get('/:slug', function (req, res) {
    let slug = req.params.slug;
    let exit = jmespath.search(_LOGGER, "[?id==`" + slug + "`]");
	res.json(exit);
});

router.get('/abstraction/:slug', function (req, res) {
    let slug = req.params.slug;
    let exit = jmespath.search(_LOGGER, "[?abstraction_slug[0].slug==`" + slug + "`]");
    res.json(exit);
});

function getBySlug(slug) {    
    console.log('id: ' + slug);
    slug = String(slug);
    return 
}

function getAbstractionInfo(slug) {
    let exit = _ABSTRACTIONS.exportAbstractions();
    exit.forEach(function(element) {
        if(slug == element['slug']) exit = [{ slug: slug, title: element['title'] }]
    });
    return exit;
    
}

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
    getLogger: function () {
        if(!_LOGGER) {
            // Импорт данных из базы данных, если соответствующее хранилище пусто
            DuckerDB.DuckerDB.all("SELECT * FROM `logger_list` ORDER BY `id`", 
            function(e,r) {

                _LOGGER = r;
                _LOGGER.forEach(function(element) {
                    let temp = getAbstractionInfo(element['abstraction_slug']);
                    element['abstraction_slug'] = temp;
                });

                let currentTime = DuckerDB.CurrentDate();


                
                console.log(currentTime +' \x1b[31mИМПОРТ\x1b[0m  \x1b[36mLOGGER\x1b[0m');

            });	
        } else {
            console.log(currentTime +' [ОК]: Хранилище \x1b[36mLOGGER\x1b[0m уже импортировано');
        }        
    },
    // Экспортирую список абстракций для остальных модулей
    _LOGGER
}
