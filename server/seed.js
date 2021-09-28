require("dotenv").config();
const colors = require("colors");
const User = require("./models/User");
const Request = require("./models/Request");
const connectDB = require("./db");

connectDB();

// Dog sitter
const demoUser1 = {
  username: "demoUser1",
  email: "d1@g.com",
  password: "123456",
};

// Dog owner
const demoUser2 = {
  username: "demoUser2",
  email: "d2@g.com",
  password: "123456",
};

const users = [demoUser1, demoUser2];
const Requests = [
  {
    start: "2021 sept 12 8:00 PM",
    end: "2021 sept 12 10:00 PM",
  },
  {
    start: "2021 sept 13 11:00 AM",
    end: "2021 sept 13 3:00 PM",
  },
  {
    start: "2021 sept 23 4:00 PM",
    end: "2021 sept 23 10:00 PM",
  },
  {
    start: "2021 sept 22 8:00 AM",
    end: "2021 sept 22 11:00 PM",
  },
  {
    start: "2021 sept 25 8:00 AM",
    end: "2021 sept 25 11:00 PM",
  },
  {
    start: "2021 sept 25 8:00 AM",
    end: "2021 sept 25 11:00 PM",
  },
];

users.forEach(async (user) => await User.create(user));

async function seedDb() {
  try {
    const sitter = await User.findOne({ username: demoUser1.username });
    console.log("sitter: ", sitter);

    const owner = await User.findOne({ username: demoUser2.username });
    console.log("owner: ", owner);

    for (let element of Requests) {
      await Request.create(wrap(owner, sitter, element));
    }

    console.log("seeding complete");
    console.log("Exiting Process");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

setTimeout(() => {
  seedDb();
}, 1000);

function wrap(owner, sitter, request) {
  return {
    ownerId: owner._id,
    sitterId: sitter._id,
    start: new Date(request.start),
    end: new Date(request.end),
  };
}
