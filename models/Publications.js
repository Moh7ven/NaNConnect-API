import mongoose from "mongoose";

const publicationSchema = mongoose.Schema({
  idNanien: { type: String, required: true },
  libPub : {type: String, required: true},
  createdAtPub : {type: String, required: true},
  imagePub : {type: String, required: true},
  modifPub : {type: Boolean, default: false},
  authorName : {type: String, required: true},
});

export default publicationSchema = mongoose.model("Publications", publicationSchema);
