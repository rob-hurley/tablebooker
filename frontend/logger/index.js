/*
Logger module.
Writes requests to an access log or error log
*/

// Use module.exports to expose objects
module.exports.access = access;
module.exports.redirect_error = redirect_error;
module.exports.page_error = page_error;


// Create functions for each export
function access(req, res, next){
    console.log(req.ip + "\t" + req.method + "\t" + req.url);
    next();
}
function redirect_error(error, req, res, next){
    console.log(req.ip + "\t" + req.method + "\t" + req.url + "\tRedirect Error" + error);
    next();
}
function page_error(error, req, res, next){
    console.log(req.ip + "\t" + req.method + "\t" + req.url + "\tPage Error\t" + error);
    next();
}