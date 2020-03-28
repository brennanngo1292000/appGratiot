const alarmController = require('../controllers/alarm');

module.exports = (router)=>{
    router.route('/alarms').post(alarmController.store);

    router.route('/alarms/device/:deviceId').get(alarmController.findByDeviceId);
}