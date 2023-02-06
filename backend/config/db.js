const mongoose = require('mongoose')
const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) =>
      console.log(`Connected Successfully to DB ${conn.connection.host}`)
    )
    .catch((err) => {
      console.log('Error connecting to DB')
      console.error(err)
      process.exit(1)
    })
}
module.exports = connectToDb
