const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  bio: {
    type: String,
    required: false,
  },
  site_url: {
    type: String,
    required: false,
  },
  twitterHandle: {
    type: String,
    required: false,
  },
  igHandle: {
    type: String,
    required: false,
  },
  profile_pics: {
    type: String,
  },
});

UserSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
  const self = this;
  const newDocument = doc;
  return new Promise((resolve, reject) => {
    return self
      .findOne(condition)
      .then((result) => {
        if (result) {
          return resolve(result);
        }
        return self
          .create(newDocument)
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
