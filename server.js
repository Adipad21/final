const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://adi213:73yaNe1nC2doGPrK@helloworld.echvwnw.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  email: { type: String, unique: true },
  //password: String,
  battingStyle: String,    
  bowlingStyle: String,    
  primaryRole: String,     
  createdAt: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/user.html");
});

app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id:id});
  res.send(user);
});

app.post("/api/register", async (req, res) => {
    const result = validateUser(req.body);

    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    //const salt = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        battingStyle: req.body.battingStyle,
        bowlingStyle: req.body.bowlingStyle,
        primaryRole: req.body.primaryRole,
        email: req.body.email,
        //password: hashedPassword,
        createdAt: req.body.createdAt
    });

    await user.save();
    res.send({ id: user._id, name: user.firstName + " " + user.lastName });
});



app.put("/api/users/:id", async (req, res) => {
  const result = validateUser(req.body);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    battingStyle: req.body.battingStyle,
    bowlingStyle: req.body.bowlingStyle,
    primaryRole: req.body.primaryRole,
    email: req.body.email,
    createdAt: req.body.createdAt
  };

  const id = req.params.id;

  const updateResult = await User.updateOne({_id:id},fieldsToUpdate);
  res.send(updateResult);
});

app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

const validateUser = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        dob: Joi.date().required(),
        email: Joi.string().email().required(),
        //password: Joi.string().min(5).required(),
        battingStyle: Joi.string().valid("Right-handed", "Left-handed").required(),
        bowlingStyle: Joi.string().valid("Right-arm fast","Right-arm medium","Right-arm spin","Left-arm fast","Left-arm medium","Left-arm spin").required(),
        primaryRole: Joi.string().valid("Batsman","Bowler","Wicket-keeper","All-rounder").required(),
    });
    return schema.validate(user);
};

const validateUpdatedUser = (user) => {
  const schema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      dob: Joi.date().required(),
      email: Joi.string().email().required(),
      battingStyle: Joi.string().valid("Right-handed", "Left-handed").required(),
      bowlingStyle: Joi.string().valid("Right-arm fast","Right-arm medium","Right-arm spin","Left-arm fast","Left-arm medium","Left-arm spin").required(),
      primaryRole: Joi.string().valid("Batsman","Bowler","Wicket-keeper","All-rounder").required(),
  });
  return schema.validate(user);
};

app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
