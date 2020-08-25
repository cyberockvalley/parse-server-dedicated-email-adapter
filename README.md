[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=3.0.6&x2=0)](https://badge.fury.io/js/parse-server-dedicated-email-adapter)
# Parse Server Dedicated Email Adapter


This is a parse server email adapter that will route all emails sent by parse server through your dedicated email server(e.g mail.my-example-domain.com). Emails can include password resets, verification emails and custom emails sent through cloud code.

Read more here: https://github.com/parse-community/parse-server.

## Compatibility
Tested with Parse Server v2.7.0

## Installation
```sh
$ npm install --save parse-server-dedicated-email-adapter
```

## Usage
In the configuration of your parse server you must pass **parse-server-dedicated-email-adapter** as your email adapter. You must pass along the five properties in the options properties of the **emailAdapter** object

This is an example using parse server as an express module:


```javascript
var parse = new ParseServer({
   //...
   emailAdapter: {
      module: "parse-server-dedicated-email-adapter",
      options: {
         //your mail server smtp host. If empty, it will be guessed from the email option
         // for example, provided the host is empty and the email is doc@api.com, the 
         // smtp host will be set as mail.api.com
         host: "mail.example.com",
         //the port your smtp server is running on. 25(not secure), 587(TLS), 465(SSL). Default = 25
         port: 25,
         //declare if the communication will be encrypted. false(port 25), true (587 || 465)
         // if not set, it will be guessed from the port provided. If the provided port is 587 or 465,
         // it will be set to true; if no port or 25 is provided, it will be set to false
         secure: false,
         email: "foo@example.com",//The email address of the account you're sending from
         password: "bar"//The password of the account,
         from: "ExampleSite <foo@example.com>"//optional if not provided, email will be used in the from field.
      }
   }
});

//To use the email adapter to send an email directly to another email address such as sending an email to yourself via the contact form on your website, you can call the adapter as follows:

var EmailAdapter = require("parse-server-dedicated-email-adapter")

//where options is the same as the emailAdapter options above
var mailAdapter = EmailAdapter(options)

var mailOptions = {
   from: "ExampleSite <foo@example.com>", // sender address. optional as long as it is provided in the options above
   to: ["bar@example.com"], // Comma separated list or an array of recipients email addresses that will appear on the To: field
   subject: "Hello World!", // Subject line
   text: "How're you doing?", // The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
   html: "<b>How're you doing?</b>", // The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
   attachments: [...], // An array of attachment objects. See [Using attachments](https://nodemailer.com/message/attachments/) for details. Attachments can be used for [embedding images](https://nodemailer.com/message/embedded-images/) as well.
}
//This adapter uses [nodemailer email transport library](https://nodemailer.com), so it supports all the nodemailer options.
//To see more options, go to the nodemailer [message options documentation](https://nodemailer.com/message/)
mailAdapter.sendMail({
   mailOptions
})
.then(feedback => {
   //handle success here
})
.catch(e => {
   //handle error here
})
```

## Credits

https://github.com/premithk/parse-server-genericemail-adapter

https://github.com/nodemailer/nodemailer

https://github.com/parse-community/parse-server

## License MIT