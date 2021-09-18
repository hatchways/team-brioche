require("dotenv").config();
const colors = require("colors");
const User = require('./models/User')
const Request = require('./models/Request')
const connectDB = require('./db')

connectDB()

// save a user
const user1 = {
  username: "sitter1",
  email: "s1@g.com",
  password: "123456"
}

const user2 = {
  username: "owner1",
  email: "o1@g.com",
  password: "123456"
}

const users = [user1, user2]
const Requests = [
  {
    start: '2021 sept 12 8:00 PM',
    end: '2021 sept 12 10:00 PM',
  },
  {
    start: '2021 sept 13 11:00 AM',
    end: '2021 sept 13 3:00 PM',
  },
  {
    start: '2021 sept 23 4:00 PM',
    end: '2021 sept 23 10:00 PM',
  },
  {
    start: '2021 sept 22 8:00 AM',
    end: '2021 sept 22 11:00 PM',
  },
  {
    start: '2021 sept 25 8:00 AM',
    end: '2021 sept 25 11:00 PM',
  },
  {
    start: '2021 sept 25 8:00 AM',
    end: '2021 sept 25 11:00 PM',
  }
]

users.forEach(async user => await User.create(user))

async function seedDb(){
  
try {
  const sitter = await User.findOne({ username: "sitter1" })
  console.log(sitter)

  const owner = await User.findOne({ username: "owner1"})
  console.log(owner)

  await Request.create(wrap(owner, sitter, Requests[0]))
  await Request.create(wrap(owner, sitter, Requests[1]))
  await Request.create(wrap(owner, sitter, Requests[2]))
  await Request.create(wrap(owner, sitter, Requests[3]))
  await Request.create(wrap(owner, sitter, Requests[4]))
  await Request.create(wrap(owner, sitter, Requests[5]))

  console.log('seeding complete')
  console.log("Please log in with the following credentials")
  console.log('username: ' + user1.email)
  console.log('Password: ' + user1.password)
  console.log('Exiting Process')
  process.exit()
} catch (error) {
  console.log(error)
  process.exit()
}
}

setTimeout(() => {
  seedDb()
}, 1000);

function wrap(owner, sitter, request){
  return {
      ownerId: owner._id,
      sitterId: sitter._id,
      start: new Date(request.start),
      end: new Date(request.end)
    }
}