module.exports.index = index;
module.exports.login = login;
module.exports.customerhome = customerhome;
module.exports.ownerhome = ownerhome;

module.exports.restaurants = restaurants;
module.exports.booking = booking;
module.exports.newrestaurant = newrestaurant;

module.exports.showmybookings = showmybookings;
module.exports.showmyrestaurants = showmyrestaurants;

//
function index(req, res){
    console.log('frontend - content: index');
    console.log('Calling URL /');
    res.render('index', {title: 'Home'});
}
function login(req, res){
    console.log('frontend - content: login');
    console.log('Calling URL /login.do');
    res.render('login', {title: 'Login'});
}
function customerhome(req, res){
    console.log('frontend - content: customerhome');
    console.log('Calling URL /customerhome');
    res.render('customerhome', {title: 'Customer Home', customerid: req.session.customerid});
}
function ownerhome(req, res){
    console.log('frontend - content: ownerhome');
    console.log('Calling URL /ownerhome');
    res.render('ownerhome', {title: 'Owner Home', ownerid: req.session.ownerid});
}
function restaurants(req, res){
    console.log('frontend - content: restaurants');
    console.log('Calling URL /restaurants');
    res.render('restaurants', {title: 'Restaurant List'});
}
function booking(req, res){
    console.log('frontend - content: booking');
    console.log('Calling URL /booking');
    res.render('booking', {title: 'Booking', customerid: req.session.customerid});
}
function newrestaurant(req, res){
    console.log('frontend - content: newrestaurant');
    console.log('Calling URL /newrestaurant');
    res.render('newrestaurant', {title: 'New Restaurant', ownerid: req.session.ownerid});
}
function showmybookings(req, res){
    console.log('frontend - content: showmybookings');
    console.log('Calling URL /showmybookings');
    res.render('showmybookings', {title: 'Show My Bookings', customerid: req.session.customerid});
}
function showmyrestaurants(req, res){
    console.log('frontend - content: showmyrestaurants');
    console.log('Calling URL /showmyrestaurants');
    res.render('showmyrestaurants', {title: 'Show My Restaurants', ownerid: req.session.ownerid});
}
