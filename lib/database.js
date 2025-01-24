import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {})
    .then((res) => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;
