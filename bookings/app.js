const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./config')

var port = config.bookings_port;

var db = mysql.createConnection({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database
});

console.log("bookings: App startup. Using Port: "+port);

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true);
    console.log("bookings: HTTP createServer");
    console.log("bookings: "+path+" Called");
    if (request.method == 'POST') {
        switch (path) {
            case "/CreateBooking":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        if(obj.restaurantid&&obj.customerid&&obj.bookingdate&&obj.bookinghour&&obj.bookingsize){
                            var querystring = "INSERT INTO bookings (restaurantid,customerid,bookingdate,bookinghour,bookingsize) VALUES ('"+obj.restaurantid+"','"+obj.customerid+"','"+obj.bookingdate+"','"+obj.bookinghour+"','"+obj.bookingsize+"')";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("bookings: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/CreateBooking", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("bookings: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "bookings", "location": "/CreateBooking", "result": "error" }');
                                    }else{
                                        console.log("bookings: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "bookings", "location": "/CreateBooking", "result": "success" }');
                                    }
                                }
                            });
                        }else{
                            console.log("bookings: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "bookings", "location": "/CreateBooking", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("bookings: Response Code 400"+e);
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "bookings", "location": "/CreateBooking", "result": "error" }');
                    }
                });
                break;
            case "/ModifyBooking":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        if(obj.bookingid&&obj.bookingdate&&obj.bookinghour&&obj.bookingsize){
                            var querystring = "UPDATE bookings set bookingdate='"+obj.bookingdate+"', bookinghour='"+obj.bookinghour+"', bookingsize='"+obj.bookingsize+"' where bookingid='" +obj.bookingid+"'";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("bookings: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "restaurants", "location": "/ModifyBooking", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("bookings: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "restaurants", "location": "/ModifyBooking", "result": "error" }');
                                    }else{
                                        console.log("bookings: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "restaurants", "location": "/ModifyBooking", "result": "success" }');
                                    }
                                }
                            });
                        }else{
                            console.log("bookings: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "restaurants", "location": "/ModifyBooking", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("bookings: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "restaurants", "location": "/ModifyBooking", "result": "error" }');
                    }
                });
            default:
            console.log("bookings: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "bookings", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'GET') {
        switch (path) {
            case "/GetBooking":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.bookingid){
                        var querystring = "SELECT restaurantid, customerid, bookingdate, bookinghour, bookingsize FROM bookings where bookingid='" +obj.bookingid+ "'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("bookings: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "bookings", "location": "/GetBooking", "result": "error" }');
                                throw err;
                            }else{
                                if(result.length == 0){
                                    console.log("bookings: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/GetBooking", "result": "error" }');
                                }else{
                                    console.log("bookings: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/GetBooking", "result": "success", "customerid": "'+result[0].customerid+'", "customerpassword": "'+result[0].customerpassword+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("bookings: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "bookings", "location": "/GetBooking", "result": "error" }');            
                    }
                });
                break;
            case "/SearchBooking":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.customerid){
                        console.log("Customer ID " +obj.customerid);
                        var querystring = "SELECT bookingid, restaurantid, bookingdate, bookinghour, bookingsize FROM bookings where customerid='" +obj.customerid+ "'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("bookings: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "bookings", "location": "/SearchBooking", "result": "error" }');
                                throw err;
                            }else{
                                if(result.length == 0){
                                    console.log("bookings: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/SearchBooking", "result": "error" }');
                                }else{
                                    console.log("bookings: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});

                                    response.write('{ "microservice": "bookings", "location": "/SearchBooking", "result": "success", "bookings": [');
                                    for (var i = 0; i < result.length; i++) {
                                        response.write('{"bookingid: "'+result[i].bookingid+'", "restaurantid": "'+result[i].restaurantid+'", "bookingdate": "'+result[i].bookingdate+'", "bookinghour": "'+result[i].bookinghour+'", "bookingsize": "'+result[i].bookingsize+'"}');
                                    }
                                    response.end(']}');



                                    response.end('{ "microservice": "bookings", "location": "/SearchBooking", "result": "success", "customerid: "'+result[0].customerid+'", "customerpassword": "'+result[0].customerpassword+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("bookings: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "bookings", "location": "/SearchBooking", "result": "error" }');            
                    }
                });
                break;
            case "/SearchAvailability":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.restaurantid&&obj.bookingdate&&obj.bookinghour){
                        //##### TEST THIS TOMORROW
                        var querystring = "SELECT restaurantid, bookingdate, bookinghour, bookings, capacity FROM view_bookings where restaurantid='"+obj.restaurantid+"' and bookingdate='" +obj.bookingdate+"' and bookinghour='"+obj.bookinghour+"'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("bookings: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "bookings", "location": "/SearchAvailability", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("bookings: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/SearchAvailability", "result": "error" }');
                                }else{
                                    console.log("bookings: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/SearchAvailability", "result": "success", "restaurantid": "'+result[0].restaurantid+'", "bookingdate": "'+result[0].bookingdate+'", "bookinghour": "'+result[0].bookinghour+'", "bookings": "'+result[0].bookings+'", "capacity": "'+result[0].capacity+'"}');
                                }
                            }
                        });
                    }else{
                        console.log("bookings: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "bookings", "location": "/SearchAvailability", "result": "error" }');            
                    }
                });
                break;
            case "/HealthCheck":
                console.log("bookings: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "bookings", "location": "/HealthCheck", "result": "success" }');
                break;
            case "/":
                console.log("bookings: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "bookings", "location": "/", "result": "success" }');
                break;
            default:
                console.log("bookings: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "bookings", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'DELETE') {
        switch (path) {
            case "/DeleteBooking":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        var obj = JSON.parse(body);
                        var querystring = "DELETE from bookings where bookings.bookingid="+obj.bookingid;
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("bookings: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "bookings", "location": "/DeleteBooking", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("bookings: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/DeleteBooking", "result": "error" }');
                                } else if (result.affectedRows == 0){
                                    console.log("bookings: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/DeleteBooking", "result": "error" }');
                                }else{
                                    console.log("bookings: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "bookings", "location": "/DeleteBooking", "result": "success" }');
                                }
                            }
                        });
                    }catch(e){
                        console.log("bookings: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "bookings", "location": "/DeleteBooking", "result": "error" }');                
                    }
                });
                break;
            default:
                console.log("bookings: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "bookings", "location": "Unknown", "result": "error" }');
                break;
        }
    }
    
});
server.listen(port);