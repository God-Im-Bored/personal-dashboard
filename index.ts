import express, { Request, Response, Error, Next } from "express"
const cors = require("cors")
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3000
const logger = require("morgan")

app.use(cors({
    origin: '*'
}))

app.use(logger("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "/public")));

  app.get("/api", (req: Request, res: Response) => {
    res.send({
      message: "api mounted here",
    });
  });

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html")); 
  });

app.use((err: Error, req: Request, res: Response, next: Next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500 ).send(err.message || "Internal server error. Check application entry point.")
})

app.listen(PORT, (err: Error) => {
    if (err) console.log(err.message)
    console.log(`server listening on newtowrk connection http://localhost:${PORT}`)
})