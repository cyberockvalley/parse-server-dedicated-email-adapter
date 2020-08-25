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
                ...mail,
                from: mail.from || options.from || options.email, // sender address
                to: [mail.to], // Comma separated list or an array of recipients email addresses that will appear on the To: field
                subject: mail.subject, // Subject line
                text: mail.text, //, // plaintext body
                html: mail.html,
                attachments: mail.attachments
            }

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