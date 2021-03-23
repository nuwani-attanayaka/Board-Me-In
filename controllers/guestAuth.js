const Guest = require("../models/Guest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

/************************************
 *SIGNUP CONTROLLER
 ************************************/

exports.signupController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await Guest.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newGuest = new Guest();
    newGuest.firstname = firstname;
    newGuest.lastname = lastname;
    newGuest.email = email;

    const salt = await bcrypt.genSalt(10);
    newGuest.password = await bcrypt.hash(password, salt);

    await newGuest.save();

    res.json({
      successMessage: "Registration success. Please Login.",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });

    // console.log(newGuest.password);
    //   } catch (err) {
    //     console.log("signupController error:", err);
    //   }
  }
};
// };

/************************************
 *LOGIN CONTROLLER
 ************************************/

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Guest.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log("jwt error: ", err);
      const { _id, firstname, lastname, email, role } = user;

      res.json({
        token,
        user: { _id, firstname, lastname, email, role },
      });
    });
  } catch (err) {
    console.log("loginController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
