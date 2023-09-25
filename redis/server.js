const express = require("express");
const cors = require("cors");
const axios = require("axios");

const redis = require("redis");
// const client = redis.createClient({url : 'url of your production application'})
const redisClient = redis.createClient();
// terminal -> redis-server

const app = express();
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  await redisClient.connect();
  console.log("object");
  const photos = await redisClient.get("photos");
//   const photos = await redisClient.get(`photoes?albumId=${albumId}`);
  if (photos != null) {
    console.log("hi");
    res.json(JSON.parse(photos));
  } else {
    console.log("hello");
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    await redisClient.setEx("photos", 3600, JSON.stringify(data));
    // terminal -> redis-cli -> keys *
    res.json(data);
  }
  await redisClient.quit();
});

app.listen(8000, () => {
  console.log("server is up and running");
});
