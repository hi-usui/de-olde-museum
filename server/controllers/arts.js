import mongoose from "mongoose";

export const Arts = new (class Controller {
  new = async (req, res) => {
    await mongoose.connection.transaction(async (session) => {
      const art = new Art();
      await art.save({ session });
      return res.json({ user: savedUser, jwt: token });
    });
  };
})();
