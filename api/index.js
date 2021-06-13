import express from 'express';
const axios = require('axios')
const app = express()

app.get('/video/:id', (req, res) => {
    let videoId = req.params.id
    axios(process.env.youtube_api_url,{
        method: "get",
        Headers: {
            client_secret: process.env.client_secret,
            client_id: process.env.client_id
        },
        params: {
            part: "snippet,statistics",
            id:videoId,
            key: process.env.youtube_api_key
        }
    }).then(response => {
        return res.status(200).json({data: response.data.items})
    })
    .catch(err => {
        res.status(404)
    })

})

export const path = '/api'
export const handler = app