if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts")
const indexRouter = require("./routes/index")
const mongoose = require("mongoose")

app.set("view engine", "ejs")
app.set("layout", "layouts/layouts")
app.use(expressLayouts)
app.use(express.static("public"))

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to mongoose"))


app.use("/", indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("server up and running on server 3000"))
