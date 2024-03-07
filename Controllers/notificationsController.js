//file of notifications controller

import Notifications from "../models/Notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find({
      idNaniens: req.params.idNaniens,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
