const User = require('../models/user');


module.exports.profile = function(req, res){
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user){
            if (user) {
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                })
            }
            else{
                return res.redirect('users/sign-in');
            }
            
        });
    }
    else{
        return res.redirect('users/sign-in');
    }
    // res.end('<h1>User Profile</h1>');
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
}

// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}

// sign and create the session for users
module.exports.createSession = function (req, res) {
    
    //steps to authenticate
    // find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}
        //handle user found

        if (user) {
            //handle password which doesn't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session cration
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            // handle user not found
            return res.redirect('back');
        }
    });
}

// signOut added to profile
module.exports.signOut =function(req, res){
    res.redirect('/users/sign-in');
}