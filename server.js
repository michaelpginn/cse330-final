// Require the packages we will use:
const http = require("http"),
	socketio = require("socket.io"),
    fs = require("fs"),
    mime = require('mime');
    
// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = http.createServer(function(req, resp){
	// This callback runs when a new connection is made to our HTTP server.
	
	// Modified from https://www.dotnetcurry.com/nodejs/1144/nodejs-html-static-pages-website
    // Check request for index, otherwise serve file

    if (req.url.toString() === "/") {
        fs.readFile("hfs/build/index.html", function(err, data){
			if(err) return resp.writeHead(500);
			resp.writeHead(200);
			resp.end(data);
		});
    }
    else {
        const filename = `hfs/build/${req.url.toString().substring(1)}`;
        const type = mime.getType(filename);
		fs.readFile(filename, function(err, data){
			if(err){
				resp.writeHead(500);
                resp.end(`File at ${req.url.toString().substring(1)} not found`);
                console.log(`File at ${req.url.toString().substring(1)} not found`);
			}
			else{
				resp.writeHead(200, {'Content-Type': type});
				resp.end(data);
			}
		});
	}

	
});
app.listen(3456);
console.log('Server running at http://localhost:3456/');