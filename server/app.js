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
const ioCookieParser = require("socket.io-cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");
const { json, urlencoded } = express;
const { addUser, removeUser, getUser } = require("./utils/users");

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.use(ioCookieParser());
io.use(function (socket, next) {
  let token = socket.request.cookies["token"];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication Error"));
    }
  } else {
    return next(new Error("Authentication Error"));
  }
}).on("connection", (socket) => {
  console.log("New user connected");
  io.emit(`welcome to the socket serverd ${socket.id}`);

  socket.on("addUser", (email) => {
    const users = addUser(email, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("disconnect", () => {
    const users = removeUser(socket.id);
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
