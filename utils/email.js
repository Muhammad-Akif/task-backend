var nodemailer = require('nodemailer');

const sendEmail = (name, email, password) => {
    console.log('Sending email',email);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'muhammadakif2917@gmail.com',
            pass: process.env.App_PASS
        }
    });

    var mailOptions = {
        from: 'muhammadakif2917@gmail.com',
        to: email,
        subject: `Welcome To edmunds Cars`,
        html: `Hi, ${name} !<br/><br/>Thanks for joining edmunds... <br/><br/>Here is your password to Login ${password}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = sendEmail;


