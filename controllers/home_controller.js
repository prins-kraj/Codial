const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // return res.end('<h1>Express is up for Codeial!</h1>');

    // res.cookie('User_id', 25);
    // console.log(req.cookies);
    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "Codial | Home",
    //         posts: posts
    //     });
    // });
    try {
        // populate the user of each post 
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await User.find({});

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }
    
}

// module.exports.actionName = function(req, res){}