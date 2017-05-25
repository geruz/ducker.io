var sqlite3 = require('sqlite3').verbose();
var DuckerDB = new sqlite3.Database('ducker-io.db');



module.exports = { 
    DuckerDB,
    CurrentDate: function () {
        let current_date = new Date();
        let current_month = current_date.getMonth() + 1;
        
        let current_dateDays = current_date.getDate() +'.'+ current_month +'.'+ current_date.getFullYear();
        let current_dateTimes = current_date.getHours() +':'+ current_date.getMinutes() +':'+ current_date.getSeconds();

        let exit = current_dateDays + ' ' + current_dateTimes + ' ';
        return exit;
    }
}