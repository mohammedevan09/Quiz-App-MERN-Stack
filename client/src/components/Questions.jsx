import React, { useEffect, useState } from 'react'
import { useFetchQuestion } from '../hooks/FetchQuestions'
import { useDispatch, useSelector } from 'react-redux'
import { updateResult } from '../hooks/setResult'

const questionStore = (state) => state?.question
const resultStore = (state) => state?.result

const Questions = ({ onChecked }) => {
  const [checked, setChecked] = useState(undefined)
  const { trace } = useSelector(questionStore)
  const { result } = useSelector(resultStore)
  const [{ isLoading, apiData, serverError }] = useFetchQuestion()

  const question = useSelector(
    (state) => state?.question?.queue?.[state?.question?.trace]
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateResult({ trace, checked }))
  }, [checked])

  const onSelect = (i) => {
    // console.log(i)
    onChecked(i)
    setChecked(i)
    dispatch(updateResult({ trace, checked }))
  }

  if (isLoading) return <h3 className="text-light">Loading...</h3>
  if (serverError)
    return <h3 className="text-light">{serverError || 'Unknown Error'}</h3>

  return (
    <div className="questions">
      <h2 className="text-light">{question?.question}</h2>

      <ul key={question?.id}>
        {question?.options?.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={true}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] == i ? 'checked' : ''}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Questions
