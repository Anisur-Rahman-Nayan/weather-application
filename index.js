const express = require('express')
const app = express()
const port = 3001
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
const https = require("https")

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
  
});

app.post('/',(req,res)=>{

const query = req.body.CityName;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=37f30293bd13b9358c1579217bdf9251&units=metric"

  https.get(url ,(response)=>{
    // console.log(response)
    // console.log(response.statusCode)

    response.on("data",(data)=>{
      // console.log(data)
      const weatherData =  JSON.parse(data) // used to convert string to js-object
      //const weatherData =  JSON.stringify(data) // used to convert js-object to string
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
        res.write("<p> The Weather is Currently "+ weatherDescription + "</p>")
        res.write(" <h1> The Temperature in " + query  + " is " + temp + " degrees Celsius. </h1>")
       res.write("<img src=" + imageUrl + ">");
      res.send()
    })
  })
})



app.listen(port)