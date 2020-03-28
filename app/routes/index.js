const userRouter = require('./user');
const houseRouter = require('./house');
const roomRouter = require('./room');
const deviceRouter = require('./device');
const actionRouter = require('./action');
const alarmRouter = require('./alarm');
const deviceInfoRouter = require('./deviceInfo');

module.exports = (router) => {
    userRouter(router);
    houseRouter(router);
    roomRouter(router);
    deviceRouter(router);
    actionRouter(router);
    alarmRouter(router);
    deviceInfoRouter(router);
    return router;
}