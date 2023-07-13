import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export const attemptsNumber = (result) => {
  return result.filter((r) => r !== undefined).length
}

export const earnNumber = (result, answers) => {
  return (
    result.map((elem, i) => answers[i] == elem).filter((bool) => bool == true)
      .length * 10
  )
}

export const flagResult = (total, earn) => {
  let newTotal = total / 2
  if (newTotal > earn) {
    return 'Failed'
  } else {
    return 'Passed'
  }
}

export const CheckUserExists = ({ children }) => {
  const auth = useSelector((state) => state?.result?.userId)
  return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

// Api handling
// Get server data
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data
  return callback ? callback(data) : data
}

// Post server data
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data
  return callback ? callback(data) : data
}
