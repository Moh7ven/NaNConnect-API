import mongoose from "mongoose";

const publicationSchema = mongoose.Schema({
  idNanien: { type: String, required: true },
  libPub: { type: String, required: true },
  createdAtPub: { type: String, required: true },
  image: [{ type: String, required: false }], //to add many images
  video: [{ type: String, required: false }], //to add many videos
  modifPub: { type: Boolean, default: false },
  authorName: { type: String, required: true },
  authorUsername: { type: String, required: true },
});

const Publication = mongoose.model("Publications", publicationSchema);

export default Publication;
