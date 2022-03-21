const express = require("express");
const app = express();
const router = express.Router();
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017";

const db_name = "queppelin";
const coll_name = "details";

router.get("/getTotalUsers", (req, res) => {
  console.log("success");
  mongoclient.connect(mongourl, (err, client) => {
    if (err) {
      res.send("Error");
    } else {
      const db = client.db(db_name);
      const coll = db.collection(coll_name);
      coll.find({}).toArray((error, result) => {
        if (error) {
          res.send("Error");
        } else if (Object.keys(result).length !== 0) {
          res.send(result);
        }
      });
    }
  });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  mongoclient.connect(mongourl, (err, client) => {
    if (err) {
      res.send("Error Occurred");
    } else {
      console.log("connected");
      const db = client.db(db_name);
      const coll = db.collection(coll_name);
      const data = coll
        .find({ email: req.body.email })
        .toArray((error, result) => {
          if (error) {
            res.send("Error");
          } else if (Object.keys(result).length !== 0) {
            res.send("Data Exists");
          } else {
            db.collection(coll_name).insert(
              {
                email: req.body.email,
                pwd: req.body.pwd,
              },
              (err, result) => {
                if (err) throw err;
                else {
                  return;
                }
              }
            );
            res.send("Data Inserted");
          }
        });
    }
  });
});

module.exports = router;
