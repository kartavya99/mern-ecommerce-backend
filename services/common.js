const passport = require("passport");
const nodemailer = require("nodemailer");

// Emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "kiwizebon99@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //TODO: this is temp token for testing without cookie
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjcyMTMwNmNlNzJiYTdiNDVhZTA5ZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2NTAwNDAwfQ.NC7BQoyHq5VmgkBEK2UmnJXNjIo5weT6EuT7MeHDdoI";
  return token;
};

// Mail endpoint
// we dont want external excess
exports.sendMail = async function ({ to, subject, text, html }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"E-commerce" <kiwizebon99@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  return info;
};
