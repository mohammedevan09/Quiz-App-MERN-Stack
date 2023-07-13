import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attemptsNumber, earnNumber, flagResult } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'

const questionStore = (state) => state?.question
const resultStore = (state) => state?.result
const Result = () => {
  const dispatch = useDispatch()

  const { queue, answers } = useSelector(questionStore)
  const { result, userId } = useSelector(resultStore)
  // console.log(queue, answers)
  // console.log(result, userId)

  const totalPoints = queue.length * 10
  const earnPoints = earnNumber(result, answers)
  const attempts = attemptsNumber(result)
  const flag = flagResult(totalPoints, earnPoints)

  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achieved: flag,
  })

  const onRestart = () => {
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
      <div className="result flex-center">
        <div className="flex">
          <span>Username</span>
          <span className="bold">{userId}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points:</span>
          <span className="bold">{totalPoints}</span>
        </div>
        <div className="flex">
          <span>Total Questions :</span>
          <span className="bold">{queue?.length || 0}</span>
        </div>
        <div className="flex">
          <span>Total Attempts:</span>
          <span className="bold">{attempts}</span>
        </div>
        <div className="flex">
          <span>Total Earn Points:</span>
          <span className="bold">{earnPoints}</span>
        </div>
        <div className="flex">
          <span>Quiz Result:</span>
          <span
            style={{ color: `${flag == 'Passed' ? '#5fff44' : '#ff0000'}` }}
            className="bold letter-space"
          >
            {flag}
          </span>
        </div>
        <div className="start"></div>
        <Link className="btn" to={'/'} onClick={onRestart}>
          Restart
        </Link>
      </div>
      <div className="container">
        <ResultTable />
      </div>
    </div>
  )
}

export default Result
