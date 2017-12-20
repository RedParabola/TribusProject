module.exports = {

  /*** SERVER, MONGODB, PYTHON ***/
  SERVER_PORT : 50003,
  MONGODB_URL : 'mongodb://localhost/tvshows',

  /*** ROUTING ENDPOINTS & VERBS ***/
  GLOBAL_ENDP: {
    THINGS :   '/api/things',
    ROOMS :    '/api/rooms',
    MEASURES : '/api/measures',
  },
  EP_THINGS :{
    ADD : '/add',
    GET_ALL : '/all',
    BY_ID : '/byid/:id',
  },
  EP_MEASURES :{
    LIVE : '/live',
    ACTIVATE : '/activate',
    CONTROL : '/control',
  },

  /*** BUSINESS LOGIC ***/
  THINGS : {
    CATEGORY_ENUM : [
      'TEMPERATURE',
      'LIGHTING',
      'ENTERTAINMENT',
      'KITCHEN',
      'OUTDOOR'
    ],
    TYPE_ENUM : [
      'AC',
      'HEATER',
      'SUNBLIND',
      'LIGHT',
      'LAMP',
      'TV',
      'PC',
      'HIGHSPEAKER',
      'REFRIGERATOR',
      'HOOD',
      'OUTDOOR'
    ]
  },
  MEASURES: {
    MAGNITUDE_ENUM: [
      'TEMPERATURE',
      'HUMIDITY',
      'LUMINOSITY',
      'NOISE',
      'MICRONOISE'
    ]
  },
};