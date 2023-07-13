import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { useSelector, useDispatch } from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions'
import { PushAnswer } from '../hooks/setResult'
import { Navigate } from 'react-router-dom'

const questionStore = (state) => state?.question
const resultStore = (state) => state?.result

const Quiz = () => {
  const [check, setCheck] = useState(undefined)
  const dispatch = useDispatch()
  const { trace, queue } = useSelector(questionStore)
  const { result } = useSelector(resultStore)

  const onNext = () => {
    dispatch(MoveNextQuestion())
    if (result.length <= trace) {
      dispatch(PushAnswer(check))
    }
    setCheck(undefined)
  }

  const onPrev = () => {
    dispatch(MovePrevQuestion())
  }

  const onChecked = (check) => {
    setCheck(check)
  }
  // console.log(check)

  //Finish exam
  if (result.length && result.length >= queue.length) {
    return <Navigate to={'/result'} replace="true"></Navigate>
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <Questions onChecked={onChecked} />

      <div className="grid">
        <button className="btn prev" onClick={onPrev} disabled={trace === 0}>
          Prev
        </button>
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Quiz
