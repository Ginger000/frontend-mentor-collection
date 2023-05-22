
import './App.css'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { TicTacToe } from './projects/Tic-Tac-Toe/TicTacToe'
import HomePage from './HomePage'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout/>} >
        <Route path='*' element={<HomePage/>}></Route>
        <Route path='projects/Tic-Tac-Toe' element={<TicTacToe/>}></Route>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>

    </>
  )
}

export default App
