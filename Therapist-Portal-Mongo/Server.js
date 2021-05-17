const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const joi = require("@hapi/joi");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/Doctors_Portal";
let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check db
app.get("/", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) {
      res.status(400).send("Not connected");
    } else {
      res.send("Success");
    }
    client.close();
  });
});

//get from database
app.get("/Appointment", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("Doctors_Portal").collection("Appointment");
    if (err) {
      console.log(err);
      res.status(400).send("Not connected");
    } else {
      const collection = client.db("Doctors_Portal").collection("Appointment");
      collection.find().toArray((err, documents) => {
        // console.log('Succesfuly inserted',result)
        res.send(documents);
        client.close();
      });
    }
  });
});

//get from database
app.get("/Appointment/:_id", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("Doctors_Portal").collection("Appointment");
    if (err) {
      console.log(err);
      res.status(400).send("Not connected");
    } else {
      const collection = client.db("Doctors_Portal").collection("Appointment");
      collection.find({"_id": ObjectID(req.params._id)}).toArray((err, documents) => {
        // console.log('Succesfuly inserted',result)
        res.send(documents[0]);
        client.close();
      });
    }
  });
});


app.put("/Appointment/:_id", (req, res) => {
  const data_app = req.body;


  if(data_app.childsMood.score) {
    if(data_app.childsMood.score <=2)
      data_app.childsMood.score = 1
    else if(data_app.childsMood.score == 3 || data_app.childsMood.score == 4)
      data_app.childsMood.score = 2
    else if(data_app.childsMood.score == 5)
      data_app.childsMood.score = 3
    else if(data_app.childsMood.score == 6)
      data_app.childsMood.score = 4
    else if(data_app.childsMood.score > 6)
      data_app.childsMood.score = 5
  }

  if(data_app.parentsMood.score) {
    if(data_app.parentsMood.score <=3)
      data_app.parentsMood.score = 1
    else if(data_app.parentsMood.score == 4 || data_app.parentsMood.score == 5)
      data_app.parentsMood.score = 2
    else if(data_app.parentsMood.score == 6)
      data_app.parentsMood.score = 3
    else if(data_app.parentsMood.score == 7)
      data_app.parentsMood.score = 4
    else if(data_app.parentsMood.score > 7)
      data_app.parentsMood.score = 5
  }

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const collection = client.db("Doctors_Portal").collection("Appointment");
    if (err) {
      console.log(err);
      res.status(400).send("Not connected");
    } else {
      const collection = client.db("Doctors_Portal").collection("Appointment");

      collection.updateOne(
          {"_id": ObjectID(req.params._id),
                  // "childsMood.year":data_app.childsMood.year,
                  // "childsMood.month":data_app.childsMood.month,
                  "childsMood.day":data_app.childsMood.day
          },
          {'$set': {'childsMood.$': {
                "year":data_app.childsMood.year,
                "month":data_app.childsMood.month,
                "day":data_app.childsMood.day,
                "score":data_app.childsMood.score,
              }}}
          , (err, result) => {

            if(result.result.nModified == 0) {
              collection.updateOne(
                  {"_id": ObjectID(req.params._id)},
                  {'$push': {'childsMood': data_app.childsMood}}
                  , (err, result) => {
                  });

            }
          });

      collection.updateOne(
          {"_id": ObjectID(req.params._id),
                  // "ParentsMood.year":data_app.parentsMood.year,
                  // "ParentsMood.month":data_app.parentsMood.month,
                  "ParentsMood.day":data_app.parentsMood.day
          },
          {'$set': {'ParentsMood.$': {
                "year":data_app.parentsMood.year,
                "month":data_app.parentsMood.month,
                "day":data_app.parentsMood.day,
                "score":data_app.parentsMood.score,
              }}}
          , (err, result) => {

            if(result.result.nModified == 0){
              collection.updateOne(
              {"_id": ObjectID(req.params._id)},
              {'$push': {'ParentsMood': data_app.parentsMood}}
              , (err, result) => {
              });
            }

            if (err) {
                console.log(err);
              } else {

              }
          });
    }
  });
  res.send("success");
});


//get from database
// app.put("/Appointment/:_id", (req, res) => {
//   const data_app = req.body;
//
//
//   if(data_app.childsMood.score) {
//     if(data_app.childsMood.score <=3)
//       data_app.childsMood.score = 1
//     else if(data_app.childsMood.score == 4 || data_app.childsMood.score == 5)
//       data_app.childsMood.score = 2
//     else if(data_app.childsMood.score == 6)
//       data_app.childsMood.score = 3
//     else if(data_app.childsMood.score == 7)
//       data_app.childsMood.score = 4
//     else if(data_app.childsMood.score > 7)
//       data_app.childsMood.score = 5
//   }
//
//   if(data_app.parentsMood.score) {
//     if(data_app.parentsMood.score <=3)
//       data_app.parentsMood.score = 1
//     else if(data_app.parentsMood.score == 4 || data_app.parentsMood.score == 5)
//       data_app.parentsMood.score = 2
//     else if(data_app.parentsMood.score == 6)
//       data_app.parentsMood.score = 3
//     else if(data_app.parentsMood.score == 7)
//       data_app.parentsMood.score = 4
//     else if(data_app.parentsMood.score > 7)
//       data_app.parentsMood.score = 5
//   }
//
//   client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   client.connect((err) => {
//     const collection = client.db("Doctors_Portal").collection("Appointment");
//     if (err) {
//       console.log(err);
//       res.status(400).send("Not connected");
//     } else {
//       const collection = client.db("Doctors_Portal").collection("Appointment");
//       collection.updateOne(
//           {"_id": ObjectID(req.params._id)},
//           {'$push': {'childsMood': data_app.childsMood, 'ParentsMood': data_app.parentsMood}}
//           , (err, result) => {
//             if (err) {
//               console.log(err);
//               res.status(500).send({ message: err });
//               client.close();
//             } else {
//               res.send("success");
//               client.close();
//             }
//           });
//     }
//   });
// });




//post to database
//validation function
const validation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    phone: joi.string().min(11).max(11).required(),
  });
  console.log(data);
  return schema.validate(data);
};

app.post("/addAppointment", async (req, res) => {
  const data_app = req.body;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect((err) => {
    const collection = client.db("Doctors_Portal").collection("Appointment");
    collection.insertOne(data_app, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        client.close();
      } else {
        res.send("success");
        client.close();
      }
    });
  });
});

//update data
app.post("/updateStatus", (req, res) => {
  const id = req.body.id;
  const val = req.body.value;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("Doctors_Portal").collection("Appointment");
    // console.log('Succesfuly inserted',result)
    collection.updateOne(
      { _id: ObjectID(id) },
      { $set: { status: val } },
      { upsert: true },
      (err, result) => {
        if (err) {
          console.log(err, 1);
          res.status(500).send({ message: err });
        } else {
          console.log("successfull updated");
          res.send(result);
        }
        client.close();
      }
    );
  });
});
//update prescription
app.post("/updatePrescription", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const data = req.body.medicine;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("Doctors_Portal").collection("Appointment");
    // console.log('Succesfuly inserted',result)
    collection.updateOne(
      { _id: ObjectID(id) },
      { $set: { prescription: true, medicine: data } },
      (err, result) => {
        if (err) {
          console.log(err, 1);
          res.status(500).send({ message: err });
        } else {
          res.send(result);
        }
        client.close();
      }
    );
  });
});
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`listen to port ${port}`));
