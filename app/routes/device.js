const deviceController = require("../controllers/device");
module.exports = router => {
  router.route("/devices").post(deviceController.store);
  router.route("/devices/room/:roomId").get(deviceController.findByRoomId);
  router.route("/devices/:userId/:page").get(deviceController.findByPage);
};
