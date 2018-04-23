module.exports.index = index;
module.exports.login = login;
module.exports.admin = admin;

module.exports.restaurants = restaurants;
module.exports.booking = booking;
module.exports.newrestaurant = newrestaurant;

module.exports.showmybookings = showmybookings;
module.exports.showmyrestaurants = showmrestaurants;

//
function index(req, res){
    console.log('frontend - content: index');
    //var url = endpoints.restaurants;
    console.log('Calling URL /');
    res.render('index', {title: 'Home'});
}
function login(req, res){
    console.log('frontend - content: login');
    //var url = endpoints.restaurants;
    console.log('Calling URL /login');
    res.render('login', {title: 'Login'});
}
function admin(req, res){
    console.log('frontend - content: admin');
    //var url = endpoints.restaurants;
    console.log('Calling URL /admin');
    res.render('admin', {title: 'Admin'});
}
function restaurants(req, res){
    console.log('frontend - content: restaurants');
    console.log('Calling URL /restaurants');
    res.render('restaurants', {title: 'Restaurant List'});
}
function booking(req, res){
    console.log('frontend - content: booking');
    console.log('Calling URL /booking');
    res.render('booking', {title: 'Booking'});
}
function newrestaurant(req, res){
    console.log('frontend - content: newrestaurant');
    console.log('Calling URL /newrestaurant');
    res.render('newrestaurant', {title: 'New Restaurant'});
}
function showmybookings(req, res){
    console.log('frontend - content: showmybookings');
    console.log('Calling URL /showmybookings');
    res.render('showmybookings', {title: 'Show My Bookings'});
}
function showmyrestaurants(req, res){
    console.log('frontend - content: showmyrestaurants');
    console.log('Calling URL /showmyrestaurants');
    res.render('showmyrestaurants', {title: 'Show My Restaurants'});
}
