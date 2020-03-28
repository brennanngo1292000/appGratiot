const Room = require("../models/room");

module.exports = {
  store: (req, res) => {
    let status = 201;
    let result = {};

    try {
      const { roomName, houseId } = req.body;
      if (houseId) {
        const newRoom = new Room({
          roomName: roomName,
          houseId: houseId
        });
        newRoom.save((err, room) => {
          if (err) {
            status = 500;
            result.status = "fail";
            result.error = err;
            res.status(status).send(result);
          } else if (room) {
            status = 201;
            result.status = "success";
            result.result = room;
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
  findByHouseId: (req, res) => {
    let status = 200;
    let result = {};

    try {
      const { houseId } = req.params;
      if (houseId) {
        Room.find({ houseId: houseId }, async (err, rooms) => {
          if (err) {
            status = 500;
            result.error = err;
            result.status = "fail";
          } else if (rooms) {
            status = 200;
            result.result = await rooms.map((room)=>{
                return {id:room._id, roomName:room.roomName, houseId:room.houseId};
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
