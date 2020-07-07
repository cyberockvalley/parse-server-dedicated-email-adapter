[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.0.2&x2=0)](https://badge.fury.io/js/parse-server-dedicated-email-adapter)
# Parse Server Dedicated Email Adapter


This is a parse server email adapter that will route all emails sent by parse server through general email providers, like gmail, yahoo etc. Emails can include password resets, verification emails and custom emails sent through cloud code.

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
         password: "bar"//The password of the account
      }
   }
});
```

## Credits

https://github.com/premithk/parse-server-genericemail-adapter

https://github.com/nodemailer/nodemailer

https://github.com/parse-community/parse-server

## License MIT