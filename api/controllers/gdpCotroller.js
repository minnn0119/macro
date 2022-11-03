'use strict'

const db = require('../db')

const sData = db
const table = 'gdp'
const dataPost = []
module.exports = {

    //get all data gdp
    get: (req, res)=> {
        res.json({data : sData})
    },
    detail: (req,res)=>{  
        let i = req.query.id ;
        //ii là số tháng vd: 3M->i=3, 1U-> i=12, all->1200
        let ii = req.query.time;
        const time =new Date()
        let aa = req.params.type
        var search = req.query.search
        var paging = req.query.paging
        new Date (time.setMonth(time.getMonth()-ii))
        if(aa=='gdp'){
            const sData = db.GDP
            if(i && ii ){
                let data = sData.filter(items => items.name === i &&  new Date(items.date) >= time);
                res.status(200).json({data : data})
            }
            if(i || ii ){
                let data = sData.filter(items => items.name === i ||  new Date(items.date) >= time);
                res.status(200).json({data : data})
            }
            if(search){
                var result = sData.filter( (items) => {
                    return items.type.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
                res.status(200).json({data : result})
            }
            if(paging){
                let perPage = 10; 
                let page = parseInt(req.params) || 1; 
                var start =(page-1)*perPage
                var end = page *perPage
                res.send(sData.slice(start,end)) 
            }
            else {
                res.json({data : sData})
            }
        }
        if(aa=='cpi'){
            const sData = db.CPI
            if(i && ii ){
                let data = sData.filter(items => items.name === i &&  new Date(items.date) >= time);
                res.json({data : data})
            }
            if(i || ii ){
                let data = sData.filter(items => items.name === i ||  new Date(items.date) >= time);
                res.json({data : data})
            }
            if(search){
                var result = sData.filter( (items) => {
                    return items.type.toLowerCase().indexOf(search.toLowerCase()) !== -1
                })
                res.json({data : result})
            }
            if(paging){
                let perPage = 10; 
                let page = parseInt(req.params) || 1; 
                var start =(page-1)*perPage
                var end = page *perPage
                res.send(sData.slice(start,end)) 
            }
            else {
                res.json({data : sData})
            }
        }
        else{
            res.send('Nothing')
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
    

}