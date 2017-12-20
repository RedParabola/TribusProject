var APP_CONSTANTS = require('../config/appConstants.js');

exports = module.exports = function(express, app, mongoose) {

  // Import Mongo Models
  var ThingModel = require('../things/thing.model.js')(app, mongoose);
  //var RoomModel = require('../rooms/room.model.js')(app, mongoose);
  var MeasureModel = require('../measures/measure.model.js')(app, mongoose);
  
  // Import Controllers
  // --for Mongo
  var thingCtrl = require('../things/things.controller.js');
  //var roomCtrl = require('../rooms/rooms.controller.js');
  // --for others
  var measuresCtrl = require('../measures/measures.controller.js');
  

  // Things routing
  var thingsRouter = express.Router();  

      thingsRouter.route(APP_CONSTANTS.EP_THINGS.ADD)
        .post(thingCtrl.addThing);

      thingsRouter.route(APP_CONSTANTS.EP_THINGS.GET_ALL)
        .get(thingCtrl.getAllThings);

      thingsRouter.route(APP_CONSTANTS.EP_THINGS.BY_ID)
        .get(thingCtrl.getThingById)
        .put(thingCtrl.updateThing)
        .delete(thingCtrl.deleteThing);


  // Room routing
  var roomRouter = express.Router();

  // Measure routing
  var measureRouter = express.Router();  

      measureRouter.route(APP_CONSTANTS.EP_MEASURES.LIVE)
      .get(measuresCtrl.getLiveMeasures);
      measureRouter.route(APP_CONSTANTS.EP_MEASURES.ACTIVATE)
      .post(measuresCtrl.turnHumidifier);
      measureRouter.route(APP_CONSTANTS.EP_MEASURES.CONTROL)
      .post(measuresCtrl.setHumidityControl);

  // Verbs
  app.use(APP_CONSTANTS.GLOBAL_ENDP.THINGS, roomRouter);
  app.use(APP_CONSTANTS.GLOBAL_ENDP.ROOMS, thingsRouter);  
  app.use(APP_CONSTANTS.GLOBAL_ENDP.MEASURES, measureRouter);
  
}