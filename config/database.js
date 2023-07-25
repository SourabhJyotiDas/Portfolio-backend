import  mongoose  from "mongoose";

export const connectToDatabase = async () => {
   mongoose.connect(process.env.MONGO_URI_ONLINE)
      .then((ele) => {
         console.log(`Mongoose Connected: ${ele.connection.host}`)
      })
      .catch((err) => {
         console.log(err)
      })
};