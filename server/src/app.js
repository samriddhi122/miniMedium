import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './route/user.route.js'
app.use("/api/users", userRouter)
import postRouter from './route/post.route.js'
app.use("/api/posts", postRouter)
import followRouter from './route/followers.route.js'
app.use("/api/follow", followRouter)

export {app}