import mongoose from "mongoose";

const notificationsSchema = mongoose.Schema({
  idNaniens: { type: String, required: true },
  idPub: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  read: { type: Boolean, default: false },
});

export default notificationsSchema = mongoose.model("Notifications",notificationsSchema);
