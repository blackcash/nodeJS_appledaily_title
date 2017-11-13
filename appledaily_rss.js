﻿var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var exchange = function() {
  request({
    url: "https://tw.appledaily.com/rss",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
    	console.log('error');
      return;
    }
	var dataString = '項目,網址\n';
    var $ = cheerio.load(body);
	var list = ['inst_all','head_all','entertainment_all','international_all','sport_all','biz_all','re_all','columt_all','sub_all']	
	for (var i=0 ; i < list.length ; i++ )
	{
		  $('.each_level .'+list[i]+' li a').each(function(i, element) {
                    console.log("category:"+$(this).text()+"   link:"+ $(this).attr("href"))
					dataString = dataString + $(this).text() +","+ $(this).attr("href")+"\n";
          });  
	}
    fs.writeFile('appledaily_rss_title.csv', dataString,'utf-8', function() {
		console.log("finish  !!");
	});
  });
};
exchange();
//setInterval(exchange,10*1000);