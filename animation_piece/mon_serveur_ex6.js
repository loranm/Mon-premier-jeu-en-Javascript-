const http = require('http');
const fs = require('fs');
const path = require('path')

var httpServer = http.createServer();

httpServer.on('request',function(requeteHTTP, reponseHTTP){

var requete = path.basename(path.normalize(requeteHTTP.url));
var ext = path.extname(path.normalize(requeteHTTP.url))
console.log(ext)

if (requete){
	fs.readFile(requete, function(err,data){
		if (err){
			fs.readFile('404.html',function(err,data){

				reponseHTTP.writeHead(404,{
					'Content-Type' : 'text/html',
					'Content-Length' : Buffer.byteLength(data, 'utf8'),
				})

				reponseHTTP.write(data, function(){
					reponseHTTP.end();
				});
			});

		}else{

			switch(ext) {
				case '.html' :
				reponseHTTP.writeHead(200,{
					'Content-Type' : 'text/html;charset=utf8',
					'Content-Length' : Buffer.byteLength(data),
				});
				break;
				case '.css':
				reponseHTTP.writeHead(200,{
					'Content-Type' : 'text/css',
					'Content-Length' : Buffer.byteLength(data),
				});
				break;
				case '.jpg':
				reponseHTTP.writeHead(200,{
					'Content-Type' : 'image/jpeg',
					'Content-Length' : Buffer.byteLength(data),
				});

				console.log('dans le switch jpg')
				break;

			}
			reponseHTTP.write(data, function(){
				reponseHTTP.end();
			});
		}

	});
};

});


httpServer.listen(7777);
