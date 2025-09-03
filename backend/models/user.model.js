import mongoose, { Schema } from "mongoose";
import * as bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "not disclosed"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
   
  },
  { timestamps: true }
);

userSchema.index({createdAt : 1}, {expireAfterSeconds: 600, partialFilterExpression : {is_verified : false}})

userSchema.pre("save", async function (next) {
  try {
    let user = this;

    //checking if password is modified
    if (!user.isModified("password")) return next();

    //generating salt
    const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    //hashing password
    const hash = bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("user", userSchema);
