const express = require('express')
const connectToMongoDB = require('./connection.js')
const path = require('path')
const cookieParser = require("cookie-parser")
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth.js')

const URL = require('./models/url')

const app = express()
const PORT = 8000


const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user.js')

connectToMongoDB("mongodb://127.0.0.1:27017/shortUrl")
.then(() => {
  console.log("MongoDb connected successfully")
})
.catch((err) => console.log("Error connecting to mongodb", err))

// ejs setup
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// handle json responses
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser)


// routes
app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use("/user",checkAuth, userRoute)

app.get('/test', async (req,res) => {
  const allUrls = await URL.find({});
  console.log(allUrls)
  return res.render("home", {
    urls: allUrls
  });
})

// Listen the app on port 8000
app.listen(PORT || 8000, () => {
  console.log(`App listening on port ${PORT}`)
})
