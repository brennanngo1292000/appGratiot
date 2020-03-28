const House = require("../models/house");

module.exports = {
  store: (req, res) => {
    let status = 201;
    let result = {};

    try {
      const { houseName, userId } = req.body;
      if (userId) {
        const newHouse = new House({
          houseName: houseName,
          userId: userId
        });
        newHouse.save((err, house) => {
          if (err) {
            status = 500;
            result.status = "fail";
            result.error = err;
            res.status(status).send(result);
          } else if (house) {
            status = 201;
            result.status = "success";
            result.result = house;
            res.status(status).send(result);
          }
        });
      } else {
        status = 404;
        result.status = "fail";
        result.error = "User is not exities";
        res.status(status).send(result);
      }
    } catch (err) {
      status = 500;
      result.status = "fail";
      result.error = err;
      res.status(status).send(result);
    }
  },
  findByUserId: (req, res) => {
    let status = 200;
    let result = {};

    try {
      const { userId } = req.params;
      console.log(userId);
      if (userId) {
        House.find({ userId: userId }, async (err, houses) => {
          if (err) {
            status = 500;
            result.error = err;
            result.status = "fail";
          } else if (houses) {
            status = 200;
            result.result = await houses.map((house)=>{
                return {id:house._id, houseName:house.houseName};
            })
            result.status = "success";
          }
          res.status(status).send(result);
        });
      } else {
        status = 404;
        result.status = "fail";
        result.error = "User is not exities";
        res.status(status).send(result);
      }
    } catch (err) {
      status = 500;
      result.status = "fail";
      result.error = err;
      res.status(status).send(result);
    }
  }
};
