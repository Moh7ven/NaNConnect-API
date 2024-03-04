import mongoose from "mongoose";

let LikePubSchema = mongoose.Schema({
  idPub: { type: String, required: true },
  idNanien: { type: String, required: true },
  createdAt: { type: String, required: true },
});

const LikePub = mongoose.model("LikePub", LikePubSchema);

export default LikePub;
