const CountModel = require("./models/count.model.js");
const express = require("express");
const axios = require("axios");
const app = express();

require("./config/index.js");
app.use(express.json());

const dayLimit = 1000;

app.get("/video/:id", async (req, res) => {

  let videoId = req.params.id;

  let existingData;
  try{
    existingData = await CountModel.findOne();
  }
  catch(_){
    existingData = "";
  }

  // Create collection if it doesn't exist.
  if (!existingData) {
    await CountModel.create({ api_call: 1, date_created: Date.now().valueOf() });
    axios(process.env.youtube_api_url, {
      method: "get",
      Headers: {
        client_secret: process.env.client_secret,
        client_id: process.env.client_id
      },
      params: {
        part: "snippet,statistics",
        id: videoId,
        key: process.env.youtube_api_key
      }
    })
      .then(response => {
        return res.status(200).json({ data: response.data.items });
      })
      .catch((_) => {
        res.status(404);
      });
  }
  else {
    let today = new Date().getTime().valueOf();
    let after24hrs = new Date(new Date(existingData.date_created).getTime() + 60 * 60 * 1000 * 24).getTime().valueOf();
    
    // If it's a new day
    if(today >= after24hrs){
      existingData = await CountModel.findOneAndUpdate({}, {api_call: 0, date_created: Date.now().valueOf() });
    }
    /**
     * Checks if the day's limit has exceeded.
     * @returns boolean
     */
    let exceededLimit = existingData.api_call > dayLimit && today <= after24hrs;

    switch (exceededLimit) {
      case true:
        res
          .status(200)
          .json({ msg: "Limit exceeded, please try again tomorrow." });
        break;
      case false:
        await CountModel.updateOne({}, {$inc: {api_call: 1}});
        axios(process.env.youtube_api_url, {
          method: "get",
          Headers: {
            client_secret: process.env.client_secret,
            client_id: process.env.client_id
          },
          params: {
            part: "snippet,statistics",
            id: videoId,
            key: process.env.youtube_api_key
          }
        })
          .then(response => {
            return res.status(200).json({ data: response.data.items });
          })
          .catch((_) => {
            res.status(404);
          });
        break;
      default:
        res
          .status(200)
          .json({ msg: "Limit exceeded, please try again tomorrow." });
        break;
    }
  }
});

export const path = "/api";
export const handler = app;