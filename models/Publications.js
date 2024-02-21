import mongoose from "mongoose";

let publicationSchema = mongoose.Schema({
  idNanien: { type: String, required: true },
  libPub: { type: String, required: true },
  createdAtPub: { type: String, required: true },
  imagePub: { type: String, required: false },
  videoPub: { type: String, required: false },
  modifPub: { type: Boolean, default: false },
  authorName: { type: String, required: true },
  authorUsername: { type: String, required: true },
  /* comments: [
    {
      idNanien: { type: String, required: true },
      idPub: { type: String, required: true },
      contentComment: { type: String, required: true },
    }, 
  ]*/
});

const Publication = mongoose.model("Publications", publicationSchema);

export default Publication;
