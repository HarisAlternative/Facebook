if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const cloudinary = require("cloudinary")
const path = require("path")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

// Creating Local Storage 
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage
    localStorage = new LocalStorage("./token")
}

require("./db/connect")

// Middleswares
app.use(cors())
app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
app.use(require("./Router/routes"))

app.use(express.static(path.join(__dirname, "../Frontend/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"))
})
// Listening to the server
app.listen(port, () => {
    console.log(`Listening to the server at port:${port}`)
})