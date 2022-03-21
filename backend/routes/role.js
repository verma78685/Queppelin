const express = require("express");
const app = express();
const router = express.Router();
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const mongourl = "mongodb://localhost:27017";

const db_name = "queppelin";
const coll_name = "details";

router.get("/getRole", (req, res) => {
  const email = req.query.email;
  mongoclient.connect(mongourl, (err, client) => {
    if (err) {
      res.send("Error Occurred");
    } else {
      console.log("connected");
      const db = client.db(db_name);
      const coll = db.collection(coll_name);
      const data = coll
        .find({ email: email }, { role: 1 })
        .toArray((error, result) => {
          if (error) {
            res.send(error);
          } else if (Object.keys(result).length !== 0) {
            res.send(result);
          }
        });
    }
  });
});

router.get("/getDetails", (req, res) => {
  mongoclient.connect(mongourl, (err, client) => {
    if (err) {
      res.send("Error Occurred");
    } else {
      console.log("connected");
      const db = client.db(db_name);
      const coll = db.collection(coll_name);
      const data = coll.find({}).toArray((error, result) => {
        if (error) {
          res.send(error);
        } else if (Object.keys(result).length !== 0) {
          res.send(result);
          // console.log(result);
        }
      });
    }
  });
});

router.get("/getGraphDetails", (req, res) => {
  mongoclient.connect(mongourl, (err, client) => {
    if (err) {
      res.send("Error Occurred");
    } else {
      console.log("connected");
      const db = client.db(db_name);
      const coll = db.collection(coll_name);
      coll.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]).toArray((error, result) => {
        if (error) {
          res.send(error);
        } else if (Object.keys(result).length !== 0) {
          res.send(result);
          // console.log(result);
        }
      });
    }
  });
});

router.post("/setDetails", (req, res) => {
  console.log(req.body);
  if (req.body.role === undefined) {
    req.body.role = "User";
  }
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
            // res.send("Data Exists");
            coll.updateOne(
              { email: req.body.email },
              {
                $set: {
                  role: req.body.role,
                  name: req.body.name,
                  mob: req.body.mob,
                },
              },
              (err, result) => {
                if (err) throw err;
                else res.send("Role Set");
              }
            );
          } else {
          }
        });
    }
  });
});

module.exports = router;
