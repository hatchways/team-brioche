let profiles = [];

const addProfile = (id, socketId) => {
  !profiles.some((profile) => profile.id === id) &&
    profiles.push({ id, socketId });
  return profiles;
};

const removeProfile = (socketID) => {
  profiles = profiles.filter((profile) => profile.socketId !== socketID);
  return profiles;
};

const getProfile = (id) => {
  return profiles.find((profile) => profile.id === id);
};

module.exports = { addProfile, removeProfile, getProfile };
