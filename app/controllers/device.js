const Device = require("../models/device");
module.exports = {
  findByPage:(req, res)=>{
    let status = 200;
    let result = {};
    try{
      const {page, userId} = req.params;
      if(Number(page)){
        Device.find({userId:userId}).skip(page*10-10).limit(10).exec((err, devices)=>{
          if(devices){
            status = 200;
            result.status = 'success';
            result.result = devices.map((device)=>{
              return  {
                deviceName: device.deviceName,
                id: device._id,
                deviceModel: device.deviceModel,
                actions: device.actions,
                roomId: device.roomId
              };
            });
          }else if(err){
            status = 500;
            result.status ='fail';
            result.error = err;
          }
          res.status(status).send(result);
        })
      }

    }catch(err){
      status = 500;
      result.error = err;
      result.status = 'fail';
      res.status(status).send(result);
    }
  },

  store: (req, res) => {
    let status = 201;
    let result = {};
    try {
      const { deviceName, roomId, deviceModel, actions } = req.body;
      const newDevice = new Device({
        deviceName: deviceName,
        deviceModel: deviceModel,
        roomId: roomId,
        actions: actions
      });

      newDevice.save((err, device) => {
        if (err) {
          status = 500;
          result.status = "fail";
          status.error = err;
        } else if (device) {
          status = 201;
          result.status = "success";
          result.result = {
            deviceName: device.deviceName,
            id: device._id,
            deviceModel: device.deviceModel,
            actions: device.actions,
            roomId: device.roomId
          };
        }
        res.status(status).send(result);
      });
    } catch (err) {
      status = 500;
      result.status = "fail";
      result.error = err;
      res.status(status).send(result);
    }
  },
  findByRoomId:(req, res)=>{
      let status = 200;
      let result = {};
      try{
          const {roomId} = req.params;
          Device.find({roomId:roomId}, async (err, devices)=>{
              if(err){
                  status = 404;
                  result.status = 'fail';
                  result.error = err;
              }else if(devices){
                  status = 200;
                  result.status = 'success';
                  result.result = await devices.map((device)=>{
                      return {
                          deviceName:device.deviceName,
                          deviceModel:device.deviceModel,
                          actions:device.actions,
                          id:device.id,
                          roomId:device.roomId,
                      }
                  });
              }
              res.status(status).send(result);
          })
      }catch(err){
          status = 500;
          result.status = 'fail';
          result.error = err;
          res.status(status).send(result);
      }
  }
};
