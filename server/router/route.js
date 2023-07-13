import { Router } from 'express'
import {
  deleteAllResult,
  dropQuestions,
  getQuestions,
  getAllResult,
  insertQuestions,
  postResult,
} from '../controller/controller.js'
const router = Router()

router
  .route('/questions')
  .get(getQuestions)
  .post(insertQuestions)
  .delete(dropQuestions)

router
  .route('/results')
  .get(getAllResult)
  .post(postResult)
  .delete(deleteAllResult)

export default router
