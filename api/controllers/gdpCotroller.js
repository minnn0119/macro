'use strict'

const db = require('../db')

const sData = db
const table = 'gdp'
const dataPost = []
module.exports = {

    //get all data gdp
    get: (req, res)=> {
        let i = req.query.id ;
        //ii là số tháng vd: 3M->i=3, 1U-> i=12, all->1200
        let ii = req.query.time;
        const time =new Date()
        let aa = req.query.type
        new Date (time.setMonth(time.getMonth()-ii))
        if(aa=='gdp'){
            const sData = db.GDP
            if(req.query.id && req.query.time ){
                let data = sData.filter(items => items.name === i &&  new Date(items.date) >= time);
                res.json({data : data})
            }
            if(req.query.id || req.query.time ){
                let data = sData.filter(items => items.name === i ||  new Date(items.date) >= time);
                res.json({data : data})
            }
            else {
                res.json({data : sData})
            }
        }
        if(aa=='cpi'){
            const sData = db.CPI
            if(req.query.id && req.query.time ){
                let data = sData.filter(items => items.name === i &&  new Date(items.date) >= time);
                res.json({data : data})
            }
            if(req.query.id || req.query.time ){
                let data = sData.filter(items => items.name === i ||  new Date(items.date) >= time);
                res.json({data : data})
            }
            else {
                res.json({data : sData})
            }
        }
        else{
                res.json({data : sData}) 
        }
    },
    //post data lên bảng tùy chỉnh đồ thị
    store: (req, res) => {
        let data = {
            id: req.query.id,
            name: req.query.name,
        };
        dataPost.push(data)
        res.send(dataPost)
    },
     //delete data trong bảng tùy chỉnh đồ thị
    delete: (req, res) => {
        const param = dataPost.find(dataPost => dataPost.id === req.query.id)
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
        var data = sData.filter(items => items.type === type ||items.name === id ) ;
        res.send(data) 
    },
    paging: (req,res) => {
        let perPage = 10; 
        let page = parseInt(req.params) || 1; 
        var start =(page-1)*perPage
        var end = page *perPage
       res.send(sData.slice(start,end)) 
    }

}