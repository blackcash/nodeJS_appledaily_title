﻿var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
result_link=[]

var content = function(filename,url) {
  request({
    url: url,
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
    	console.log('error');
      return;
    }
	var dataString = '項目,網址\n';
    var $ = cheerio.load(body);
    $('a').each(function(i, element) {
          console.log("category:"+$(this).text()+"   link:"+ $(this).attr("href"))
   	      dataString = dataString + $(this).text() +",https://tw.appledaily.com/"+ $(this).attr("href")+"\n";
     });  

    fs.writeFile(filename+'.csv', dataString,'utf-8', function() {
		console.log("finish  "+filename+"!!");
	});

  });
};

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
		  var index = 0;
		  $('.each_level .'+list[i]+' li a').each(function(i, element) {
                    console.log("category:"+$(this).text()+"   link:"+ $(this).attr("href"))
					dataString = dataString + $(this).text() +",https://tw.appledaily.com/"+ $(this).attr("href")+"\n";
 				    result_link.push( {'title' :list[i]+String(index), 'link' :"https://tw.appledaily.com/"+ $(this).attr("href")})
					index += 1; 
          }); 
	}
    fs.writeFile('appledaily_rss_title.csv', dataString,'utf-8', function() {
		console.log("finish title!!");
		console.log('----------------------------');
		for(var i=0 ; i<result_link.length ;i++){
			console.log(result_link[i]['link']);
			content(result_link[i]['title'],result_link[i]['link']);
		}
	});
  });
};
exchange();

//setInterval(exchange,10*1000);