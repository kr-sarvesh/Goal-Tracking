const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) =>
      console.log(
        `Connected Successfully to DB ${conn.connection.host}`.cyan.underline
      )
    )
    .catch((err) => {
      console.log('Error connecting to DB')
      console.error(err)
      process.exit(1)
    })
}
module.exports = connectToDb
