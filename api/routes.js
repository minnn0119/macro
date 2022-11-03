'use strict';
module.exports = function(app) {
  var home = require('./home');
 
  var gdpCtrl = require('./controllers/gdpCotroller');

  //Home Routes
  app.route('/').get(home.get);


  // GDP Routes
  app.route('/macro')
    .get(gdpCtrl.get)
  app.route('/macro/:type')
    .get(gdpCtrl.detail)
  app.route('/macro/:type')
    .post(gdpCtrl.store)
    .delete(gdpCtrl.delete);
    
};





   


