import '../styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './Main'
import Quiz from './Quiz'
import Result from './Result'
import { CheckUserExists } from '../helper/helper'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/quiz',
    element: (
      <CheckUserExists>
        <Quiz />
      </CheckUserExists>
    ),
  },
  {
    path: '/result',
    element: (
      <CheckUserExists>
        <Result />
      </CheckUserExists>
    ),
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
