const express = require("express");
const User = require("../models/user.js");
const Data = require("../models/data.js");
const authentication = require("../middleware/authentication");
const authenticationOrg = require("../middleware/authenticationOrg");

const router = express.Router();

router.put("/api/user/requestConnection", authentication, authenticationOrg, async function (req, res) {
  try {
    const userFromRequest = req.user;
    const userToRequest = await User.findOne({ _id: req.query.userId });

    if (!userToRequest) {
      throw new Error();
    }

    const userFromRequestData = await Data.findOne({ userID: userFromRequest._id, organizationID: req.orgId });
    const userToRequestData = await Data.findOne({ userID: userToRequest._id, organizationID: req.orgId });

    console.log(!userToRequestData.pendingRequestsReceive.includes(userFromRequest._id));
    if (!userFromRequestData.pendingRequestsSend.includes(userToRequest._id) && !userToRequestData.pendingRequestsReceive.includes(userFromRequest._id)) {
      userFromRequestData.pendingRequestsSend.push(userToRequest._id);
      userToRequestData.pendingRequestsReceive.push(userFromRequest._id);
    } else {
      userFromRequestData.pendingRequestsSend.remove(userToRequest._id);
      userToRequestData.pendingRequestsReceive.remove(userFromRequest._id);
    }

    await userFromRequestData.save();
    await userToRequestData.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/api/organization/recommentedConnections", authentication, authenticationOrg, async function (req, res) {
  try {
    const userData = await Data.findOne({ userID: req.user._id, organizationID: req.orgId });

    await userData.populate({ path: "organizationID", model: "organization", populate: { path: "users", model: "user" } });

    let recommentedConnections = [];

    for (let i = 0; i < 4; i++) {
      let roundomNumber = Math.floor(Math.random() * (userData.organizationID.users.length - 1));
      let selectedUser = userData.organizationID.users[roundomNumber];
      if (!recommentedConnections.includes(selectedUser) && req.user !== selectedUser) {
        recommentedConnections.push(selectedUser);
      }

      if (userData.organizationID.users.length < 4 && userData.organizationID.users.length === i) {
        break;
      }
    }

    recommentedConnections = recommentedConnections.map((conection) => {
      return {
        id: conection._id,
        name: conection.name,
        surname: conection.surname,
      };
    });

    // console.log(recommentedConnections);
    res.status(201).send(recommentedConnections);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;