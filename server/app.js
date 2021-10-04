/* Sets up the environment variables from your .env file*/
require("dotenv").config();

const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const ioCookieParser = require("socket.io-cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");
const { json, urlencoded } = express;
//const { addUser, getUser } = require('./utils/users');

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.use(ioCookieParser());
io.use(function (socket, next) {
  console.log(token);
  const token = socket.req.cookies["token"];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication Error"));
    }
  } else {
    return next(new Error("Authentication Error"));
  }
}).on("connection", (socket) => {
  console.log(socket.id);
  io.emit("Socket server connection successful");
  socket.on("addUser", (userId) => {
    const users = addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/request", requestRouter);
app.use("/profile", profileRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
