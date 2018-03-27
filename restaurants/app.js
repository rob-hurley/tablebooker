const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./config')

var port = config.restaurants_port;

var db = mysql.createConnection({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database
});

console.log("restaurants: App startup. Using Port: "+port);

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true);
    console.log("restaurants: HTTP createServer");
    console.log("restaurants: "+path+" Called");
    if (request.method == 'POST') {
        switch (path) {
            case "/CreateRestaurant":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        console.log("Mark "+obj);
                        if(obj.restaurantname&&obj.restaurantaddress&&obj.restaurantphone&&obj.restaurantcapacity&&obj.ownerid){
                            var querystring = "INSERT INTO restaurants(restaurantname, restaurantaddress, restaurantphone, restaurantcapacity, restaurantimage, ownerid) VALUES('" +obj.restaurantname+"','"+obj.restaurantaddress+"','"+obj.restaurantphone+"','"+obj.restaurantcapacity+"','"+obj.restaurantimage+"','"+obj.ownerid+"')";
                            console.log("query string"+querystring);
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("restaurants: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/CreateRestaurant", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("restaurants: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "restaurants", "location": "/CreateRestaurant", "result": "error" }');
                                    }else{
                                        console.log("restaurants: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "restaurants", "location": "/CreateRestaurant", "result": "success" }');
                                    }
                                }
                            });
                        }else{
                            console.log("restaurants: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "restaurants", "location": "/CreateRestaurant", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("restaurants: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "restaurants", "location": "/CreateRestaurant", "result": "error" }');
                    }
                });
                break;

            case "/ModifyRestaurant":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        if(obj.restaurantaddress&&obj.ownerid){
                            var querystring = "UPDATE restaurants set restaurantname='"+obj.restaurantname+"', restaurantphone='"+obj.restaurantphone+"', restaurantcapacity='"+obj.restaurantcapacity+"', restaurantimage='"+obj.restaurantimage+"' where restaurantid='" +obj.restaurantid+"'";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("restaurants: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/ModifyRestaurant", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("restaurants: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "restaurants", "location": "/ModifyRestaurant", "result": "error" }');
                                    }else{
                                        console.log("restaurants: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "restaurants", "location": "/ModifyRestaurant", "result": "success" }');
                                    }
                                }
                            });
                        }else{
                            console.log("restaurants: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "restaurants", "location": "/ModifyRestaurant", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("restaurants: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "restaurants", "location": "/ModifyRestaurant", "result": "error" }');
                    }
                });

            default:
                console.log("restaurants: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "restaurants", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'GET') {
        switch (path) {
            case "/SearchRestaurant":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.ownerid){
                        var querystring = "SELECT restaurantid, restaurantname, restaurantaddress, restaurantphone, restaurantcapacity, restaurantimage, ownerid FROM restaurants where ownerid=" +obj.ownerid;
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("restaurants: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "restaurants", "location": "/SearchRestaurant", "result": "error" }');
                                throw err;
                            }else{
                                if(result.length == 0){
                                    console.log("restaurants: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/SearchRestaurant", "result": "error" }');
                                }else{
                                    console.log("restaurants: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.write('{ "microservice": "restaurants", "location": "/SearchRestaurant", "result": "success", "restaurants": [');
                                    for (var i = 0; i < result.length; i++) {
                                        response.write('{"restaurantid": "'+result[i].restaurantid+'", "restaurantname": "'+result[i].restaurantname+'", "restaurantaddress": "'+result[i].restaurantaddress+'", "restaurantphone": "'+result[i].restaurantphone+'", "restaurantcapacity": "'+result[i].restaurantcapacity+'", "restaurantimage": "'+result[i].restaurantimage+'", "ownerid": "'+result[i].ownerid+'"}');
                                        if((i+1) < result.length){
                                            response.write(',');
                                        }
                                    }
                                    response.end(']}');
                                }
                            }
                        });
                    }else{
                        console.log("restaurants: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "restaurants", "location": "/SearchRestaurant", "result": "error" }');            
                    }
                });
                break;
            case "/SearchAllRestaurants":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var querystring = "SELECT restaurantid, restaurantname, restaurantaddress, restaurantphone, restaurantcapacity, restaurantimage, ownerid FROM restaurants";
                    db.query(querystring, function (err, result, fields) {
                        if (err) {
                            console.log("restaurants: Response Code 500");
                            response.writeHead(500, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "restaurants", "location": "/SearchAllRestaurants", "result": "error" }');                                throw err;
                        }else{
                            if(result.length == 0){
                                console.log("restaurants: Response Code 404");
                                response.writeHead(404, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "restaurants", "location": "/SearchAllRestaurants", "result": "error" }');
                            }else{
                                console.log("restaurants: Response Code 200");
                                response.writeHead(200, {'Content-Type': 'application/json'});
                                response.write('{ "microservice": "restaurants", "location": "/SearchAllRestaurants", "result": "success", "restaurants": [');
                                for (var i = 0; i < result.length; i++) {
                                    response.write('{"restaurantid": "'+result[i].restaurantid+'", "restaurantname": "'+result[i].restaurantname+'", "restaurantaddress": "'+result[i].restaurantaddress+'", "restaurantphone": "'+result[i].restaurantphone+'", "restaurantcapacity": "'+result[i].restaurantcapacity+'", "restaurantimage": "'+result[i].restaurantimage+'", "ownerid": "'+result[i].ownerid+'"}');
                                    if((i+1) < result.length){
                                        response.write(',');
                                    }
                                }
                                response.end(']}');
                            }
                        }
                    });
                });
                break;
            case "/GetRestaurant":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.restaurantid){
                        var querystring = "SELECT restaurantid, restaurantname, restaurantaddress, restaurantphone, restaurantcapacity, restaurantimage, ownerid FROM restaurants where restaurantid='" +obj.restaurantid+ "'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("restaurants: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "restaurants", "location": "/GetRestaurant", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("restaurants: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/GetRestaurant", "result": "error" }');
                                }else{
                                    console.log("restaurants: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/GetRestaurant", "result": "success", "restaurantid": "'+result[0].restaurantid+'", "restaurantname": "'+result[0].restaurantname+'", "restaurantaddress": "'+result[0].restaurantaddress+'", "restaurantphone": "'+result[0].restaurantphone+'", "restaurantcapacity": "'+result[0].restaurantcapacity+'", "restaurantimage": "'+result[0].restaurantimage+'", "ownerid": "'+result[0].ownerid+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("restaurants: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "restaurants", "location": "/GetRestaurant", "result": "error" }');            
                    }
                });
                break;
            case "/HealthCheck":
                console.log("restaurants: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "restaurants", "location": "/HealthCheck", "result": "success" }');
                break;
            case "/":
                console.log("restaurants: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "restaurants", "location": "/", "result": "success" }');
                break;
            default:
                console.log("restaurants: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "restaurants", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'DELETE') {
        switch (path) {
            case "/DeleteRestaurant":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        var obj = JSON.parse(body);
                        var querystring = "DELETE from restaurants where restaurantid="+obj.restaurantid;
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("restaurants: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "restaurants", "location": "/DeleteRestaurant", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("restaurants: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/DeleteRestaurant", "result": "error" }');
                                } else if (result.affectedRows == 0){
                                    console.log("restaurants: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/DeleteRestaurant", "result": "error" }');
                                }else{
                                    console.log("restaurants: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/DeleteRestaurant", "result": "success" }');
                                }
                            }
                        });
                    }catch(e){
                        console.log("restaurants: Response Code 400"+e);
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "restaurants", "location": "/DeleteRestaurant", "result": "error" }');                
                    }
                });
                break;
            default:
                console.log("restaurants: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "restaurants", "location": "Unknown", "result": "error" }');
                break;
        }
    }
    
});
server.listen(port);