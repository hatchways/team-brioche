require("dotenv").config();
const colors = require("colors");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { userArray, profileArray } = require("./sampleProfles");
const connectDB = require("../db");

connectDB();

const loadUser = async (user) => await User.create(user);
const loadProfile = async (profile) => await Profile.create(profile);

for (let user of userArray) {
  loadUser(user);
}

const createProfile = async () => {
  try {
    const users = await User.find();
    users.sort((x, y) => {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    console.log(users);
    const userId = users.map((user) => user._id);
    let index = 0;

    for (let profile of profileArray) {
      profile.userId = userId[index];
      loadProfile(profile);
      index++;
    }

    setTimeout(async () => {
      const profiles = await Profile.find().populate("userId", {
        username: 1,
        email: 1,
      });
      console.log("Seeding Complete");
      console.log(profiles);
      process.exit();
    }, 1000);
  } catch (error) {
    process.exit();
  }
};

setTimeout(() => {
  createProfile();
}, 3000);
