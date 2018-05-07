const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./config')

var port = config.customers_port;

var db = mysql.createConnection({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database
});

console.log("customers: App startup. Using Port: "+port);

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true);
    console.log("customers: HTTP createServer");
    console.log("customers: "+path+" Called");
    if (request.method == 'POST') {
        switch (path) {
            case "/CreateCustomer":
                var body = '';
                var obj;
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        obj = JSON.parse(body);
                        if(obj.customeremail&&obj.customerpassword){
                            var querystring = "INSERT INTO customers(customeremail, customerpassword) VALUES('" +obj.customeremail+"','"+obj.customerpassword+"')";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("customers: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/CreateCustomer", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("customers: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "customers", "location": "/CreateCustomer", "result": "error" }');
                                    }else{
                                        console.log("customers: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "customers", "location": "/CreateCustomer", "result": "success" }');
                                    }
                                }
                            });
                        }else{
                            console.log("customers: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "customers", "location": "/CreateCustomer", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("customers: Response Code 400"+e);
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "customers", "location": "/CreateCustomer", "result": "error" }');
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
			    console.log("Body RX: " + obj);
                        if(obj.customeremail&&obj.customerpassword){
                            var querystring = "select customerid, customeremail, customerpassword FROM customers where customeremail='"+obj.customeremail+"' and customerpassword='"+obj.customerpassword+"'";
                            db.query(querystring, function (err, result, fields) {
                                if (err) {
                                    console.log("customers: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/login", "result": "error" }');                                
                                }else{
                                    if(!result){
                                        console.log("customers: Response Code 400");
                                        response.writeHead(400, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "customers", "location": "/login", "result": "error" }');
                                    }else{
                                        console.log("customers: Response Code 200");
                                        response.writeHead(200, {'Content-Type': 'application/json'});
                                        response.end('{ "microservice": "customers", "location": "/login", "result": "success", "customerid": "' +result[0].customerid+ '" }');
                                    }
                                }
                            });
                        }else{
                            console.log("customers: Response Code 400");
                            response.writeHead(400, {'Content-Type': 'application/json'});
                            response.end('{ "microservice": "customers", "location": "/login", "result": "error" }');            
                        }
                    }catch(e){
                        console.log("customers: Response Code 400"+e);
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "customers", "location": "/login", "result": "error" }');
                    }
                });
		break;
            default:
            console.log("customers: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "customers", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'GET') {
        switch (path) {
            case "/SearchCustomer":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.customeremail){
                        var querystring = "SELECT customers.customerid, customers.customerpassword FROM customers where customers.customeremail='" +obj.customeremail+ "'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("customers: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "customers", "location": "/SearchCustomer", "result": "error" }');
                                throw err;
                            }else{
                                if(result.length == 0){
                                    console.log("customers: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/SearchCustomer", "result": "error" }');
                                }else{
                                    console.log("customers: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/SearchCustomer", "result": "success", customerid: "'+result[0].customerid+'", "customerpassword": "'+result[0].customerpassword+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("customers: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "customers", "location": "/SearchCustomer", "result": "error" }');            
                    }
                });
                break;
            case "/GetCustomer":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    var obj = url_parts.query;
                    if(obj.customerid){
                        var querystring = "SELECT customers.customerid, customers.customeremail, customers.customerpassword FROM bookings.customers where customers.customerid='" +obj.customerid+"'";
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("customers: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "customers", "location": "/GetCustomer", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("customers: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/GetCustomer", "result": "error" }');
                                }else{
                                    console.log("customers: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/GetCustomer", "result": "success", "customerid": "'+result[0].customerid+'", "customeremail": "'+result[0].customeremail+'", "customerpassword": "'+result[0].customerpassword+'" }');
                                }
                            }
                        });
                    }else{
                        console.log("customers: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "customers", "location": "/GetCustomer", "result": "error" }');            
                    }
                });
                break;
            case "/HealthCheck":
                console.log("customers: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "customers", "location": "/HealthCheck", "result": "success" }');
                break;
            case "/":
                console.log("customers: Response Code 200");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "customers", "location": "/", "result": "success" }');
                break;
            default:
                console.log("customers: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "customers", "location": "Unknown", "result": "error" }');
                break;
        }
    }

    if (request.method == 'DELETE') {
        switch (path) {
            case "/DeleteCustomer":
                var body = '';
                request.on('data', function (data) { body += data; });
                request.on('end', function () {
                    try{
                        var obj = JSON.parse(body);
                        var querystring = "DELETE from customers where customers.customerid="+obj.customerid;
                        db.query(querystring, function (err, result, fields) {
                            if (err) {
                                console.log("customers: Response Code 500");
                                response.writeHead(500, {'Content-Type': 'application/json'});
                                response.end('{ "microservice": "customers", "location": "/DeleteCustomer", "result": "error" }');
                            }else{
                                if(result.length == 0){
                                    console.log("customers: Response Code 500");
                                    response.writeHead(500, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/DeleteCustomer", "result": "error" }');
                                } else if (result.affectedRows == 0){
                                    console.log("customers: Response Code 404");
                                    response.writeHead(404, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/DeleteCustomer", "result": "error" }');
                                }else{
                                    console.log("customers: Response Code 200");
                                    response.writeHead(200, {'Content-Type': 'application/json'});
                                    response.end('{ "microservice": "customers", "location": "/DeleteCustomer", "result": "success" }');
                                }
                            }
                        });
                    }catch(e){
                        console.log("customers: Response Code 400");
                        response.writeHead(400, {'Content-Type': 'application/json'});
                        response.end('{ "microservice": "customers", "location": "/DeleteCustomer", "result": "error" }');                
                    }
                });
                break;
            default:
                console.log("customers: Response Code 404");
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end('{ "microservice": "customers", "location": "Unknown", "result": "error" }');
                break;
        }
    }
    
});
server.listen(port);
