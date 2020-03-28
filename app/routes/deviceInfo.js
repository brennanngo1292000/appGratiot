const deviceInfoController = require("../controllers/deviceInfo");
module.exports = router => {
  router
    .route("/deviceInfo")
    .post(deviceInfoController.store)
    .get(deviceInfoController.index)
    .put(deviceInfoController.edit);
  router
    .route("/deviceInfo/device/:deviceId")
    .get(deviceInfoController.findByDeviceId)
};
