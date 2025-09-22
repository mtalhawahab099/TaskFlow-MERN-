import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";

// Define the schema for a User
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true, // Removes extra spaces from the beginning and end
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot be more than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true, // Always converts email to lowercase
      match: [
        // Simple regex for email validation
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // This is crucial: prevents the password from being returned in any query by default
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

// Middleware: Before saving a user, hash their password
userSchema.pre("save", async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with a cost of 12 (higher cost = more secure but slower)
  this.password = await hash(this.password, 12);
  next();
});

// Instance method: Check if the provided password matches the hashed password in the database
// This will be available on any User document instance (e.g., user.matchPassword())
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Since we used `select: false` on the password, we need to explicitly get it for comparison.
  // `this` refers to the current user document. We can't use `this.password` here.
  // We need to find the user again, but this time selecting the password field.
  const userWithPassword = await this.model("User")
    .findById(this._id)
    .select("+password");
  return await compare(enteredPassword, userWithPassword.password);
};

// Create the Model from the Schema and export it
export default model("User", userSchema);
