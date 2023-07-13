import { postServerData } from '../helper/helper'
import {
  pushResultAction,
  setUserId,
  updateResultAction,
} from '../redux/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(pushResultAction(result))
  } catch (error) {
    console.log(error)
  }
}

export const updateResult = (index) => async (dispatch) => {
  try {
    await dispatch(updateResultAction(index))
  } catch (error) {
    console.log(error)
  }
}

export const usePublishResult = (resultData) => {
  const { result, username } = resultData
  ;(async () => {
    try {
      if (result !== [] && !username) throw new Error("Couldn't get Result")
      await postServerData(
        `http://localhost:8000/api/results`,
        resultData,
        (data) => data
      )
    } catch (error) {
      console.log(error)
    }
  })()
}
