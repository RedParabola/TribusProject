var APP_CONSTANTS = require('../config/appConstants.js');

exports = module.exports = function(app, mongoose) {
  
  var measureSchema = new mongoose.Schema({
    roomId:  { type: String },
    thingId: { type: String },
    date:    { type: Date },
    type:    {
               type: String,
               enum: APP_CONSTANTS.MEASURES.MAGNITUDE_ENUM
             },
    data:    Schema.Types.Mixed
  });

  mongoose.model('Measure', measureSchema);
};