module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial!</h1>');

    res.cookie('User_id', 25);
    console.log(req.cookies);
    return res.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(req, res){}