const DeviceInfo = require("../models/deviceInfo");

module.exports = {
  index: (req, res) => {
    let status = 200;
    let result = {};
    try {
    DeviceInfo.find({},(err, deviceInfos) => {
      if (err) {
        status = 500;
        result.error = err;
        result.status = "fail";
      } else if (deviceInfos) {
        status = 200;
        result.result = deviceInfos.map((item)=>{
            return {
                actions:item.actions,
                id:item._id,
                deviceId:item.deviceId,
            }
        });
        result.status = "success";
      } else {
        status = 404;
        result.error = "not found";
        result.status = "fail";
      }
      res.status(status).send(result);
    });
    } catch (err) {
      status = 500;
      result.error = err;
      result.status = "fail";
      res.status(status).send(result);
    }
  },
  store: (req, res) => {
    let status = 200;
    let result = {};
    try {
      const { deviceId, actions } = req.body;
      const newDeviceInfo = new DeviceInfo({
        deviceId: deviceId,
        actions: actions
      });

      newDeviceInfo.save((err, deviceInfo) => {
        if (err) {
          status = 500;
          result.error = err;
          result.status = "fail";
        } else if (deviceInfo) {
          status = 200;
          result.result = {
              actions:deviceInfo.actions,
              deviceId:deviceInfo.deviceId,
              id:deviceInfo._id,
          };
          result.status = "success";
        }
        res.status(status).send(result);
      });
    } catch (err) {
      status = 500;
      result.error = err;
      result.status = "fail";
      res.status(status).send(result);
    }
  },
  findByDeviceId: (req, res) => {
    let status = 200;
    let result = {};
    try {
    const { deviceId } = req.params;
    console.log(req.params);
    DeviceInfo.findOne({ deviceId: deviceId }, (err, deviceInfo) => {
      console.log(deviceInfo);
      if (err) {
        status = 500;
        result.error = err;
        result.status = "fail";
      } else if (deviceInfo) {
        status = 200;
        result.result = deviceInfo;
        result.status = "success";
      } else {
        status = 404;
        result.error = "not found";
        result.status = "fail";
      }
      res.status(status).send(result);
    });
    } catch (err) {
      status = 500;
      result.error = err;
      result.status = "fail";
      res.status(status).send(result);
    }
  },
  edit: (req, res) => {
    let status = 200;
    let result = {};
    try {
        console.log(req.body);
      const { actions, deviceId } = req.body;
      DeviceInfo.findOneAndUpdate(
        { deviceId},
        { actions },
        (err, deviceInfo) => {
          if (err) {
              console.log(err);
            status = 500;
            result.error = err;
            result.status = "fail";
          } else if (deviceInfo) {
              console.log(deviceInfo);
            status = 200;
            result.result = {
                id:deviceInfo._id,
                deviceId:deviceInfo.deviceId,
                actions:deviceInfo.actions,
            };
            result.status = "success";
          }
          res.status(status).send(result);
        }
      );
    } catch (err) {
      status = 500;
      result.error = err;
      result.status = "fail";
      res.status(status).send(result);
    }
  }
};
