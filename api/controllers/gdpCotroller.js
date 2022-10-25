'use strict'

const db = require('../db')

const gdpDb = db.GDP
const table = 'cpi'

const dataPost = []
module.exports = {

    //get all data gdp
    get: (req, res)=> {
        const data =gdpDb
        res.json({data : data})
        
    },
    //get data chart use Id and time sort
    detail: (req, res) => {       
        const select =[
            'value',
            'specty'
        ];
        let i = req.params.cpiId -1;
        console.log(req.params)
        //ii là số tháng vd: 3M->i=3, 1U-> i=12, all->1200
        let ii = req.params.cpiTime;
        const time =new Date()
        new Date (time.setMonth(time.getMonth()-ii))
        let dataPeriod = gdpDb.filter(items => items.name === select[i] &&  new Date(items.date) >= time);
        res.json({dataPeriod : dataPeriod})
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
    }
}