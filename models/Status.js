import mongoose from "mongoose";

const statusSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
});

export default statusSchema = mongooseModel("Status", statusSchema);
