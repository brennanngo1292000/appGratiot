const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validatePhoneNumber = require("validate-phone-number-node-js");
const stage = require("../../config");
const jsonwebtoken = require("jsonwebtoken");

const envoironment = process.env.NODE_ENV;
const saltOrRounds = stage[envoironment].saltOrRounds;
const connection = mongoose.connection;

//token
const secret = stage[envoironment].secret;
const options = {
  expiresIn: "2d",
  issuer: "http://192.168.100.10:9999"
};

module.exports = {
  login: (req, res) => {
    let status = 200;
    let result = {};

    try {
      //if connecttion has error
      connection.on("error", err => {
        status = 500;
        result.status = "fail";
        result.error = err;
        res.status(status).send(result);
      });

      const { callingCode, phone, password } = req.body; //get value
      console.log(req.body);

      User.findOne({ callingCode, phone }, (err, user) => {
        if (err) {
          throw new Error(err);
        } else if (user) {
          //check password
          bcrypt.compare(password, user.password, (err, same) => {
            if (err) {
              throw new Error(err);
            } else {
              if (same) {
                const payload = {
                  callingCode: callingCode,
                  phone: phone
                };

                const token = jsonwebtoken.sign(payload, secret, options);
                status = 200;
                result.status = "success";
                result.token = token;
                result.result = {
                  id:user._id,
                  callingCode: user.callingCode,
                  phone: user.phone
                };
              } else {
                status = 404;
                result.status = "fail";
                result.error = "Phone or password isn't exities";
              }
              res.status(status).send(result);
            }
          });
        } else {
          status = 404;
          result.status = "fail";
          result.error = "Not found account";
          res.status(status).send(result);
        }
      });
    } catch (err) {
      status = 500;
      result.status = "fail";
      result.error = err;
      res.status(status).send(result);
    }
  },
  getMe: (req, res) => {
    let status = 200;
    let result = {};
    try {
      //if connecttion has error
      connection.on("error", err => {
        status = 500;
        result.status = "fail";
        result.error = err;
        res.status(status).send(result);
      });

      const { token } = req.params; //get value
      jsonwebtoken.verify(token, secret, options, (err, decoded) => {
        if (err) {
          status = 404;
          result.status = "fail";
          result.errpr = err;
          res.status(status).send(result);
        } else if (decoded) {
          const { phone, callingCode } = decoded;
          User.findOne({ callingCode, phone }, (err, user) => {
            if (err) {
              throw new Error(err);
            } else if (user) {
              console.log(user);
              const payload = {
                callingCode: callingCode,
                phone: phone
              };
              const token = jsonwebtoken.sign(payload, secret, options);
              status = 200;
              result.status = "success";
              result.token = token;
              result.result = {
                id:user._id,
                callingCode: user.callingCode,
                phone: user.phone
              };
              res.status(status).send(result);
            } else {
              status = 404;
              result.status = "fail";
              result.error = "Not found account";
              res.status(status).send(result);
            }
          });
        }
      });
    } catch (err) {
      status = 500;
      result.status = "fail";
      result.error = err;
      res.status(status).send(result);
    }
  },
  store: (req, res) => {
    let status = 200;
    let result = {};

    try {
      //if connecttion has error
      connection.on("error", err => {
        status = 500;
        result.status = "fail";
        result.error = err;
        res.status(status).send(result);
      });
      console.log(req.body);
      const { callingCode, phone, password } = req.body; //get value
      const isPhone = validatePhoneNumber.validate(`+${callingCode}${phone}`);
      if (isPhone) {
        bcrypt.hash(password, saltOrRounds, (err, passwordIsHashed) => {
          if (err) {
            throw new Error(err);
          } else if (passwordIsHashed) {
            const newUser = new User({
              callingCode: callingCode,
              phone: phone,
              password: passwordIsHashed
            });
            newUser.save((err, newUser) => {
              if (err) {
                status = 500;
                result.error = "Phone is signuped";
                result.status = "fail";
              } else if (newUser) {
                const payload = {
                  callingCode: newUser.callingCode,
                  phone: newUser.phone
                };
                const token = jsonwebtoken.sign(payload, secret, options);
                status = 201;
                result.status = "success";
                result.token = token;
                result.result = {
                  phone: newUser.phone,
                  callingCode: newUser.callingCode
                };
              }
              res.status(status).send(result);
            });
          }
        });
      } else {
        status = 500;
        result.error = "Phone is not exities";
        result.status = "fail";
        res.status(status).send(result);
      }
    } catch (err) {
      status = 500;
      result.status = "fail";
      result.error = err;
      res.status(status).send(result);
    }
  },

  getCode: (req, res) => {
    const { phone, callingCode } = req.body;
    console.log(req.body);
    if (phone) {
      res.status(200).send({
        status: "success",
        result: {
          code: "123456"
        }
      });
    } else {
      res.status(200).send({
        status: "fail",
        result: {
          error: "Phone is not validattion"
        }
      });
    }
  },
  verify: (req, res) => {
    let status = 200;
    let result = {};
    const { code, callingCode, phone } = req.body;
    console.log(req.body);
    if (code == 123456) {
      const payload = {
        callingCode: callingCode,
        phone: phone
      };
      const token = jsonwebtoken.sign(payload, secret, options);
      status = 201;
      result.status = "success";
      result.token = token;
      result.result = payload;

    } else {
      status = 500;
      result.status = "fail";
      result.error = "Code is not true";
    }
    res.status(status).send(result);
  }
};
