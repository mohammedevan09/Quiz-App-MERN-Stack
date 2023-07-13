import mongoose from 'mongoose'
const { Schema } = mongoose

const questionModel = new Schema({
  question: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
})

export default mongoose.model('Question', questionModel)
