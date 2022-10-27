'use strict'

const db = require('../db')

const cpiDb = db.CPI
const table = 'cpi'

const dataPost = []
module.exports = {

    //get all data cpi
    get: (req, res)=> {
        let i = req.query.id ;
        //ii là số tháng vd: 3M->i=3, 1U-> i=12, all->1200
        let ii = req.query.time;
        const time =new Date()
        new Date (time.setMonth(time.getMonth()-ii))
        if(req.query.id && req.query.time ){
            let data = cpiDb.filter(items => items.period === i &&  new Date(items.date) >= time);
            res.json({data : data})
        }
        if(req.query.id || req.query.time ){
            let data = cpiDb.filter(items => items.period === i ||  new Date(items.date) >= time);
            res.json({data : data})
        }
        else {
            res.json({data : cpiDb})
        }
        
    },
    //post data lên bảng tùy chỉnh đồ thị
    store: (req, res) => {
        let data = {
            id: req.params.dataId
        };
        dataPost.push(data)
        res.send(dataPost)
    },
     //delete data trong bảng tùy chỉnh đồ thị
    delete: (req, res) => {
        const param = dataPost.find(dataPost => dataPost.id === req.params.dataId)
        let index = dataPost.indexOf(param)
        dataPost.splice(index,1);
        res.send(dataPost)
    },
    search: (req,res) => {
        // var id = req.p.id;
	    // var data1 = posts.filter(function(item){
        //     return item.id === parseInt(id)
        // });
        var id = req.query.id;
        var type = req.query.type;
        var data = cpiDb.filter(items => items.type === type ||items.period === id ) ;
        res.send(data) 
    },
    paging: (req,res) => {
        let perPage = 10; 
        let page = parseInt(req.params) || 1; 
        var start =(page-1)*perPage
        var end = page *perPage
       res.send(cpiDb.slice(start,end)) 
    }
}