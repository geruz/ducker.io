var DuckerDB = require('../db');

var express = require('express');
var router = express.Router();
var jmespath = require('jmespath');

/* ######################################################################################
   ######################################################################################
   ###################################################################################### */


// Хранилище данных

var _ABSTRACTIONS;



// Роутинг. Отображение данных.

router.get('/', function (req, res) {
	res.json(_ABSTRACTIONS);
});

router.get('/:slug', function (req, res) {
    let slug = req.params.slug;
    let exit = getBySlug(slug);
	res.json(exit);
});

function getBySlug(slug) {
    slug = String(slug);
    return jmespath.search(_ABSTRACTIONS, "[?slug==`" + slug + "`]");
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
    getAbstractions: function () {


        if(!_ABSTRACTIONS) {
            // Импорт данных из базы данных, если соответствующее хранилище пусто
            DuckerDB.DuckerDB.all("SELECT * FROM `abstractions` ORDER BY `id`", 
            function(e,r) {

                _ABSTRACTIONS = r;

                let currentTime = DuckerDB.CurrentDate();
                
                console.log(currentTime +' \x1b[31mИМПОРТ\x1b[0m  \x1b[36mABSTRACTIONS\x1b[0m');

            });	
        } else {
            console.log(currentTime +' [ОК]: Хранилище \x1b[36mABSTRACTIONS\x1b[0m уже импортировано');
        }
 
    },
    exportAbstractions: function () {
        return _ABSTRACTIONS;
    },
    // Экспортирую список абстракций для остальных модулей
    _ABSTRACTIONS
}
