const express = require('express');
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')
const BASE_URL="http://knowyourmeme.com/";


app.get('/:search',async (req,res)=>{
        const searchParam = req.params.search;
        const finalURL = BASE_URL+"search?q="+searchParam;
        let response = await axios.get(finalURL);
        let $ = cheerio.load(response.data);
        const grid = $('.entry-grid-body');
        const searchItem = grid.find('tr td a')[0];
        let x = BASE_URL+searchItem.attribs.href+'/photos';
        response = await axios.get(x);
        $ = cheerio.load(response.data);
        const img = $('meta[property="og:image"]').attr('content')
        return res.status(200).json({
               status:200,
               data:img
        })
})

app.listen(3000,()=>{
     console.log('Listening on 3000')
})