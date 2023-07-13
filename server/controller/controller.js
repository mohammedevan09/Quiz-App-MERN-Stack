import questions, { answers } from '../database/data.js'
import Questions from '../models/questionSchema.js'
import Results from '../models/resultSchema.js'

// Question Controller
const getQuestions = async (req, res) => {
  try {
    const q = await Questions.find()
    res.json(q)
  } catch (error) {
    res.json({ error })
  }
}

const insertQuestions = (req, res) => {
  try {
    Questions.insertMany({ question: questions, answers: answers })
    res.json({ message: 'Data saved' })
  } catch (error) {
    res.json({ error })
  }
}

const dropQuestions = async (req, res) => {
  try {
    await Questions.deleteMany()
    res.json({ msg: 'Question deleted successfully' })
  } catch (error) {
    res.json({ error })
  }
}

// Result Controller
const getAllResult = async (req, res) => {
  try {
    const r = await Results.find()
    res.json(r)
  } catch (error) {
    res.json({ error })
  }
}

const postResult = (req, res) => {
  try {
    const { username, result, attempts, points, achieved } = req.body
    if (!username && !result) throw new Error('Data Not Provided...!')

    Results.create({ username, result, attempts, points, achieved })
    res.json({ msg: 'Result Saved Successfully...!' })
  } catch (error) {
    res.json({ message: error })
  }
}

const deleteAllResult = async (req, res) => {
  try {
    await Results.deleteMany()
    res.json({ msg: 'Results Deleted' })
  } catch (error) {
    res.json({ error })
  }
}

export {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getAllResult,
  postResult,
  deleteAllResult,
}
