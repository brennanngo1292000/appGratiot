const houseController = require('../controllers/house');

module.exports = router => {
  router.route("/houses").post(houseController.store);
  router.route("/houses/user/:userId").get(houseController.findByUserId);
};
