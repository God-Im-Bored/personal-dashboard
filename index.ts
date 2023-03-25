const express = require("express")
const cors = require("cors")
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3000
const logger = require("morgan")

app.use(cors({
    origin: '*'
}))

console.log(222333222, __dirname)
console.log(11111111111, path.join(__dirname, "/public"))

app.use(logger("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "/public")));

  app.get("/api", (req, res) => {
    res.send({
      message: "api mounted here",
    });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html")); 
  });

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500 ).send(err.message || "Internal server error. Check application entry point.")
})

app.listen(PORT, (err) => {
    if (err) console.log(err.message)
    console.log(`server listening on newtowrk connection http://localhost:${PORT}`)
})