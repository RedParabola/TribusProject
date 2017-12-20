var APP_CONSTANTS = require('../config/appConstants.js');

exports = module.exports = function(app, mongoose) {
  
  var thingSchema = new mongoose.Schema({
    id:       { type: String },
    name:     { type: String },
    category: { type: String,
                enum: APP_CONSTANTS.THINGS.CATEGORY_ENUM
              },
    type:     { type: String,
                enum: APP_CONSTANTS.THINGS.TYPE_ENUM
              },
  });

  mongoose.model('Thing', thingSchema);
};
  