const Alarm = require("../models/alarm");

module.exports = {
  store: (req, res) => {
    let statusCode = 200;
    let result = {};
    try {
      console.log(req.body);
      const {
        alarmName,
        hours,
        minutes,
        status,
        days,
        option,
        note,
        deviceId
      } = req.body;
      const newAlarm = new Alarm({
        alarmName: alarmName,
        hours: hours,
        minutes: minutes,
        note: note,
        option: option,
        days: days,
        status: status,
        deviceId: deviceId
      });

      newAlarm.save((err, alarm) => {
        if (err) {
          statusCode = 500;
          result.status = "fail";
          result.error = err;
        } else if (alarm) {
          statusCode = 201;
          result.status = "success";
          result.result = {
            id: alarm._id,
            alarmName: alarm.alarmName,
            hours: alarm.hours,
            minutes: alarm.minutes,
            note: alarm.note,
            option: alarm.option,
            days: alarm.days,
            status: alarm.status,
            deviceId: alarm.deviceId
          };
        }
        res.status(statusCode).send(result);
      });
    } catch (err) {
      statusCode = 500;
      result.error = err;
      result.status = "fail";
      res.status(statusCode).send(result);
    }
  },

  findByDeviceId: (req, res) => {
    let statusCode = 200;
    let result = {};
    try {
      const { deviceId } = req.params;
      Alarm.find({ deviceId: deviceId }, (err, alarms) => {
        if (err) {
          statusCode = 500;
          result.status = "fail";
          result.error = err;
        } else if (alarms) {
          statusCode = 201;
          result.status = "success";
          result.result = alarms.map(alarm => {
            return {
              id: alarm._id,
              alarmName: alarm.alarmName,
              hours: alarm.hours,
              minutes: alarm.minutes,
              note: alarm.note,
              option: alarm.option,
              days: alarm.days,
              status: alarm.status,
              deviceId: alarm.deviceId
            };
          });
        }
        res.status(statusCode).send(result);
      });
    } catch (err) {
      statusCode = 500;
      result.error = err;
      result.status = "fail";
      res.status(statusCode).send(result);
    }
  }
};
