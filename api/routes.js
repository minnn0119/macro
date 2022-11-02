'use strict';
module.exports = function(app) {
  var home = require('./home');
 
  var gdpCtrl = require('./controllers/gdpCotroller');

  //Home Routes
  app.route('/').get(home.get);


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





   


