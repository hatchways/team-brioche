require("dotenv").config();
const colors = require("colors");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { userArray, profileArray } = require("./sampleProfiles");
const connectDB = require("../db");

connectDB();

const loadUser = async (user) => await User.create(user);
for (let user of userArray) {
  loadUser(user);
}

async function createProfile() {
  try {
    const users = await User.find();
    const userId = users.map((user) => user._id);
    let index = 0;

    for (let profile of profileArray) {
      profile.userId = userId[index];
      await Profile.create(profile);
      index++;
    }

    setTimeout(async () => {
      const profiles = await Profile.find().populate("userId", {
        username: 1,
        email: 1,
      });
      process.exit();
    }, 1000);
  } catch (error) {
    process.exit();
  }
}

setTimeout(() => {
  createProfile();
}, 3000);
