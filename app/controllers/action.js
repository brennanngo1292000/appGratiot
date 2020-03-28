const Action =  require('../models/action');
module.exports = {
    index:(req, res)=>{
        let status = 200;
        let result = {};
        try{
            Action.find({}, async (err,actions)=>{
                if(err){
                    status = 500;
                    result.status = 'fail';
                    result.error = err;
                }else if(actions){
                    status = 200;
                    result.status = 'success';
                    result.result = await actions.map((action)=>{
                        return {
                            id:action._id,
                            type:action.type,
                            name:action.name,
                            typeValue:action.typeValue,
                            values:action.values,
                            controll:action.controll,
                            listen:action.listen,
                        }
                    })
                }
                res.status(status).send(result);
            })

        }catch(err){
            status = 500;
            result.status = 'fail';
            result.error = err;
            res.status(status).send(result);
        }
    }
}