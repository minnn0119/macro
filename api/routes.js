'use strict';
module.exports = function(app) {
  var home = require('./home');
 
  var gdpCtrl = require('./controllers/gdpCotroller');

  //Home Routes
  app.route('/').get(home.get);


  // GDP Routes
  app.route('/macro')
    .get(gdpCtrl.get);
  app.route('/macro/:type')
    .get(gdpCtrl.detail);
  app.route('/macro/:type/search')
    .get(gdpCtrl.search)
  app.route('/macro/:type/:page')
    .get(gdpCtrl.paging)
  app.route('/macro/:type/:dataId')
    .post(gdpCtrl.store)
    .delete(gdpCtrl.delete);
    
};





   


