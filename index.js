var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var fs = require("fs");

app.get("/", (req, res) => {
  if (req.url === "/") {
    var fileName = __dirname + "/index.html";
    res.sendFile(fileName);
  }
});
var urlEncoded = bodyParser.urlencoded({ extended: false });
app.post("/", urlEncoded, (req, res) => {
  var encType = req.body.option;
  var series = {
    ".": "&point:^",
    " ": "135ec:/:^",
    ",": "&:^",
    a: "Atre@#1.@AA3:^",
    b: "vf%!s$!1{se2:^",
    c: "1}mn.'''sdf3:^",
    d: "sc;-?11;-)00*8:^",
    e: "A3242~~2A.:^",
    f: "2{~!#@22:^",
    g: "a2w]]{{.?}}}:^",
    h: "8092;-;-|re%4$:^",
    i: "@#@sds233.:^",
    j: "3{@HSW*&@(92:^",
    k: "shd&@*.?3}:^",
    l: "3;-sjj2&&@9jns?:^",
    m: "@#@#sde3;-:^",
    n: "@#@#@#1114{:^",
    o: "@#@sdwew4}:^",
    p: "4WI4E232ss;-:^",
    q: "5adsdX__.:^",
    r: "5{^",
    s: "5}:^",
    t: "@3232X5;-S:^",
    u: "326'''';.:^",
    v: "6::{:^",
    w: "6|}|sd.??/:^",
    x: "||6xSxXsd3@!;-:^",
    y: "43SDee#!?7.:^",
    z: "w%8./.:^",
  };

  if (encType == "encode") {
    var message = req.body.message;
    message = message.toString().toLowerCase();
    message = message.split("");
    var s = Object.keys(series);
    var sentries = Object.entries(series);
    var arr = new Array();
    "a".split("").forEach((value, index) => {
      for (var [key, value] of sentries) arr.push(value);
    });
    var result = new Array();
    message.forEach((value, index) => {
      result.unshift(arr[s.indexOf(value)]);
    });
    result = result.toString();
    result = result.split(",");
    result = result.join("");
    fs.writeFile("result_Encoded.txt", result, (err) => {
      if (err) {
        throw err;
      }
      res.download("./result_Encoded.txt", (err) => {
        if (err) throw err;
      });
    });
  } else if (encType == "decode") {
    var decodeSeries = {
      "&point:": ".",
      "135ec:/:": " ",
      "&:": ",",
      "Atre@#1.@AA3:" : "a",
      "vf%!s$!1{se2:" : "b",
      "1}mn.'''sdf3:" : "c",
      "sc;-?11;-)00*8:" : "d",
      "A3242~~2A.:" : "e",
      "2{~!#@22:" : "f",
      "a2w]]{{.?}}}:" : "g",
      "8092;-;-|re%4$:" : "h",
      "@#@sds233.:" : "i",
      "3{@HSW*&@(92:" : "j",
      "shd&@*.?3}:" : "k",
      "3;-sjj2&&@9jns?:" : "l",
      "@#@#sde3;-:" : "m",
      "@#@#@#1114{:" : "n",
      "@#@sdwew4}:" : "o",
      "4WI4E232ss;-:" : "p",
      "5adsdX__.:" : "q",
      "5{" : "r",
      "5}:" : "s",
      "@3232X5;-S:" : "t",
      "326'''';.:" : "u",
      "6::{:" : "v",
      "6|}|sd.??/:" : "w",
      "||6xSxXsd3@!;-:" : "x",
      "43SDee#!?7.:" : "y",
      "w%8./.:" : "z",
    };
    var message = req.body.message;
    message = message.toString();
    message = message.split("^");

    var s = Object.keys(decodeSeries);
    var sentries = Object.entries(decodeSeries);
    var arr = new Array();
    "a".split("").forEach((value, index) => {
      for (var [key, value] of sentries) arr.push(value);
    });
    var result = new Array();
    message.forEach((value, index) => {
      result.unshift(arr[s.indexOf(value)]);
    });
    result = result.toString();
    result = result.split(",");
    result = result.join("");
    fs.writeFile("result_Decoded.txt", result, (err) => {
      if (err) {
        throw err;
      }
      res.download("./result_Decoded.txt", (err) => {
        if (err) throw err;
      });
    });
  }
});

app.listen(8080);
