var express = require('express');
var router = express.Router();
var eventHubs = require("eventhubs-js")



/* POST messages */
router.post('/', function(req, res, next) {
    var color = req.body.color;
    var id = req.body.id;
    console.log("message recived", color);
  
    var hubnamespace = 'ua-eventhub';
    var hubname = 'ua-eventcenter';
    var keyname = 'enviar';
    var key = 'jm+K3ap02sg3xEI2HfloK5InUQbK1v6R+uj7WA1ylRk=';

    eventHubs.init({
        hubNamespace: hubnamespace,
        hubName: hubname,
        keyName: keyname,
        key: key
    });
    
    try{
        eventHubs.sendMessage({
            message: {
                color: color
            },
            deviceId: id
        }).then(function () {
            console.info('message sended');
        }).catch(function (error) {
            console.error(error);
        });
    }  catch(e){
        console.error(e);
    }
    res.end();
});

module.exports = router;