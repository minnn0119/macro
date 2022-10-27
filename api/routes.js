'use strict';
module.exports = function(app) {
  var home = require('./home');
  var cpiCtrl = require('./controllers/cpiController');
  var gdpCtrl = require('./controllers/gdpCotroller');

  //Home Routes
  app.route('/').get(home.get);

  // CPI Routes
  app.route('/cpi')
    .get(cpiCtrl.get);
  app.route('/cpi/:page')
    .get(cpiCtrl.paging)
  app.route('/cpisearch')
    .get(gdpCtrl.search)
  app.route('/cpi/:dataId')
    .post(cpiCtrl.store)
    .delete(cpiCtrl.delete);

  // GDP Routes
  app.route('/gdp')
    .get(gdpCtrl.get);
  app.route('/gdp/:page')
    .get(gdpCtrl.paging)
  app.route('/gdpsearch')
    .get(gdpCtrl.search)
  app.route('/gdp/:dataId')
    .post(gdpCtrl.store)
    .delete(gdpCtrl.delete);
    
};





   


