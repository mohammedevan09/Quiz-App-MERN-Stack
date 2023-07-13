import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  movePrevAction,
  moveNextAction,
  startExamAction,
} from '../redux/question_reducer'
import { getServerData } from '../helper/helper'

export const useFetchQuestion = () => {
  const dispatch = useDispatch()

  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  })

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }))

    /** async function fetch backend data */
    ;(async () => {
      try {
        const [{ question, answers }] = await getServerData(
          'http://localhost:8000/api/questions',
          (data) => data
        )

        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }))
          setGetData((prev) => ({ ...prev, apiData: question }))

          /** dispatch an action */
          dispatch(startExamAction({ questions: question, answers }))
        } else {
          throw new Error('No Question Available')
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }))
        setGetData((prev) => ({ ...prev, serverError: error }))
      }
    })()
  }, [dispatch])

  return [getData, setGetData]
}

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(moveNextAction())
  } catch (error) {
    console.log(error)
  }
}

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(movePrevAction())
  } catch (error) {
    console.log(error)
  }
}
