//import { restaurants } from '../endpoints';

/*
Redirector module.
Maps requests from the frontend to resources in the backend
*/

const express = require ('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
/*var ap = express();
ap.use(bodyParser.urlencoded({ extended: false }));
ap.use(bodyParser.json());*/

const request = require ('request');

//const http = require('http');

const url = require('url');

//const qs = require('querystring');

// Load in endpoints where calls will be sent to
const endpoints = require('../endpoints');

//app.use(cookieParser());
//app.use(csrf({ cookie: true })); // Enable CSRF so forms are protected.

// Use module.exports to expose objects

module.exports.CreateBooking = CreateBooking;
module.exports.ModifyBooking = ModifyBooking;
module.exports.GetBooking = GetBooking;
module.exports.SearchBooking = SearchBooking;
module.exports.SearchAvailability = SearchAvailability;
module.exports.DeleteBooking = DeleteBooking

module.exports.CreateCustomer = CreateCustomer;
module.exports.SearchCustomer = SearchCustomer;
module.exports.GetCustomer = GetCustomer;
module.exports.DeleteCustomer = DeleteCustomer;
module.exports.login = login;

module.exports.CreateOwner = CreateOwner;
module.exports.SearchOwner = SearchOwner;
module.exports.GetOwner = GetOwner;
module.exports.DeleteOwner = DeleteOwner;
module.exports.adminlogin = adminlogin;

module.exports.CreateRestaurant = CreateRestaurant;
module.exports.ModifyRestaurant = ModifyRestaurant;
module.exports.SearchRestaurant = SearchRestaurant;
module.exports.SearchAllRestaurants = SearchAllRestaurants;
module.exports.GetRestaurant = GetRestaurant;
module.exports.DeleteRestaurant = DeleteRestaurant;

// MICROSERVICE ROUTES

// BOOKINGS
function CreateBooking(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: CreateBooking');
    var url = endpoints.bookings;
    var options = {
        uri: url.concat('/CreateBooking'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };
    console.log('Calling URL ' +url.concat('/CreateBooking'));
    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
        res.status(resp.statusCode).send(JSON.stringify(resp.body));
        res.end();
      });
}
function ModifyBooking(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: ModifyBooking');
    var url = endpoints.bookings;
    var options = {
        uri: url.concat('/ModifyBooking'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };
    console.log('Calling URL ' +url.concat('/ModifyBooking'));
    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
        res.status(resp.statusCode).send(JSON.stringify(resp.body));
        res.end();
      });
}
function GetBooking(req, res){
    console.log('frontend - redirector: GetBooking');
    var url = endpoints.bookings;
    console.log('Calling URL ' +url.concat('/GetBooking'));
    request(url.concat('/GetBooking?bookingid='+req.query.bookingid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function SearchBooking(req, res){
    console.log('frontend - redirector: SearchBooking');
    var url = endpoints.bookings;
    console.log('Calling URL ' +url.concat('/SearchBooking'));
    request(url.concat('/SearchBooking?customerid='+req.query.customerid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function SearchAvailability(req, res){
    console.log('frontend - redirector: SearchAvailability');
    var url = endpoints.bookings;
    console.log('Calling URL ' +url.concat('/SearchAvailability'));
    request(url.concat('/SearchAvailability?restaurantid='+req.query.restaurantid+'&bookingdate='+req.query.bookingdate+'&bookinghour='+req.query.bookinghour), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function DeleteBooking(req, res){
    console.log('frontend - redirector: DeleteBooking');
    var url = endpoints.bookings;
    console.log('Calling URL ' +url.concat('/DeleteBooking'));
    request(url.concat('/DeleteBooking'), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
// CUSTOMERS
function CreateCustomer(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: CreateCustomer');
    var url = endpoints.customers;
    var options = {
        uri: url.concat('/CreateCustomer'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };
    console.log('Calling URL ' +url.concat('/CreateCustomer'));
    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
        res.status(resp.statusCode).send(JSON.stringify(resp.body));
        res.end();
      });
}
function SearchCustomer(req, res){
    console.log('frontend - redirector: SearchCustomer');
    var url = endpoints.customers;
    console.log('Calling URL ' +url.concat('/SearchCustomer'));
    request(url.concat('/SearchCustomer?customeremail='+req.query.customeremail), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function GetCustomer(req, res){
    console.log('frontend - redirector: GetCustomer');
    var url = endpoints.customers;
    console.log('Calling URL ' +url.concat('/GetCustomer'));
    request(url.concat('/GetCustomer?customerid='+req.query.customerid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function DeleteCustomer(req, res){
    console.log('frontend - redirector: DeleteCustomer');
    var url = endpoints.customers;
    console.log('Calling URL ' +url.concat('/DeleteCustomer'));
    request(url.concat('/DeleteCustomer'), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function login(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: login ' + body_string);
    var url = endpoints.customers;
    var landingpage = '/customerhome';
    if (req.body.admin == 'on'){
    	url = endpoints.owners;
    	landingpage = '/ownerhome';
	var body_holder = body_string;
	body_string = body_holder.replace(/customer/g, "owner");
    }
    var options = {
        uri: url.concat('/login'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };

    console.log('Calling URL ' +url.concat('/login'));
    console.log('Passing JSON body ' +body_string);

    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
	if (resp.statusCode == '200'){
	    req.session.authenticated = true;
	    res.redirect(landingpage);
	} else {
	    res.redirect('/login.do');
	}
    });
}

// OWNERS
function CreateOwner(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: CreateOwner');
    var url = endpoints.owners;
    var options = {
        uri: url.concat('/CreateOwner'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };
    console.log('Calling URL ' +url.concat('/CreateOwner'));
    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
        res.status(resp.statusCode).send(JSON.stringify(resp.body));
        res.end();
      });
}
function SearchOwner(req, res){
    console.log('frontend - redirector: SearchOwner');
    var url = endpoints.owners;
    console.log('Calling URL ' +url.concat('/SearchOwner'));
    request(url.concat('/SearchOwner?owneremail='+req.query.owneremail), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function GetOwner(req, res){
    console.log('frontend - redirector: GetOwner');
    var url = endpoints.owners;
    console.log('Calling URL ' +url.concat('/GetOwner'));
    request(url.concat('/GetOwner?ownerid='+req.query.ownerid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function DeleteOwner(req, res){
    console.log('frontend - redirector: DeleteOwner');
    var url = endpoints.owners;
    console.log('Calling URL ' +url.concat('/DeleteOwner'));
    request(url.concat('/DeleteOwner'), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}

function adminlogin(req, res){
    console.log('frontend - redirector: adminlogin');
    var url = endpoints.owners;
    console.log('Calling URL ' +url.concat('/adminlogin'));
    request(url.concat('/adminlogin'), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        //res.status(resp.statusCode).send(JSON.parse(body));
        req.session.authenticated = true;
        res.redirect('/showmyrestaurants');
      });
}

// RESTAURANTS
function CreateRestaurant(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: CreateRestaurant'+JSON.parse(body_string));
    var url = endpoints.restaurants;
    var options = {
        uri: url.concat('/CreateRestaurant'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };
    console.log('Calling URL ' +url.concat('/CreateRestaurant'));
    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
        res.status(resp.statusCode).send(JSON.stringify(resp.body));
        res.end();
      });
}
function ModifyRestaurant(req, res){
    var body_string = JSON.stringify(req.body);
    console.log('frontend - redirector: ModifyRestaurant');
    var url = endpoints.restaurants;
    var options = {
        uri: url.concat('/ModifyRestaurant'),
        method: 'POST',
        json: true,
        body: JSON.parse(body_string)
    };
    console.log('Calling URL ' +url.concat('/ModifyRestaurant'));
    request(options, function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.stringify(resp.body));
        console.log(resp.statusCode);
        res.status(resp.statusCode).send(JSON.stringify(resp.body));
        res.end();
      });
}
function SearchRestaurant(req, res){
    console.log('frontend - redirector: SearchRestaurant');
    var url = endpoints.restaurants;
    console.log('Calling URL ' +url.concat('/SearchRestaurant'));
    request(url.concat('/SearchRestaurant?ownerid='+req.query.ownerid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function SearchAllRestaurants(req, res){
    console.log('frontend - redirector: SearchAllRestaurants');
    var url = endpoints.restaurants;
    console.log('Calling URL ' +url.concat('/SearchAllRestaurants'));
    request(url.concat('/SearchAllRestaurants'), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function DeleteRestaurant(req, res){
    console.log('frontend - redirector: DeleteRestaurant');
    var url = endpoints.restaurants;
    console.log('Calling URL ' +url.concat('/DeleteRestaurant'));
    request(url.concat('/DeleteRestaurant?restaurantid='+req.query.restaurantid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
function GetRestaurant(req, res){
    console.log('frontend - redirector: getrestaurant');
    var url = endpoints.restaurants;
    console.log('Calling URL ' +url.concat('/GetRestaurant'));
    request(url.concat('/GetRestaurant?restaurantid='+req.query.restaurantid), function(err, resp, body) {
        if (err) { return console.log(err); }
        console.log(JSON.parse(body));
        res.status(resp.statusCode).send(JSON.parse(body));
      });
}
