const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 16); // I determined the salt is used
});

userSchema.methods.comparePassword = async function (enteredPassword, next) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Users = model("users", userSchema);
module.exports = Users;
