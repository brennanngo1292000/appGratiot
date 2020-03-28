const roomController = require('../controllers/room');
module.exports = (router)=>{
    router.route('/rooms').post(roomController.store);

    router.route('/rooms/house/:houseId').get(roomController.findByHouseId);
}