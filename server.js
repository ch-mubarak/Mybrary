if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")

const indexRouter = require("./routes/index")
const authorRouter= require("./routes/authors")
const bookRouter= require("./routes/books")

app.set("view engine", "ejs")
app.set("layout", "layouts/layouts")
app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({extended:false,limit: '10mb'}))

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to mongoose"))


app.use("/", indexRouter)
app.use("/authors",authorRouter)
app.use("/books",bookRouter)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("server up and running on server 3000"))
 