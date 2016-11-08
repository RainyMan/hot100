var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

module.exports = function() {
    request( {
url: "http://www.billboard.com/charts/hot-100",
method: "GET"
    }, function(error, response, body) {
        if (error || !body) {
            return;
        }
        // 爬完網頁後要做的事情
        var $ = cheerio.load(body);
        var result = [];
        var songs = $("h2.chart-row__song");
        var singers = $("a.chart-row__artist");
        for (var i = 0; i < songs.length; i++) {
            result.push({
				
				song : songs.eq(i).text(),
				singer: singers.eq(i).text().slice(33).substring(0,(singers.eq(i).text().slice(33).lastIndexOf("\n")))
            });

            //console.log(singers.eq(i).text().slice(33).lastIndexOf("\n"));
        }

        fs.writeFile("result.json", JSON.stringify(result));

    });

};

//setInterval(top100,1*10*1000);