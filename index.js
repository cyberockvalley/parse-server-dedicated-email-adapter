var nodemailer = require('nodemailer')

module.exports = function (options) {

    var hostFromEmail = email => {
        if(email && email.includes("@")) {
            return "mail." + email.substring(email.indexOf("@") + 1)

        } else {
            return null
        }
    }
    var securityStatusFromPort = port => {
        if(!port) return false
        port = parseInt(port)
        if(port == 587 || port == 465) return true
        return false
    }
    var transporter = nodemailer.createTransport({
        host: options.host || hostFromEmail(options.email),
        port: options.port || 25,
        secure: options.secure || securityStatusFromPort(options.port || 25),
        auth: {
            user: options.email, // Your email id
            pass: options.password // Your password }
        }
    });

    var sendMail = function (mail) {

        return new Promise(function (resolve, reject) {

            var mailOptions = {
                from: options.from, // sender address
                to: [mail.to], // list of receivers
                subject: mail.subject, // Subject line
                text: mail.text, //, // plaintext body
                html:mail.html,
                attachments:mail.attachments
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error)
                    return
                }
                resolve(info)
            });


        });
    };


    return {
        sendMail: sendMail
    }
};