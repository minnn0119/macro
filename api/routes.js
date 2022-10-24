'use strict';
module.exports = function(app) {
  var cpiCtrl = require('./controllers/cpiController')
  var gdpCtrl = require('./controllers/gdpCotroller');

  // CPI Routes
  app.route('/cpi')
    .get(cpiCtrl.get);
  app.route('/cpi/:cpiId&:cpiTime')
    .get(cpiCtrl.detail)
  app.route('/cpi/:dataId')
    .post(cpiCtrl.store)
    .delete(cpiCtrl.delete);

  // GDP Routes
  app.route('/gdp')
  .get(gdpCtrl.get);

  app.route('/gdp/:gdpId&:gdpTime')
    .get(gdpCtrl.detail)


  app.route('/gdp/:dataId')
    .post(gdpCtrl.store)
    .delete(gdpCtrl.delete);
    
};





   

