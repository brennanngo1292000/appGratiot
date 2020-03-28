const userController = require("../controllers/user");

module.exports = router => {
  router
    .route("/users")
    .get(() => {})
    .post(userController.store);

  router.route("/users/login").post(userController.login);

  router.route("/users/me/:token").get(userController.getMe);

  router.route("/users/code").post(userController.getCode);
  router.route("/users/verify").post(userController.verify);

};
