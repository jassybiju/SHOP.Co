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
    phone : {
      type : String,
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
    avatar_url : {
      type : String
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_google_login : {
      type : Boolean,
      default : false
    }
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  try {
    let user = this;
    
    //checking if password is modified
    if (!user.isModified("password")) return next();

    //generating salt
    const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 10;

    //hashing password
    const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    console.log(hash)
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  console.log(this.password)
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
