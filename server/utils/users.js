let users = [];

const addUser = (email, socketId) => {
  !users.some((user) => user.email === email) &&
    users.push({ email, socketId });
  return users;
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketId !== socketID);
  return users;
};

const getUser = (email) => {
  return users.find((user) => user.email === email);
};

module.exports = { addUser, removeUser, getUser };
