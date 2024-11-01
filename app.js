/**
 * npx sequelize-cli model:generate --name Role --attributes name:string
 * npx sequelize-cli model:generate --name Room --attributes name:string
 * npx sequelize-cli model:generate --name File --attributes fileName:string,fileType:string,data:blob
 * npx sequelize-cli model:generate --name heroBanner --attributes fileHero:uuid,title:string,description:string,startTime:date,endTime:date
 * npx sequelize-cli model:generate --name User --attributes RoleId:uuid,name:string,email:string
 * npx sequelize-cli model:generate --name Schedule --attributes day:string,startTime:date,endTime:date,status:string,RoomId:uuid,UpdatedBy:uuid,CreatedBy:uuid
 */

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require('express');
const router = require('./routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;