const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./config')

var port = config.owners_port;

var db = mysql.createConnection({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database
});

console.log("owners: App startup. Using Port: "+port);

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true);
    console.log("owners: HTTP createServer");
    console.log("owners: "+path+" Called");
    if (request.method == 'POST') {
        switch (path) {
            case "/CreateOwner":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        if(obj.owneremail&&obj.ownerpassword){
                            var querystring = "INSERT INTO owners(owneremail, ownerpassword) VALUES('" +obj.owneremail+"','"+obj.ownerpassword+"')";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("owners: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/CreateOwner", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("owners: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "owners", "location": "/CreateOwner", "result": "error" }');
                                    }else{
                                        console.log("owners: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "owners", "location": "/CreateOwner", "result": "success" }');
                                    }
                                }
                            });
                        }else{
                            console.log("owners: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "owners", "location": "/CreateOwner", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("owners: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "owners", "location": "/CreateOwner", "result": "error" }');
                    }
                });
                break;
            case "/login":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        if(obj.owneremail&&obj.ownerpassword){
                            var querystring = "SELECT ownerid, owneremail, ownerpassword FROM owners where owneremail='" +obj.owneremail+"' and ownerpassword='"+obj.ownerpassword+"'";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("owners: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/adminlogin", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("owners: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "owners", "location": "/adminlogin", "result": "error" }');
                                    }else{
                                        console.log("owners: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "owners", "location": "/adminlogin", "result": "success", "ownerid": "'+result[0].ownerid+'" }');
                                    }
                                }
                            });
                        }else{
                            console.log("owners: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "owners", "location": "/adminlogin", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("owners: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "owners", "location": "/adminlogin", "result": "error" }');
                    }
                });
                break;
            default:
            console.log("owners: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "owners", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'GET') {
        switch (path) {
            case "/SearchOwner":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.owneremail){
                        var querystring = "SELECT owners.ownerid, owners.ownerpassword FROM owners where owners.owneremail='" +obj.owneremail+ "'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("owners: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "owners", "location": "/SearchOwner", "result": "error" }');
                                throw err;
                            }else{
                                if(result.length == 0){
                                    console.log("owners: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/SearchOwner", "result": "error" }');
                                }else{
                                    console.log("owners: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/SearchOwner", "result": "success", ownerid: "'+result[0].ownerid+', "ownerpassword": "'+result[0].ownerpassword+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("owners: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "owners", "location": "/SearchOwner", "result": "error" }');            
                    }
                });
                break;
            case "/GetOwner":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.ownerid){
                        var querystring = "SELECT owners.ownerid, owners.owneremail, owners.ownerpassword FROM bookings.owners where owners.ownerid='" +obj.ownerid+"'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("owners: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "owners", "location": "/GetOwner", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("owners: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/GetOwner", "result": "error" }');
                                }else{
                                    console.log("owners: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/GetOwner", "result": "success", "ownerid": "'+result[0].ownerid+'", "owneremail": "'+result[0].owneremail+'", "ownerpassword": "'+result[0].ownerpassword+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("owners: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "owners", "location": "/GetOwner", "result": "error" }');            
                    }
                });
                break;
            case "/HealthCheck":
                console.log("owners: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "owners", "location": "/HealthCheck", "result": "success" }');
                break;
            case "/":
                console.log("owners: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "owners", "location": "/", "result": "success" }');
                break;
            default:
                console.log("owners: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "owners", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'DELETE') {
        switch (path) {
            case "/DeleteOwner":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        var obj = JSON.parse(body);
                        var querystring = "DELETE from owners where owners.ownerid="+obj.ownerid;
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("owners: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "owners", "location": "/DeleteOwner", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("owners: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/DeleteOwner", "result": "error" }');
                                } else if (result.affectedRows == 0){
                                    console.log("owners: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/DeleteOwner", "result": "error" }');
                                }else{
                                    console.log("owners: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "owners", "location": "/DeleteOwner", "result": "success" }');
                                }
                            }
                        });
                    }catch(e){
                        console.log("owners: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "owners", "location": "/DeleteOwner", "result": "error" }');                
                    }
                });
                break;
            default:
                console.log("owners: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "owners", "location": "Unknown", "result": "error" }');
                break;
        }
    }
    
});
server.listen(port);
