const nodeMailer = require('../config/nodemailer');

// this is another way of expoting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);

    nodeMailer.transpoter.sendMail({
        from: 'prince9470kr@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Yup, your comment is now Published!</h1>'
    }, (err, info) =>{
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}