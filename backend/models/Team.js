import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a team name"],
      trim: true,
      maxlength: [50, "Team name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to automatically add admin to members
teamSchema.pre("save", function (next) {
  if (!this.members.includes(this.admin)) {
    this.members.push(this.admin);
  }
  next();
});

export default mongoose.model("Team", teamSchema);
