const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const axios = require("axios");
const session = require("express-session");
const {token,guild,link,prof}=require("./config.json");
const {Client,Intents}=require("discord.js");
const client = new Client({intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES
]});
const {Octokit} = require("@octokit/rest");

const req = require("express/lib/request");
const { header } = require("express/lib/request");
const gitt = new Octokit();


app.engine(".ejs", ejs.__express);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/views"));

app.get("/material", (req, res) =>

  res.render(
      "material.ejs",
   {
    dcprof:prof,
    avatar: client.users.cache.get("Discord Hesap ID").avatarURL({dynamic:true})
  })
  
);

app.get("/error", (req, res) =>

  res.render(
      "datascript/error.ejs",
   {
    avatar: client.users.cache.get("Discord Hesap ID").avatarURL({dynamic:true})
  })
  
);

app.get("/", (req, res) =>

  res.render(
      "index.ejs",
   {
     
    guilds:client.guilds.cache.get(guild),
    dclink:link,
    dcprof:prof,
    avatar: client.users.cache.get("Discord Hesap ID").avatarURL({dynamic:true}),
   
    status:client.guilds.cache.get(guild).members.cache.get("Discord Hesap ID").presence?.status
  })
  
);


app.listen(9999);
client.on("ready",()=>{
    console.log("Hazır!");
});
client.login(token);
