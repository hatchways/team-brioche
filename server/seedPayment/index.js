require("dotenv").config();
const colors = require("colors");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { userArray, profileArray } = require("./sampleProfles");
const connectDB = require("../db");

connectDB();

console.log("loading mock users");
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
    console.log("User ID's: ", userId);
    console.log("populating profiles...");

    setTimeout(async () => {
      const profiles = await Profile.find().populate("userId", {
        username: 1,
        email: 1,
      });
      console.log(profiles);
      console.log(`
      seeding complete 
      summary: 
        Number of users created : ${users.length}
        Number of profiles created : ${profiles.length}
        Exiting process
      `);
      process.exit();
    }, 1000);
  } catch (error) {
    console.log("An error occured");
    console.log(error.message);
    process.exit();
  }
}

setTimeout(() => {
  createProfile();
}, 3000);
