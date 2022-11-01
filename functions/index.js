const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");
const app = express();
var util = require("util");
var _ = require("underscore");

// var serviceAccount = require("./prod_bowoot.json");
var serviceAccount = require("./dev_bowoot.json");

const TextAPI = "iyd4tPWAiXa";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bowoot-test.firebaseio.com",
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://bowoot.firebaseio.com"
// });

var db = admin.database();

exports.createNewUser = functions.https.onRequest((request, response) => {
  cors(request, response, function () {
    request.body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;
    var email = request.body.email;
    var pass = request.body.password;
    let token = request.body.token;
    console.log(request.body);
    admin
      .auth()
      .createUser({
        email: email,
        emailVerified: true,
        password: pass,
        phoneNumber: request.body.phoneNumber,
      })
      .then(function (userRecord) {
        if (token === "isUser") {
          admin
            .database()
            .ref("users/")
            .child(userRecord.uid)
            .set({
              [token]: true,
            });
        }
        if (token === "isAdmin") {
          admin
            .database()
            .ref("admin/")
            .child(userRecord.uid)
            .set({
              [token]: true,
            });
        }
        if (token === "isTrainer") {
          admin
            .database()
            .ref("trainers/")
            .child(userRecord.uid)
            .set({
              [token]: true,
            });
        }
        console.log(userRecord);
        response.status(200).send(userRecord);
        return 0;
      })
      .catch(function (error) {
        console.log(error);
        response.status(500).send({ error: error });
        return 0;
      });
    return 0;
  });
});

exports.getTypeOfUser = functions.https.onRequest((request, response) => {
  cors(request, response, function () {
    request.body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;
    var uid = request.body.uid;

    admin
      .database()
      .ref()
      .once("value")
      .then((snapshot) => {
        let reference = snapshot.val();
        console.log(reference);
        if (reference) {
          Object.keys(reference).map((i) => {
            console.log(i);
            admin
              .database()
              .ref(i)
              .child(uid)
              .once("value")
              .then((data) => {
                if (data.hasChild("isUser")) {
                  response.status(200).send({ result: "User" });
                } else if (data.hasChild("isTrainer")) {
                  response.status(200).send({ result: "Trainer" });
                } else if (data.hasChild("isAdmin")) {
                  response.status(200).send({ result: "Admin" });
                }
                db.ref("users/")
                  .once("value")
                  .then(function (userSnapshot) {
                    var users = userSnapshot.val();
                    var tokenArray = _.compact(_.pluck(users || {}, "token"));
                    var msgObj = {
                      title: "New User created",
                      body: "Blah blah blah",
                      tag: "USER_ADDED",
                    };
                    sendNotfications(tokenArray, msgObj);
                    return 0;
                  })
                  .catch(function (error) {
                    return error;
                  });
                return response;
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
        return 0;
      })
      .catch((error) => {
        console.log(err);
        response.status(400).send(error);
      });
  });
});

function sendNotfications(tokenArray, msgObj) {
  var message = {
    options: {
      ttl: 3600 * 1000, // 1 hour in milliseconds
      priority: "high",
    },
    payload: {
      notification: {
        title: msgObj.title,
        body: msgObj.body,
        tag: msgObj.tag,
        icon: "stock_ticker_update",
        color: "#f45342",
      },
    },
  };
  if (tokenArray.length) {
    admin
      .messaging()
      .sendToDevice(tokenArray, message.payload, message.options)
      .then(() => {
        console.log("NOTIFICATIONS SENT SUCCESSFULLY");
        return 0;
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }
}

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const dest = req.body.dest;
    const mailOptions = {
      from: "Your Account Name <yourgmailaccount@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: "I'M A PICKLE!!!", // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            `, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sent");
    });
  });
});

exports.checkUserExists = functions.https.onRequest((request, response) => {
  cors(request, response, function () {
    request.body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;
    var email = request.body.email;
    admin
      .auth()
      .getUserByEmail(email)
      .then((snap) => {
        console.log(snap);
        if (snap) {
          response.status(200).send({ status: true });
        }
        return 0;
      })
      .catch((error) => {
        response.status(500).send({ status: false });
        return error;
      });
  });
});

exports.checkPhoneExists = functions.https.onRequest((request, response) => {
  cors(request, response, function () {
    request.body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;
    var phone = request.body.phone;

    admin
      .auth()
      .getUserByPhoneNumber(phone)
      .then((snap) => {
        console.log(snap);
        if (snap) {
          response.status(200).send({ status: true });
        }
        return 0;
      })
      .catch((error) => {
        response.status(500).send({ status: false });
        return error;
      });
  });
});
