const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (err) {
        // console.log('Error', err);
        // return;
        req.flash('error', err);
        return res.redirect('back');
    }
    
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({post: req.params.id})
            req.flash('success', 'Post deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', ' You cannot delete post!');
            return res.redirect('back');
        }
    } catch (err) {
        // console.log('Error', err);
        // return;
        req.flash('error', err);
        return res.redirect('back');
    }
}