/**
 * Created by intelligrape on 21/7/14.
 */
var express = require("express");
var fs = require("fs")
var app = express();
var session = require("express-session")
var  bodyParser = require("body-parser");
app.use(bodyParser())
app.use(session({secret:"mykey"}))
app.route("/").get(function (req, res) {
    res.send("hello")
})
app.route("/login").get(function (req, res) {
    var data = fs.readFileSync('login.html');
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
}).post(function (req, res) {
        if (req.body.name == 'vini' && req.body.password == 'vini') {
            req.session.user = req.body.name;
            res.redirect('/profile');

        }
        else if (req.body.name == 'kas' && req.body.password == 'kas') {
            req.session.user = req.body.name;
            res.redirect('/profile');

        }
        else {
            res.redirect('/login');
        }
    });

app.route("/profile").get(function (req, res) {
    if(req.session.user){
        console.log(req.session.user)
        var data = fs.readFileSync('profile.html');
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    }else{
        res.redirect("/login")
    }


})
app.route('/logout').post(function (req, res) {
    delete req.session.user;
    res.redirect('/login');
})
app.listen(8888);