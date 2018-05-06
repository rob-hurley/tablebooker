const express = require('express');
const session= require('express-session');
var FileStore = require('session-file-store')(session);
var useDomainForCookies = process.env.DOMAIN || false;
const app = express();

// For processing POST data
const bodyParser = require('body-parser');

const path = require('path');

const cookieParser = require('cookie-parser');

const redirector = require('./redirector');

const content = require('./content');

const logger = require('./logger')

const config = require('./config')


var port = config.frontend_port;

function checkCustomers (req, res, next) {
	console.log('checkCustomers ' + req.url);
	if ((req.url === '/customerhome') && (!req.session || !req.session.authenticated)) {
		res.redirect('/login.do');
		return;
	}
	next();
}

function checkOwners (req, res, next) {
	console.log('checkOwners ' + req.url);
	if ((req.url === '/ownerhome') && (!req.session || !req.session.authenticated)) {
		res.redirect('/login.do');
		return;
	}
	next();
}


// Set properties for the application. http://expressjs.com/en/api.html#app.set
app.set('view engine', 'ejs'); // View Engine for templates
app.set('views', __dirname + '/templates'); // View templates folder
app.set('view options', { defaultLayout: 'default' }); // Set the default layout template for all pages
app.set('x-powered-by', false); // Disable response header - security

// Route traffic with redirector custom module
//app.use(redirector.session);
app.use(logger.access); // Log Access Requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	  name: 'server-session-cookie-id',
	  secret: 'my express secret',
	  saveUninitialized: true,
	  resave: true,
	  store: new FileStore({
		      path: '/tmp'
		    }),
	  cookie: {
		      sameSite: true,
		      domain: useDomainForCookies ? host : undefined
		    }
}));

app.use("/static_content", express.static(path.resolve(__dirname, 'static_content')));

app.use(checkCustomers);
app.use(checkOwners);
app.get('/', content.index);
app.get('/login.do', content.login);
app.get('/customerhome', content.customerhome);
app.get('/ownerhome', content.ownerhome);
app.get('/restaurants', content.restaurants);
app.get('/booking', content.booking);
app.get('/newrestaurant', content.newrestaurant);

app.get('/showmyrestaurants', content.showmyrestaurants);
app.get('/showmybookings', content.showmybookings);

// MICROSERVICE ROUTES

// BOOKINGS
app.post('/CreateBooking', redirector.CreateBooking);
app.post('/ModifyBooking', redirector.ModifyBooking);
app.get('/GetBooking', redirector.GetBooking);
app.get('/SearchBooking', redirector.SearchBooking);
app.get('/SearchAvailability', redirector.SearchAvailability);
app.delete('/DeleteBooking', redirector.DeleteBooking);

// CUSTOMERS
app.post('/CreateCustomer', redirector.CreateCustomer);
app.post('/login', redirector.login);
app.get('/SearchCustomer', redirector.SearchCustomer);
app.get('/GetCustomer', redirector.GetCustomer);
app.delete('/DeleteCustomer', redirector.DeleteCustomer);

// OWNERS
app.post('/CreateOwner', redirector.CreateOwner);
app.post('/adminlogin', redirector.adminlogin);
app.get('/SearchOwner', redirector.SearchOwner);
app.get('/GetOwner', redirector.GetOwner);
app.delete('/DeleteOwner', redirector.DeleteOwner);

// RESTAURANTS
app.post('/CreateRestaurant', redirector.CreateRestaurant);
app.post('/ModifyRestaurant', redirector.ModifyRestaurant);
app.get('/SearchRestaurant', redirector.SearchRestaurant);
app.get('/SearchAllRestaurants', redirector.SearchAllRestaurants);
app.get('/GetRestaurant', redirector.GetRestaurant);
app.delete('/DeleteRestaurant', redirector.DeleteRestaurant);

app.use(logger.page_error); // Log Page Request Errors
app.use(logger.redirect_error); // Log Redirect Request Errors

/* app.get('*', function(req, res){
    res.send('frontend');
});
*/
app.listen(port);

console.log('frontend listening on port ' +port);
