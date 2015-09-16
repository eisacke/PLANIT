var path = require('path')
var EmailTemplate = require('email-templates').EmailTemplate
var nodemailer = require('nodemailer')

var templatesDir = path.resolve(__dirname, '../public', 'email-templates')
var template = new EmailTemplate(path.join(templatesDir, 'invite'))
// Prepare nodemailer transport object
var transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eventplanapp@gmail.com',
    pass: 'generalassembly'
  }
})

// An example users object with formatted email function
var locals = [
'emily@isacke.com', 'emilyisacke@hotmail.co.uk'
]

sendEmail = function(){
  // Send a single email
  template.render(locals, function (err, results) {
    if (err) {
      return console.error(err)
    }

    transport.sendMail({
      from: 'Event Plan <eventplanapp@gmail.com>',
      to: locals,
      subject: 'Mangia gli spaghetti con polpette!',
      html: results.html,
      text: results.text
    }, function (err, responseStatus) {
      if (err) {
        return console.error(err)
      }
      console.log(responseStatus.message)
    })
  })
}

module.exports = {
  sendEmail: sendEmail
}
