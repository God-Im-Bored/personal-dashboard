const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000
const logger = require("morgan")

app.use(cors({
    origin: '*'
}))

app.use(logger("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send({
      message: "Hello World",
    });
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