const actionController = require("../controllers/action");
module.exports = router => {
  router.route("/actions").get(actionController.index);
};
